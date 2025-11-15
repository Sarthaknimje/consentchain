#!/usr/bin/env python3
"""
Deploy Consent Smart Contract to Algorand TestNet
"""
import os
import ssl
import certifi
from algosdk import account, mnemonic
from algosdk.v2client import algod
from algosdk.transaction import ApplicationCreateTxn, OnComplete, StateSchema
import base64

# Fix SSL certificate verification
ssl._create_default_https_context = ssl._create_unverified_context

# Your mnemonic
MNEMONIC = "clean lend scan box absorb cancel legal wood frost dynamic frequent uphold cluster lake sibling luggage flat unfair runway pole physical receive foam above hat"

# Algorand TestNet
ALGOD_ADDRESS = "https://testnet-api.algonode.cloud"
ALGOD_TOKEN = ""

def main():
    print("🚀 Deploying Consent Smart Contract to Algorand TestNet...")
    print()
    
    # Initialize client
    algod_client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS)
    
    # Get account from mnemonic
    private_key = mnemonic.to_private_key(MNEMONIC)
    address = account.address_from_private_key(private_key)
    print(f"📍 Deploying from address: {address}")
    
    # Check balance
    account_info = algod_client.account_info(address)
    balance = account_info.get('amount') / 1_000_000  # Convert microAlgos to Algos
    print(f"💰 Account balance: {balance} ALGO")
    
    if balance < 0.5:
        print("⚠️  WARNING: Low balance! You need at least 0.5 ALGO to deploy.")
        print("   Get TestNet ALGO from: https://bank.testnet.algorand.network/")
        return
    
    print()
    print("📄 Reading TEAL programs...")
    
    # Read TEAL programs
    teal_dir = os.path.join(os.path.dirname(__file__), '..')
    
    with open(os.path.join(teal_dir, 'consent_approval.teal'), 'r') as f:
        approval_program = f.read()
    
    with open(os.path.join(teal_dir, 'consent_clear.teal'), 'r') as f:
        clear_program = f.read()
    
    print("✅ TEAL programs loaded")
    print()
    print("🔨 Compiling TEAL to bytecode...")
    
    # Compile TEAL programs
    approval_result = algod_client.compile(approval_program)
    approval_compiled = base64.b64decode(approval_result['result'])
    
    clear_result = algod_client.compile(clear_program)
    clear_compiled = base64.b64decode(clear_result['result'])
    
    print("✅ Compilation successful")
    print(f"   Approval program: {len(approval_compiled)} bytes")
    print(f"   Clear program: {len(clear_compiled)} bytes")
    
    # Define schema
    global_schema = StateSchema(num_uints=8, num_byte_slices=8)
    local_schema = StateSchema(num_uints=0, num_byte_slices=0)
    
    print()
    print("📝 Creating deployment transaction...")
    
    # Get transaction params
    params = algod_client.suggested_params()
    
    # Create application transaction
    txn = ApplicationCreateTxn(
        sender=address,
        sp=params,
        on_complete=OnComplete.NoOpOC,
        approval_program=approval_compiled,
        clear_program=clear_compiled,
        global_schema=global_schema,
        local_schema=local_schema,
    )
    
    # Sign transaction
    signed_txn = txn.sign(private_key)
    
    print("✅ Transaction created and signed")
    print()
    print("🌐 Submitting to Algorand TestNet...")
    
    # Send transaction
    tx_id = algod_client.send_transaction(signed_txn)
    print(f"📤 Transaction ID: {tx_id}")
    
    # Wait for confirmation
    print("⏳ Waiting for confirmation...")
    
    try:
        confirmed_txn = wait_for_confirmation(algod_client, tx_id)
        app_id = confirmed_txn['application-index']
        
        print()
        print("=" * 60)
        print("🎉 SUCCESS! Smart Contract Deployed!")
        print("=" * 60)
        print(f"📱 Application ID: {app_id}")
        print(f"🔗 Transaction: {tx_id}")
        print(f"📍 Creator: {address}")
        print()
        print("👉 Next steps:")
        print(f"   1. Update APP_ID in src/services/algorandConsentService.js to: {app_id}")
        print(f"   2. Use this App ID in your frontend to interact with the contract")
        print()
        print(f"🔍 View on AlgoExplorer:")
        print(f"   https://testnet.algoexplorer.io/application/{app_id}")
        print("=" * 60)
        
        # Save app ID to file
        with open('deployed_app_id.txt', 'w') as f:
            f.write(str(app_id))
        print("✅ App ID saved to deployed_app_id.txt")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return

def wait_for_confirmation(client, txid):
    """Wait for transaction confirmation"""
    last_round = client.status().get('last-round')
    while True:
        txinfo = client.pending_transaction_info(txid)
        if txinfo.get('confirmed-round', 0) > 0:
            print(f"✅ Confirmed in round {txinfo.get('confirmed-round')}")
            return txinfo
        last_round += 1
        client.status_after_block(last_round)

if __name__ == "__main__":
    main()

