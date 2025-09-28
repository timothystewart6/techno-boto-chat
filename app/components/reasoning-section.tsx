import { useState } from 'react';
import MarkdownContent from './markdown-content';

interface ReasoningSectionProps {
  reasoning: string;
  theme: 'light' | 'dark';
  isVisible?: boolean;
}

export default function ReasoningSection({
  reasoning,
  theme,
  isVisible = false,
}: ReasoningSectionProps) {
  const [showReasoning, setShowReasoning] = useState(isVisible);
  const hasReasoning = reasoning && reasoning.trim().length > 0;

  if (!hasReasoning) return null;

  return (
    <div className="relative rounded-2xl px-4 py-3 bg-bg-secondary border border-border-primary/30 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-accent-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <button
          onClick={() => setShowReasoning(!showReasoning)}
          className="text-xs text-accent-primary hover:text-accent-secondary transition-colors"
        >
          {showReasoning ? 'Hide' : 'Show'}
        </button>
      </div>

      {showReasoning ? (
        <MarkdownContent
          content={reasoning}
          isUser={false}
          theme={theme}
          isReasoning={true}
        />
      ) : (
        <div className="text-xs text-text-quaternary italic">
          Click &quot;Show&quot; to see reasoning process
        </div>
      )}
    </div>
  );
}
