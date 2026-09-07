import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bookmark, Check, CheckCircle2 } from 'lucide-react';
import { PreOrderFormData } from '../types';
import { Reveal, TextReveal } from './animations/Reveal';
import { useCMS } from '../context/CMSContext';

export const PreOrderSection: React.FC = () => {
  const { content } = useCMS();
  const { preOrder } = content;
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
  };

  return (
    <section
      id="pre-order"
      className="py-20 md:py-32 bg-[#FAF8F5] border-t border-[#E8E2D8] relative overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#194A37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B81617]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Reveal direction="down">
            <div className="inline-block bg-[#194A37] text-white px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest shadow-xs">
              {preOrder.badge}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#194A37] font-normal tracking-tight">
              <TextReveal text={preOrder.headline} />
            </h2>
          </Reveal>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-0.5 bg-[#B81617] mx-auto mt-3 origin-center"
          />

          <Reveal direction="up" delay={0.25}>
            <p className="font-serif italic text-xl sm:text-2xl text-[#194A37] pt-1">
              “You don’t have to carry it all alone.”
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <p className="font-sans text-base sm:text-lg text-[#1F2E28]/80 font-light max-w-2xl mx-auto leading-relaxed">
              {preOrder.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Pre-Order Information Collection Card */}
        <Reveal direction="up" delay={0.35} distance={40}>
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#E8E2D8] shadow-lg p-8 sm:p-12 relative">
            {isSubmitted ? (
              /* Success Confirmation State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#194A37] text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-8 h-8 text-white" />
                </div>

                <div className="space-y-2">
                  <div className="inline-block bg-[#194A37] text-white px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest">
                    Priority Reservation Confirmed
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#194A37] font-normal tracking-tight">
                    Thank you, {formData.fullName || 'Reader'}!
                  </h3>
                  <p className="font-sans text-xs uppercase font-bold tracking-wider text-[#648C82]">
                    Reservation #{reservationCode} • Priority Reader List
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E2D8] text-left space-y-3">
                  <p className="font-sans text-base text-[#1F2E28] leading-relaxed font-light">
                    We have added <strong>{formData.email}</strong> to our priority notification list. You will be the very first to know when <em>The Weight We Carry</em> is published and available.
                  </p>
                  <div className="pt-2 text-xs font-sans text-[#648C82] font-semibold">
                    <span>Selected Edition Interest: </span>
                    <span className="text-[#194A37] uppercase font-bold">
                      {formData.preferredFormats.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3.5 text-xs font-sans uppercase font-bold tracking-wider text-[#194A37] bg-[#FAF8F5] hover:bg-[#F2EFE9] rounded-xl border border-[#E8E2D8] transition-all cursor-pointer"
                  >
                    Submit Another Reservation
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Pre-Order Interest Form */
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#194A37] font-normal tracking-tight">
                    Reserve Your Copy
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#648C82] mt-1 font-light">
                    Complete the form below to register your pre-order interest. No payment is required today.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#194A37] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2D8] bg-[#FAF8F5] text-sm font-light focus:outline-hidden focus:ring-1 focus:ring-[#194A37] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#194A37] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2D8] bg-[#FAF8F5] text-sm font-light focus:outline-hidden focus:ring-1 focus:ring-[#194A37] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Format Preference Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#194A37]">
                    Preferred Format Interest (Select one or more)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {formats.map((format) => {
                      const isSelected = formData.preferredFormats.includes(format.id);
                      return (
                        <button
                          type="button"
                          key={format.id}
                          onClick={() => handleToggleFormat(format.id)}
                          className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#194A37] text-white border-[#194A37] shadow-xs'
                              : 'bg-[#FAF8F5] text-[#1F2E28] border-[#E8E2D8] hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <span className={`text-[10px] font-sans uppercase font-bold tracking-wider ${isSelected ? 'text-white/80' : 'text-[#648C82]'}`}>
                              {format.badge}
                            </span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />}
                          </div>
                          <div className="font-serif font-medium text-sm leading-tight">
                            {format.name}
                          </div>
                          <div className={`text-[11px] font-light mt-1 ${isSelected ? 'text-white/80' : 'text-[#84937D]'}`}>
                            {format.description}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location Details (Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#194A37] mb-1.5">
                      City / Town (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kingston / London / New York"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2D8] bg-[#FAF8F5] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#194A37] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#194A37] mb-1.5">
                      Country (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jamaica / United States / United Kingdom"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2D8] bg-[#FAF8F5] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#194A37] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Note / Resonance (Optional) */}
                <div>
                  <label className="block text-xs font-sans font-bold uppercase tracking-wider text-[#194A37] mb-1.5">
                    What resonates with you? (Optional Note)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Share what drew you to The Weight We Carry..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E2D8] bg-[#FAF8F5] text-sm focus:outline-hidden focus:ring-1 focus:ring-[#194A37] focus:bg-white transition-colors resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#B81617] hover:bg-[#9B1213] text-white text-xs font-sans uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-[#FF7A7A]/30"
                  >
                    <Bookmark className="w-4 h-4 text-white" />
                    <span>Reserve My Copy • Join Pre-Order List</span>
                  </motion.button>
                  <p className="text-center font-quote text-xs text-[#84937D] mt-3 italic">
                    We respect your privacy. No spam. You will only receive official updates about The Weight We Carry.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
