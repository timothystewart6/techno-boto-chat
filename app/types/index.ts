export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  reasoning?: string; // Optional reasoning/thinking process
  isReasoningVisible?: boolean; // Whether to show/hide reasoning
}

export interface Notification {
  id: number;
  message: string;
  type: 'error' | 'success' | 'info';
  timestamp: Date;
  duration?: number; // Optional auto-removal duration in milliseconds
}
