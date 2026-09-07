import React from 'react';
import { useCMS } from '../../../context/CMSContext';
import { RotateCcw } from 'lucide-react';
import { CMSImageUploader } from '../CMSImageUploader';

export const GlobalBrandTab: React.FC = () => {
  const { content, updateSection, resetSection } = useCMS();
  const { site } = content;

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D8] pb-4">
        <h3 className="font-serif text-xl text-[#194A37]">Site & Brand Fundamentals</h3>
        <p className="font-sans text-xs text-[#1F2E28]/70">
          Core book identity, author credits, and top announcement banner displayed across the page.
        </p>
      </div>

      {/* Master Book Cover Uploader */}
      <div className="bg-white p-4 rounded-xl border border-[#E8E2D8]">
        <CMSImageUploader
          label="Master Book Cover Artwork / Mockup"
          helperText="The global fallback book cover artwork used across all sections when a section-specific mockup is not specified."
          value={site.masterBookCoverUrl || ''}
          onChange={(val) => updateSection('site', { masterBookCoverUrl: val })}
        />
      </div>

      {/* Announcement Bar */}
      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E2D8] space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-[#194A37]">
            Top Announcement Ribbon
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-sans text-[#1F2E28]">
            <input
              type="checkbox"
              checked={site.announcement.enabled}
              onChange={(e) =>
                updateSection('site', {
                  announcement: { ...site.announcement, enabled: e.target.checked },
                })
              }
              className="rounded text-[#194A37] focus:ring-[#194A37]"
            />
            <span>Enable Ribbon</span>
          </label>
        </div>

        {site.announcement.enabled && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-sans font-medium text-[#1F2E28]/80 mb-1">
                Badge Label
              </label>
              <input
                type="text"
                value={site.announcement.badge}
                onChange={(e) =>
                  updateSection('site', {
                    announcement: { ...site.announcement, badge: e.target.value },
                  })
                }
                className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-sans font-medium text-[#1F2E28]/80 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={site.announcement.linkText}
                onChange={(e) =>
                  updateSection('site', {
                    announcement: { ...site.announcement, linkText: e.target.value },
                  })
                }
                className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-sans font-medium text-[#1F2E28]/80 mb-1">
                Announcement Message
              </label>
              <input
                type="text"
                value={site.announcement.text}
                onChange={(e) =>
                  updateSection('site', {
                    announcement: { ...site.announcement, text: e.target.value },
                  })
                }
                className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Book Title & Subtitle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Book Title Line 1
          </label>
          <input
            type="text"
            value={site.bookTitleLine1}
            onChange={(e) => updateSection('site', { bookTitleLine1: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Book Title Line 2
          </label>
          <input
            type="text"
            value={site.bookTitleLine2}
            onChange={(e) => updateSection('site', { bookTitleLine2: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
          Full Subtitle
        </label>
        <textarea
          rows={2}
          value={site.subtitle}
          onChange={(e) => updateSection('site', { subtitle: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
          Book Tagline / Synopsis
        </label>
        <textarea
          rows={3}
          value={site.tagline}
          onChange={(e) => updateSection('site', { tagline: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      {/* Author Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Author Full Name
          </label>
          <input
            type="text"
            value={site.author}
            onChange={(e) => updateSection('site', { author: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Author Short Name
          </label>
          <input
            type="text"
            value={site.authorShort}
            onChange={(e) => updateSection('site', { authorShort: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Author Title
          </label>
          <input
            type="text"
            value={site.authorTitle}
            onChange={(e) => updateSection('site', { authorTitle: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Brand Essence Statement
          </label>
          <input
            type="text"
            value={site.brandEssence}
            onChange={(e) => updateSection('site', { brandEssence: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Core Emotional Message
          </label>
          <input
            type="text"
            value={site.coreEmotionalMessage}
            onChange={(e) => updateSection('site', { coreEmotionalMessage: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={() => resetSection('site')}
          className="flex items-center gap-1.5 text-xs text-[#84937D] hover:text-[#B81617] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Site Defaults</span>
        </button>
      </div>
    </div>
  );
};
