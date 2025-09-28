'use client';

import { useState, useEffect } from 'react';
import Header from './components/header';
import NotificationList from './components/notification-list';
import MessageList from './components/message-list';
import ChatInput from './components/chat-input';
import { useNotifications } from './hooks/use-notifications';
import { useChat } from './hooks/use-chat';
import { TechnoBotoChatClient } from '@/lib/techno-boto-chat-client';

export default function ChatBot() {
  const { notifications, showNotification, removeNotification } =
    useNotifications();
  const [modelInfo, setModelInfo] = useState<{
    modelName: string;
    endpoint: string;
  } | null>(null);

  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    messagesEndRef,
    inputRef,
    handleSendMessage,
    handleKeyPress,
  } = useChat({
    onError: (message) => showNotification(message, 'error'),
  });

  // Fetch model configuration on component mount
  useEffect(() => {
    const fetchModelInfo = async () => {
      try {
        const client = new TechnoBotoChatClient();
        const config = await client.getModelInfo();
        setModelInfo({
          modelName: config.modelName || 'Not configured',
          endpoint: config.endpoint,
        });
      } catch (error) {
        console.error('Error fetching model info:', error);
        setModelInfo({
          modelName: 'Error loading',
          endpoint: 'Not configured',
        });
      }
    };

    fetchModelInfo();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-bg-primary">
      <Header
        title="techno-boto-chat"
        subtitle="A Mediocore AI Chat Interface"
        modelInfo={modelInfo || undefined}
      />

      <NotificationList
        notifications={notifications}
        onRemove={removeNotification}
      />

      <MessageList
        messages={messages}
        isLoading={isLoading}
        ref={messagesEndRef}
      />

      <ChatInput
        ref={inputRef}
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendMessage}
        onKeyPress={handleKeyPress}
        isLoading={isLoading}
      />
    </div>
  );
}
