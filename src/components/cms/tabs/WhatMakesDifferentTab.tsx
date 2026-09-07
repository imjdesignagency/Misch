import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { RotateCcw, Plus, Trash2 } from 'lucide-react';
import { NotItem } from '../../../types/cms';

export const WhatMakesDifferentTab: React.FC = () => {
  const { content, updateSection, resetSection } = useCMS();
  const { whatMakesDifferent } = content;
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleUpdateNotItem = (idx: number, updates: Partial<NotItem>) => {
    const updated = [...whatMakesDifferent.whatItIsNot];
    updated[idx] = { ...updated[idx], ...updates };
    updateSection('whatMakesDifferent', { whatItIsNot: updated });
  };

  const handleAddNotItem = () => {
    if (newTitle.trim()) {
      const newItem: NotItem = {
        id: `not-${Date.now()}`,
        title: newTitle.trim(),
        description: newDesc.trim() || 'No superficial advice or empty corporate slogans.',
      };
      updateSection('whatMakesDifferent', {
        whatItIsNot: [...whatMakesDifferent.whatItIsNot, newItem],
      });
      setNewTitle('');
      setNewDesc('');
    }
  };

  const handleDeleteNotItem = (idx: number) => {
    if (whatMakesDifferent.whatItIsNot.length <= 1) return;
    updateSection('whatMakesDifferent', {
      whatItIsNot: whatMakesDifferent.whatItIsNot.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D8] pb-4">
        <h3 className="font-serif text-xl text-[#194A37]">Act VI: The Distinct Approach</h3>
        <p className="font-sans text-xs text-[#1F2E28]/70">
          "The Things We Don’t Usually Talk About" — brand positioning, what this book is NOT, and sanctuary philosophy.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Section Badge
          </label>
          <input
            type="text"
            value={whatMakesDifferent.badge}
            onChange={(e) => updateSection('whatMakesDifferent', { badge: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Headline
          </label>
          <input
            type="text"
            value={whatMakesDifferent.headline}
            onChange={(e) => updateSection('whatMakesDifferent', { headline: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
          Conventional Cultural Contrast
        </label>
        <textarea
          rows={2}
          value={whatMakesDifferent.contrast}
          onChange={(e) => updateSection('whatMakesDifferent', { contrast: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Approach Lead
          </label>
          <input
            type="text"
            value={whatMakesDifferent.approachLead}
            onChange={(e) => updateSection('whatMakesDifferent', { approachLead: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Core Message
          </label>
          <input
            type="text"
            value={whatMakesDifferent.coreMessage}
            onChange={(e) => updateSection('whatMakesDifferent', { coreMessage: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
          The Private Realities
        </label>
        <textarea
          rows={2}
          value={whatMakesDifferent.thePrivateRealities}
          onChange={(e) => updateSection('whatMakesDifferent', { thePrivateRealities: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      {/* What it is NOT items */}
      <div className="space-y-3 pt-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37]">
          What This Brand Is NOT ({whatMakesDifferent.whatItIsNot.length})
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {whatMakesDifferent.whatItIsNot.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-3.5 bg-white border border-[#E8E2D8] rounded-xl space-y-2 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleUpdateNotItem(idx, { title: e.target.value })}
                  className="font-serif font-bold text-xs text-[#B81617] border-b border-transparent focus:border-[#B81617] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteNotItem(idx)}
                  className="text-[#84937D] hover:text-[#B81617] p-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                rows={2}
                value={item.description}
                onChange={(e) => handleUpdateNotItem(idx, { description: e.target.value })}
                className="w-full px-2 py-1 text-xs bg-[#FAF8F5] border border-[#E8E2D8] rounded focus:outline-none"
              />
            </div>
          ))}
        </div>

        {/* Add new */}
        <div className="p-3 bg-[#FAF8F5] border border-dashed border-[#E8E2D8] rounded-xl space-y-2">
          <span className="text-xs font-bold text-[#194A37]">Add Brand Boundary</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Title (e.g. Not toxic positivity)..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none"
            />
            <input
              type="text"
              placeholder="Description..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddNotItem}
              className="px-3 py-1 bg-[#194A37] text-white text-xs rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Boundary</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={() => resetSection('whatMakesDifferent')}
          className="flex items-center gap-1.5 text-xs text-[#84937D] hover:text-[#B81617] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Distinct Approach Defaults</span>
        </button>
      </div>
    </div>
  );
};
