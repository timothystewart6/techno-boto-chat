export default function LoadingIndicator() {
  return (
    <div className="flex max-w-[85%] items-end gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-accent border border-border-primary">
        <svg
          className="h-4 w-4 text-text-tertiary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
      <div className="relative rounded-2xl bg-bg-tertiary border border-border-primary/50 px-4 py-3 shadow-custom-md">
        <div className="flex items-center">
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-text-tertiary animate-pulse"></div>
            <div
              className="h-2 w-2 rounded-full bg-text-tertiary animate-pulse"
              style={{ animationDelay: '200ms' }}
            ></div>
            <div
              className="h-2 w-2 rounded-full bg-text-tertiary animate-pulse"
              style={{ animationDelay: '400ms' }}
            ></div>
          </div>
        </div>
        <div className="absolute top-4 -left-1.5 h-3 w-3 rotate-45 bg-bg-tertiary border-l border-b border-border-primary/50" />
      </div>
    </div>
  );
}
