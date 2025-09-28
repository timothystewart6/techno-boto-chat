import { ChatOptions, ChatResponse } from './types';

/**
 * techno-boto-chat client for browser environments.
 * Uses Next.js API routes to communicate with the backend.
 */
export class TechnoBotoChatClient {
  private modelName?: string;
  private modelInfo: {
    modelName: string;
    endpoint: string;
    environment: string;
    enableReasoning: boolean;
  } | null = null;

  constructor(modelName?: string) {
    this.modelName = modelName;
  }

  async getModelInfo(): Promise<{
    modelName: string;
    endpoint: string;
    environment: string;
    enableReasoning: boolean;
  }> {
    if (!this.modelInfo) {
      try {
        const response = await fetch('/api/model-info');
        if (!response.ok) {
          throw new Error(`Failed to fetch model info: ${response.statusText}`);
        }
        this.modelInfo = await response.json();
      } catch (error) {
        console.error('Error fetching model info:', error);
        this.modelInfo = {
          modelName: 'Unknown',
          endpoint: 'Not configured',
          environment: 'browser',
          enableReasoning: false,
        };
      }
    }
    return this.modelInfo!;
  }

  async generateChatResponse(
    userMessage: string,
    systemPrompt: string = process.env.NEXT_PUBLIC_SYSTEM_PROMPT_REGULAR ||
      'You are a helpful AI assistant. Provide concise, friendly responses.',
    options: ChatOptions = {},
  ): Promise<string> {
    const {
      maxTokens = parseInt(
        process.env.NEXT_PUBLIC_MAX_TOKENS_REGULAR || '1000',
      ),
      temperature = 0.7,
    } = options;

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Model is determined by server environment, not sent from client
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        max_tokens: maxTokens,
        temperature,
      }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: 'Unknown error' }));
      throw new Error(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    const completion = await response.json();
    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response received from the model');
    }

    return content.trim();
  }

  async generateChatResponseWithReasoning(
    userMessage: string,
    systemPrompt: string = process.env.NEXT_PUBLIC_SYSTEM_PROMPT_REASONING ||
      'You are a helpful AI assistant. Think through the problem step by step, then provide a clear, concise final answer. Your reasoning will be shown separately from your final response.',
    options: ChatOptions = {},
  ): Promise<ChatResponse> {
    const {
      maxTokens = parseInt(
        process.env.NEXT_PUBLIC_MAX_TOKENS_REASONING || '2000',
      ),
      temperature = 0.7,
    } = options;

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Model is determined by server environment, not sent from client
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        max_tokens: maxTokens,
        temperature,
      }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: 'Unknown error' }));
      throw new Error(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    const completion = await response.json();
    const content = completion.choices[0]?.message?.content;
    const reasoningContent = completion.choices[0]?.message?.reasoning_content;

    // Check for reasoning_content field first (OpenAI o1-style)
    if (reasoningContent) {
      // If content is empty but reasoning exists, extract a summary from reasoning
      if (!content || content.trim() === '') {
        // Try to extract the last sentence or conclusion from reasoning as the final answer
        const reasoningText = reasoningContent.trim();
        const sentences = reasoningText
          .split(/[.!?]+/)
          .filter((s: string) => s.trim().length > 0);
        const lastSentence = sentences[sentences.length - 1]?.trim();

        return {
          content:
            lastSentence ||
            "I've thought through your question - please see the reasoning section for details.",
          reasoning: reasoningText,
        };
      }

      return {
        content: content.trim(),
        reasoning: reasoningContent.trim(),
      };
    }

    if (!content) {
      throw new Error('No response received from the model');
    }

    // Parse thinking tags if present (fallback for other models)
    const thinkingRegex = /<thinking>([\s\S]*?)<\/thinking>/;
    const match = content.match(thinkingRegex);

    if (match) {
      const reasoning = match[1].trim();
      const finalAnswer = content.replace(thinkingRegex, '').trim();
      return {
        content: finalAnswer,
        reasoning: reasoning,
      };
    }

    // No reasoning found, return as regular content
    return {
      content: content.trim(),
    };
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.generateChatResponse('Hello', 'Reply with just "OK"', {
        maxTokens: 10,
      });
      return true;
    } catch (error) {
      console.error('techno-boto-chat connection test failed:', error);
      return false;
    }
  }
}
