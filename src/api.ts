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

  // Get chat history by conversation
  getHistory: async (userId: string, conversationId: number): Promise<ChatMessageDto[]> => {
    const response = await api.get<ChatMessageDto[]>(`/chat/history/${userId}/${conversationId}`);
    return response.data;
  },

  // Get all conversation IDs for user
  getConversationIds: async (userId: string): Promise<number[]> => {
    const response = await api.get<number[]>(`/chat/conversation-ids/${userId}`);
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

  // Chat history embeddings - Index all conversations for a user
  indexUserEmbeddings: async (userId: string): Promise<any> => {
    const response = await api.post(`/api/chat-history-embeddings/index/user/${userId}`);
    return response.data;
  },

  // Index all users' chat history
  indexAllConversations: async (): Promise<any> => {
    const response = await api.post('/api/chat-history-embeddings/index-all');
    return response.data;
  },

  // Delete all embeddings for a user
  deleteUserEmbeddings: async (userId: string): Promise<any> => {
    const response = await api.delete(`/api/chat-history-embeddings/user/${userId}`);
    return response.data;
  },
};
