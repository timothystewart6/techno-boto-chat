import ThemeToggle from './theme-toggle';

interface HeaderProps {
  title: string;
  subtitle: string;
  modelInfo?: {
    modelName: string;
    endpoint: string;
  };
}

export default function Header({ title, subtitle, modelInfo }: HeaderProps) {
  return (
    <div className="sticky top-0 z-50 glass border-b border-border-primary/50">
      <div className="flex items-center justify-between p-4 lg:p-6">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary shadow-lg">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-sm text-text-tertiary font-medium">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {modelInfo && (
            <div className="hidden sm:flex flex-col items-end text-right">
              <div className="flex items-center gap-2 text-xs font-mono">
                <div className="h-2 w-2 rounded-full bg-accent-success animate-pulse" />
                <span className="text-text-secondary font-semibold">
                  {modelInfo.modelName}
                </span>
              </div>
              <div className="text-xs text-text-quaternary truncate max-w-48">
                {modelInfo.endpoint}
              </div>
            </div>
          )}

          <div className="h-6 w-px bg-border-primary/50" />

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
