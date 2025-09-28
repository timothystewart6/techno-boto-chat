import { TechnoBotoChatClient } from '../techno-boto-chat-client';

// Mock fetch globally
global.fetch = jest.fn();

describe('TechnoBotoChatClient', () => {
  let client: TechnoBotoChatClient;

  beforeEach(() => {
    client = new TechnoBotoChatClient();
    jest.clearAllMocks();
  });

  describe('generateChatResponse', () => {
    it('calls the chat API with correct parameters', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: 'Test response',
              },
            },
          ],
        }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await client.generateChatResponse('Hello');

      expect(global.fetch).toHaveBeenCalledWith('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('"messages"'),
      });
      expect(result).toBe('Test response');
    });

    it('handles API errors gracefully', async () => {
      const mockResponse = {
        ok: false,
        text: jest.fn().mockResolvedValue('API Error'),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(client.generateChatResponse('Hello')).rejects.toThrow();
    });

    it('uses provided system prompt', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: 'Test response',
              },
            },
          ],
        }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await client.generateChatResponse('Hello', 'Custom system prompt');

      const requestBody = JSON.parse(
        (global.fetch as jest.Mock).mock.calls[0][1].body,
      );
      expect(requestBody.messages[0].content).toBe('Custom system prompt');
    });

    it('applies custom options', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: 'Test response',
              },
            },
          ],
        }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await client.generateChatResponse('Hello', undefined, {
        maxTokens: 500,
        temperature: 0.5,
      });

      const requestBody = JSON.parse(
        (global.fetch as jest.Mock).mock.calls[0][1].body,
      );
      expect(requestBody.max_tokens).toBe(500);
      expect(requestBody.temperature).toBe(0.5);
    });
  });

  describe('generateChatResponseWithReasoning', () => {
    it('returns both content and reasoning', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: 'Test response',
                reasoning_content: 'Test reasoning',
              },
            },
          ],
        }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await client.generateChatResponseWithReasoning('Hello');

      expect(result.content).toBe('Test response');
      expect(result.reasoning).toBe('Test reasoning');
    });

    it('handles missing reasoning field', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: 'Test response',
              },
            },
          ],
        }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await client.generateChatResponseWithReasoning('Hello');

      expect(result.content).toBe('Test response');
      expect(result.reasoning).toBeUndefined();
    });
  });

  describe('getModelInfo', () => {
    it('fetches model information', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          modelName: 'test-model',
          endpoint: 'test-endpoint',
          environment: 'browser',
          enableReasoning: false,
        }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await client.getModelInfo();

      expect(global.fetch).toHaveBeenCalledWith('/api/model-info');
      expect(result.modelName).toBe('test-model');
      expect(result.endpoint).toBe('test-endpoint');
      expect(result.environment).toBe('browser');
      expect(result.enableReasoning).toBe(false);
    });

    it('handles model info API errors gracefully', async () => {
      // Suppress expected console.error during this test
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const mockResponse = {
        ok: false,
        text: jest.fn().mockResolvedValue('Model info error'),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      // Should return fallback values instead of throwing
      const result = await client.getModelInfo();
      expect(result.modelName).toBe('Unknown');
      expect(result.endpoint).toBe('Not configured');
      expect(result.environment).toBe('browser');
      expect(result.enableReasoning).toBe(false);

      // Verify the error was logged
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
