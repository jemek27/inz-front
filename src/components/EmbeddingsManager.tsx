import React, { useState } from 'react';
import { RefreshCw, Database, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface EmbeddingsManagerProps {
  onReindex: () => Promise<any>;
  onIndexConversation: (conversationId: string) => Promise<any>;
  onIndexAll: () => Promise<any>;
  onDeleteConversation: (conversationId: string) => Promise<any>;
}

export const EmbeddingsManager: React.FC<EmbeddingsManagerProps> = ({
  onReindex,
  onIndexConversation,
  onIndexAll,
  onDeleteConversation,
}) => {
  const [conversationId, setConversationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  const handleAction = async (action: () => Promise<any>, successMessage: string) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await action();
      setResult({
        type: 'success',
        message: successMessage + (response.message ? `: ${response.message}` : ''),
      });
    } catch (error: any) {
      setResult({
        type: 'error',
        message: error.response?.data?.message || error.message || 'Wystąpił błąd',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Zarządzanie Embeddingami
        </h3>

        {/* Result message */}
        {result && (
          <div
            className={`mb-4 p-4 rounded-lg flex items-start gap-3 ${
              result.type === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
            }`}
          >
            {result.type === 'success' ? (
              <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
            )}
            <p className="text-sm">{result.message}</p>
          </div>
        )}

        {/* Reindex all data */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Database size={18} />
                Reindeksuj wszystkie dane
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Ponownie indeksuje wszystkie dane w systemie embeddings
              </p>
            </div>
            <button
              onClick={() => handleAction(onReindex, 'Reindeksacja zakończona')}
              disabled={loading}
              className="ml-4 flex items-center gap-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Reindeksuj
            </button>
          </div>
        </div>

        {/* Chat history embeddings */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3">
            Embeddings historii czatu
          </h4>

          {/* Index all conversations */}
          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Indeksuj wszystkie konwersacje
            </p>
            <button
              onClick={() => handleAction(onIndexAll, 'Wszystkie konwersacje zostały zaindeksowane')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Database size={16} />
              Indeksuj wszystkie
            </button>
          </div>

          {/* Index specific conversation */}
          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Indeksuj konkretną konwersację
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={conversationId}
                onChange={(e) => setConversationId(e.target.value)}
                placeholder="ID konwersacji"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
              <button
                onClick={() =>
                  handleAction(
                    () => onIndexConversation(conversationId),
                    'Konwersacja została zaindeksowana'
                  )
                }
                disabled={loading || !conversationId}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Database size={16} />
                Indeksuj
              </button>
            </div>
          </div>

          {/* Delete conversation embeddings */}
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Usuń embeddings konwersacji
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={conversationId}
                onChange={(e) => setConversationId(e.target.value)}
                placeholder="ID konwersacji"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
              <button
                onClick={() =>
                  handleAction(
                    () => onDeleteConversation(conversationId),
                    'Embeddings zostały usunięte'
                  )
                }
                disabled={loading || !conversationId}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Trash2 size={16} />
                Usuń
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
