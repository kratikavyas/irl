'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  Compass, 
  BookOpen, 
  Clock, 
  MapPin, 
  Briefcase, 
  CheckCircle,
  Eye,
  RefreshCw,
  Music,
  Quote,
  Feather,
  ChevronDown
} from 'lucide-react';
import { Profile, PromptAnswer, UserReaction } from '../types';

interface DiscoveryViewProps {
  currentProfile: Profile | null;
  currentIndex: number;
  totalProfiles: number;
  reactions: Record<string, UserReaction>;
  onLike: (profile: Profile) => void;
  onSkip: (profile: Profile) => void;
  onOpenReactionModal: (profile: Profile, prompt: PromptAnswer) => void;
  onResetDeck: () => void;
  onViewMatches: () => void;
  hasMatches: boolean;
}

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({
  currentProfile,
  currentIndex,
  totalProfiles,
  reactions,
  onLike,
  onSkip,
  onOpenReactionModal,
  onResetDeck,
  onViewMatches,
  hasMatches,
}) => {
  const [primaryImageLoaded, setPrimaryImageLoaded] = useState(false);
  const [primaryImageError, setPrimaryImageError] = useState(false);
  const [secondaryImageLoaded, setSecondaryImageLoaded] = useState(false);
  const [secondaryImageError, setSecondaryImageError] = useState(false);

  // If all profiles explored
  if (!currentProfile) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-ivory-200 border border-sand-300 flex items-center justify-center">
          <BookOpen className="w-7 h-7 text-burgundy-900" />
        </div>

        <span className="text-[10px] uppercase tracking-widest-editorial text-burgundy-900 font-semibold">
          Daily Curation Concluded
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light mt-2 mb-4 tracking-tight">
          You’ve explored all minds for today.
        </h2>

        <p className="text-sm text-stone-600 leading-relaxed max-w-md mx-auto mb-8 font-normal">
          In a world conditioned to judge in split-seconds, reading someone’s inner world first is an act of rare care. Review your connections or rewind the curation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onResetDeck}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-burgundy-900 hover:bg-burgundy-950 text-ivory-50 text-xs sm:text-sm font-medium shadow-sm transition-all flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Rewind & Re-Explore</span>
          </button>

          {hasMatches && (
            <button
              onClick={onViewMatches}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-sand-300 hover:bg-ivory-200 text-stone-800 text-xs sm:text-sm font-medium transition-all flex items-center justify-center space-x-2"
            >
              <Heart className="w-4 h-4 text-burgundy-800" />
              <span>Review Your Matches</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 pb-36 pt-4 sm:pt-6 animate-fade-in">
      {/* Editorial Curation Header Marker */}
      <div className="flex items-center justify-between text-xs text-stone-500 mb-5 px-1 border-b border-sand-200 pb-3">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-[10px] uppercase tracking-widest-editorial text-burgundy-900 font-medium">
            Dossier 0{currentIndex + 1} of 0{totalProfiles}
          </span>
          <span className="text-sand-300">·</span>
          <span className="text-[10px] text-stone-400 uppercase tracking-wider">
            {currentProfile.memberNumber}
          </span>
        </div>
        <div className="flex items-center space-x-1.5 text-[10px] text-stone-500 italic">
          <Feather className="w-3 h-3 text-champagne-600" />
          <span>Mind first · Face below</span>
        </div>
      </div>

      {/* Main Profile Article */}
      <article className="space-y-6">
        {/* SECTION 1: Identity & Relationship Intention */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
          {/* Intention Pill */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-ivory-200 text-burgundy-950 text-[11px] font-medium border border-sand-300 mb-4">
            <Compass className="w-3.5 h-3.5 text-champagne-600" />
            <span className="font-semibold text-burgundy-900">{currentProfile.intentionTag}:</span>
            <span className="text-stone-700">{currentProfile.relationshipIntention}</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight">
                {currentProfile.name}, <span className="italic font-light text-stone-500">{currentProfile.age}</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs sm:text-sm text-stone-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-stone-400" />
                {currentProfile.occupation}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                {currentProfile.location}
              </span>
              <span>·</span>
              <span className="text-stone-400 italic">{currentProfile.pronouns}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-5 pt-5 border-t border-sand-200">
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
              {currentProfile.bio}
            </p>
          </div>
        </section>

        {/* SECTION 2: "The In-Between" — IRL Signature Philosophy Excerpt */}
        {currentProfile.inBetweenEssay && (
          <section className="bg-ivory-50 rounded-3xl p-6 sm:p-7 border border-champagne-300/80 shadow-editorial relative overflow-hidden">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne-500" />
                <span className="text-[10px] uppercase tracking-widest-editorial font-bold text-burgundy-950">
                  The In-Between
                </span>
              </div>
              <span className="text-[10px] text-stone-400 italic">
                In unscripted quiet moments
              </span>
            </div>

            <p className="font-serif text-stone-800 text-sm sm:text-base leading-relaxed italic">
              “{currentProfile.inBetweenEssay}”
            </p>
          </section>
        )}

        {/* SECTION 3: Mutual Ground / Values Compatibility */}
        <section className="bg-burgundy-50/70 rounded-3xl p-6 sm:p-7 border border-burgundy-200/80 shadow-editorial relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-burgundy-800" />
              <span className="text-[10px] uppercase tracking-widest-editorial font-bold text-burgundy-900">
                {currentProfile.sharedValue.tag}
              </span>
            </div>
            <span className="text-[10px] text-stone-500 italic">
              Philosophical affinity
            </span>
          </div>

          <h2 className="font-serif text-lg sm:text-xl font-medium text-burgundy-950 mb-2">
            {currentProfile.sharedValue.title}
          </h2>

          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
            {currentProfile.sharedValue.explanation}
          </p>

          <div className="mt-3.5 pt-3 border-t border-burgundy-200/60 flex items-center gap-2 text-[11px] text-burgundy-900/80 italic">
            <CheckCircle className="w-3.5 h-3.5 text-burgundy-700 flex-shrink-0" />
            <span>Rooted in shared worldview rather than algorithmic vanity.</span>
          </div>
        </section>

        {/* SECTION 4: Foundational Core Values Badges */}
        <section className="bg-white rounded-3xl p-6 border border-sand-200 shadow-editorial">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 flex items-center justify-between">
            <span>Foundational Values</span>
            <span className="text-[10px] font-normal text-stone-400 lowercase">non-negotiables</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentProfile.coreValues.map((val, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-full bg-ivory-100 border border-sand-300 text-stone-800 text-xs font-medium hover:border-burgundy-300 transition-colors"
              >
                {val}
              </span>
            ))}
          </div>
        </section>

        {/* SECTION 5: Three Thoughtful Personality Prompts */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Three Questions on the Mind
            </h3>
            <span className="text-[11px] text-stone-400 italic">
              Tap any answer to react directly
            </span>
          </div>

          {currentProfile.prompts.map((p, idx) => {
            const reaction = reactions[`${currentProfile.id}-${p.id}`];
            return (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-200 shadow-editorial transition-all hover:border-sand-300 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase tracking-wider text-champagne-600 font-semibold font-mono">
                      Prompt 0{idx + 1}
                    </span>
                    {p.category && (
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                        · {p.category}
                      </span>
                    )}
                  </div>

                  {reaction && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-900 text-[10px] font-medium">
                      <Heart className="w-3 h-3 fill-burgundy-800 text-burgundy-800" />
                      Reacted: {reaction.reactionType}
                    </span>
                  )}
                </div>

                <h4 className="font-serif text-base sm:text-lg text-stone-900 font-normal italic mb-3">
                  “{p.prompt}”
                </h4>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mb-4">
                  {p.answer}
                </p>

                {/* React to answer button */}
                <div className="pt-3 border-t border-sand-200 flex items-center justify-between">
                  <button
                    onClick={() => onOpenReactionModal(currentProfile, p)}
                    className="inline-flex items-center space-x-1.5 text-xs font-medium text-burgundy-900 hover:text-burgundy-950 transition-colors py-1.5 px-3 rounded-full bg-ivory-100 hover:bg-ivory-200 border border-sand-300"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-burgundy-800" />
                    <span>{reaction ? 'Review or edit your reaction' : 'React to this thought'}</span>
                  </button>

                  <span className="text-[11px] text-stone-400 italic hidden sm:inline">
                    Spark conversation
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {/* SECTION 6: Daily Rhythm & Everyday Presence */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-200 shadow-editorial space-y-4">
          <div className="flex items-center space-x-2 text-stone-800">
            <Clock className="w-4 h-4 text-champagne-600" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Daily Rhythm & Quiet Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
            <div className="p-3.5 rounded-2xl bg-ivory-100 border border-sand-300/70">
              <span className="text-[10px] uppercase font-semibold text-stone-500 block mb-1">
                Morning Cadence
              </span>
              <p className="text-stone-800 leading-relaxed font-normal">
                {currentProfile.dailyRhythm.morning}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-ivory-100 border border-sand-300/70">
              <span className="text-[10px] uppercase font-semibold text-stone-500 block mb-1">
                Evening & Unwinding
              </span>
              <p className="text-stone-800 leading-relaxed font-normal">
                {currentProfile.dailyRhythm.unwinding}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentProfile.details.currentlyReading && (
              <div className="p-3.5 rounded-2xl bg-ivory-50 border border-sand-300/70 flex items-start space-x-2.5">
                <BookOpen className="w-4 h-4 text-burgundy-900 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-500 block">
                    On the Nightstand
                  </span>
                  <p className="text-xs text-stone-800 font-medium">
                    {currentProfile.details.currentlyReading}
                  </p>
                </div>
              </div>
            )}

            {currentProfile.details.currentListen && (
              <div className="p-3.5 rounded-2xl bg-ivory-50 border border-sand-300/70 flex items-start space-x-2.5">
                <Music className="w-4 h-4 text-champagne-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-500 block">
                    Current Rotation
                  </span>
                  <p className="text-xs text-stone-800 font-medium">
                    {currentProfile.details.currentListen}
                  </p>
                </div>
              </div>
            )}
          </div>

          {currentProfile.details.idealConversationTopic && (
            <div className="p-3.5 rounded-2xl bg-ivory-100/70 border border-sand-300/70">
              <span className="text-[10px] uppercase font-semibold text-stone-500 block mb-1">
                Conversational Rabbit Hole
              </span>
              <p className="text-xs text-stone-800 italic">
                “{currentProfile.details.idealConversationTopic}”
              </p>
            </div>
          )}
        </section>

        {/* SECTION 7: The Reveal — "The Face Behind the Mind" (Strictly further down!) */}
        <section className="pt-8 pb-4">
          {/* Editorial divider and intentional pause */}
          <div className="text-center space-y-2 mb-6">
            <div className="flex items-center justify-center space-x-3 text-sand-300">
              <div className="h-px w-12 bg-sand-300" />
              <Eye className="w-4 h-4 text-burgundy-900" />
              <div className="h-px w-12 bg-sand-300" />
            </div>
            <span className="text-[10px] uppercase tracking-widest-editorial text-burgundy-900 font-semibold block">
              The Reveal
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-light">
              Now that you know how {currentProfile.name.split(' ')[0]} thinks...
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              You’ve discovered their values, rhythm, and vulnerabilities. Here is the face behind the mind.
            </p>
          </div>

          {/* Primary Photo Card with authentic editorial styling */}
          <div className="bg-white rounded-3xl p-3 sm:p-4 border border-sand-200 shadow-editorial-lg overflow-hidden mb-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-ivory-200">
              <img
                src={primaryImageError ? currentProfile.photo.fallbackUrl : currentProfile.photo.url}
                alt={currentProfile.name}
                onError={() => setPrimaryImageError(true)}
                onLoad={() => setPrimaryImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  primaryImageLoaded ? 'opacity-100' : 'opacity-90'
                }`}
              />

              {/* Location badge on photo */}
              <div className="absolute top-3 left-3 bg-stone-950/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-medium text-ivory-100 border border-white/20">
                {currentProfile.photo.locationContext}
              </div>
            </div>

            {/* Authentic caption */}
            <div className="p-3.5 text-center">
              <p className="text-xs text-stone-600 font-serif italic">
                “{currentProfile.photo.caption}”
              </p>
            </div>
          </div>

          {/* Secondary slice of life photo (if present) */}
          {currentProfile.secondaryPhoto && (
            <div className="bg-white rounded-3xl p-3 sm:p-4 border border-sand-200 shadow-editorial overflow-hidden">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-ivory-200">
                <img
                  src={secondaryImageError ? currentProfile.secondaryPhoto.fallbackUrl : currentProfile.secondaryPhoto.url}
                  alt={`${currentProfile.name} candid`}
                  onError={() => setSecondaryImageError(true)}
                  onLoad={() => setSecondaryImageLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    secondaryImageLoaded ? 'opacity-100' : 'opacity-90'
                  }`}
                />
                <div className="absolute top-3 left-3 bg-stone-950/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-medium text-ivory-100 border border-white/20">
                  {currentProfile.secondaryPhoto.locationContext}
                </div>
              </div>
              <div className="p-3 text-center">
                <p className="text-[11px] text-stone-500 font-serif italic">
                  “{currentProfile.secondaryPhoto.caption}”
                </p>
              </div>
            </div>
          )}
        </section>
      </article>

      {/* Floating Remote Action Bar */}
      <aside aria-label="Profile actions" className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 w-11/12 max-w-md">
        <div className="bg-white/95 backdrop-blur-md p-2 rounded-full border border-sand-300 shadow-editorial-xl flex items-center justify-between gap-2 ring-1 ring-sand-200">
          {/* Skip Button */}
          <button
            onClick={() => onSkip(currentProfile)}
            className="flex-1 py-3 px-4 rounded-full border border-sand-200 hover:bg-ivory-200 text-stone-700 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center space-x-1.5 group"
            title="Pass to next profile"
          >
            <span>Pass for now</span>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* React to prompt trigger */}
          <button
            onClick={() => onOpenReactionModal(currentProfile, currentProfile.prompts[0])}
            className="p-3 rounded-full hover:bg-ivory-200 text-stone-700 border border-sand-200 transition-colors"
            title="React to an answer"
          >
            <MessageSquare className="w-4 h-4 text-champagne-600" />
          </button>

          {/* Connect Button */}
          <button
            onClick={() => onLike(currentProfile)}
            className="flex-1 py-3 px-5 rounded-full bg-burgundy-900 hover:bg-burgundy-950 text-ivory-50 text-xs sm:text-sm font-medium shadow-sm transition-all flex items-center justify-center space-x-2"
            title="Connect with this mind"
          >
            <Heart className="w-4 h-4 fill-ivory-50" />
            <span>Connect</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
