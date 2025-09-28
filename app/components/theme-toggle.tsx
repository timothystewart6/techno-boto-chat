import { useTheme } from '../contexts/theme-context';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-14 items-center justify-center rounded-full bg-bg-accent transition-colors hover:bg-bg-accent/80 focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative flex h-6 w-12 items-center rounded-full bg-bg-secondary p-0.5 transition-colors">
        {/* Twinkling stars for dark mode */}
        {theme === 'dark' && (
          <div className="absolute left-0.5 top-0.5 bottom-0.5 right-4.5 flex">
            {/* Tiny stars - closer to toggle, randomized */}
            <div
              className="h-px w-px bg-white rounded-full animate-pulse opacity-65 absolute top-2 left-3.5"
              style={{ animationDelay: '300ms', animationDuration: '1.9s' }}
            ></div>
            <div
              className="h-px w-px bg-white rounded-full animate-pulse opacity-55 absolute top-0.5 left-2"
              style={{ animationDelay: '1400ms', animationDuration: '2.4s' }}
            ></div>
            {/* <div className="h-px w-px bg-white rounded-full animate-pulse opacity-70 absolute top-3.5 left-4.5" style={{ animationDelay: '700ms', animationDuration: '1.6s' }}></div> */}
            <div
              className="h-px w-px bg-white rounded-full animate-pulse opacity-60 absolute top-1.5 left-1.5"
              style={{ animationDelay: '2200ms', animationDuration: '2.1s' }}
            ></div>
            <div
              className="h-px w-px bg-white rounded-full animate-pulse opacity-75 absolute top-3 left-2.5"
              style={{ animationDelay: '500ms', animationDuration: '1.8s' }}
            ></div>
            <div
              className="h-px w-px bg-white rounded-full animate-pulse opacity-50 absolute top-4 left-3.5"
              style={{ animationDelay: '1800ms', animationDuration: '2.3s' }}
            ></div>

            {/* Small stars - closer and randomized */}
            <div
              className="h-0.5 w-0.5 bg-white rounded-full animate-pulse opacity-90 absolute top-1 left-4"
              style={{ animationDelay: '900ms', animationDuration: '1.7s' }}
            ></div>
            {/* <div className="h-0.5 w-0.5 bg-white rounded-full animate-pulse opacity-80 absolute top-2.5 left-1" style={{ animationDelay: '1600ms', animationDuration: '2.2s' }}></div> */}
            {/* <div className="h-0.5 w-0.5 bg-white rounded-full animate-pulse opacity-85 absolute top-3.5 left-3" style={{ animationDelay: '400ms', animationDuration: '1.5s' }}></div> */}
            {/* <div className="h-0.5 w-0.5 bg-white rounded-full animate-pulse opacity-95 absolute top-0.5 left-2.5" style={{ animationDelay: '1200ms', animationDuration: '2s' }}></div> */}
            {/* <div className="h-0.5 w-0.5 bg-white rounded-full animate-pulse opacity-75 absolute top-2 left-4.5" style={{ animationDelay: '2000ms', animationDuration: '1.4s' }}></div> */}
            <div
              className="h-0.5 w-0.5 bg-white rounded-full animate-pulse opacity-85 absolute top-3 left-1.5"
              style={{ animationDelay: '600ms', animationDuration: '1.9s' }}
            ></div>
          </div>
        )}

        {/* Twinkling clouds for light mode */}
        {theme === 'light' && (
          <div className="absolute right-0.5 top-0.5 bottom-0.5 left-4.5 flex">
            {/* Cartoon cloud outlines */}
            {/* Large cloud in back */}
            <svg
              className="absolute top-0.1 right-0 h-5 w-6 animate-pulse opacity-60"
              style={{ animationDelay: '800ms', animationDuration: '2.2s' }}
              viewBox="0 0 24 16"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-text-tertiary/40"
                d="M6 12c-2.2 0-4-1.8-4-4s1.8-4 4-4c.5-2.5 2.5-4 5-4s4.5 1.5 5 4c2.2 0 4 1.8 4 4s-1.8 4-4 4H6z"
              />
            </svg>

            {/* Small cloud in front */}
            <svg
              className="absolute top-1.5 right-1 h-3.5 w-4.5 animate-pulse opacity-70"
              style={{ animationDelay: '1400ms', animationDuration: '1.8s' }}
              viewBox="0 0 20 14"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-text-tertiary/50"
                d="M5 10c-1.7 0-3-1.3-3-3s1.3-3 3-3c.4-1.8 2-3 3.8-3s3.4 1.2 3.8 3c1.7 0 3 1.3 3 3s-1.3 3-3 3H5z"
              />
            </svg>
          </div>
        )}

        <div
          className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-accent-primary transition-transform duration-200 ease-out ${
            theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
          }`}
        >
          {theme === 'dark' ? (
            <svg
              className="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.25A9.75 9.75 0 1021.75 12 9.75 9.75 0 0012 2.25zM8 9a1 1 0 11-2 0 1 1 0 012 0zm2 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm8-2a1 1 0 11-2 0 1 1 0 012 0zm-3-5a0.5 0.5 0 11-1 0 0.5 0.5 0 011 0z" />
              <circle
                cx="6.5"
                cy="8.5"
                r="0.5"
                fill="rgb(var(--background-primary))"
              />
              <circle
                cx="8.5"
                cy="15"
                r="0.75"
                fill="rgb(var(--background-primary))"
              />
              <circle
                cx="17"
                cy="13"
                r="0.5"
                fill="rgb(var(--background-primary))"
              />
              <circle
                cx="14.5"
                cy="8"
                r="0.25"
                fill="rgb(var(--background-primary))"
              />
              <circle
                cx="10"
                cy="11"
                r="0.4"
                fill="rgb(var(--background-primary))"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.25a.5.5 0 01.5.5v2.25a.5.5 0 01-1 0V3a.5.5 0 01.5-.5zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.5.5 0 00-.707-.707l-1.591 1.59a.5.5 0 10.707.707l1.591-1.59zM21.75 12a.5.5 0 01-.5.5h-2.25a.5.5 0 010-1H21a.5.5 0 01.5.5zM17.834 18.894a.5.5 0 00.707-.707l-1.59-1.591a.5.5 0 10-.707.707l1.59 1.591zM12 18a.5.5 0 01.5.5V21a.5.5 0 01-1 0v-2.25A.5.5 0 0112 18zM7.758 17.303a.5.5 0 00-.707-.707l-1.591 1.59a.5.5 0 00.707.707l1.591-1.59zM6 12a.5.5 0 01-.5.5H3a.5.5 0 010-1h2.25A.5.5 0 016 12zM6.697 7.757a.5.5 0 00.707-.707l-1.59-1.591a.5.5 0 00-.707.707l1.59 1.591z" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}
