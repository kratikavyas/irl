'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, Heart, ArrowRight, MessageSquare, X, Sparkles } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'like' | 'skip' | 'react' | 'match' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4200);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'like':
      case 'match':
        return <Heart className="w-4 h-4 text-burgundy-600 fill-burgundy-600" />;
      case 'skip':
        return <ArrowRight className="w-4 h-4 text-stone-400" />;
      case 'react':
        return <Sparkles className="w-4 h-4 text-champagne-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-champagne-500" />;
    }
  };

  return (
    <div className="fixed bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm pointer-events-none transition-all duration-300 transform translate-y-0 opacity-100 animate-fade-in">
      <div className="pointer-events-auto bg-stone-950/95 backdrop-blur-md text-ivory-50 px-4 py-3 rounded-2xl shadow-editorial-xl border border-stone-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-ivory-50/10 rounded-full flex-shrink-0">
            {getIcon()}
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium tracking-tight text-ivory-100">
              {toast.title}
            </p>
            {toast.description && (
              <p className="text-[11px] text-stone-400 mt-0.5 line-clamp-1">
                {toast.description}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-ivory-50 p-1 rounded-full transition-colors"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
