import OpenAI from 'openai';
import { LLMClient } from '@/lib/llm-client';

export interface ChatRequestBody {
  messages: any[];
  max_tokens?: number;
  temperature?: number;
}

export interface ChatResponse {
  data?: any;
  error?: string;
  status?: number;
}

// Core business logic - easily testable
export async function handleChatCompletion(
  body: ChatRequestBody,
): Promise<ChatResponse> {
  try {
    // Create server LLM client
    const client = new LLMClient();

    console.log('API Configuration:', client.getConfig());

    // Use the server client to generate response (model comes from server env)
    const completion = await client.getOpenAIClient().chat.completions.create({
      model: client.getConfig().modelName,
      messages: body.messages,
      max_tokens: body.max_tokens || 150,
      temperature: body.temperature || 0.7,
      stream: false,
    });

    // Return the response
    return { data: completion };
  } catch (error) {
    console.error('API route error:', error);

    // Handle different types of errors
    if (error instanceof OpenAI.APIError) {
      return {
        error: `API request failed: ${error.message}`,
        status: error.status || 500,
      };
    }

    // Handle server client configuration errors
    if (
      error instanceof Error &&
      (error.message.includes('Missing LLM_API_BASE_URL') ||
        error.message.includes('Missing model name'))
    ) {
      return {
        error: `Server configuration error: ${error.message}`,
        status: 500,
      };
    }

    // Handle fetch/connection errors
    if (error instanceof Error && error.message.includes('fetch')) {
      return {
        error:
          'Cannot connect to AI model. Please check your Docker Model Runner configuration.',
        status: 503,
      };
    }

    // Handle other errors
    return {
      error: 'Internal server error',
      status: 500,
    };
  }
}
