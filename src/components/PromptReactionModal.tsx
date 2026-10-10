'use client';

import React, { useState } from 'react';
import { X, Send, Sparkles, Heart, Lightbulb, Compass, Feather, BookOpen } from 'lucide-react';
import { PromptAnswer, Profile } from '../types';

interface PromptReactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  prompt: PromptAnswer | null;
  onSubmitReaction: (
    promptId: string,
    reactionType: 'resonant' | 'curious' | 'insightful' | 'poetic',
    note: string
  ) => void;
}

const REACTION_OPTIONS = [
  {
    type: 'resonant' as const,
    label: 'Resonant',
    icon: Compass,
    description: '“Speaks directly to how I navigate the world.”',
  },
  {
    type: 'curious' as const,
    label: 'Curious',
    icon: Sparkles,
    description: '“I want to hear the unedited story behind this.”',
  },
  {
    type: 'insightful' as const,
    label: 'Insightful',
    icon: Lightbulb,
    description: '“Rare, observant way of seeing things.”',
  },
  {
    type: 'poetic' as const,
    label: 'Poetic',
    icon: Feather,
    description: '“Stopped me in my tracks—truly lovely.”',
  },
];

export const PromptReactionModal: React.FC<PromptReactionModalProps> = ({
  isOpen,
  onClose,
  profile,
  prompt,
  onSubmitReaction,
}) => {
  const [selectedType, setSelectedType] = useState<'resonant' | 'curious' | 'insightful' | 'poetic'>('resonant');
  const [selectedPromptId, setSelectedPromptId] = useState<string>(prompt?.id || profile.prompts[0]?.id);
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const currentActivePrompt = profile.prompts.find((p) => p.id === selectedPromptId) || prompt || profile.prompts[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentActivePrompt) return;
    onSubmitReaction(currentActivePrompt.id, selectedType, note.trim());
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-ivory-50 rounded-3xl shadow-editorial-xl border border-sand-300 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-sand-200 flex items-start justify-between bg-ivory-100">
          <div>
            <span className="text-[10px] uppercase tracking-widest-editorial text-burgundy-900 font-semibold font-mono">
              Responding to {profile.name} · {profile.memberNumber}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-normal mt-0.5">
              React to a thought
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-sand-200/50 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Prompt Selector Pills */}
          <div>
            <label className="block text-[10px] font-semibold text-stone-500 uppercase tracking-widest-editorial mb-2">
              Select Thought to React To
            </label>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {profile.prompts.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPromptId(p.id)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors flex-shrink-0 font-medium ${
                    currentActivePrompt.id === p.id
                      ? 'bg-burgundy-900 text-ivory-50 shadow-sm'
                      : 'bg-white border border-sand-300 text-stone-600 hover:bg-ivory-200'
                  }`}
                >
                  Prompt 0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Quoted prompt card */}
          <div className="p-4 rounded-2xl bg-ivory-200/70 border border-sand-300/80">
            <p className="text-xs font-serif italic text-burgundy-950 font-medium mb-1.5">
              “{currentActivePrompt.prompt}”
            </p>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
              {currentActivePrompt.answer}
            </p>
          </div>

          {/* Sentiment Selection */}
          <div>
            <label className="block text-[10px] font-semibold text-stone-500 uppercase tracking-widest-editorial mb-2.5">
              Select Resonance Sentiment
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {REACTION_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedType === opt.type;
                return (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => setSelectedType(opt.type)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between ${
                      isSelected
                        ? 'border-burgundy-900 bg-burgundy-50/70 text-burgundy-950 ring-1 ring-burgundy-900 shadow-sm'
                        : 'border-sand-200 bg-white hover:bg-ivory-100/60'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-burgundy-900' : 'text-champagne-600'}`} />
                      <span className="text-xs font-semibold text-stone-800">{opt.label}</span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1 italic leading-snug">
                      {opt.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Note */}
          <div>
            <label className="block text-[10px] font-semibold text-stone-500 uppercase tracking-widest-editorial mb-1.5">
              Add a personal comment <span className="normal-case text-stone-400 font-normal">(optional, but encourages a response)</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={`Share what came to mind when you read ${profile.name.split(' ')[0]}’s words...`}
              rows={3}
              className="w-full text-xs sm:text-sm p-3.5 rounded-2xl bg-white border border-sand-300 focus:outline-none focus:ring-1 focus:ring-burgundy-900 focus:border-burgundy-900 text-stone-800 placeholder-stone-400 resize-none transition-all"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 bg-ivory-100 border-t border-sand-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full bg-burgundy-900 hover:bg-burgundy-950 text-ivory-50 text-xs sm:text-sm font-medium shadow-sm transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Reaction & Connect</span>
          </button>
        </div>
      </div>
    </div>
  );
};
