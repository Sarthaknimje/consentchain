import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ConsentBulkActionsProps {
  selected: string[];
  onApprove: () => void;
  onRevoke: () => void;
}

const ConsentBulkActions: React.FC<ConsentBulkActionsProps> = ({ selected, onApprove, onRevoke }) => {
  if (selected.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm text-gray-600">{selected.length} selected</span>
      <button
        onClick={onApprove}
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
      >
        <CheckIcon className="h-4 w-4 mr-1" />
        Approve
      </button>
      <button
        onClick={onRevoke}
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
      >
        <XMarkIcon className="h-4 w-4 mr-1" />
        Revoke
      </button>
    </div>
  );
};

export default ConsentBulkActions;
