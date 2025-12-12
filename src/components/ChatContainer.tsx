import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { Loader2 } from 'lucide-react';
import type { ChatMessageDto } from '../types';

interface ChatContainerProps {
  messages: ChatMessageDto[];
  isLoading?: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isLoading = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-center p-8">
          <div>
            <p className="text-lg mb-2">👋 Witaj!</p>
            <p className="text-sm">Zacznij konwersację, wpisując wiadomość poniżej.</p>
          </div>
        </div>
      ) : (
        <div>
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              dateTime={message.dateTime}
            />
          ))}
          {isLoading && (
            <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <Loader2 size={18} className="animate-spin text-gray-700 dark:text-gray-300" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">Asystent</span>
                <div className="mt-1 flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};
