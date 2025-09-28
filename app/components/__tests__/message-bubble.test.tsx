import { render, screen } from '@testing-library/react';
import MessageBubble from '../message-bubble';
import { Message } from '@/app/types';

const mockUserMessage: Message = {
  id: 1,
  text: 'Hello, this is a user message',
  sender: 'user',
  timestamp: new Date(),
};

const mockBotMessage: Message = {
  id: 2,
  text: 'Hello, this is a bot response',
  sender: 'bot',
  timestamp: new Date(),
};

const mockBotMessageWithReasoning: Message = {
  id: 3,
  text: 'This is a response with reasoning',
  sender: 'bot',
  timestamp: new Date(),
  reasoning: 'This is the reasoning behind the response',
};

describe('MessageBubble Component', () => {
  it('renders user message with correct styling', () => {
    const { container } = render(
      <MessageBubble message={mockUserMessage} theme="light" />,
    );

    expect(
      screen.getByText('Hello, this is a user message'),
    ).toBeInTheDocument();

    // Should render with justify-end for user messages (outermost container)
    const outerContainer = container.querySelector('.justify-end');
    expect(outerContainer).toBeInTheDocument();
  });

  it('renders bot message with correct styling', () => {
    const { container } = render(
      <MessageBubble message={mockBotMessage} theme="light" />,
    );

    expect(
      screen.getByText('Hello, this is a bot response'),
    ).toBeInTheDocument();

    // Should render with justify-start for bot messages (outermost container)
    const outerContainer = container.querySelector('.justify-start');
    expect(outerContainer).toBeInTheDocument();
  });

  it('displays reasoning section for bot messages with reasoning', () => {
    render(
      <MessageBubble message={mockBotMessageWithReasoning} theme="light" />,
    );

    expect(
      screen.getByText('This is a response with reasoning'),
    ).toBeInTheDocument();

    // Should show collapsed reasoning section
    expect(
      screen.getByText('Click "Show" to see reasoning process'),
    ).toBeInTheDocument();
  });

  it('does not display reasoning section for messages without reasoning', () => {
    render(<MessageBubble message={mockBotMessage} theme="light" />);

    expect(screen.queryByText(/Show/i)).not.toBeInTheDocument();
  });

  it('displays timestamp for all messages', () => {
    render(<MessageBubble message={mockUserMessage} theme="light" />);

    // Should have some time display (exact format may vary)
    const timeElement = screen.getByText(/\d+:\d+/);
    expect(timeElement).toBeInTheDocument();
  });

  it('renders different layouts for user vs bot messages', () => {
    // Test user message
    const { container: userContainer, rerender } = render(
      <MessageBubble message={mockUserMessage} theme="light" />,
    );

    expect(
      screen.getByText('Hello, this is a user message'),
    ).toBeInTheDocument();
    expect(userContainer.querySelector('.justify-end')).toBeInTheDocument();

    // Test bot message
    rerender(<MessageBubble message={mockBotMessage} theme="light" />);

    expect(
      screen.getByText('Hello, this is a bot response'),
    ).toBeInTheDocument();
    expect(userContainer.querySelector('.justify-start')).toBeInTheDocument();
  });
});
