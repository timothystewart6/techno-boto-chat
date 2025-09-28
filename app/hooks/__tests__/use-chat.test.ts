import { renderHook, act } from '@testing-library/react';
import { useChat } from '../use-chat';

// Mock the client
jest.mock('@/lib/techno-boto-chat-client', () => {
  return {
    TechnoBotoChatClient: jest.fn().mockImplementation(() => ({
      getModelInfo: jest.fn().mockResolvedValue({
        enableReasoning: false,
        modelName: 'test-model',
      }),
      generateChatResponse: jest.fn().mockResolvedValue('Mock bot response'),
      generateChatResponseWithReasoning: jest.fn().mockResolvedValue({
        content: 'Mock reasoning response',
        reasoning: 'Mock reasoning steps',
      }),
    })),
  };
});

describe('useChat Hook', () => {
  let mockOnError: jest.Mock;

  beforeEach(() => {
    mockOnError = jest.fn();
  });

  it('starts with welcome message', async () => {
    let result: any;

    await act(async () => {
      const hookResult = renderHook(() => useChat({ onError: mockOnError }));
      result = hookResult.result;
      // Let useEffects run
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].sender).toBe('bot');
    expect(result.current.messages[0].text).toContain('Hello');
    expect(result.current.inputValue).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('updates input value when setInputValue is called', async () => {
    let result: any;

    await act(async () => {
      const hookResult = renderHook(() => useChat({ onError: mockOnError }));
      result = hookResult.result;
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.setInputValue('Test message');
    });

    expect(result.current.inputValue).toBe('Test message');
  });

  it('sends message and receives response', async () => {
    let result: any;

    await act(async () => {
      const hookResult = renderHook(() => useChat({ onError: mockOnError }));
      result = hookResult.result;
      // Wait for initial welcome message
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Set input value and send
    act(() => {
      result.current.setInputValue('Hello');
    });

    await act(async () => {
      await result.current.handleSendMessage();
    });

    // Should have welcome message + user message + bot response = 3 total
    expect(result.current.messages).toHaveLength(3);
    expect(result.current.messages[1].sender).toBe('user');
    expect(result.current.messages[1].text).toBe('Hello');
    expect(result.current.messages[2].sender).toBe('bot');
    expect(result.current.messages[2].text).toBe('Mock bot response');
    expect(result.current.inputValue).toBe(''); // Input should be cleared
  });

  it('handles loading state correctly', async () => {
    let result: any;

    await act(async () => {
      const hookResult = renderHook(() => useChat({ onError: mockOnError }));
      result = hookResult.result;
      // Wait for initial setup
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.setInputValue('Hello');
    });

    // Start sending (loading state is internal and async, hard to catch)
    await act(async () => {
      await result.current.handleSendMessage();
    });

    // After completion, should not be loading
    expect(result.current.isLoading).toBe(false);
    expect(result.current.messages).toHaveLength(3); // welcome + user + bot
  });

  it('has reasoning mode available', async () => {
    let result: any;

    await act(async () => {
      const hookResult = renderHook(() => useChat({ onError: mockOnError }));
      result = hookResult.result;
      // Wait for initial setup
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.enableReasoning).toBe(false); // Based on our mock
  });

  it('prevents sending empty messages', async () => {
    let result: any;

    await act(async () => {
      const hookResult = renderHook(() => useChat({ onError: mockOnError }));
      result = hookResult.result;
      // Wait for initial setup
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Try to send empty message
    await act(async () => {
      await result.current.handleSendMessage();
    });

    // Should still have only welcome message
    expect(result.current.messages).toHaveLength(1);
  });
});
