import React from 'react';

interface ReactMarkdownProps {
  children: React.ReactNode;
}

const ReactMarkdown: React.FC<ReactMarkdownProps> = ({ children }) => {
  return React.createElement('div', { 'data-testid': 'markdown' }, children);
};

export default ReactMarkdown;
