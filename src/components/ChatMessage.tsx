import React from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Bot } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface ChatMessageProps {
  role: 'USER' | 'ASSISTANT';
  content: string;
  dateTime?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, dateTime }) => {
  const isUser = role === 'USER';

  // Jeśli content jest puste lub undefined, nie renderuj
  if (!content || content.trim() === '') {
    return null;
  }

  return (
    <div className={`flex gap-4 p-4 ${isUser ? 'bg-transparent' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
      <div className="flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser
              ? 'bg-primary-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            {isUser ? 'Ty' : 'Asystent'}
          </span>
          {dateTime && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {format(new Date(dateTime), 'HH:mm', { locale: pl })}
            </span>
          )}
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
