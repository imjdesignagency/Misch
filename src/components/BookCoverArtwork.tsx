import React from 'react';

interface BookCoverArtworkProps {
  className?: string;
  showSpine?: boolean;
}

export const BookCoverArtwork: React.FC<BookCoverArtworkProps> = ({
  className = '',
  showSpine = false,
}) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none font-serif flex flex-col justify-between ${className}`}
      style={{
        backgroundColor: '#12372E',
      }}
    >
      {/* Background painted texture and atmospheric gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#102D26] via-[#143B31] to-[#0A1E19] pointer-events-none" />

      {/* Atmospheric center aura behind women */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 62%, #2A5A4D 0%, #153B31 45%, transparent 75%)',
        }}
      />

      {/* Subtle paper grain & brush stroke overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(#FAF8F5 0.75px, transparent 0.75px)`,
          backgroundSize: '12px 12px',
        }}
      />

      {/* Optional Spine Crease Simulation */}
      {showSpine && (
        <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-black/40 via-black/15 to-transparent z-20 border-r border-white/10 pointer-events-none" />
      )}

      {/* Top Header Section: Title & Subtitle */}
      <div className="relative z-10 pt-7 sm:pt-9 px-5 sm:px-7 text-center flex flex-col items-center">
        {/* Main Title */}
        <div className="tracking-[0.14em] uppercase text-center leading-none">
          <span className="block font-serif text-2xl sm:text-3xl md:text-[34px] font-normal text-[#F4F1EA] drop-shadow-xs">
            THE WEIGHT
          </span>
          <span className="block font-serif text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#B82227] mt-1.5 tracking-[0.13em] drop-shadow-xs">
            WE CARRY
          </span>
        </div>

        {/* Subtitle in 3 lines */}
        <div className="mt-3.5 text-center max-w-[240px] mx-auto">
          <p className="font-serif text-[9.5px] sm:text-[10.5px] md:text-[11px] text-[#E8E4D8] uppercase tracking-[0.16em] leading-relaxed font-normal opacity-95">
            STORIES OF WOMEN AND THE
            <br />
            SILENT WORK OF HOLDING IT ALL
            <br />
            TOGETHER
          </p>
        </div>
      </div>

      {/* Center Painted Illustration: The Collective Women */}
      <div className="relative z-10 my-auto w-full h-[52%] flex items-center justify-center overflow-hidden px-3">
        <svg
          viewBox="0 0 400 480"
          className="w-full h-full max-h-[320px] object-contain filter drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Skin tone gradients for warm painted feel */}
            <linearGradient id="warmSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5C09A" />
              <stop offset="35%" stopColor="#D89264" />
              <stop offset="70%" stopColor="#A85C34" />
              <stop offset="100%" stopColor="#5E311B" />
            </linearGradient>

            <linearGradient id="tealSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5E8F82" />
              <stop offset="50%" stopColor="#355D52" />
              <stop offset="100%" stopColor="#15362E" />
            </linearGradient>

            <linearGradient id="deepSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B3734F" />
              <stop offset="60%" stopColor="#6E3D22" />
              <stop offset="100%" stopColor="#3B1C0E" />
            </linearGradient>

            <linearGradient id="hairDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A2421" />
              <stop offset="60%" stopColor="#13100E" />
              <stop offset="100%" stopColor="#080706" />
            </linearGradient>

            <radialGradient id="shoulderGlow" cx="60%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#FFCFAA" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#D98A5B" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6B371B" stopOpacity="0" />
            </radialGradient>

            <filter id="softPaintBlur">
              <feGaussianBlur stdDeviation="0.8" />
            </filter>
          </defs>

          {/* Background misty silhouette of women left and right */}
          <g opacity="0.35" filter="url(#softPaintBlur)">
            {/* Far left woman profile */}
            <path
              d="M100 290 Q85 240 105 190 Q120 150 145 160 Q130 200 135 250 Z"
              fill="#27564A"
            />
            {/* Far right woman profile */}
            <path
              d="M300 290 Q315 240 295 190 Q280 150 255 160 Q270 200 265 250 Z"
              fill="#27564A"
            />
          </g>

          {/* Left Profile 1: Sister looking downward in quiet thought */}
          <g opacity="0.85">
            {/* Face and neck */}
            <path
              d="M128 320 C120 270 122 220 138 190 C145 178 155 170 162 178 C165 186 160 196 155 208 C148 225 145 248 152 270 C156 285 162 305 166 330 Z"
              fill="url(#tealSkin)"
            />
            {/* Jawline & profile highlight */}
            <path
              d="M138 190 Q130 205 133 222 Q136 235 145 244 Q142 258 140 280"
              stroke="#8EB5AA"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            {/* Hair texture */}
            <path
              d="M148 172 C158 155 180 155 186 168 C192 180 184 196 172 202 C162 196 154 186 148 172 Z"
              fill="url(#hairDark)"
            />
          </g>

          {/* Right Profile 1: Woman facing 3/4 right with lifted chin */}
          <g opacity="0.9">
            {/* Face & neck profile */}
            <path
              d="M265 330 C272 290 270 240 258 205 C252 190 242 180 234 186 C230 195 235 208 240 220 C248 240 250 265 244 290 C240 305 235 320 230 340 Z"
              fill="url(#deepSkin)"
            />
            {/* Nose, lips & chin profile contour */}
            <path
              d="M258 205 Q268 215 264 230 Q262 240 255 248 Q258 260 258 280"
              stroke="#DCA07A"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            {/* Hair bun */}
            <path
              d="M246 182 C236 165 214 165 208 178 C202 190 210 206 222 212 C232 206 240 196 246 182 Z"
              fill="url(#hairDark)"
            />
          </g>

          {/* Subtle Mid-ground Woman: Profile to Left */}
          <g opacity="0.95">
            <path
              d="M175 340 C165 295 168 240 184 195 C190 182 200 175 206 182 C210 190 205 202 200 215 C192 235 190 262 198 290 Z"
              fill="url(#deepSkin)"
            />
            <path
              d="M184 195 Q176 210 178 226 Q182 240 190 250"
              stroke="#E2A682"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          </g>

          {/* Central Woman: Primary Figure (Facing Back / 3/4 Turn with Elegant Bun & Bare Back) */}
          <g>
            {/* Elegant Hair Updo / Chignon Bun */}
            <ellipse cx="204" cy="180" rx="34" ry="40" fill="url(#hairDark)" />
            <path
              d="M174 192 C168 215 174 240 188 252 C204 250 214 240 220 226 C226 212 222 196 214 186 C202 180 184 182 174 192 Z"
              fill="#181310"
            />
            {/* Hair swirl & texture brush strokes */}
            <path
              d="M184 165 Q204 150 224 165 Q235 180 220 200 Q200 215 182 195 Z"
              fill="#261E1A"
              stroke="#3D302A"
              strokeWidth="1.5"
            />
            <path
              d="M192 155 Q205 145 218 156"
              stroke="#4A3B34"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />

            {/* Back, Neck and Shoulder - Beautiful sculptural painting */}
            <path
              d="M188 246 C176 268 152 300 134 330 C120 354 110 380 102 420 C150 435 250 435 298 420 C290 380 280 354 266 330 C248 300 224 268 212 246 C205 252 195 252 188 246 Z"
              fill="url(#warmSkin)"
            />

            {/* Warm Sunlight / Amber Glow on Shoulder & Spine */}
            <path
              d="M188 250 C180 275 160 310 144 340 C135 358 130 380 126 410 C150 418 200 415 215 400 C220 360 218 320 212 250 Z"
              fill="url(#shoulderGlow)"
            />

            {/* Delicate Spine Line & Shoulder Blade Shading */}
            <path
              d="M200 252 Q202 320 198 390"
              stroke="#7E3D1D"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Left Shoulder Contour Highlight */}
            <path
              d="M188 250 C172 275 148 310 134 338 C124 358 116 385 110 415"
              stroke="#FCE0CA"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Right Shoulder Contour Shade */}
            <path
              d="M212 250 C228 275 252 310 266 338 C276 358 284 385 290 415"
              stroke="#422011"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>

          {/* Right Sister in Profile: Facing Forward-Right in Solidarity */}
          <g opacity="0.88">
            <path
              d="M255 350 C265 315 264 270 252 240 C246 226 238 220 234 226 C230 235 235 248 240 260 C246 280 248 305 244 330 Z"
              fill="url(#tealSkin)"
            />
            <path
              d="M252 240 Q260 250 258 265 Q256 276 250 285"
              stroke="#80AFA2"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
          </g>

          {/* Deep moody gradient at the bottom base */}
          <path
            d="M0 380 L400 380 L400 480 L0 480 Z"
            fill="url(#hairDark)"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Bottom Author Section */}
      <div className="relative z-10 pb-7 sm:pb-9 px-6 text-center">
        <span className="font-serif text-base sm:text-lg md:text-xl text-[#F4F1EA] tracking-[0.16em] uppercase font-normal drop-shadow-xs">
          MISHECA O. SEYMOUR
        </span>
      </div>

      {/* Subtle glossy sheen over book surface */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08] pointer-events-none" />
    </div>
  );
};
