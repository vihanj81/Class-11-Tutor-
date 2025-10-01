import React, { useState, useEffect, useCallback } from 'react';
import { Chapter, Message, Mode } from '../types';
import { generateResponse } from '../services/geminiService';
import ChatInterface from './ChatInterface';
import ModeSelector from './ModeSelector';

interface TutorViewProps {
  chapter: Chapter;
}

const getInitialMessage = (mode: Mode, chapter: Chapter): Message => {
  const baseText = `You are in **${mode.charAt(0) + mode.slice(1).toLowerCase()} Mode** for *${chapter.title}*.`;
  let modeSpecificText = '';
  switch (mode) {
    case 'LEARN':
      modeSpecificText = 'How can I help you learn this chapter? You can ask me to explain a concept, give an example, or summarize the main points.';
      break;
    case 'PRACTICE':
      modeSpecificText = 'Let\'s practice! Type "start" or ask for a specific type of question to begin.';
      break;
    case 'ASSESS':
      modeSpecificText = 'Ready for a quiz? Type "start quiz" to test your knowledge.';
      break;
  }
  return { sender: 'ai', text: `${baseText}\n\n${modeSpecificText}` };
};


const TutorView: React.FC<TutorViewProps> = ({ chapter }) => {
  const [mode, setMode] = useState<Mode>('LEARN');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<{ role: string, parts: { text: string }[] }[]>([]);

  useEffect(() => {
    setMessages([getInitialMessage(mode, chapter)]);
    setHistory([]);
  }, [mode, chapter]);

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    const newUserMessage: Message = { sender: 'user', text: userMessage };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    
    const newHistory = [...history, { role: 'user', parts: [{ text: userMessage }] }];
    
    try {
        // FIX: Pass the new history array which includes the user's message. Removed redundant userMessage argument.
        const aiResponseText = await generateResponse(newHistory, chapter, mode);
        const newAiMessage: Message = { sender: 'ai', text: aiResponseText };
        setMessages(prev => [...prev, newAiMessage]);
        setHistory([...newHistory, { role: 'model', parts: [{ text: aiResponseText }] }]);
    } catch (error) {
        const errorMessage: Message = { sender: 'ai', text: 'Oops! Something went wrong. Please try again.', isError: true };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-slate-200">
            <h2 className="text-xl font-bold">{chapter.title}</h2>
            <ModeSelector currentMode={mode} onModeChange={setMode} />
        </div>
        <ChatInterface
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
        />
    </div>
  );
};

export default TutorView;