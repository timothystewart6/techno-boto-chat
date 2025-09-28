import { Message } from '@/app/types';
import Avatar from './avatar';
import ReasoningSection from './reasoning-section';
import MessageContent from './message-content';

interface MessageBubbleProps {
  message: Message;
  theme: 'light' | 'dark';
}

export default function MessageBubble({ message, theme }: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  const hasReasoning = message.reasoning && message.reasoning.trim().length > 0;

  return (
    <div
      className={`flex w-full animate-slide-up ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`group flex max-w-[85%] items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
      >
        {/* Avatar */}
        <Avatar isUser={isUser} />

        {/* Message Content */}
        <div className="flex flex-col gap-2 max-w-full">
          {/* Reasoning Section (only for bot messages) */}
          {!isUser && hasReasoning && (
            <ReasoningSection
              reasoning={message.reasoning!}
              theme={theme}
              isVisible={message.isReasoningVisible ?? false}
            />
          )}

          {/* Main Message */}
          <MessageContent
            text={message.text}
            timestamp={message.timestamp}
            isUser={isUser}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}
