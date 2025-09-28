export interface ModelInfo {
  modelName: string;
  endpoint: string;
  environment: string;
  enableReasoning: boolean;
}

export interface ModelInfoResponse {
  data?: ModelInfo;
  error?: string;
  status?: number;
}

// Core business logic - easily testable
export function getModelInfo(): ModelInfoResponse {
  try {
    const modelName = process.env.MODEL_NAME || 'Not configured';
    const endpoint = process.env.LLM_API_BASE_URL || 'Not configured';
    const enableReasoning = process.env.ENABLE_REASONING === 'true';

    console.log('Model info API - Environment variables:', {
      MODEL_NAME: process.env.MODEL_NAME,
      LLM_API_BASE_URL: process.env.LLM_API_BASE_URL,
      ENABLE_REASONING: process.env.ENABLE_REASONING,
      NODE_ENV: process.env.NODE_ENV,
      allEnvKeys: Object.keys(process.env).filter(
        (key) =>
          key.includes('MODEL') ||
          key.includes('LLM') ||
          key.includes('REASONING'),
      ),
    });

    return {
      data: {
        modelName,
        endpoint,
        environment: 'server',
        enableReasoning,
      },
    };
  } catch (error) {
    console.error('Error fetching model info:', error);
    return {
      error: 'Failed to fetch model information',
      status: 500,
    };
  }
}
