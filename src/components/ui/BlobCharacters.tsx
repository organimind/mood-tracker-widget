import React from 'react';

export interface BlobProps {
  className?: string;
  size?: number;
}

/* Great - Cute Soft Pink Blob with >_< Face */
export const GreatBlob: React.FC<BlobProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Soft Pink Body */}
    <path
      d="M50 12C68 12 88 24 88 48C88 74 66 88 50 88C34 88 12 74 12 48C12 24 32 12 50 12Z"
      fill="#FFD2DC"
    />
    {/* Inner shadow/highlight curve */}
    <path
      d="M25 30C32 20 48 18 60 21"
      stroke="#FFFFFF"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* >_< Face Expressions */}
    <path d="M34 44L42 50L34 56" stroke="#4A343A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M66 44L58 50L66 56" stroke="#4A343A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    {/* Soft Smile */}
    <path d="M46 60C48 63 52 63 54 60" stroke="#4A343A" strokeWidth="3.5" strokeLinecap="round" />
    {/* Rosy Cheeks */}
    <circle cx="28" cy="56" r="5" fill="#FF9EAE" opacity="0.6" />
    <circle cx="72" cy="56" r="5" fill="#FF9EAE" opacity="0.6" />
  </svg>
);

/* Good - Soft Sage Green Bean Blob with ^ - ^ Face */
export const GoodBlob: React.FC<BlobProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Sage Green Blob Body */}
    <path
      d="M48 14C72 14 86 28 86 52C86 72 70 86 48 86C26 86 14 70 14 50C14 26 28 14 48 14Z"
      fill="#C8E6C9"
    />
    {/* Soft Highlight */}
    <path
      d="M26 30C35 21 52 20 62 23"
      stroke="#FFFFFF"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* ^ - ^ Happy Curved Eyes */}
    <path d="M33 46C37 41 42 41 46 46" stroke="#253E27" strokeWidth="4" strokeLinecap="round" />
    <path d="M54 46C58 41 63 41 67 46" stroke="#253E27" strokeWidth="4" strokeLinecap="round" />
    {/* Cute Mouth */}
    <path d="M45 56C48 59 52 59 55 56" stroke="#253E27" strokeWidth="3.5" strokeLinecap="round" />
    {/* Soft Cheeks */}
    <circle cx="26" cy="52" r="5" fill="#94D098" opacity="0.6" />
    <circle cx="74" cy="52" r="5" fill="#94D098" opacity="0.6" />
  </svg>
);

/* Okay - Soft Pastel Yellow Pebble Blob with • - • Face */
export const OkayBlob: React.FC<BlobProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Pastel Yellow Oval Body */}
    <ellipse cx="50" cy="52" rx="38" ry="34" fill="#FFF0B3" />
    {/* Highlight */}
    <path
      d="M26 32C34 25 54 24 64 26"
      stroke="#FFFFFF"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Dot Eyes */}
    <circle cx="38" cy="48" r="4.5" fill="#42391D" />
    <circle cx="62" cy="48" r="4.5" fill="#42391D" />
    {/* Neutral Straight Mouth */}
    <line x1="44" y1="58" x2="56" y2="58" stroke="#42391D" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

/* Low - Soft Sky Blue Cloud Blob with • ~ • Soft Face */
export const LowBlob: React.FC<BlobProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Sky Blue Blob Body */}
    <path
      d="M50 16C70 16 84 30 84 54C84 74 68 84 50 84C32 84 16 72 16 50C16 30 30 16 50 16Z"
      fill="#D0E3FF"
    />
    {/* Highlight */}
    <path
      d="M26 32C34 24 52 22 62 26"
      stroke="#FFFFFF"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Sad/Tired Eyes */}
    <path d="M33 46L43 50" stroke="#253A52" strokeWidth="4" strokeLinecap="round" />
    <path d="M67 46L57 50" stroke="#253A52" strokeWidth="4" strokeLinecap="round" />
    {/* Soft Downward Curve Mouth */}
    <path d="M44 60C48 57 52 57 56 60" stroke="#253A52" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

/* Stressed - Soft Pastel Lavender Wavy Square Blob with ⊙ _ ⊙ Wide Eyes */
export const StressedBlob: React.FC<BlobProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Soft Lavender Wavy Body */}
    <path
      d="M26 18C40 14 60 14 74 18C86 22 88 40 86 54C84 72 74 86 50 86C26 86 14 72 14 54C14 38 14 22 26 18Z"
      fill="#E5D4F5"
    />
    {/* Highlight */}
    <path
      d="M26 28C36 22 56 22 66 26"
      stroke="#FFFFFF"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Spiral / Wide Eyes */}
    <circle cx="37" cy="48" r="7" stroke="#3A284C" strokeWidth="3" />
    <circle cx="37" cy="48" r="2" fill="#3A284C" />
    <circle cx="63" cy="48" r="7" stroke="#3A284C" strokeWidth="3" />
    <circle cx="63" cy="48" r="2" fill="#3A284C" />
    {/* Zig-zag / Squiggle mouth */}
    <path d="M42 60L46 63L50 60L54 63L58 60" stroke="#3A284C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
