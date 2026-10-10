'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../components/Header';
import { DiscoveryView } from '../components/DiscoveryView';
import { MatchesView } from '../components/MatchesView';
import { PromptReactionModal } from '../components/PromptReactionModal';
import { MatchCelebrationModal } from '../components/MatchCelebrationModal';
import { ConversationModal } from '../components/ConversationModal';
import { UserProfileModal } from '../components/UserProfileModal';
import { ManifestoModal } from '../components/ManifestoModal';
import { Toast, ToastMessage } from '../components/Toast';
import { PROFILES, INITIAL_SUGGESTED_STARTERS, INITIAL_SELF_PROFILE } from '../data/profiles';
import { Profile, PromptAnswer, UserReaction, Match, Message, UserSelfProfile } from '../types';

export default function DatingApp() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'discovery' | 'matches'>('discovery');

  // Deck state
  const [deckProfiles] = useState<Profile[]>(PROFILES);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [skippedProfileIds, setSkippedProfileIds] = useState<string[]>([]);

  // Matches & interactions
  const [matches, setMatches] = useState<Match[]>([]);
  const [reactions, setReactions] = useState<Record<string, UserReaction>>({});
  const [selfProfile, setSelfProfile] = useState<UserSelfProfile>(INITIAL_SELF_PROFILE);

  // Modals & Feedback
  const [reactionModalProfile, setReactionModalProfile] = useState<Profile | null>(null);
  const [reactionModalPrompt, setReactionModalPrompt] = useState<PromptAnswer | null>(null);
  
  const [celebrationProfile, setCelebrationProfile] = useState<Profile | null>(null);
  const [activeConversationMatch, setActiveConversationMatch] = useState<Match | null>(null);
  const [isSelfProfileOpen, setIsSelfProfileOpen] = useState(false);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Load persisted state from localStorage on client mount
  useEffect(() => {
    try {
      const savedMatches = localStorage.getItem('irl_matches');
      const savedReactions = localStorage.getItem('irl_reactions');
      const savedSkipped = localStorage.getItem('irl_skipped');
      const savedIndex = localStorage.getItem('irl_current_index');
      const savedSelf = localStorage.getItem('irl_self_profile');

      if (savedMatches) setMatches(JSON.parse(savedMatches));
      if (savedReactions) setReactions(JSON.parse(savedReactions));
      if (savedSkipped) setSkippedProfileIds(JSON.parse(savedSkipped));
      if (savedIndex) setCurrentIndex(parseInt(savedIndex, 10));
      if (savedSelf) setSelfProfile(JSON.parse(savedSelf));
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

  // Save to localStorage when matches, reactions, or skipped change
  const saveState = (
    newMatches: Match[],
    newReactions: Record<string, UserReaction>,
    newSkipped: string[],
    newIndex: number
  ) => {
    try {
      localStorage.setItem('irl_matches', JSON.stringify(newMatches));
      localStorage.setItem('irl_reactions', JSON.stringify(newReactions));
      localStorage.setItem('irl_skipped', JSON.stringify(newSkipped));
      localStorage.setItem('irl_current_index', newIndex.toString());
    } catch (e) {
      console.warn('Could not write to localStorage', e);
    }
  };

  const handleSaveSelfProfile = (newSelf: UserSelfProfile) => {
    setSelfProfile(newSelf);
    try {
      localStorage.setItem('irl_self_profile', JSON.stringify(newSelf));
    } catch (e) {
      console.warn('Could not write self profile', e);
    }
    setToast({
      id: Date.now().toString(),
      type: 'info',
      title: 'Dossier Updated',
      description: 'Your personality answers and intention are saved.',
    });
  };

  const currentProfile = currentIndex < deckProfiles.length ? deckProfiles[currentIndex] : null;

  // LIKING / CONNECTING
  const handleLike = useCallback((profile: Profile) => {
    // Check if already matched
    const alreadyMatched = matches.some((m) => m.profile.id === profile.id);
    let updatedMatches = matches;

    if (!alreadyMatched) {
      const newMatch: Match = {
        profile,
        matchedAt: 'Just now',
        messages: [],
        suggestedStarters: INITIAL_SUGGESTED_STARTERS[profile.id] || [
          `Hello ${profile.name.split(' ')[0]}, I loved reading about your perspective on ${profile.sharedValue.title}.`,
          `Your answer on what emotional safety feels like resonated deeply.`,
          `Would love to hear more about your everyday rhythms and rituals.`
        ],
        sparkPrompt: {
          promptText: profile.prompts[0].prompt,
          answerText: profile.prompts[0].answer,
        },
      };
      updatedMatches = [newMatch, ...matches];
      setMatches(updatedMatches);
      setCelebrationProfile(profile);
    }

    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);
    saveState(updatedMatches, reactions, skippedProfileIds, nextIdx);

    setToast({
      id: Date.now().toString(),
      type: 'like',
      title: `Connected with ${profile.name}`,
      description: `Mutual affinity rooted in ${profile.sharedValue.title}.`,
    });
  }, [matches, currentIndex, reactions, skippedProfileIds]);

  // SKIPPING
  const handleSkip = useCallback((profile: Profile) => {
    const newSkipped = [...skippedProfileIds, profile.id];
    setSkippedProfileIds(newSkipped);

    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);
    saveState(matches, reactions, newSkipped, nextIdx);

    setToast({
      id: Date.now().toString(),
      type: 'skip',
      title: `Passed on ${profile.name.split(' ')[0]} for now`,
      description: 'You can rewind today’s curation at any time.',
    });
  }, [skippedProfileIds, currentIndex, matches, reactions]);

  // REACTING TO AN ANSWER
  const handleOpenReactionModal = (profile: Profile, prompt: PromptAnswer) => {
    setReactionModalProfile(profile);
    setReactionModalPrompt(prompt);
  };

  const handleSubmitReaction = (
    promptId: string,
    reactionType: 'resonant' | 'curious' | 'insightful' | 'poetic',
    note: string
  ) => {
    if (!reactionModalProfile) return;

    const matchedPrompt = reactionModalProfile.prompts.find((p) => p.id === promptId) || reactionModalPrompt || reactionModalProfile.prompts[0];
    const key = `${reactionModalProfile.id}-${promptId}`;
    const newReaction: UserReaction = {
      profileId: reactionModalProfile.id,
      promptId,
      promptText: matchedPrompt.prompt,
      reactionType,
      note,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedReactions = { ...reactions, [key]: newReaction };
    setReactions(updatedReactions);

    // Reacting to a prompt also creates or enriches a match connection!
    const alreadyMatched = matches.some((m) => m.profile.id === reactionModalProfile.id);
    let updatedMatches = matches;

    if (!alreadyMatched) {
      const newMatch: Match = {
        profile: reactionModalProfile,
        matchedAt: 'Just now',
        messages: note ? [{
          id: Date.now().toString(),
          sender: 'user',
          text: `Reacted [${reactionType.toUpperCase()}]: “${note}”`,
          timestamp: 'Just now',
          isStarter: true,
        }] : [],
        suggestedStarters: INITIAL_SUGGESTED_STARTERS[reactionModalProfile.id] || [],
        sparkPrompt: {
          promptText: matchedPrompt.prompt,
          answerText: matchedPrompt.answer,
          userReaction: reactionType,
          userNote: note,
        },
      };
      updatedMatches = [newMatch, ...matches];
      setMatches(updatedMatches);
      setCelebrationProfile(reactionModalProfile);
    }

    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);
    saveState(updatedMatches, updatedReactions, skippedProfileIds, nextIdx);

    setToast({
      id: Date.now().toString(),
      type: 'react',
      title: `Sent reaction to ${reactionModalProfile.name.split(' ')[0]}`,
      description: `“${matchedPrompt.prompt.slice(0, 36)}...”`,
    });
  };

  // SENDING MESSAGE IN CONVERSATION
  const handleSendMessage = (matchId: string, text: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isReply = text.startsWith('Thank you for asking that') || text.startsWith('That means a lot') || text.startsWith('Oh, I love') || text.startsWith('It is wonderful') || text.startsWith('You completely get it') || text.startsWith('I was just looking up') || text.startsWith('Thank you for reaching out');

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: isReply ? 'match' : 'user',
      text,
      timestamp: timeStr,
    };

    const updatedMatches = matches.map((m) => {
      if (m.profile.id === matchId) {
        return {
          ...m,
          messages: [...m.messages, newMessage],
        };
      }
      return m;
    });

    setMatches(updatedMatches);
    saveState(updatedMatches, reactions, skippedProfileIds, currentIndex);

    if (activeConversationMatch && activeConversationMatch.profile.id === matchId) {
      setActiveConversationMatch({
        ...activeConversationMatch,
        messages: [...activeConversationMatch.messages, newMessage],
      });
    }
  };

  // RESET DECK
  const handleResetDeck = () => {
    setCurrentIndex(0);
    setSkippedProfileIds([]);
    saveState(matches, reactions, [], 0);
    setActiveTab('discovery');
    setToast({
      id: Date.now().toString(),
      type: 'info',
      title: 'Daily Curation Rewound',
      description: 'You can explore all member dossiers fresh.',
    });
  };

  // Starting chat from celebration modal
  const handleStartChatFromCelebration = (profile: Profile) => {
    setCelebrationProfile(null);
    setActiveTab('matches');
    const matched = matches.find((m) => m.profile.id === profile.id);
    if (matched) {
      setActiveConversationMatch(matched);
    }
  };

  // Keyboard shortcut listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'Escape') {
        setReactionModalProfile(null);
        setCelebrationProfile(null);
        setActiveConversationMatch(null);
        setIsSelfProfileOpen(false);
        setIsManifestoOpen(false);
      } else if (e.key === 'ArrowLeft' && activeTab === 'discovery' && currentProfile && !reactionModalProfile && !celebrationProfile && !activeConversationMatch && !isSelfProfileOpen && !isManifestoOpen) {
        handleSkip(currentProfile);
      } else if (e.key === 'ArrowRight' && activeTab === 'discovery' && currentProfile && !reactionModalProfile && !celebrationProfile && !activeConversationMatch && !isSelfProfileOpen && !isManifestoOpen) {
        handleLike(currentProfile);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, currentProfile, reactionModalProfile, celebrationProfile, activeConversationMatch, isSelfProfileOpen, isManifestoOpen, handleLike, handleSkip]);

  return (
    <div className="min-h-screen bg-ivory-100 flex flex-col justify-between selection:bg-burgundy-100 selection:text-burgundy-900">
      {/* Editorial Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        matchCount={matches.length}
        onResetDeck={handleResetDeck}
        onOpenSelfProfile={() => setIsSelfProfileOpen(true)}
        onOpenManifesto={() => setIsManifestoOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'discovery' ? (
          <DiscoveryView
            currentProfile={currentProfile}
            currentIndex={currentIndex}
            totalProfiles={deckProfiles.length}
            reactions={reactions}
            onLike={handleLike}
            onSkip={handleSkip}
            onOpenReactionModal={handleOpenReactionModal}
            onResetDeck={handleResetDeck}
            onViewMatches={() => setActiveTab('matches')}
            hasMatches={matches.length > 0}
          />
        ) : (
          <MatchesView
            matches={matches}
            onOpenConversation={(match) => setActiveConversationMatch(match)}
            onGoToDiscovery={() => setActiveTab('discovery')}
          />
        )}
      </main>

      {/* Modals & Sheets */}
      {reactionModalProfile && (
        <PromptReactionModal
          isOpen={!!reactionModalProfile}
          onClose={() => {
            setReactionModalProfile(null);
            setReactionModalPrompt(null);
          }}
          profile={reactionModalProfile}
          prompt={reactionModalPrompt}
          onSubmitReaction={handleSubmitReaction}
        />
      )}

      {celebrationProfile && (
        <MatchCelebrationModal
          isOpen={!!celebrationProfile}
          profile={celebrationProfile}
          onStartChat={handleStartChatFromCelebration}
          onContinueExploring={() => setCelebrationProfile(null)}
        />
      )}

      {activeConversationMatch && (
        <ConversationModal
          isOpen={!!activeConversationMatch}
          onClose={() => setActiveConversationMatch(null)}
          match={activeConversationMatch}
          onSendMessage={handleSendMessage}
        />
      )}

      {/* User Dossier Modal */}
      <UserProfileModal
        isOpen={isSelfProfileOpen}
        onClose={() => setIsSelfProfileOpen(false)}
        selfProfile={selfProfile}
        onSaveProfile={handleSaveSelfProfile}
      />

      {/* Manifesto Modal */}
      <ManifestoModal
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
