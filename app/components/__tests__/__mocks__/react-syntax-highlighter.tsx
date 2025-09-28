import React from 'react';

interface PrismProps {
  children: React.ReactNode;
  language?: string;
  [key: string]: any;
}

const Prism: React.FC<PrismProps> = ({ children, language, ...props }) => {
  return React.createElement(
    'pre',
    {
      'data-testid': 'syntax-highlighter',
      'data-language': language,
      ...props,
    },
    React.createElement('code', {}, children),
  );
};

export { Prism };
export const PrismLight = Prism;
export default Prism;
