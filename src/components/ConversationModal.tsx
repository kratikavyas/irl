'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Heart, ArrowLeft, Feather } from 'lucide-react';
import { Match, Message } from '../types';

interface ConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  onSendMessage: (matchId: string, text: string) => void;
}

export const ConversationModal: React.FC<ConversationModalProps> = ({
  isOpen,
  onClose,
  match,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, match?.messages, isTyping]);

  if (!isOpen || !match) return null;

  const { profile, messages, sparkPrompt, suggestedStarters } = match;

  const handleSend = (textToSend?: string) => {
    const text = (textToSend ?? inputText).trim();
    if (!text) return;

    onSendMessage(profile.id, text);
    if (!textToSend) setInputText('');

    // Trigger realistic simulated in-character reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = '';
      if (profile.id === 'elena-rostova') {
        replyText = `Thank you for asking that—it's so refreshing to connect on things that actually matter. I’ve been brewing a washed Yirgacheffe that has this gentle floral jasmine note. There's something sacred about that quiet first twenty minutes of the morning, isn't there?`;
      } else if (profile.id === 'julian-vance') {
        replyText = `That means a lot to hear. I was actually working through the Sarabande in Bach's C minor Suite earlier today. It demands complete stillness and honesty—you can't rush a single measure. How has your week been treating you?`;
      } else if (profile.id === 'maya-lin-siddiqui') {
        replyText = `Oh, I love that you asked! Honestly, five years ago I used to believe that total self-sufficiency was the ultimate virtue. Now I realize interdependence and letting people show up for you is so much braver. What about you?`;
      } else if (profile.id === 'soren-lindqvist') {
        replyText = `It is wonderful to meet someone who notices foot rings on ceramics! In my studio, each piece cures under damp linen for a week. Fast intimacy is like hurried pottery—it cracks in the kiln. Tell me, what rituals keep you grounded?`;
      } else if (profile.id === 'aria-chen-montoya') {
        replyText = `You completely get it. When you taste a mezcal distilled in clay pots from Sierra Sur, you're tasting three decades of wild agave sugars and pine needles. That’s why presence matters so much to me. What are you exploring right now?`;
      } else if (profile.id === 'kaelen-thorne') {
        replyText = `I was just looking up the French concept of 'flânerie'—the art of unhurried, purposeful wandering. Being unironically fond of things is the greatest rebellion against modern noise. What book or album is holding your heart lately?`;
      } else {
        replyText = `Thank you for reaching out with such genuine intention. It's so rare to connect over real values. I'd love to know what made you pause when you read my dossier.`;
      }
      onSendMessage(profile.id, replyText);
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-xl h-[92vh] sm:h-[86vh] bg-ivory-50 rounded-3xl shadow-editorial-xl border border-sand-300 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-sand-200 bg-ivory-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-sand-200/50 rounded-full transition-colors sm:hidden"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="relative">
              <img
                src={profile.photo.url}
                alt={profile.name}
                className="w-10 h-10 rounded-full object-cover border border-sand-300"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-ivory-100" />
            </div>
            <div>
              <div className="flex items-baseline space-x-1.5">
                <h3 className="font-serif text-base sm:text-lg text-stone-900 font-medium">
                  {profile.name}
                </h3>
                <span className="text-xs text-stone-500 font-normal">
                  {profile.age} · {profile.location.split(',')[0]}
                </span>
              </div>
              <p className="text-[11px] text-burgundy-900 font-medium line-clamp-1">
                {profile.occupation} <span className="text-stone-400 font-mono">· {profile.memberNumber}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-sand-200/50 rounded-full transition-colors hidden sm:block"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mutual Connection Anchor Banner */}
        <div className="px-4 sm:px-6 py-2.5 bg-ivory-200/60 border-b border-sand-200 text-xs text-stone-600 flex items-center gap-2">
          <Heart className="w-3.5 h-3.5 text-burgundy-900 fill-burgundy-900 flex-shrink-0" />
          <span className="line-clamp-1">
            <strong className="text-stone-900 font-medium">Shared Ground:</strong> {profile.sharedValue.title}
          </span>
        </div>

        {/* Conversation Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-ivory-50">
          {/* Spark Context Card */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-ivory-200/80 border border-sand-300/80 text-center max-w-md mx-auto my-2">
            <span className="text-[10px] uppercase tracking-widest-editorial text-burgundy-900 font-semibold block mb-1">
              Conversation Spark
            </span>
            <p className="text-xs font-serif italic text-stone-800 mb-1">
              “{sparkPrompt?.promptText || profile.prompts[0].prompt}”
            </p>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              {sparkPrompt?.answerText || profile.prompts[0].answer}
            </p>
            {sparkPrompt?.userNote && (
              <div className="mt-2.5 pt-2 border-t border-sand-300/60 text-left">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Your Note:</span>
                <p className="text-xs text-burgundy-950 italic mt-0.5">
                  “{sparkPrompt.userNote}”
                </p>
              </div>
            )}
          </div>

          {/* Messages list */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-burgundy-900 text-ivory-50 rounded-br-sm shadow-sm'
                      : 'bg-white text-stone-800 border border-sand-300/90 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-stone-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center space-x-1.5 text-stone-500 text-xs pl-2 py-1">
              <span className="text-stone-400 italic text-[11px]">{profile.name.split(' ')[0]} is writing thoughtful thoughts...</span>
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-pulse delay-100" />
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-pulse delay-200" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Starters Tray */}
        {suggestedStarters && suggestedStarters.length > 0 && (
          <div className="px-4 sm:px-6 py-2.5 bg-ivory-100 border-t border-sand-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase tracking-widest-editorial text-stone-500 font-semibold flex items-center gap-1">
                <Feather className="w-3 h-3 text-champagne-600" />
                Thoughtful Conversation Starters
              </span>
            </div>
            <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto">
              {suggestedStarters.map((starter, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(starter)}
                  className="text-left text-[11px] sm:text-xs p-2 rounded-xl bg-white hover:bg-ivory-200/90 border border-sand-300/80 text-stone-700 hover:text-burgundy-950 transition-colors line-clamp-2 italic"
                >
                  “{starter}”
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input box */}
        <div className="p-3 sm:p-4 bg-ivory-100 border-t border-sand-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Write to ${profile.name.split(' ')[0]}...`}
              className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-full bg-white border border-sand-300 focus:outline-none focus:ring-1 focus:ring-burgundy-900 focus:border-burgundy-900 text-stone-800 placeholder-stone-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-full bg-burgundy-900 hover:bg-burgundy-950 disabled:opacity-40 disabled:hover:bg-burgundy-900 text-ivory-50 transition-colors flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
