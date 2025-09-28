/**
 * Shared utilities for LLM clients
 */

export function getDefaultSystemPrompt(): string {
  return 'You are a helpful AI assistant. Provide concise, friendly responses.';
}

export function parseErrorMessage(error: unknown): string {
  if (typeof error === 'string' && error.trim()) {
    return error;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message: string }).message;
    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  }

  if (error instanceof Error) {
    if (error.message.includes('Failed to fetch')) {
      return 'Cannot connect to AI model. Please check your connection and model configuration.';
    } else if (error.message.includes('status 401')) {
      return 'Authentication failed. Please check your API key.';
    } else if (error.message.includes('status 404')) {
      return 'AI model endpoint not found. Please check your configuration.';
    } else if (error.message.includes('status 429')) {
      return 'Rate limit exceeded. Please try again later.';
    } else if (error.message.includes('status 500')) {
      return 'AI model server error. Please try again later.';
    } else if (error.message.trim()) {
      return error.message;
    }
  }

  return 'An unknown error occurred';
}
