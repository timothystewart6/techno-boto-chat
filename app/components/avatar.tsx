interface AvatarProps {
  isUser: boolean;
}

export default function Avatar({ isUser }: AvatarProps) {
  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
        isUser
          ? 'bg-gradient-to-br from-accent-primary to-accent-secondary shadow-lg'
          : 'bg-bg-accent border border-border-primary'
      }`}
    >
      {isUser ? (
        <svg
          className="h-4 w-4 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
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
      )}
    </div>
  );
}
