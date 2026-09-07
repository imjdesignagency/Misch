import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { RotateCcw, Plus, X } from 'lucide-react';
import { CMSImageUploader } from '../CMSImageUploader';

export const AuthorInfoTab: React.FC = () => {
  const { content, updateSection, resetSection } = useCMS();
  const { authorInfo } = content;
  const [newCred, setNewCred] = useState('');

  const handleAddCred = () => {
    if (newCred.trim()) {
      updateSection('authorInfo', {
        credentialsList: [...authorInfo.credentialsList, newCred.trim()],
      });
      setNewCred('');
    }
  };

  const handleRemoveCred = (idx: number) => {
    updateSection('authorInfo', {
      credentialsList: authorInfo.credentialsList.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D8] pb-4">
        <h3 className="font-serif text-xl text-[#194A37]">Act VIII: About The Author</h3>
        <p className="font-sans text-xs text-[#1F2E28]/70">
          Misheca O. Seymour — biography, credentials, writer history, and author quote.
        </p>
      </div>

      {/* Author Portrait Image Upload */}
      <div className="bg-white p-4 rounded-xl border border-[#E8E2D8]">
        <CMSImageUploader
          label="Author Portrait Image"
          helperText="Upload a high-resolution portrait of Misheca O. Seymour (supports PNG, JPG, WebP). Optimized automatically for performance."
          value={authorInfo.imageUrl || ''}
          onChange={(val) => updateSection('authorInfo', { imageUrl: val })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Section Badge
          </label>
          <input
            type="text"
            value={authorInfo.badge}
            onChange={(e) => updateSection('authorInfo', { badge: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Author Full Name
          </label>
          <input
            type="text"
            value={authorInfo.name}
            onChange={(e) => updateSection('authorInfo', { name: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
          Professional Title & Credentials
        </label>
        <input
          type="text"
          value={authorInfo.title}
          onChange={(e) => updateSection('authorInfo', { title: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
          Origin Quote / Catalyst
        </label>
        <input
          type="text"
          value={authorInfo.originQuote}
          onChange={(e) => updateSection('authorInfo', { originQuote: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37]">
          Biography Paragraphs
        </label>
        <div>
          <label className="block text-[11px] font-sans text-[#1F2E28]/70 mb-1">
            Paragraph 1: Professional Experience
          </label>
          <textarea
            rows={2}
            value={authorInfo.bioParagraph1}
            onChange={(e) => updateSection('authorInfo', { bioParagraph1: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] font-sans text-[#1F2E28]/70 mb-1">
            Paragraph 2: Writing Heritage
          </label>
          <textarea
            rows={2}
            value={authorInfo.bioParagraph2}
            onChange={(e) => updateSection('authorInfo', { bioParagraph2: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] font-sans text-[#1F2E28]/70 mb-1">
            Paragraph 3: Origin of The Weight We Carry
          </label>
          <textarea
            rows={2}
            value={authorInfo.bioParagraph3}
            onChange={(e) => updateSection('authorInfo', { bioParagraph3: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none"
          />
        </div>
      </div>

      {/* Bio Quote */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
          Author Hopes / Concluding Quote
        </label>
        <input
          type="text"
          value={authorInfo.bioQuote}
          onChange={(e) => updateSection('authorInfo', { bioQuote: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      {/* Credentials Checklist */}
      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E2D8] space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37]">
          Highlights & Credentials
        </label>
        <div className="space-y-2">
          {authorInfo.credentialsList.map((cred, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={cred}
                onChange={(e) => {
                  const updated = [...authorInfo.credentialsList];
                  updated[idx] = e.target.value;
                  updateSection('authorInfo', { credentialsList: updated });
                }}
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveCred(idx)}
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
            placeholder="Add new credential..."
            value={newCred}
            onChange={(e) => setNewCred(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCred())}
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddCred}
            className="px-3 py-1.5 bg-[#194A37] text-white text-xs rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={() => resetSection('authorInfo')}
          className="flex items-center gap-1.5 text-xs text-[#84937D] hover:text-[#B81617] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Author Defaults</span>
        </button>
      </div>
    </div>
  );
};
