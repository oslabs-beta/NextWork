import React from 'react';

interface Content {
  size: number;
  mimeType: string;
  text: string;
  compression: number;
}

interface ContentSizeProps {
  content: Content;
}

const ContentSize: React.FC<ContentSizeProps> = ({ content }) => {
  return (
    <div>
      <p>{content.text}</p>
    </div>
  );
};

export default ContentSize;
