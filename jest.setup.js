// Jest setup file
import '@testing-library/jest-dom';

// Mock Web APIs for Node.js environment
global.Request = class Request {
  constructor(input, init = {}) {
    this.url = input;
    this.method = init.method || 'GET';
    this.headers = init.headers || {};
    this._body = init.body;
  }

  async json() {
    return JSON.parse(this._body || '{}');
  }
};

global.Response = class Response {
  constructor(body, init = {}) {
    this.status = init.status || 200;
    this.statusText = init.statusText || 'OK';
    this.headers = init.headers || {};
    this._body = body;
  }

  async json() {
    return JSON.parse(this._body || '{}');
  }

  static json(data, init = {}) {
    return new Response(JSON.stringify(data), {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
    });
  }
};

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    query: {},
  }),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SYSTEM_PROMPT_REGULAR = 'Test system prompt';
process.env.NEXT_PUBLIC_MAX_TOKENS_REGULAR = '1000';
