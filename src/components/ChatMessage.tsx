import React from 'react';
import { User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  mood?: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (message.isUser) {
    return (
      <div className="flex justify-end items-start space-x-2 animate-fadeIn">
        <div className="max-w-xs lg:max-w-md">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-lg">
            <p className="text-sm leading-relaxed">{message.text}</p>
          </div>
          <div className="flex items-center justify-end space-x-2 mt-1 px-2">
            {message.mood && (
              <span className="text-lg">{message.mood}</span>
            )}
            <span className="text-xs text-white/60">{formatTime(message.timestamp)}</span>
          </div>
        </div>
        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start items-start space-x-2 animate-fadeIn">
      <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="max-w-xs lg:max-w-md">
        <div className="bg-white/10 backdrop-blur-sm text-white rounded-2xl rounded-tl-md px-4 py-3 shadow-lg border border-white/20">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </div>
        <div className="flex items-center justify-start space-x-2 mt-1 px-2">
          <span className="text-xs text-white/60">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;