import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownContentProps {
  content: string;
  isUser: boolean;
  theme: 'light' | 'dark';
  isReasoning?: boolean;
}

export default function MarkdownContent({
  content,
  isUser,
  theme,
  isReasoning = false,
}: MarkdownContentProps) {
  const getTextColor = (defaultClass: string) => {
    if (isReasoning) return 'text-text-secondary';
    if (isUser) return 'text-white';
    return defaultClass;
  };

  return (
    <div
      className={`message-content text-sm leading-relaxed prose prose-sm max-w-none ${
        isUser ? 'text-white' : 'text-text-primary'
      }`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom styling for different elements
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          h1: ({ children }) => (
            <h1
              className={`text-lg font-bold mb-2 ${getTextColor('text-text-primary')}`}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              className={`text-base font-bold mb-2 ${getTextColor('text-text-primary')}`}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              className={`text-sm font-bold mb-1 ${getTextColor('text-text-primary')}`}
            >
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-2 space-y-1">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className={`${getTextColor('text-text-primary')}`}>
              {children}
            </li>
          ),
          code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : 'text';
            const isInline = !match;

            return !isInline ? (
              // @ts-ignore
              <SyntaxHighlighter
                style={theme === 'dark' ? (oneDark as any) : (oneLight as any)}
                language={language}
                PreTag="div"
                className="rounded-lg my-3 text-sm overflow-x-auto"
                customStyle={{
                  background: isUser
                    ? 'rgba(255, 255, 255, 0.1)'
                    : theme === 'dark'
                      ? '#1a1a1a'
                      : '#f5f5f5',
                  border: isUser
                    ? 'none'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '12px',
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code
                className={`px-1 py-0.5 rounded text-xs font-mono ${
                  isReasoning
                    ? 'bg-bg-tertiary text-accent-primary'
                    : isUser
                      ? 'bg-white/20 text-white'
                      : 'bg-bg-secondary text-accent-primary'
                }`}
                {...props}
              >
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote
              className={`border-l-2 pl-3 mb-2 italic ${
                isReasoning
                  ? 'border-accent-primary text-text-tertiary'
                  : isUser
                    ? 'border-white/40 text-white/90'
                    : 'border-accent-primary text-text-secondary'
              }`}
            >
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline hover:no-underline ${
                isReasoning
                  ? 'text-accent-primary hover:text-accent-secondary'
                  : isUser
                    ? 'text-white hover:text-white/80'
                    : 'text-accent-primary hover:text-accent-secondary'
              }`}
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-2">
              <table
                className={`min-w-full text-xs border-collapse ${
                  isUser ? 'border-white/20' : 'border-border-primary'
                }`}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th
              className={`border px-2 py-1 text-left font-semibold ${
                isUser
                  ? 'border-white/20 bg-white/10'
                  : 'border-border-primary bg-bg-secondary'
              }`}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              className={`border px-2 py-1 ${isUser ? 'border-white/20' : 'border-border-primary'}`}
            >
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
