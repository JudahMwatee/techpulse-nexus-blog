import React from 'react';

export const renderContentWithLinks = (content: string): React.ReactNode => {
  // Regular expression to find URLs in text
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  // Function to validate and sanitize URLs
  const isValidUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      // Only allow http and https protocols
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };
  
  const parts = content.split(urlRegex);
  
  return (
    <>
      {parts.map((part, index) => {
        if (part.match(urlRegex) && isValidUrl(part)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer nofollow"
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