import OpenAI from 'openai';
import { ChatOptions } from './types';

/**
 * Server-side LLM client for direct communication with Docker Model Runner.
 * Only for use in Node.js/server environments.
 */
export class LLMClient {
  private client: OpenAI;
  private modelName: string;

  constructor(modelName?: string) {
    const apiBaseUrl = process.env.LLM_API_BASE_URL;
    const apiKey = process.env.OPENAI_API_KEY || '';

    if (!apiBaseUrl) {
      throw new Error('Missing LLM_API_BASE_URL environment variable');
    }

    this.modelName = modelName || process.env.MODEL_NAME || '';

    if (!this.modelName) {
      throw new Error(
        'Missing model name. Please set MODEL_NAME or provide via constructor.',
      );
    }

    this.client = new OpenAI({
      baseURL: apiBaseUrl,
      apiKey: apiKey,
    });
  }

  async generateResponse(
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    options: ChatOptions = {},
  ): Promise<string> {
    const { maxTokens = 150, temperature = 0.7 } = options;

    try {
      const completion = await this.client.chat.completions.create({
        model: this.modelName,
        messages,
        max_tokens: maxTokens,
        temperature,
        stream: false,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response received from the model');
      }

      return content.trim();
    } catch (error) {
      // Handle OpenAI SDK specific errors
      if (error instanceof OpenAI.APIError) {
        throw new Error(
          `API request failed with status ${error.status}: ${error.message}`,
        );
      }

      throw error;
    }
  }

  async generateChatResponse(
    userMessage: string,
    systemPrompt: string = 'You are a helpful AI assistant. Provide concise, friendly responses.',
    options: ChatOptions = {},
  ): Promise<string> {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ];

    return this.generateResponse(messages, options);
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.generateChatResponse('Hello', 'Reply with just "OK"', {
        maxTokens: 10,
      });
      return true;
    } catch (error) {
      console.error('LLM client connection test failed:', error);
      return false;
    }
  }

  getConfig() {
    return {
      baseURL: process.env.LLM_API_BASE_URL,
      modelName: this.modelName,
      hasApiKey: !!process.env.OPENAI_API_KEY,
      environment: 'server',
    };
  }

  // Direct access to OpenAI client for advanced usage
  getOpenAIClient(): OpenAI {
    return this.client;
  }
}
