'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, Sparkles, ArrowRight, Compass, Clock, CheckCircle2, Feather } from 'lucide-react';
import { Match, Profile } from '../types';

interface MatchesViewProps {
  matches: Match[];
  onOpenConversation: (match: Match) => void;
  onGoToDiscovery: () => void;
}

export const MatchesView: React.FC<MatchesViewProps> = ({
  matches,
  onOpenConversation,
  onGoToDiscovery,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'starters'>('all');

  const filteredMatches = matches.filter((m) => {
    if (filter === 'active') return m.messages.length > 0;
    if (filter === 'starters') return m.messages.length === 0;
    return true;
  });

  if (matches.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-ivory-200 border border-sand-300 flex items-center justify-center">
          <Heart className="w-7 h-7 text-stone-400" />
        </div>

        <span className="text-[10px] uppercase tracking-widest-editorial text-burgundy-900 font-semibold font-mono">
          Quiet Chamber
        </span>

        <h2 className="font-serif text-3xl text-stone-900 font-light mt-1 mb-3">
          No connections formed yet.
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm mx-auto mb-8 font-normal">
          In <em className="font-serif text-burgundy-900">IRL</em>, connections aren’t manufactured by endless swiping. Connect with someone or react to their prompts in the Discover tab to create mutual ground.
        </p>

        <button
          onClick={onGoToDiscovery}
          className="px-6 py-3 rounded-full bg-burgundy-900 hover:bg-burgundy-950 text-ivory-50 text-xs sm:text-sm font-medium shadow-sm transition-all inline-flex items-center space-x-2"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Today's Dossiers</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8 animate-fade-in pb-28">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 border-b border-sand-200 pb-4 gap-3">
        <div>
          <span className="text-[10px] uppercase tracking-widest-editorial text-burgundy-900 font-semibold font-mono">
            Meaningful Connections
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal mt-0.5">
            Your Connections ({matches.length})
          </h1>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === 'all'
                ? 'bg-burgundy-900 text-ivory-50'
                : 'bg-ivory-200 text-stone-600 hover:bg-ivory-300/60'
            }`}
          >
            All ({matches.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === 'active'
                ? 'bg-burgundy-900 text-ivory-50'
                : 'bg-ivory-200 text-stone-600 hover:bg-ivory-300/60'
            }`}
          >
            Active Chats
          </button>
          <button
            onClick={() => setFilter('starters')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === 'starters'
                ? 'bg-burgundy-900 text-ivory-50'
                : 'bg-ivory-200 text-stone-600 hover:bg-ivory-300/60'
            }`}
          >
            New Sparks
          </button>
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {filteredMatches.map((match) => {
          const { profile, messages, sparkPrompt, suggestedStarters } = match;
          const hasMessages = messages.length > 0;
          const lastMessage = hasMessages ? messages[messages.length - 1] : null;

          return (
            <div
              key={profile.id}
              onClick={() => onOpenConversation(match)}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-sand-200 shadow-editorial hover:shadow-editorial-lg hover:border-sand-300 transition-all cursor-pointer group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Person details */}
                <div className="flex items-start space-x-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={profile.photo.url}
                      alt={profile.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-sand-300"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-burgundy-900 text-ivory-50 p-1 rounded-full shadow-sm">
                      <Heart className="w-3 h-3 fill-ivory-50" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline space-x-2">
                      <h3 className="font-serif text-lg sm:text-xl text-stone-900 font-medium group-hover:text-burgundy-900 transition-colors">
                        {profile.name}
                      </h3>
                      <span className="text-xs text-stone-500">
                        {profile.age} · {profile.location.split(',')[0]}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 font-medium">
                      {profile.occupation}
                    </p>

                    {/* Shared Value badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-burgundy-50 border border-burgundy-200/80 text-[11px] text-burgundy-900 font-medium">
                      <Sparkles className="w-3 h-3 text-burgundy-800" />
                      <span>{profile.sharedValue.title}</span>
                    </div>
                  </div>
                </div>

                {/* Status & CTA */}
                <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-sand-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenConversation(match);
                    }}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-burgundy-900 text-ivory-50 hover:bg-burgundy-950 text-xs font-medium transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{hasMessages ? 'Open Chat' : 'Start Conversation'}</span>
                  </button>

                  <span className="text-[10px] text-stone-400 mt-2 block italic font-mono">
                    {profile.memberNumber} · {match.matchedAt}
                  </span>
                </div>
              </div>

              {/* Spark preview / Last message snippet */}
              <div className="mt-4 pt-3.5 border-t border-sand-200/80 bg-ivory-100/60 rounded-2xl p-3 text-xs">
                {lastMessage ? (
                  <div className="flex items-start space-x-2 text-stone-700">
                    <MessageCircle className="w-3.5 h-3.5 text-burgundy-800 flex-shrink-0 mt-0.5" />
                    <p className="line-clamp-1 italic">
                      <strong className="font-semibold text-stone-900 not-italic">
                        {lastMessage.sender === 'user' ? 'You: ' : `${profile.name.split(' ')[0]}: `}
                      </strong>
                      “{lastMessage.text}”
                    </p>
                  </div>
                ) : (
                  <div className="flex items-start space-x-2 text-stone-600">
                    <Feather className="w-3.5 h-3.5 text-champagne-600 flex-shrink-0 mt-0.5" />
                    <div className="line-clamp-1">
                      <span className="font-medium text-stone-800">Conversation Starter: </span>
                      <span className="italic">“{suggestedStarters[0]}”</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
