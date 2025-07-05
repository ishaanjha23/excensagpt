import React from 'react';
import { Sparkles } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start items-start space-x-2 animate-fadeIn">
      <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-4 h-4 text-white animate-pulse" />
      </div>
      <div className="bg-white/10 backdrop-blur-sm text-white rounded-2xl rounded-tl-md px-4 py-3 shadow-lg border border-white/20">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;