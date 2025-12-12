export enum HistoryMode {
  STANDARD = 'STANDARD',
  FULL = 'FULL',
  RAG = 'RAG'
}

export interface ChatRequest {
  userId: string;
  message: string;
  historyMode?: HistoryMode;
}

export interface ChatMessageDto {
  role: 'USER' | 'ASSISTANT';
  content: string;
  dateTime: string;
}

export interface PendingToolCallDto {
  id: string;
  toolName: string;
  toolDescription: string;
  arguments: string;
  createdAt: string;
}

export interface ToolApprovalRequest {
  callId: string;
  approved: boolean;
}

export interface ToolInfo {
  name: string;
  description: string;
  inputSchema: string;
}

export type UserRole = 'employee' | 'client';
