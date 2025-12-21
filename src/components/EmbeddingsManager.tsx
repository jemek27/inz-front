import React, { useState } from 'react';
import { RefreshCw, Database, Trash2, CheckCircle, AlertCircle, User } from 'lucide-react';

interface EmbeddingsManagerProps {
  userId: string;
  onReindex: () => Promise<any>;
  onIndexUser: (userId: string) => Promise<any>;
  onIndexAll: () => Promise<any>;
  onDeleteUserEmbeddings: (userId: string) => Promise<any>;
}

export const EmbeddingsManager: React.FC<EmbeddingsManagerProps> = ({
  userId,
  onReindex,
  onIndexUser,
  onIndexAll,
  onDeleteUserEmbeddings,
}) => {
  const [targetUserId, setTargetUserId] = useState(userId);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  const handleAction = async (action: () => Promise<any>, successMessage: string) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await action();
      let message = successMessage;
      if (response) {
        if (response.message) {
          message += `: ${response.message}`;
        }
        if (response.indexed_count !== undefined) {
          message += ` (${response.indexed_count} wiadomości)`;
        }
        if (response.total_indexed !== undefined) {
          message += ` (łącznie: ${response.total_indexed})`;
        }
      }
      setResult({ type: 'success', message });
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

        {/* Knowledge Base - Reindex all data */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Database size={18} />
                Baza wiedzy restauracji
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Reindeksuj dane restauracji (menu, składniki, alergeny)
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
          <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
            <User size={18} />
            Embeddings historii czatu
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Indeksowanie historii czatu umożliwia wyszukiwanie semantyczne w poprzednich konwersacjach (tryby RAG_CONVERSATION i RAG_FULL)
          </p>

          {/* Index all users */}
          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Indeksuj historię wszystkich użytkowników
            </p>
            <button
              onClick={() => handleAction(onIndexAll, 'Wszystkie konwersacje zostały zaindeksowane')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Database size={16} />
              Indeksuj wszystkich użytkowników
            </button>
          </div>

          {/* Index specific user */}
          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Indeksuj konwersacje konkretnego użytkownika
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                placeholder="ID użytkownika"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
              <button
                onClick={() =>
                  handleAction(
                    () => onIndexUser(targetUserId),
                    `Konwersacje użytkownika ${targetUserId} zostały zaindeksowane`
                  )
                }
                disabled={loading || !targetUserId}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Database size={16} />
                Indeksuj
              </button>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Aktualny użytkownik: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{userId}</code>
            </p>
          </div>

          {/* Delete user embeddings */}
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Usuń wszystkie embeddings użytkownika
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                placeholder="ID użytkownika"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
              <button
                onClick={() =>
                  handleAction(
                    () => onDeleteUserEmbeddings(targetUserId),
                    `Embeddings użytkownika ${targetUserId} zostały usunięte`
                  )
                }
                disabled={loading || !targetUserId}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Trash2 size={16} />
                Usuń
              </button>
            </div>
            <p className="text-xs text-red-400 dark:text-red-500 mt-1">
              ⚠️ Operacja nieodwracalna - usunie wszystkie embeddings dla tego użytkownika
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
