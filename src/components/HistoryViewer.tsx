import React from 'react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Clock, User, Bot } from 'lucide-react';
import type { ChatMessageDto } from '../types';

interface HistoryViewerProps {
  messages: ChatMessageDto[];
}

export const HistoryViewer: React.FC<HistoryViewerProps> = ({ messages }) => {
  // Funkcja do określenia czy wiadomość jest od użytkownika
  const isUserMessage = (msg: ChatMessageDto) => {
    return msg.role === 'USER';
  };

  if (messages.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <Clock size={48} className="mx-auto mb-2 opacity-50" />
        <p>Brak historii czatu</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg, index) => {
        const isUser = isUserMessage(msg);
        return (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              isUser
                ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
                {isUser ? <User size={16} /> : <Bot size={16} />}
                {isUser ? 'Ty' : 'Asystent'}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {format(new Date(msg.dateTime), 'dd MMM yyyy, HH:mm', { locale: pl })}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {msg.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};
