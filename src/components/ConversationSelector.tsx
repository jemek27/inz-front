import React from 'react';
import { Plus, MessageSquare } from 'lucide-react';

interface ConversationSelectorProps {
  conversations: number[];
  currentConversation: number;
  onConversationChange: (conversationId: number) => void;
  onNewConversation: () => void;
  darkMode: boolean;
}

const ConversationSelector: React.FC<ConversationSelectorProps> = ({
  conversations,
  currentConversation,
  onConversationChange,
  onNewConversation,
  darkMode,
}) => {
  return (
    <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Konwersacje
        </h3>
        <button
          onClick={onNewConversation}
          className={`p-1.5 rounded-lg transition-colors ${
            darkMode
              ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
          title="Nowa konwersacja"
        >
          <Plus size={18} />
        </button>
      </div>
      
      <div className="space-y-1 max-h-40 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className={`text-xs text-center py-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Brak konwersacji
          </div>
        ) : (
          conversations.map((convId) => (
            <button
              key={convId}
              onClick={() => onConversationChange(convId)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                currentConversation === convId
                  ? darkMode
                    ? 'bg-primary-600 text-white'
                    : 'bg-primary-500 text-white'
                  : darkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <MessageSquare size={16} />
              <span>Konwersacja #{convId}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationSelector;
