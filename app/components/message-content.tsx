import MarkdownContent from './markdown-content';

interface MessageContentProps {
  text: string;
  timestamp: Date;
  isUser: boolean;
  theme: 'light' | 'dark';
}

export default function MessageContent({
  text,
  timestamp,
  isUser,
  theme,
}: MessageContentProps) {
  return (
    <div
      className={`relative rounded-2xl px-4 py-3 shadow-custom-md transition-all duration-200 hover:shadow-custom-lg ${
        isUser
          ? 'bg-gradient-to-br from-accent-primary to-accent-secondary text-white'
          : 'bg-bg-tertiary border border-border-primary/50'
      }`}
    >
      {/* Message text */}
      <MarkdownContent content={text} isUser={isUser} theme={theme} />

      {/* Timestamp */}
      <div
        className={`mt-1 text-xs opacity-60 ${isUser ? 'text-white/80' : 'text-text-quaternary'}`}
      >
        {timestamp.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>

      {/* Message tail */}
      <div
        className={`absolute top-4 h-3 w-3 rotate-45 ${
          isUser
            ? '-right-1.5 bg-gradient-to-br from-accent-primary to-accent-secondary'
            : '-left-1.5 bg-bg-tertiary border-l border-b border-border-primary/50'
        }`}
      />
    </div>
  );
}
