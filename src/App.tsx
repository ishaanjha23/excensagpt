import React, { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, Sparkles } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import MoodSelector from './components/MoodSelector';
import TypingIndicator from './components/TypingIndicator';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  mood?: string;
  timestamp: Date;
}

const MOODS = [
  { emoji: '😭', label: 'Crying', value: '😭' },
  { emoji: '😐', label: 'Neutral', value: '😐' },
  { emoji: '😤', label: 'Frustrated', value: '😤' },
  { emoji: '🤡', label: 'Chaotic', value: '🤡' },
  { emoji: '😎', label: 'Cool', value: '😎' },
];

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "yooo bestie! 💅 I'm ExcensaGPT, your chaotic Gen-Z AI bestie who's here to help with literally everything - homework excuses, playlist recs, emotional breakdowns, you name it! What's the vibe today? ✨",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedMood, setSelectedMood] = useState('😐');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(Date.now().toString());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      mood: selectedMood,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          mood: selectedMood,
          sessionId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "bestie my brain just blue-screened 💀 try again in a sec!",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/new-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();
      setSessionId(data.sessionId);
      setMessages([
        {
          id: '1',
          text: "fresh start bestie! 🌟 what's on your mind today? spill the tea ☕",
          isUser: false,
          timestamp: new Date(),
        }
      ]);
    } catch (error) {
      console.error('Failed to start new chat:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen max-w-4xl mx-auto">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ExcensaGPT</h1>
                <p className="text-sm text-purple-200">your chaotic bestie ✨</p>
              </div>
            </div>
            <button
              onClick={startNewChat}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200 hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-medium">New Chat</span>
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-black/20 backdrop-blur-lg border-t border-white/10 p-4">
          <div className="flex flex-col space-y-3">
            {/* Mood Selector */}
            <MoodSelector
              moods={MOODS}
              selectedMood={selectedMood}
              onMoodChange={setSelectedMood}
            />

            {/* Message Input */}
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="spill the tea bestie... ☕"
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;