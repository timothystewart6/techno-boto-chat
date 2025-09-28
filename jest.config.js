const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)',
    '!**/__tests__/__mocks__/**',
  ],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^react-markdown$':
      '<rootDir>/app/components/__tests__/__mocks__/react-markdown.tsx',
    '^remark-gfm$':
      '<rootDir>/app/components/__tests__/__mocks__/remark-gfm.ts',
    '^react-syntax-highlighter$':
      '<rootDir>/app/components/__tests__/__mocks__/react-syntax-highlighter.tsx',
    '^react-syntax-highlighter/dist/esm/(.*)$':
      '<rootDir>/app/components/__tests__/__mocks__/react-syntax-highlighter.tsx',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
