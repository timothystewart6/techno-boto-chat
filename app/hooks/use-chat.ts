import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Message } from '@/app/types';
import { TechnoBotoChatClient } from '@/lib/techno-boto-chat-client';
import { parseErrorMessage } from '@/lib/shared';

interface UseChatOptions {
  onError: (message: string) => void;
}

export function useChat({ onError }: UseChatOptions) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [enableReasoning, setEnableReasoning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Create client instance - memoize to avoid recreating on every render
  const client = useMemo(() => new TechnoBotoChatClient(), []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch model configuration on mount
  useEffect(() => {
    const fetchModelConfig = async () => {
      try {
        const modelInfo = await client.getModelInfo();
        setEnableReasoning(modelInfo.enableReasoning);
        // Only log in development mode
        if (process.env.NODE_ENV === 'development') {
          console.log('Model config loaded:', {
            enableReasoning: modelInfo.enableReasoning,
            modelInfo,
          });
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error fetching model config:', error);
        }
        setEnableReasoning(false); // Default to false on error
      }
    };

    fetchModelConfig();
  }, [client]);

  // Add welcome message only on client side to avoid hydration mismatch
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your mediocre AI assistant.",
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Use cached reasoning configuration (no API call needed)
      if (process.env.NODE_ENV === 'development') {
        console.log('Using cached reasoning config:', { enableReasoning });
      }

      let botMessage: Message;

      if (enableReasoning) {
        const botResponse = await client.generateChatResponseWithReasoning(
          userMessage.text,
        );
        botMessage = {
          id: Date.now() + 1,
          text: botResponse.content,
          sender: 'bot',
          timestamp: new Date(),
          reasoning: botResponse.reasoning,
          isReasoningVisible: false, // Hide reasoning by default
        };
      } else {
        const botResponseText = await client.generateChatResponse(
          userMessage.text,
        );
        botMessage = {
          id: Date.now() + 1,
          text: botResponseText,
          sender: 'bot',
          timestamp: new Date(),
        };
      }

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);

      const errorMessage = parseErrorMessage(error);
      onError(errorMessage);
    } finally {
      setIsLoading(false);
      // Keep focus on input for continuous typing
      // Use requestAnimationFrame to ensure DOM updates are complete
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    enableReasoning,
    messagesEndRef,
    inputRef,
    handleSendMessage,
    handleKeyPress,
  };
}
