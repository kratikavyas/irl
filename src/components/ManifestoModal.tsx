'use client';

import React from 'react';
import { X, Sparkles, Heart, Compass, Feather, BookOpen, Check } from 'lucide-react';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-lg bg-ivory-50 rounded-3xl shadow-editorial-xl border border-sand-300 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-sand-200 flex items-start justify-between bg-ivory-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-lg font-light text-burgundy-950">IRL</span>
              <span className="text-sand-300">·</span>
              <span className="text-[10px] uppercase tracking-widest-editorial text-champagne-600 font-semibold font-mono">
                The In-Between Ethos
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-light mt-1">
              Find your someone in between.
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

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-stone-700 leading-relaxed font-normal text-xs sm:text-sm">
          <div className="border-l-2 border-burgundy-900 pl-4 py-1 italic font-serif text-sm sm:text-base text-stone-900">
            “Most dating apps ask you to judge a three-dimensional human soul based on half a second of visual evaluation. We believe connection begins elsewhere.”
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-sand-200 shadow-editorial">
              <h4 className="font-serif text-base text-burgundy-950 font-medium mb-1">
                I. The Mind Before The Face
              </h4>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                On IRL, you discover how someone thinks, how they spend quiet mornings, what they are actively unlearning, and where their values lie before you see their photographs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-sand-200 shadow-editorial">
              <h4 className="font-serif text-base text-burgundy-950 font-medium mb-1">
                II. The In-Between Moments
              </h4>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Great relationships aren’t built on curated highlights; they thrive in the quiet spaces between moments—the unscripted pauses, the silence on Sunday mornings, the honesty when guard is lowered.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-sand-200 shadow-editorial">
              <h4 className="font-serif text-base text-burgundy-950 font-medium mb-1">
                III. Curated Pacing Over Infinite Cards
              </h4>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                You receive a finite, intentional selection of members each day. There is no endless casino scroll. Each person deserves full, deliberate attention.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-sand-200 shadow-editorial">
              <h4 className="font-serif text-base text-burgundy-950 font-medium mb-1">
                IV. Meaningful Reactions
              </h4>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Rather than generic double-taps, react directly to the thoughts that give you pause: Resonant, Curious, Insightful, or Poetic, accompanied by your handwritten note.
              </p>
            </div>
          </div>

          <div className="pt-2 text-center text-xs text-stone-500 font-serif italic">
            Welcome to dating restored to dignity.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-ivory-100 border-t border-sand-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-burgundy-900 hover:bg-burgundy-950 text-ivory-50 text-xs font-medium transition-all"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
