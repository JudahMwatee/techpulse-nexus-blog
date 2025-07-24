import React from 'react';

export const renderContentWithLinks = (content: string): React.ReactNode => {
  // Regular expression to find URLs in text
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  const parts = content.split(urlRegex);
  
  return (
    <>
      {parts.map((part, index) => {
        if (part.match(urlRegex)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80 transition-colors"
            >
              {part}
            </a>
          );
        }
        return part;
      })}
    </>
  );
};

export const parseContentWithParagraphs = (content: string): React.ReactElement[] => {
  const paragraphs = content.split('\n\n');
  
  return paragraphs.map((paragraph, index) => (
    <p key={index} className="mb-4 leading-relaxed">
      {renderContentWithLinks(paragraph)}
    </p>
  ));
};