import React from 'react';

export interface AuthorLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  height?: number | string;
}

/**
 * High-fidelity vector signature logo for "Misheca Seymour".
 * Matches the uploaded brand signature typography precisely.
 */
export const AuthorSignatureLogo: React.FC<AuthorLogoProps> = ({
  className = '',
  variant = 'auto',
  height,
}) => {
  // Determine fill/stroke color based on variant
  const colorClass =
    variant === 'light'
      ? 'text-white'
      : variant === 'dark'
      ? 'text-[#194A37]'
      : 'text-current';

  return (
    <div
      className={`inline-flex items-center select-none font-serif italic shrink-0 ${colorClass} ${className}`}
      style={height ? { height } : undefined}
      aria-label="Misheca Seymour signature logo"
    >
      <svg
        viewBox="0 0 350 62"
        fill="currentColor"
        className="h-full w-auto max-w-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sigGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>
        <text
          x="4"
          y="46"
          fill="url(#sigGradient)"
          fontFamily="'Playfair Display', 'Cormorant Garamond', 'Baskerville', 'Georgia', serif"
          fontSize="46"
          fontWeight="400"
          fontStyle="italic"
          letterSpacing="0.015em"
        >
          Misheca Seymour
        </text>
      </svg>
    </div>
  );
};
