import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { RotateCcw, Plus, Trash2 } from 'lucide-react';
import { FeelingCMSItem } from '../../../types/cms';

export const AudienceFeelingsTab: React.FC = () => {
  const { content, updateSection, resetSection } = useCMS();
  const { audienceFeelings } = content;

  const handleUpdateFeeling = (idx: number, updates: Partial<FeelingCMSItem>) => {
    const updated = [...audienceFeelings.feelings];
    updated[idx] = { ...updated[idx], ...updates };
    updateSection('audienceFeelings', { feelings: updated });
  };

  const handleAddFeeling = () => {
    const newFeeling: FeelingCMSItem = {
      feeling: 'Unburdened',
      internalVoice: '“I can finally put this down.”',
      description: 'The profound sensation that holding onto expectations of effortless perfection is no longer necessary.',
      color: '#194A37',
    };
    updateSection('audienceFeelings', {
      feelings: [...audienceFeelings.feelings, newFeeling],
    });
  };

  const handleDeleteFeeling = (idx: number) => {
    if (audienceFeelings.feelings.length <= 1) return;
    updateSection('audienceFeelings', {
      feelings: audienceFeelings.feelings.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D8] pb-4">
        <h3 className="font-serif text-xl text-[#194A37]">Act III: Audience Feelings</h3>
        <p className="font-sans text-xs text-[#1F2E28]/70">
          "How It Should Feel to Read This Book" — emotional spectrum cards and inner voices.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Section Badge
          </label>
          <input
            type="text"
            value={audienceFeelings.badge}
            onChange={(e) => updateSection('audienceFeelings', { badge: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Section Headline
          </label>
          <input
            type="text"
            value={audienceFeelings.headline}
            onChange={(e) => updateSection('audienceFeelings', { headline: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
          Subtitle
        </label>
        <textarea
          rows={2}
          value={audienceFeelings.subtitle}
          onChange={(e) => updateSection('audienceFeelings', { subtitle: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      {/* Climax Quote Card */}
      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E2D8] space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37]">
          Climax Emotional Quote Banner
        </label>
        <input
          type="text"
          value={audienceFeelings.climaxQuote}
          onChange={(e) => updateSection('audienceFeelings', { climaxQuote: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
        <input
          type="text"
          placeholder="Sub-caption"
          value={audienceFeelings.climaxSub}
          onChange={(e) => updateSection('audienceFeelings', { climaxSub: e.target.value })}
          className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      {/* Feelings Cards */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37]">
            Emotional Spectrum Cards ({audienceFeelings.feelings.length})
          </label>
          <button
            type="button"
            onClick={handleAddFeeling}
            className="flex items-center gap-1 px-3 py-1 bg-[#194A37] text-white text-xs font-medium rounded-lg hover:bg-[#0F2F23] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Feeling</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {audienceFeelings.feelings.map((f, idx) => (
            <div
              key={idx}
              className="p-4 bg-white border border-[#E8E2D8] rounded-xl space-y-2.5 relative shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={f.feeling}
                  onChange={(e) => handleUpdateFeeling(idx, { feeling: e.target.value })}
                  className="font-serif font-semibold text-sm text-[#194A37] border-b border-transparent focus:border-[#194A37] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteFeeling(idx)}
                  className="text-[#84937D] hover:text-[#B81617] p-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#84937D]">
                  Internal Voice
                </label>
                <input
                  type="text"
                  value={f.internalVoice}
                  onChange={(e) => handleUpdateFeeling(idx, { internalVoice: e.target.value })}
                  className="w-full px-2 py-1 text-xs bg-[#FAF8F5] border border-[#E8E2D8] rounded focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#84937D]">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={f.description}
                  onChange={(e) => handleUpdateFeeling(idx, { description: e.target.value })}
                  className="w-full px-2 py-1 text-xs bg-[#FAF8F5] border border-[#E8E2D8] rounded focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={() => resetSection('audienceFeelings')}
          className="flex items-center gap-1.5 text-xs text-[#84937D] hover:text-[#B81617] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Feelings Defaults</span>
        </button>
      </div>
    </div>
  );
};
