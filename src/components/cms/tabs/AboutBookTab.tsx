import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { RotateCcw, Plus, X } from 'lucide-react';
import { CMSImageUploader } from '../CMSImageUploader';

export const AboutBookTab: React.FC = () => {
  const { content, updateSection, resetSection } = useCMS();
  const { aboutBook } = content;
  const [newRole, setNewRole] = useState('');
  const [newChar, setNewChar] = useState('');

  const handleAddRole = () => {
    if (newRole.trim()) {
      updateSection('aboutBook', { roles: [...aboutBook.roles, newRole.trim()] });
      setNewRole('');
    }
  };

  const handleRemoveRole = (idx: number) => {
    updateSection('aboutBook', {
      roles: aboutBook.roles.filter((_, i) => i !== idx),
    });
  };

  const handleAddChar = () => {
    if (newChar.trim()) {
      updateSection('aboutBook', {
        characteristics: [...aboutBook.characteristics, newChar.trim()],
      });
      setNewChar('');
    }
  };

  const handleRemoveChar = (idx: number) => {
    updateSection('aboutBook', {
      characteristics: aboutBook.characteristics.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D8] pb-4">
        <h3 className="font-serif text-xl text-[#194A37]">Act IV: About The Book</h3>
        <p className="font-sans text-xs text-[#1F2E28]/70">
          "We Carry More Than People See" — the core questions, societal expectations/roles, and central thesis.
        </p>
      </div>

      {/* Book Mockup for Act IV */}
      <div className="bg-white p-4 rounded-xl border border-[#E8E2D8]">
        <CMSImageUploader
          label="About The Book Section Mockup / Cover"
          helperText="Upload a specific book mockup for Act IV (if empty, falls back to the master book cover)."
          value={aboutBook.mockupImageUrl || ''}
          onChange={(val) => updateSection('aboutBook', { mockupImageUrl: val })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Section Badge
          </label>
          <input
            type="text"
            value={aboutBook.badge}
            onChange={(e) => updateSection('aboutBook', { badge: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Headline
          </label>
          <input
            type="text"
            value={aboutBook.headline}
            onChange={(e) => updateSection('aboutBook', { headline: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Opening Question
          </label>
          <input
            type="text"
            value={aboutBook.openingQuestion}
            onChange={(e) => updateSection('aboutBook', { openingQuestion: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Core Inquiry Question
          </label>
          <input
            type="text"
            value={aboutBook.coreQuestion}
            onChange={(e) => updateSection('aboutBook', { coreQuestion: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      {/* Roles List */}
      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E2D8] space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37]">
          The Expected Roles / Demands
        </label>
        <div className="space-y-2">
          {aboutBook.roles.map((role, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={role}
                onChange={(e) => {
                  const updated = [...aboutBook.roles];
                  updated[idx] = e.target.value;
                  updateSection('aboutBook', { roles: updated });
                }}
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveRole(idx)}
                className="text-[#84937D] hover:text-[#B81617] p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-2">
          <input
            type="text"
            placeholder="Add new role (e.g. The tireless advocate)..."
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRole())}
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddRole}
            className="px-3 py-1.5 bg-[#194A37] text-white text-xs rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Synopsis Paragraphs */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
          Main Description Paragraph
        </label>
        <textarea
          rows={3}
          value={aboutBook.descriptionParagraph1}
          onChange={(e) => updateSection('aboutBook', { descriptionParagraph1: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      {/* Trying Lead and Characteristics */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            "Trying" Lead Statement
          </label>
          <input
            type="text"
            value={aboutBook.tryingLead}
            onChange={(e) => updateSection('aboutBook', { tryingLead: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>

        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37]">
          Characteristics Bullet Points
        </label>
        <div className="space-y-2">
          {aboutBook.characteristics.map((char, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={char}
                onChange={(e) => {
                  const updated = [...aboutBook.characteristics];
                  updated[idx] = e.target.value;
                  updateSection('aboutBook', { characteristics: updated });
                }}
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveChar(idx)}
                className="text-[#84937D] hover:text-[#B81617] p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new trait (e.g. Women who hold grace)..."
            value={newChar}
            onChange={(e) => setNewChar(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddChar())}
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddChar}
            className="px-3 py-1.5 bg-[#194A37] text-white text-xs rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Closing Reflection
          </label>
          <input
            type="text"
            value={aboutBook.closingReflection}
            onChange={(e) => updateSection('aboutBook', { closingReflection: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Final Pithy Remark
          </label>
          <input
            type="text"
            value={aboutBook.finalPithy}
            onChange={(e) => updateSection('aboutBook', { finalPithy: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={() => resetSection('aboutBook')}
          className="flex items-center gap-1.5 text-xs text-[#84937D] hover:text-[#B81617] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset About The Book Defaults</span>
        </button>
      </div>
    </div>
  );
};
