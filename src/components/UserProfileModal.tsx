'use client';

import React, { useState } from 'react';
import { X, User, Compass, Heart, Save, CheckCircle, Feather, BookOpen } from 'lucide-react';
import { UserSelfProfile } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  selfProfile: UserSelfProfile;
  onSaveProfile: (profile: UserSelfProfile) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  selfProfile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<UserSelfProfile>(selfProfile);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-ivory-50 rounded-3xl shadow-editorial-xl border border-sand-300 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-sand-200 flex items-start justify-between bg-ivory-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-widest-editorial text-burgundy-900 font-semibold font-mono">
                {formData.memberNumber}
              </span>
              <span className="text-sand-300">·</span>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider">
                Member Dossier
              </span>
            </div>
            <h3 className="font-serif text-2xl text-stone-900 font-normal mt-0.5">
              Your Personality Dossier
            </h3>
            <p className="text-xs text-stone-500 italic mt-0.5">
              This is how other members discover your mind before your face.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-sand-200/50 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Identity Info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-semibold text-stone-500 uppercase tracking-widest-editorial mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs sm:text-sm p-3 rounded-2xl bg-white border border-sand-300 focus:outline-none focus:ring-1 focus:ring-burgundy-900 text-stone-800"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-stone-500 uppercase tracking-widest-editorial mb-1">
                Location & Pronouns
              </label>
              <input
                type="text"
                value={`${formData.location} · ${formData.pronouns}`}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full text-xs sm:text-sm p-3 rounded-2xl bg-white border border-sand-300 focus:outline-none focus:ring-1 focus:ring-burgundy-900 text-stone-800"
              />
            </div>
          </div>

          {/* Relationship Intention */}
          <div>
            <label className="block text-[10px] font-semibold text-stone-500 uppercase tracking-widest-editorial mb-1">
              Your Relationship Intention
            </label>
            <textarea
              rows={2}
              value={formData.relationshipIntention}
              onChange={(e) => setFormData({ ...formData, relationshipIntention: e.target.value })}
              className="w-full text-xs sm:text-sm p-3.5 rounded-2xl bg-white border border-sand-300 focus:outline-none focus:ring-1 focus:ring-burgundy-900 text-stone-800 leading-relaxed"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-[10px] font-semibold text-stone-500 uppercase tracking-widest-editorial mb-1">
              Bio & Worldview
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full text-xs sm:text-sm p-3.5 rounded-2xl bg-white border border-sand-300 focus:outline-none focus:ring-1 focus:ring-burgundy-900 text-stone-800 leading-relaxed"
            />
          </div>

          {/* Core Values */}
          <div>
            <label className="block text-[10px] font-semibold text-stone-500 uppercase tracking-widest-editorial mb-2">
              Foundational Values
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.coreValues.map((v, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-full bg-ivory-100 border border-sand-300 text-stone-800 text-xs font-medium"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Prompts list */}
          <div className="space-y-4">
            <label className="block text-[10px] font-semibold text-stone-500 uppercase tracking-widest-editorial">
              Your Three Thoughtful Prompts
            </label>
            {formData.prompts.map((p, idx) => (
              <div key={p.id} className="p-4 rounded-2xl bg-white border border-sand-200 shadow-editorial space-y-2">
                <span className="text-[10px] uppercase font-mono text-champagne-600 font-semibold block">
                  Prompt 0{idx + 1}
                </span>
                <p className="text-xs font-serif italic text-stone-900">“{p.prompt}”</p>
                <textarea
                  rows={2}
                  value={p.answer}
                  onChange={(e) => {
                    const newPrompts = [...formData.prompts];
                    newPrompts[idx] = { ...p, answer: e.target.value };
                    setFormData({ ...formData, prompts: newPrompts });
                  }}
                  className="w-full text-xs p-3 rounded-xl bg-ivory-100/70 border border-sand-300 focus:outline-none focus:ring-1 focus:ring-burgundy-900 text-stone-800"
                />
              </div>
            ))}
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-ivory-100 border-t border-sand-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-burgundy-900 hover:bg-burgundy-950 text-ivory-50 text-xs sm:text-sm font-medium shadow-sm transition-all"
          >
            {isSaved ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Changes Saved' : 'Save Dossier'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
