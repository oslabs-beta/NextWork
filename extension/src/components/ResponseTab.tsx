import React from 'react';

interface Content {
  size: number;
  mimeType: string;
  text: string;
  compression: number;
}

interface ResponseTabProps {
  content: Content;
}

const ResponseTab: React.FC<ResponseTabProps> = ({ content }) => {
  return (
    <div>
      <p className={'textContainer'}>{content.text}</p>
    </div>
  );
};

export default ResponseTab;
