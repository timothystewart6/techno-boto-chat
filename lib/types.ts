export interface ChatOptions {
  maxTokens?: number;
  temperature?: number;
  includeReasoning?: boolean; // New option to request reasoning
}

export interface ChatResponse {
  content: string;
  reasoning?: string; // Optional reasoning content
}
