import axios from 'axios';
import type {
  ChatRequest,
  ChatMessageDto,
  PendingToolCallDto,
  ToolApprovalRequest,
  ToolInfo,
  UserRole,
} from './types';

const api = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatApi = {
  // Chat endpoints
  sendMessage: async (role: UserRole, request: ChatRequest): Promise<string> => {
    const endpoint = role === 'employee' ? '/chat/employee' : '/chat/client';
    const response = await api.post<string>(endpoint, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  // Get available tools
  getTools: async (role: UserRole): Promise<ToolInfo[]> => {
    const endpoint = role === 'employee' ? '/chat/tools/employee' : '/chat/tools/client';
    const response = await api.get<ToolInfo[]>(endpoint);
    return response.data;
  },

  // Get chat history
  getHistory: async (userId: string): Promise<ChatMessageDto[]> => {
    const response = await api.get<ChatMessageDto[]>(`/chat/history/${userId}`);
    return response.data;
  },

  // Pending approvals
  getPendingApprovals: async (userId: string): Promise<PendingToolCallDto[]> => {
    const response = await api.get<PendingToolCallDto[]>('/chat/pending-approvals', {
      params: { userId },
    });
    return response.data;
  },

  // Approve/reject tool
  approveTool: async (userId: string, request: ToolApprovalRequest): Promise<string> => {
    const response = await api.post<string>('/chat/approve-tool', request, {
      params: { userId },
    });
    return response.data;
  },

  // Embeddings
  reindexEmbeddings: async (): Promise<{ status: string; message: string; stats?: any }> => {
    const response = await api.post('/api/embeddings/reindex');
    return response.data;
  },

  // Chat history embeddings
  indexConversation: async (conversationId: string): Promise<any> => {
    const response = await api.post(`/api/chat-history-embeddings/index/${conversationId}`);
    return response.data;
  },

  indexAllConversations: async (): Promise<any> => {
    const response = await api.post('/api/chat-history-embeddings/index-all');
    return response.data;
  },

  deleteConversationEmbeddings: async (conversationId: string): Promise<any> => {
    const response = await api.delete(`/api/chat-history-embeddings/${conversationId}`);
    return response.data;
  },
};
