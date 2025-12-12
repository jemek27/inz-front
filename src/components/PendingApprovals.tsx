import React from 'react';
import { Check, X, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import type { PendingToolCallDto } from '../types';

interface PendingApprovalsProps {
  approvals: PendingToolCallDto[];
  onApprove: (callId: string) => void;
  onReject: (callId: string) => void;
}

export const PendingApprovals: React.FC<PendingApprovalsProps> = ({
  approvals,
  onApprove,
  onReject,
}) => {
  if (approvals.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <Clock size={48} className="mx-auto mb-2 opacity-50" />
        <p>Brak oczekujących zatwierdzeń</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {approvals.map((approval) => (
        <div
          key={approval.id}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                {approval.toolName}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {approval.toolDescription}
              </p>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
              {format(new Date(approval.createdAt), 'HH:mm', { locale: pl })}
            </span>
          </div>

          {approval.arguments && (
            <div className="mb-3 p-2 bg-gray-50 dark:bg-gray-900 rounded text-xs font-mono text-gray-700 dark:text-gray-300 overflow-x-auto">
              {approval.arguments}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => onApprove(approval.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Check size={16} />
              Zatwierdź
            </button>
            <button
              onClick={() => onReject(approval.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <X size={16} />
              Odrzuć
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
