import React from 'react';
import { X, Check, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import type { PendingToolCallDto } from '../types';

interface ApprovalModalProps {
  approval: PendingToolCallDto | null;
  onApprove: () => void;
  onReject: () => void;
  onClose: () => void;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({
  approval,
  onApprove,
  onReject,
  onClose,
}) => {
  if (!approval) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <AlertTriangle className="text-yellow-600 dark:text-yellow-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Zatwierdzenie narzędzia
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Asystent prosi o pozwolenie na użycie narzędzia
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Tool Info */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {approval.toolName}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(approval.createdAt), 'HH:mm:ss', { locale: pl })}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {approval.toolDescription}
            </p>
          </div>

          {/* Arguments */}
          {approval.arguments && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Parametry wywołania:
              </h4>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words font-mono">
                  {JSON.stringify(JSON.parse(approval.arguments), null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              <strong>⚠️ Uwaga:</strong> Sprawdź dokładnie parametry przed zatwierdzeniem.
              To działanie może mieć wpływ na system lub dane użytkowników.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Anuluj
          </button>
          <button
            onClick={() => {
              onReject();
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            <X size={16} />
            Odrzuć
          </button>
          <button
            onClick={() => {
              onApprove();
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
          >
            <Check size={16} />
            Zatwierdź
          </button>
        </div>
      </div>
    </div>
  );
};
