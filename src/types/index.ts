export interface PromptAnswer {
  id: string;
  prompt: string;
  answer: string;
  category?: 'mindset' | 'vulnerability' | 'quirk' | 'lifestyle';
}

export interface SharedValue {
  title: string;
  explanation: string;
  tag: string;
}

export interface ProfilePhoto {
  url: string;
  fallbackUrl: string;
  caption: string;
  locationContext: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  pronouns: string;
  location: string;
  occupation: string;
  memberNumber: string;
  relationshipIntention: string;
  intentionTag: string;
  bio: string;
  inBetweenEssay?: string;
  coreValues: string[];
  sharedValue: SharedValue;
  prompts: PromptAnswer[];
  dailyRhythm: {
    morning: string;
    evening: string;
    unwinding: string;
  };
  details: {
    education?: string;
    languages?: string[];
    currentlyReading?: string;
    currentListen?: string;
    weekendRitual?: string;
    idealConversationTopic?: string;
  };
  photo: ProfilePhoto;
  secondaryPhoto?: ProfilePhoto;
}

export interface UserReaction {
  profileId: string;
  promptId: string;
  promptText: string;
  reactionType: 'resonant' | 'curious' | 'insightful' | 'poetic' | 'relatable' | 'witty';
  note?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'match';
  text: string;
  timestamp: string;
  isStarter?: boolean;
}

export interface Match {
  profile: Profile;
  matchedAt: string;
  sparkPrompt?: {
    promptText: string;
    answerText: string;
    userReaction?: string;
    userNote?: string;
  };
  messages: Message[];
  suggestedStarters: string[];
}

export interface UserSelfProfile {
  name: string;
  age: number;
  pronouns: string;
  location: string;
  occupation: string;
  memberNumber: string;
  relationshipIntention: string;
  bio: string;
  coreValues: string[];
  prompts: PromptAnswer[];
}
