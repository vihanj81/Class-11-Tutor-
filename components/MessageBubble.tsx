
import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

// A simple function to parse basic markdown-like syntax for the UI
const formatText = (text: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const italicRegex = /\*(.*?)\*/g;

    const formattedHtml = text
        .replace(boldRegex, '<strong>$1</strong>')
        .replace(italicRegex, '<em>$1</em>')
        .replace(/\n/g, '<br />');

    return { __html: formattedHtml };
};


const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const bubbleClasses = isUser
    ? 'bg-indigo-600 text-white'
    : 'bg-slate-200 text-slate-800';
    
  const wrapperClasses = isUser
    ? 'flex justify-end'
    : 'flex justify-start';

  return (
    <div className={wrapperClasses}>
      <div className={`rounded-lg p-3 max-w-lg lg:max-w-xl shadow-sm ${bubbleClasses}`}>
        <div 
          className="prose prose-sm max-w-none" 
          dangerouslySetInnerHTML={formatText(message.text)}
        />
      </div>
    </div>
  );
};

export default MessageBubble;
