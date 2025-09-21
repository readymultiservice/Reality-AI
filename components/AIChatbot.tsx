
import React, { useState, useRef, useEffect } from 'react';
import { run } from '../services/geminiService';
import type { AIFilters, ChatMessage } from '../types';
import { SendIcon, CloseIcon, BotIcon, UserIcon, LoadingIcon } from './Icons';

interface AIChatbotProps {
  onFiltersExtracted: (filters: AIFilters) => void;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ onFiltersExtracted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([{
        id: 'initial',
        role: 'assistant',
        content: "Hi! How can I help you find a property today? You can say something like 'show me 2 bedroom houses in Los Angeles'."
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await run(inputValue);
      if (result) {
        onFiltersExtracted(result);
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Sure! I've updated the search for you based on your request. Here's what I found.`,
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error("Could not parse filters.");
      }
    } catch (error) {
      console.error("Error with AI assistant:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I had trouble understanding that. Could you please try rephrasing your request?",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-brand-blue text-white rounded-full p-4 shadow-2xl hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transform hover:scale-110 transition-all duration-200"
        aria-label="Open AI Chatbot"
      >
        <BotIcon className="h-8 w-8" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 z-50">
      <header className="flex items-center justify-between p-4 bg-brand-blue text-white rounded-t-2xl">
        <h3 className="font-bold text-lg flex items-center"><BotIcon className="h-6 w-6 mr-2"/>AI Assistant</h3>
        <button onClick={() => setIsOpen(false)} className="hover:bg-blue-800 p-1 rounded-full transition-colors">
          <CloseIcon className="h-6 w-6" />
        </button>
      </header>
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && <div className="flex-shrink-0 bg-brand-teal text-white rounded-full h-8 w-8 flex items-center justify-center"><BotIcon className="h-5 w-5"/></div>}
              <div className={`max-w-[80%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-brand-dark rounded-bl-none'}`}>
                <p className="text-sm">{msg.content}</p>
              </div>
              {msg.role === 'user' && <div className="flex-shrink-0 bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center"><UserIcon className="h-5 w-5 text-gray-600"/></div>}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3">
               <div className="flex-shrink-0 bg-brand-teal text-white rounded-full h-8 w-8 flex items-center justify-center"><BotIcon className="h-5 w-5"/></div>
               <div className="max-w-[80%] p-3 rounded-xl bg-gray-200 text-brand-dark rounded-bl-none">
                 <LoadingIcon className="h-5 w-5 text-brand-blue" />
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me to find a home..."
            className="w-full pr-12 py-3 px-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-teal focus:border-transparent transition"
            disabled={isLoading}
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-teal text-white rounded-full p-2 hover:bg-teal-600 disabled:bg-gray-400 transition-colors" disabled={isLoading}>
            <SendIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
   