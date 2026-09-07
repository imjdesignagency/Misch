import React from 'react';
import { useCMS } from '../../../context/CMSContext';
import { RotateCcw } from 'lucide-react';

export const FooterTab: React.FC = () => {
  const { content, updateSection, resetSection } = useCMS();
  const { footer } = content;

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D8] pb-4">
        <h3 className="font-serif text-xl text-[#194A37]">Footer & Sanctuary Dispatch</h3>
        <p className="font-sans text-xs text-[#1F2E28]/70">
          Newsletter sign-up copy, final quote, copyright, and legal disclaimers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Newsletter Headline
          </label>
          <input
            type="text"
            value={footer.newsletterHeadline}
            onChange={(e) => updateSection('footer', { newsletterHeadline: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Official Contact Email
          </label>
          <input
            type="text"
            value={footer.contactEmail}
            onChange={(e) => updateSection('footer', { contactEmail: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
          Newsletter Subtitle / Invitation
        </label>
        <textarea
          rows={2}
          value={footer.newsletterSub}
          onChange={(e) => updateSection('footer', { newsletterSub: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Copyright Line
          </label>
          <input
            type="text"
            value={footer.copyright}
            onChange={(e) => updateSection('footer', { copyright: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Closing Refrain Quote
          </label>
          <input
            type="text"
            value={footer.quote}
            onChange={(e) => updateSection('footer', { quote: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
          Fiction & Privacy Disclaimer
        </label>
        <textarea
          rows={2}
          value={footer.disclaimer}
          onChange={(e) => updateSection('footer', { disclaimer: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={() => resetSection('footer')}
          className="flex items-center gap-1.5 text-xs text-[#84937D] hover:text-[#B81617] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Footer Defaults</span>
        </button>
      </div>
    </div>
  );
};
