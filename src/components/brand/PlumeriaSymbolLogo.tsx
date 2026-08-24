import React, { useId } from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
  variant?: 'light' | 'dark' | 'white';
}

export const PlumeriaSymbolLogo: React.FC<LogoProps> = ({
  className = 'w-10 h-10',
  variant = 'dark',
}) => {
  const uid = useId().replace(/:/g, '_');
  const isLightOrWhite = variant === 'white' || variant === 'light';

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0`}
      role="img"
      aria-label="Plumeria Vacation Rentals"
    >
      <defs>
        {/* Unique IDs for gradients per instance to prevent DOM ID collisions */}
        <linearGradient id={`rb-outer-${uid}`} x1="30" y1="30" x2="170" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
        <linearGradient id={`rb-mid-${uid}`} x1="40" y1="40" x2="160" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#FCD34D" />
        </linearGradient>
        <linearGradient id={`rb-inner-${uid}`} x1="50" y1="50" x2="150" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>

        {/* Ocean Wave Gradients */}
        <linearGradient id={`wave-bg-${uid}`} x1="40" y1="160" x2="160" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0A1E3F" />
          <stop offset="60%" stopColor="#0E3866" />
          <stop offset="100%" stopColor="#186A9E" />
        </linearGradient>
        <linearGradient id={`wave-curl-${uid}`} x1="60" y1="140" x2="140" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="60%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        {/* Plumeria Petal Gradients */}
        <linearGradient id={`petal-a-${uid}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FFF1F2" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
        <linearGradient id={`petal-b-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FFE4E6" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>

        {/* Plumeria Golden Center Glow */}
        <radialGradient id={`flower-core-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="85%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        {/* Surfboard Koa Wood */}
        <linearGradient id={`board-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="50%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* RAINBOW ARCS - Crisp, Vibrant, High Visibility */}
      <g>
        {/* Outer Sunset Coral Arc */}
        <path
          d="M 28 102 A 72 72 0 0 1 172 102"
          stroke={`url(#rb-outer-${uid})`}
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
        />
        {/* Middle Golden Sun Arc */}
        <path
          d="M 40 102 A 60 60 0 0 1 160 102"
          stroke={`url(#rb-mid-${uid})`}
          strokeWidth="10.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Inner Turquoise Wave Arc */}
        <path
          d="M 52 102 A 48 48 0 0 1 148 102"
          stroke={`url(#rb-inner-${uid})`}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* SURFBOARD */}
      <g transform="translate(102, 78) rotate(22)">
        <ellipse
          cx="0"
          cy="15"
          rx="13.5"
          ry="46"
          fill={`url(#board-${uid})`}
          stroke="#92400E"
          strokeWidth="2"
        />
        {/* Stringer centerline */}
        <line x1="0" y1="-28" x2="0" y2="58" stroke="#78350F" strokeWidth="2" />
        {/* Tail wrap */}
        <path d="M -7 51 Q 0 60 7 51" stroke="#92400E" strokeWidth="1.5" fill="none" />
      </g>

      {/* BARREL WAVE (Deep Pacific Navy & Radiant Aqua) */}
      <g>
        {/* Outer Deep Wave Body */}
        <path
          d="M 44 132 C 48 90 90 70 120 75 C 136 78 142 90 128 99 C 114 107 94 106 84 127 C 74 148 122 152 166 146 C 182 144 186 148 181 156 C 160 171 108 176 74 166 C 44 157 41 141 44 132 Z"
          fill={`url(#wave-bg-${uid})`}
          stroke={isLightOrWhite ? 'rgba(255,255,255,0.4)' : '#071830'}
          strokeWidth="1.5"
        />
        {/* Aqua Wave Curl */}
        <path
          d="M 54 126 C 64 93 98 80 122 84 C 132 87 135 95 126 102 C 112 109 92 109 84 131 C 78 146 112 153 150 149 C 160 148 162 153 152 159 C 126 169 85 166 64 153 C 54 144 52 134 54 126 Z"
          fill={`url(#wave-curl-${uid})`}
        />
        {/* Wave Crest Foam & Spray */}
        <path
          d="M 120 76 C 128 72 136 78 138 85 C 140 92 133 97 127 98 C 122 93 118 84 120 76 Z"
          fill="#FFFFFF"
        />
        <circle cx="129" cy="74" r="3.5" fill="#FFFFFF" />
        <circle cx="137" cy="80" r="2.8" fill="#FFFFFF" />
        <circle cx="143" cy="88" r="2.2" fill="#FFFFFF" />
        {/* Lower Wave Accent */}
        <path
          d="M 55 156 C 80 166 130 166 175 151 C 184 148 189 153 179 159 C 139 177 89 177 55 163 Z"
          fill="#38BDF8"
        />
      </g>

      {/* PLUMERIA FLOWER - 5 Beautiful, Vivid, High-Contrast Petals */}
      <g transform="translate(62, 126)">
        {/* Dark contrast circular backing so white/pink petals pop on any background */}
        <circle
          cx="0"
          cy="0"
          r="40"
          fill="#0D274D"
          fillOpacity={isLightOrWhite ? '0.35' : '0.15'}
        />

        {/* Petal 1 - Top Left */}
        <path
          d="M 0 0 C -18 -15 -28 -34 -15 -46 C -2 -57 18 -43 10 -19 Z"
          fill={`url(#petal-a-${uid})`}
          stroke="#E11D48"
          strokeWidth="1.5"
        />
        {/* Petal 2 - Top Right */}
        <path
          d="M 0 0 C 12 -19 32 -30 45 -20 C 58 -10 48 13 24 15 Z"
          fill={`url(#petal-b-${uid})`}
          stroke="#E11D48"
          strokeWidth="1.5"
        />
        {/* Petal 3 - Bottom Right */}
        <path
          d="M 0 0 C 19 5 36 18 34 33 C 32 48 11 50 -5 29 Z"
          fill={`url(#petal-b-${uid})`}
          stroke="#E11D48"
          strokeWidth="1.5"
        />
        {/* Petal 4 - Bottom Left */}
        <path
          d="M 0 0 C -5 19 -20 38 -34 32 C -48 26 -40 4 -19 -5 Z"
          fill={`url(#petal-a-${uid})`}
          stroke="#E11D48"
          strokeWidth="1.5"
        />
        {/* Petal 5 - Left */}
        <path
          d="M 0 0 C -24 -2 -46 -9 -46 -24 C -46 -38 -24 -30 -8 -11 Z"
          fill={`url(#petal-a-${uid})`}
          stroke="#E11D48"
          strokeWidth="1.5"
        />

        {/* Plumeria Golden Center */}
        <circle cx="0" cy="0" r="20" fill={`url(#flower-core-${uid})`} />

        {/* Radiating Amber Star Veins */}
        <path
          d="M 0 0 L -8 -18 M 0 0 L 17 -9 M 0 0 L 14 14 M 0 0 L -13 14 M 0 0 L -18 -4"
          stroke="#B45309"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="0" cy="0" r="4.5" fill="#78350F" />
      </g>
    </svg>
  );
};
