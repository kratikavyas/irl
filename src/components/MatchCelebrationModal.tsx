'use client';

import React from 'react';
import { Sparkles, MessageCircle, ArrowRight, Heart, Compass } from 'lucide-react';
import { Profile } from '../types';

interface MatchCelebrationModalProps {
  isOpen: boolean;
  profile: Profile | null;
  onStartChat: (profile: Profile) => void;
  onContinueExploring: () => void;
}

export const MatchCelebrationModal: React.FC<MatchCelebrationModalProps> = ({
  isOpen,
  profile,
  onStartChat,
  onContinueExploring,
}) => {
  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-burgundy-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-md bg-ivory-50 rounded-3xl shadow-editorial-xl border border-sand-300 overflow-hidden text-center p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative crest */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-burgundy-50 border border-burgundy-200/80 flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-burgundy-900" />
        </div>

        <span className="text-[10px] uppercase tracking-widest-editorial text-champagne-600 font-semibold font-mono">
          Mutual Affinity Discovered
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl text-burgundy-950 font-light mt-1 mb-2">
          A meeting of minds.
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-normal">
          You and <span className="font-semibold text-stone-900">{profile.name}</span> ({profile.memberNumber}) have crossed paths in values and intention.
        </p>

        {/* Mutual value highlight card */}
        <div className="p-4 rounded-2xl bg-ivory-200/70 border border-sand-300 text-left mb-6">
          <div className="flex items-center space-x-1.5 text-xs text-burgundy-900 font-semibold mb-1">
            <Heart className="w-3.5 h-3.5 fill-burgundy-900" />
            <span>Shared Ground: {profile.sharedValue.title}</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed italic">
            “{profile.sharedValue.explanation}”
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => onStartChat(profile)}
            className="w-full py-3.5 px-5 rounded-full bg-burgundy-900 hover:bg-burgundy-950 text-ivory-50 text-xs sm:text-sm font-medium shadow-sm transition-all flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Begin Conversation</span>
          </button>

          <button
            onClick={onContinueExploring}
            className="w-full py-2.5 px-5 rounded-full border border-sand-300 hover:bg-ivory-200 text-stone-700 text-xs sm:text-sm font-medium transition-all"
          >
            Keep Exploring Today's Dossiers
          </button>
        </div>
      </div>
    </div>
  );
};
