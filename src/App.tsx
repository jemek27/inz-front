import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';
import { PendingApprovals } from './components/PendingApprovals';
import { EmbeddingsManager } from './components/EmbeddingsManager';
import { HistoryViewer } from './components/HistoryViewer';
import { ApprovalModal } from './components/ApprovalModal';
import { chatApi } from './api';
import type { ChatMessageDto, UserRole, HistoryMode, PendingToolCallDto } from './types';

type View = 'chat' | 'history' | 'approvals' | 'embeddings';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('chat');
  const [role, setRole] = useState<UserRole>('employee');
  const [historyMode, setHistoryMode] = useState<HistoryMode>('STANDARD');
  const [messages, setMessages] = useState<ChatMessageDto[]>([]);
  const [historyMessages, setHistoryMessages] = useState<ChatMessageDto[]>([]);
  const [pendingApprovals, setPendingApprovals] = useState<PendingToolCallDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [userId, setUserId] = useState(() => {
    const saved = localStorage.getItem('userId');
    return saved || `user-${role}`;
  });
  const [currentApproval, setCurrentApproval] = useState<PendingToolCallDto | null>(null);

  // Save userId to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userId', userId);
  }, [userId]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Load chat history on mount and when role or userId changes
  useEffect(() => {
    console.log('🔄 UserId changed to:', userId);
    const loadData = async () => {
      try {
        const history = await chatApi.getHistory(userId);
        setHistoryMessages(history);
        setMessages(history);
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }

      try {
        const approvals = await chatApi.getPendingApprovals(userId);
        console.log('✅ Initial load - approvals:', approvals.length);
        setPendingApprovals(approvals);
      } catch (error) {
        console.error('Failed to load pending approvals:', error);
      }
    };

    loadData();
  }, [userId]); // Używamy userId bezpośrednio

  // Poll for pending approvals every 10 seconds
  useEffect(() => {
    console.log('⏰ Setting up polling for userId:', userId);
    const interval = setInterval(async () => {
      console.log('⏰ Polling approvals...');
      try {
        const approvals = await chatApi.getPendingApprovals(userId);
        console.log('⏰ Poll result:', approvals.length, 'approvals');
        setPendingApprovals(approvals);
      } catch (error) {
        console.error('Failed to load pending approvals:', error);
      }
    }, 10000);
    return () => {
      console.log('🛑 Clearing polling interval');
      clearInterval(interval);
    };
  }, [userId]); // Zmieniono z [role] na [userId]

  // Show modal automatically when new approval appears
  useEffect(() => {
    console.log('🔔 Pending approvals changed:', pendingApprovals.length, 'approvals');
    console.log('🔔 Current approval:', currentApproval ? currentApproval.id : 'none');
    
    if (pendingApprovals.length > 0 && !currentApproval) {
      console.log('✅ Showing modal for approval:', pendingApprovals[0].toolName);
      setCurrentApproval(pendingApprovals[0]);
    }
  }, [pendingApprovals, currentApproval]);

  const loadChatHistory = async () => {
    try {
      const history = await chatApi.getHistory(userId);
      setHistoryMessages(history);
      setMessages(history);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const loadPendingApprovals = async () => {
    console.log('📡 Loading pending approvals for userId:', userId);
    try {
      const approvals = await chatApi.getPendingApprovals(userId);
      console.log('✅ Loaded approvals:', approvals.length, 'approvals');
      if (approvals.length > 0) {
        console.log('📋 Approvals:', approvals.map(a => ({ id: a.id, tool: a.toolName })));
      }
      setPendingApprovals(approvals);
    } catch (error) {
      console.error('❌ Failed to load pending approvals:', error);
    }
  };

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessageDto = {
      role: 'USER',
      content: message,
      dateTime: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatApi.sendMessage(role, {
        userId,
        message,
        historyMode,
      });

      // Czyszczenie odpowiedzi z "USER:", "ASSISTANT:", "Asysten:" itp.
      let cleanedResponse = response;
      cleanedResponse = cleanedResponse.replace(/^(USER|ASSISTANT|Asysten):\s*/gi, '');
      // Usuń także z środka tekstu jeśli występują na początku linii
      cleanedResponse = cleanedResponse.replace(/\n(USER|ASSISTANT|Asysten):\s*/gi, '\n');

      const assistantMessage: ChatMessageDto = {
        role: 'ASSISTANT',
        content: cleanedResponse.trim(),
        dateTime: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Reload history and pending approvals after message
      setTimeout(() => {
        loadChatHistory();
        loadPendingApprovals();
      }, 1000);
    } catch (error: any) {
      console.error('Failed to send message:', error);
      const errorMessage: ChatMessageDto = {
        role: 'ASSISTANT',
        content: `❌ Błąd: ${error.response?.data?.message || error.message || 'Nie udało się wysłać wiadomości'}`,
        dateTime: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (callId: string) => {
    try {
      await chatApi.approveTool(userId, { callId, approved: true });
      await loadPendingApprovals();
      await loadChatHistory();
    } catch (error) {
      console.error('Failed to approve tool:', error);
    }
  };

  const handleReject = async (callId: string) => {
    try {
      await chatApi.approveTool(userId, { callId, approved: false });
      await loadPendingApprovals();
    } catch (error) {
      console.error('Failed to reject tool:', error);
    }
  };

  const handleApproveFromModal = async () => {
    if (currentApproval) {
      await handleApprove(currentApproval.id);
      setCurrentApproval(null);
    }
  };

  const handleRejectFromModal = async () => {
    if (currentApproval) {
      await handleReject(currentApproval.id);
      setCurrentApproval(null);
    }
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setMessages([]);
    setCurrentView('chat');
  };

  const handleShowHistory = () => {
    setCurrentView('history');
    loadChatHistory();
  };

  const renderContent = () => {
    switch (currentView) {
      case 'chat':
        return (
          <div className="flex flex-col h-full">
            <ChatContainer messages={messages} isLoading={isLoading} />
            <ChatInput
              onSend={handleSendMessage}
              disabled={isLoading}
              placeholder="Wpisz wiadomość..."
            />
          </div>
        );

      case 'history':
        return (
          <div className="flex-1 overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Historia czatu
            </h2>
            <HistoryViewer messages={historyMessages} />
          </div>
        );

      case 'approvals':
        return (
          <div className="flex-1 overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Oczekujące zatwierdzenia
            </h2>
            <PendingApprovals
              approvals={pendingApprovals}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </div>
        );

      case 'embeddings':
        return (
          <div className="flex-1 overflow-y-auto p-6">
            <EmbeddingsManager
              onReindex={() => chatApi.reindexEmbeddings()}
              onIndexConversation={(id) => chatApi.indexConversation(id)}
              onIndexAll={() => chatApi.indexAllConversations()}
              onDeleteConversation={(id) => chatApi.deleteConversationEmbeddings(id)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        role={role}
        onRoleChange={handleRoleChange}
        historyMode={historyMode}
        onHistoryModeChange={setHistoryMode}
        onShowHistory={handleShowHistory}
        onShowApprovals={() => setCurrentView('approvals')}
        onShowEmbeddings={() => setCurrentView('embeddings')}
        pendingCount={pendingApprovals.length}
        darkMode={darkMode}
        onDarkModeToggle={() => setDarkMode(!darkMode)}
        userId={userId}
        onUserIdChange={setUserId}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {currentView === 'chat' && 'Czat'}
              {currentView === 'history' && 'Historia'}
              {currentView === 'approvals' && 'Zatwierdzenia'}
              {currentView === 'embeddings' && 'Embeddings'}
            </h2>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>

      {/* Approval Modal */}
      <ApprovalModal
        approval={currentApproval}
        onApprove={handleApproveFromModal}
        onReject={handleRejectFromModal}
        onClose={() => setCurrentApproval(null)}
      />
    </div>
  );
}

export default App;
