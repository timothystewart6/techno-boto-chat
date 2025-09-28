import React, { forwardRef, useEffect } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading?: boolean;
}

const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ value, onChange, onSend, onKeyPress, isLoading }, ref) => {
    // Reset textarea height when value becomes empty
    useEffect(() => {
      if (value === '' && ref && 'current' in ref && ref.current) {
        ref.current.style.height = '44px';
      }
    }, [value, ref]);

    const handleSend = () => {
      onSend();
      // Reset textarea height after sending
      if (ref && 'current' in ref && ref.current) {
        ref.current.style.height = '44px';
      }
    };

    return (
      <div className="border-t border-border-primary/50 bg-bg-primary/95 backdrop-blur-sm">
        <div className="p-4 lg:p-6">
          <div className="relative flex items-end gap-3">
            {/* Text input */}
            <div className="flex-1 relative">
              <textarea
                ref={ref}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={onKeyPress}
                placeholder="Type your message here..."
                className="w-full resize-none rounded-2xl bg-bg-tertiary border border-border-primary/50 px-4 py-3 text-text-primary placeholder-text-quaternary transition-all duration-200 focus:border-accent-primary/50 focus:bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden leading-tight"
                rows={1}
                style={{
                  minHeight: '44px',
                  maxHeight: '120px',
                  lineHeight: '20px',
                }}
                disabled={isLoading}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = '44px';
                  const newHeight = Math.min(target.scrollHeight, 120);
                  target.style.height = newHeight + 'px';
                }}
              />

              {/* Character count or status */}
              <div className="absolute bottom-3 right-4 text-xs text-text-quaternary pointer-events-none">
                {value.length > 0 && (
                  <span
                    className={value.length > 500 ? 'text-accent-warning' : ''}
                  >
                    {value.length}
                  </span>
                )}
              </div>
            </div>

            {/* Send button */}
            <button
              type="submit"
              onClick={handleSend}
              disabled={!value.trim() || isLoading}
              className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary text-white shadow-custom-md transition-all duration-200 hover:shadow-custom-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed disabled:hover:shadow-custom-md mb-1"
            >
              {isLoading ? (
                <svg
                  className="h-5 w-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    className="opacity-75"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Hint text */}
          <div className="mt-2 flex items-center justify-between text-xs text-text-quaternary">
            <span>Press Enter to send, Shift+Enter for new line</span>
          </div>
        </div>
      </div>
    );
  },
);

ChatInput.displayName = 'ChatInput';

export default ChatInput;
