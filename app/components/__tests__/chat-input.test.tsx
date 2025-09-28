import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatInput from '../chat-input';

describe('ChatInput Component', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
    onSend: jest.fn(),
    onKeyPress: jest.fn(),
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders textarea for input', () => {
    render(<ChatInput {...defaultProps} />);

    const textarea = screen.getByPlaceholderText(/type your message/i);
    expect(textarea).toBeInTheDocument();
  });

  it('calls onChange when text is entered', async () => {
    const user = userEvent.setup();
    render(<ChatInput {...defaultProps} />);

    const textarea = screen.getByPlaceholderText(/type your message/i);
    await user.type(textarea, 'Hello');

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('renders send button', () => {
    render(<ChatInput {...defaultProps} />);

    const sendButton = screen.getByRole('button');
    expect(sendButton).toBeInTheDocument();
  });

  it('calls onSend when send button is clicked', async () => {
    const user = userEvent.setup();
    render(<ChatInput {...defaultProps} value="Test message" />);

    const sendButton = screen.getByRole('button');
    await user.click(sendButton);

    expect(defaultProps.onSend).toHaveBeenCalled();
  });

  it('disables send button when no text', () => {
    render(<ChatInput {...defaultProps} value="" />);

    const sendButton = screen.getByRole('button');
    expect(sendButton).toBeDisabled();
  });

  it('disables input when loading', () => {
    render(<ChatInput {...defaultProps} isLoading={true} />);

    const textarea = screen.getByPlaceholderText(/type your message/i);
    expect(textarea).toBeDisabled();
  });

  it('shows loading state on send button when loading', () => {
    render(<ChatInput {...defaultProps} isLoading={true} />);

    const sendButton = screen.getByRole('button');
    expect(sendButton).toBeDisabled();
  });
});
