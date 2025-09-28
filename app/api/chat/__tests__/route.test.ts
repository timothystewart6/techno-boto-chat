/**
 * @jest-environment node
 */

import OpenAI from 'openai';
import { handleChatCompletion } from '../chat-handler';
import { LLMClient } from '@/lib/llm-client';

// Mock OpenAI
jest.mock('openai');

// Mock the LLM client
jest.mock('@/lib/llm-client', () => ({
  LLMClient: jest.fn(),
}));

// Mock console.log to avoid test noise
jest.spyOn(console, 'log').mockImplementation();
jest.spyOn(console, 'error').mockImplementation();

describe('/api/chat logic', () => {
  const mockOpenAI = {
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  };

  const mockLLMClient = {
    getOpenAIClient: () => mockOpenAI,
    getConfig: () => ({
      modelName: 'test-model',
      apiKey: 'test-key',
      baseURL: 'http://localhost:8000/v1',
    }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (LLMClient as jest.MockedClass<typeof LLMClient>).mockImplementation(
      () => mockLLMClient as any,
    );
  });

  describe('handleChatCompletion', () => {
    it('successfully handles chat completion request', async () => {
      const mockCompletion = {
        id: 'chatcmpl-123',
        object: 'chat.completion',
        created: 1677652288,
        model: 'test-model',
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: 'Hello! How can I help you?',
            },
            finish_reason: 'stop',
          },
        ],
      };

      mockOpenAI.chat.completions.create.mockResolvedValue(mockCompletion);

      const result = await handleChatCompletion({
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 100,
        temperature: 0.8,
      });

      expect(result.data).toEqual(mockCompletion);
      expect(result.error).toBeUndefined();
      expect(mockOpenAI.chat.completions.create).toHaveBeenCalledWith({
        model: 'test-model',
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 100,
        temperature: 0.8,
        stream: false,
      });
    });

    it('uses default values for optional parameters', async () => {
      const mockCompletion = {
        id: 'chatcmpl-456',
        object: 'chat.completion',
        created: 1677652288,
        model: 'test-model',
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: 'Default response',
            },
            finish_reason: 'stop',
          },
        ],
      };

      mockOpenAI.chat.completions.create.mockResolvedValue(mockCompletion);

      const result = await handleChatCompletion({
        messages: [{ role: 'user', content: 'Hello' }],
      });

      expect(result.data).toEqual(mockCompletion);
      expect(mockOpenAI.chat.completions.create).toHaveBeenCalledWith({
        model: 'test-model',
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 150, // default
        temperature: 0.7, // default
        stream: false,
      });
    });

    it('handles OpenAI API errors', async () => {
      const apiError = new Error('Rate limit exceeded');
      (apiError as any).status = 429;

      // Make it an instance of OpenAI.APIError by setting the constructor
      Object.defineProperty(apiError, 'constructor', {
        value: OpenAI.APIError,
      });

      // Also set the prototype for instanceof check
      Object.setPrototypeOf(apiError, OpenAI.APIError.prototype);

      mockOpenAI.chat.completions.create.mockRejectedValue(apiError);

      const result = await handleChatCompletion({
        messages: [{ role: 'user', content: 'Hello' }],
      });

      expect(result.error).toBe('API request failed: Rate limit exceeded');
      expect(result.status).toBe(429);
      expect(result.data).toBeUndefined();
    });

    it('handles server configuration errors', async () => {
      const configError = new Error('Missing LLM_API_BASE_URL');
      mockOpenAI.chat.completions.create.mockRejectedValue(configError);

      const result = await handleChatCompletion({
        messages: [{ role: 'user', content: 'Hello' }],
      });

      expect(result.error).toBe(
        'Server configuration error: Missing LLM_API_BASE_URL',
      );
      expect(result.status).toBe(500);
      expect(result.data).toBeUndefined();
    });

    it('handles connection errors', async () => {
      const connectionError = new Error('fetch failed: connection refused');
      mockOpenAI.chat.completions.create.mockRejectedValue(connectionError);

      const result = await handleChatCompletion({
        messages: [{ role: 'user', content: 'Hello' }],
      });

      expect(result.error).toBe(
        'Cannot connect to AI model. Please check your Docker Model Runner configuration.',
      );
      expect(result.status).toBe(503);
      expect(result.data).toBeUndefined();
    });

    it('handles generic errors', async () => {
      const genericError = new Error('Something went wrong');
      mockOpenAI.chat.completions.create.mockRejectedValue(genericError);

      const result = await handleChatCompletion({
        messages: [{ role: 'user', content: 'Hello' }],
      });

      expect(result.error).toBe('Internal server error');
      expect(result.status).toBe(500);
      expect(result.data).toBeUndefined();
    });
  });
});
