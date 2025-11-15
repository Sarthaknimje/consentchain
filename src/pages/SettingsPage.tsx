import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../context/WalletContext';
import {
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  KeyIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const SettingsPage: React.FC = () => {
  const { address, isConnected } = useWallet();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showActivity: false,
    allowAnalytics: true,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('settings', JSON.stringify({ notifications, privacy }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Settings</h1>
            <p className="text-gray-400">Please connect your wallet to access settings.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account preferences and settings</p>
        </motion.div>

        {/* Success Message */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-2"
          >
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
            <span className="text-green-400">Settings saved successfully!</span>
          </motion.div>
        )}

        <div className="space-y-6">
          {/* Account Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <UserCircleIcon className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Account</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Wallet Address</label>
                <div className="mt-1 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                  <code className="text-sm text-gray-300 break-all">{address}</code>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Network</label>
                <div className="mt-1 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                  <span className="text-sm text-gray-300">Algorand TestNet</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <BellIcon className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-300">Email Notifications</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) =>
                      setNotifications({ ...notifications, email: e.target.checked })
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-11 h-6 rounded-full transition-colors ${
                      notifications.email ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                        notifications.email ? 'translate-x-6' : 'translate-x-0.5'
                      } translate-y-0.5`}
                    />
                  </div>
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-300">Push Notifications</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) =>
                      setNotifications({ ...notifications, push: e.target.checked })
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-11 h-6 rounded-full transition-colors ${
                      notifications.push ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                        notifications.push ? 'translate-x-6' : 'translate-x-0.5'
                      } translate-y-0.5`}
                    />
                  </div>
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-300">SMS Notifications</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={(e) =>
                      setNotifications({ ...notifications, sms: e.target.checked })
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-11 h-6 rounded-full transition-colors ${
                      notifications.sms ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                        notifications.sms ? 'translate-x-6' : 'translate-x-0.5'
                      } translate-y-0.5`}
                    />
                  </div>
                </div>
              </label>
            </div>
          </motion.div>

          {/* Privacy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheckIcon className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Privacy</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-300">Show Profile</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={privacy.showProfile}
                    onChange={(e) =>
                      setPrivacy({ ...privacy, showProfile: e.target.checked })
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-11 h-6 rounded-full transition-colors ${
                      privacy.showProfile ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                        privacy.showProfile ? 'translate-x-6' : 'translate-x-0.5'
                      } translate-y-0.5`}
                    />
                  </div>
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-300">Show Activity</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={privacy.showActivity}
                    onChange={(e) =>
                      setPrivacy({ ...privacy, showActivity: e.target.checked })
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-11 h-6 rounded-full transition-colors ${
                      privacy.showActivity ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                        privacy.showActivity ? 'translate-x-6' : 'translate-x-0.5'
                      } translate-y-0.5`}
                    />
                  </div>
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-300">Allow Analytics</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={privacy.allowAnalytics}
                    onChange={(e) =>
                      setPrivacy({ ...privacy, allowAnalytics: e.target.checked })
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-11 h-6 rounded-full transition-colors ${
                      privacy.allowAnalytics ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                        privacy.allowAnalytics ? 'translate-x-6' : 'translate-x-0.5'
                      } translate-y-0.5`}
                    />
                  </div>
                </div>
              </label>
            </div>
          </motion.div>

          {/* Smart Contract Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <Cog6ToothIcon className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Smart Contract</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">Application ID</label>
                <div className="mt-1 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                  <code className="text-sm text-blue-400">749685949</code>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Network</label>
                <div className="mt-1 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                  <span className="text-sm text-gray-300">Algorand TestNet</span>
                </div>
              </div>
              <a
                href="https://testnet.algoexplorer.io/application/749685949"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View on AlgoExplorer →
              </a>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Save Settings
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
