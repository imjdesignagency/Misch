import React, { useState } from 'react';
import { X, Check, Bookmark, CheckCircle2 } from 'lucide-react';
import { PreOrderFormData } from '../types';
import { useCMS } from '../context/CMSContext';
import { db, doc, setDoc } from '../lib/firebase';

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreOrderModal: React.FC<PreOrderModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { content } = useCMS();
  const { site, preOrder } = content;
  const formats = preOrder.formats || [];

  const [formData, setFormData] = useState<PreOrderFormData>({
    fullName: '',
    email: '',
    preferredFormats: ['hardcover'],
    city: '',
    country: '',
    note: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  if (!isOpen) return null;

  const handleToggleFormat = (formatId: string) => {
    if (formData.preferredFormats.includes(formatId)) {
      if (formData.preferredFormats.length > 1) {
        setFormData({
          ...formData,
          preferredFormats: formData.preferredFormats.filter((f) => f !== formatId),
        });
      }
    } else {
      setFormData({
        ...formData,
        preferredFormats: [...formData.preferredFormats, formatId],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedCode = `TWC-${Math.floor(100000 + Math.random() * 900000)}`;
    setReservationCode(generatedCode);
    setIsSubmitted(true);

    // Save pre-order to Firestore in background
    try {
      setDoc(doc(db, 'preorders', generatedCode), {
        fullName: formData.fullName,
        email: formData.email,
        preferredFormats: formData.preferredFormats,
        city: formData.city || '',
        country: formData.country || '',
        note: formData.note || '',
        createdAt: new Date().toISOString(),
      }).catch((err) => {
        console.warn('Firestore pre-order record note:', err);
      });
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="pre-order-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2F23]/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="pre-order-modal-card"
        className="bg-[#FAF8F5] rounded-3xl border border-[#E8E2D8] shadow-2xl max-w-xl w-full p-6 sm:p-8 relative text-[#1F2E28] my-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          id="close-preorder-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#84937D] hover:text-[#B81617] hover:bg-[#F2EFE9] transition-colors cursor-pointer"
          aria-label="Close Pre-Order Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Pre-Order Confirmation Receipt */
          <div className="text-center space-y-6 py-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#194A37] text-white flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-2">
              <div className="inline-block bg-[#194A37] text-white px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest">
                Reservation Confirmed
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-[#194A37] font-normal tracking-tight">
                Thank you, {formData.fullName || 'Reader'}!
              </h3>
              <p className="font-sans text-xs uppercase font-bold tracking-wider text-[#648C82]">
                Priority Reservation #{reservationCode} • Priority Reader List
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D8] text-left space-y-3 shadow-2xs">
              <p className="font-sans text-base text-[#1F2E28] leading-relaxed font-light">
                We have registered your details. When <em>{site.bookTitle}</em> is published, you will receive first notification and priority access at <strong>{formData.email}</strong>.
              </p>
              <div className="text-xs font-sans text-[#648C82] font-semibold pt-1">
                <span>Format Interests: </span>
                <span className="text-[#194A37] uppercase font-bold">{formData.preferredFormats.join(', ')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 py-3.5 text-xs font-sans uppercase font-bold tracking-wider text-white bg-[#194A37] hover:bg-[#0F2F23] rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Back to Site
              </button>
            </div>
          </div>
        ) : (
          /* Pre-Order Info Form */
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <div className="inline-block bg-[#194A37] text-white px-3 py-1 rounded-full text-[11px] font-sans font-bold uppercase tracking-widest mb-2 shadow-2xs">
                {preOrder.badge}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#194A37] font-normal tracking-tight">
                Reserve Your Copy
              </h3>
              <p className="font-sans text-xs text-[#648C82] mt-1 font-semibold uppercase tracking-wider">
                {site.bookTitle} • By {site.author}
              </p>
            </div>

            {/* Format Picker */}
            <div className="space-y-2">
              <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#194A37]">
                Preferred Format Interest
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {formats.map((format) => {
                  const isSelected = formData.preferredFormats.includes(format.id);
                  return (
                    <button
                      type="button"
                      key={format.id}
                      onClick={() => handleToggleFormat(format.id)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#194A37] text-white border-[#194A37] shadow-xs'
                          : 'bg-white border-[#E8E2D8] text-[#1F2E28] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="font-display font-medium text-xs sm:text-sm">
                        {format.name}
                      </div>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#194A37] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] bg-white text-sm focus:outline-hidden focus:ring-1 focus:ring-[#194A37]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#194A37] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] bg-white text-sm focus:outline-hidden focus:ring-1 focus:ring-[#194A37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#194A37] mb-1">
                    City / Town (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#194A37] mb-1">
                    Country (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] bg-white text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Total Summary & CTA */}
            <div className="pt-2 border-t border-[#E8E2D8]">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#B81617] hover:bg-[#9B1213] active:scale-[0.99] text-white text-xs font-sans uppercase tracking-widest font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#FF7A7A]/30"
              >
                <Bookmark className="w-4 h-4" />
                <span>Reserve My Copy • Join List</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
