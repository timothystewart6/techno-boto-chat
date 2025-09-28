/**
 * @jest-environment node
 */

import { getModelInfo } from '../model-info-handler';

// Mock environment variables
const originalEnv = process.env;

// Mock console methods to avoid noise in tests
const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

describe('/api/model-info logic', () => {
  afterEach(() => {
    // Restore original environment
    process.env = { ...originalEnv };
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe('getModelInfo', () => {
    it('returns model info with all environment variables set', () => {
      process.env.MODEL_NAME = 'gpt-4';
      process.env.LLM_API_BASE_URL = 'http://localhost:8000/v1';
      process.env.ENABLE_REASONING = 'true';

      const result = getModelInfo();

      expect(result.data).toEqual({
        modelName: 'gpt-4',
        endpoint: 'http://localhost:8000/v1',
        environment: 'server',
        enableReasoning: true,
      });
      expect(result.error).toBeUndefined();
    });

    it('returns default values when environment variables are not set', () => {
      delete process.env.MODEL_NAME;
      delete process.env.LLM_API_BASE_URL;
      delete process.env.ENABLE_REASONING;

      const result = getModelInfo();

      expect(result.data).toEqual({
        modelName: 'Not configured',
        endpoint: 'Not configured',
        environment: 'server',
        enableReasoning: false,
      });
      expect(result.error).toBeUndefined();
    });

    it('handles ENABLE_REASONING as string "false"', () => {
      process.env.MODEL_NAME = 'test-model';
      process.env.LLM_API_BASE_URL = 'http://test:8000';
      process.env.ENABLE_REASONING = 'false';

      const result = getModelInfo();

      expect(result.data?.enableReasoning).toBe(false);
    });

    it('handles ENABLE_REASONING with non-boolean values', () => {
      process.env.ENABLE_REASONING = 'not-a-boolean';

      const result = getModelInfo();

      expect(result.data?.enableReasoning).toBe(false);
    });

    it('returns consistent structure with partial environment variables', () => {
      process.env.MODEL_NAME = 'partial-model';
      delete process.env.LLM_API_BASE_URL;
      delete process.env.ENABLE_REASONING;

      const result = getModelInfo();

      expect(result.data).toEqual({
        modelName: 'partial-model',
        endpoint: 'Not configured',
        environment: 'server',
        enableReasoning: false,
      });
    });

    it('always returns environment as "server"', () => {
      const result = getModelInfo();

      expect(result.data?.environment).toBe('server');
    });

    it('logs environment information during execution', () => {
      process.env.MODEL_NAME = 'logging-test';
      process.env.LLM_API_BASE_URL = 'http://logging:8000';

      getModelInfo();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Model info API - Environment variables:',
        expect.objectContaining({
          MODEL_NAME: 'logging-test',
          LLM_API_BASE_URL: 'http://logging:8000',
        }),
      );
    });
  });
});
