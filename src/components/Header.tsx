'use client';

import React from 'react';
import { Compass, MessageCircle, RotateCcw, User, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: 'discovery' | 'matches';
  setActiveTab: (tab: 'discovery' | 'matches') => void;
  matchCount: number;
  onResetDeck: () => void;
  onOpenSelfProfile: () => void;
  onOpenManifesto: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  matchCount,
  onResetDeck,
  onOpenSelfProfile,
  onOpenManifesto,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-ivory-100/90 backdrop-blur-md border-b border-sand-200 transition-all duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand & Editorial Identity */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setActiveTab('discovery')}
              className="text-left group focus:outline-none"
            >
              <div className="flex items-baseline space-x-2">
                <span className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-burgundy-950 group-hover:text-burgundy-800 transition-colors">
                  IRL
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-champagne-500 mb-1" />
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest-editorial text-stone-500 font-medium pl-1">
                  Edition 01
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-serif italic tracking-wide hidden sm:block">
                Find your someone in between.
              </p>
            </button>

            {/* Manifesto button */}
            <button
              onClick={onOpenManifesto}
              className="hidden md:inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] text-stone-600 hover:text-burgundy-900 hover:bg-sand-200/50 border border-sand-300/60 transition-colors"
              title="Read the IRL Manifesto"
            >
              <BookOpen className="w-3 h-3 text-champagne-600" />
              <span>Manifesto</span>
            </button>
          </div>

          {/* Navigation & Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Reset Deck */}
            <button
              onClick={onResetDeck}
              title="Reset today's curated profiles"
              className="p-2 text-stone-500 hover:text-burgundy-900 hover:bg-ivory-200 rounded-full transition-colors duration-150 flex items-center gap-1.5 text-xs"
              aria-label="Reset Deck"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px] font-medium text-stone-600">Rewind</span>
            </button>

            {/* User Self Dossier Button */}
            <button
              onClick={onOpenSelfProfile}
              title="View your IRL dossier"
              className="p-2 text-stone-500 hover:text-burgundy-900 hover:bg-ivory-200 rounded-full transition-colors flex items-center gap-1.5 text-xs"
              aria-label="Your Profile"
            >
              <User className="w-4 h-4 text-stone-600" />
              <span className="hidden sm:inline text-[11px] font-medium text-stone-600">Your Dossier</span>
            </button>

            {/* Tab Switcher */}
            <nav className="inline-flex p-1 bg-ivory-200/90 rounded-full border border-sand-300">
              <button
                onClick={() => setActiveTab('discovery')}
                className={`relative flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeTab === 'discovery'
                    ? 'bg-burgundy-900 text-ivory-50 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-ivory-300/40'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Discover</span>
              </button>

              <button
                onClick={() => setActiveTab('matches')}
                className={`relative flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeTab === 'matches'
                    ? 'bg-burgundy-900 text-ivory-50 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-ivory-300/40'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Matches</span>
                {matchCount > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-tight ${
                      activeTab === 'matches'
                        ? 'bg-champagne-400 text-burgundy-950'
                        : 'bg-burgundy-800 text-ivory-50'
                    }`}
                  >
                    {matchCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
