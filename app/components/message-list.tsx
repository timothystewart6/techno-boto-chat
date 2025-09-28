import { forwardRef } from 'react';
import { Message } from '@/app/types';
import MessageBubble from './message-bubble';
import LoadingIndicator from './loading-indicator';
import { useTheme } from '../contexts/theme-context';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  ({ messages, isLoading }, ref) => {
    const { theme } = useTheme();

    return (
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col space-y-4 p-4 lg:p-6">
          {messages.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center max-w-md">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20">
                  <svg
                    className="h-8 w-8 text-accent-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Ready to chat!
                </h3>
                <p className="text-sm text-text-tertiary">
                  Start a conversation by typing a message below. I&apos;m here
                  to help with any questions you might have.
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} theme={theme} />
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <LoadingIndicator />
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={ref} className="h-1" />
        </div>
      </div>
    );
  },
);

MessageList.displayName = 'MessageList';

export default MessageList;
