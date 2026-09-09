import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
  variant?: 'light' | 'dark' | 'white';
}

export const PlumeriaSymbolLogo: React.FC<LogoProps> = ({
  className = 'w-12 h-12',
  variant = 'dark',
}) => {
  const isWhite = variant === 'white' || variant === 'light';

  // Brand Palette Colors:
  // Ivory: #F9F7F2 | Sand: #E8DCC6 | Plumeria Cream: #F6E7A7 | Sage Green: #8CA58A
  // Ocean Blue: #7FB6D9 | Deep Pine: #1A3B34 | Warm Gold: #C59B4B
  const goldColor = isWhite ? '#F6E7A7' : '#C59B4B';
  const goldDark = isWhite ? '#C59B4B' : '#A97E32';
  const pineColor = isWhite ? '#FFFFFF' : '#1A3B34';
  const sageColor = isWhite ? '#A8CDA5' : '#8CA58A';
  const oceanColor = isWhite ? '#9ACCEB' : '#7FB6D9';
  const sandColor = isWhite ? '#F6E7A7' : '#E8DCC6';
  const petalFill = isWhite ? '#FFFFFF' : '#FFFFFF';
  const petalStroke = isWhite ? '#C59B4B' : '#C59B4B';

  return (
    <svg
      viewBox="20 30 202 163"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Plumeria Vacation Rentals"
    >
      {/* 1. ARCHED EMBLEM FRAME (Outer & Inner concentric golden arch) */}
      <g>
        {/* Outer Arch */}
        <path
          d="M 52 166 L 52 102 A 68 68 0 0 1 188 102 L 188 166"
          stroke={goldColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Inner Delicate Arch Line */}
        <path
          d="M 58 166 L 58 102 A 62 62 0 0 1 182 102 L 182 166"
          stroke={goldColor}
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
      </g>

      {/* 2. GOLDEN SUN */}
      <circle
        cx="88"
        cy="94"
        r="15"
        fill={goldColor}
      />
      {/* Subtle sun ray halo ring */}
      <circle
        cx="88"
        cy="94"
        r="19"
        stroke={goldColor}
        strokeWidth="1"
        strokeOpacity="0.35"
        strokeDasharray="2 3"
      />

      {/* 3. MINIMALIST BEACH BUNGALOW / VILLA */}
      <g stroke={goldColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Main hip/gable roof line */}
        <path d="M 72 130 L 115 110 L 158 130" />
        {/* Horizontal roof beam / fascia */}
        <line x1="80" y1="130" x2="158" y2="130" />
        {/* Wall vertical support posts */}
        <line x1="82" y1="130" x2="82" y2="140" />
        <line x1="115" y1="130" x2="115" y2="140" />
        <line x1="156" y1="130" x2="156" y2="140" />
        {/* Lanai / Deck Floor */}
        <line x1="82" y1="140" x2="172" y2="140" />
        {/* Railing posts on lanai */}
        <line x1="94" y1="140" x2="94" y2="150" />
        <line x1="102" y1="140" x2="102" y2="150" />
        <line x1="110" y1="140" x2="110" y2="150" />
        <line x1="118" y1="140" x2="118" y2="150" />
        <line x1="126" y1="140" x2="126" y2="150" />
        <line x1="134" y1="140" x2="134" y2="150" />
        <line x1="142" y1="140" x2="142" y2="150" />
        <line x1="150" y1="140" x2="150" y2="150" />
        <line x1="158" y1="140" x2="158" y2="150" />
        <line x1="166" y1="140" x2="166" y2="150" />
      </g>

      {/* 4. TROPICAL PALM TREE */}
      <g fill={pineColor} stroke={pineColor}>
        {/* Gently curved slender trunk */}
        <path
          d="M 152 160 C 154 138 158 115 155 78 C 153 78 150 115 147 160 Z"
          strokeWidth="0.5"
        />

        {/* Palm Fronds radiating gracefully from crown at (153, 78) */}
        {/* Top-Right Frond */}
        <path
          d="M 153 78 Q 166 60 178 63 Q 170 70 153 78"
          strokeWidth="1.2"
        />
        <path
          d="M 153 78 C 160 55 174 54 186 64 C 176 68 164 74 153 78 Z"
        />
        {/* Far-Right Frond */}
        <path
          d="M 153 78 C 165 72 186 76 195 86 C 182 89 168 85 153 78 Z"
        />
        {/* Lower-Right Frond */}
        <path
          d="M 153 78 C 162 85 178 96 182 108 C 172 102 162 93 153 78 Z"
        />
        {/* Top-Left Upright Frond */}
        <path
          d="M 153 78 C 146 58 136 56 128 66 C 136 72 144 76 153 78 Z"
        />
        {/* Mid-Left Frond over Villa */}
        <path
          d="M 153 78 C 142 70 125 76 116 88 C 128 86 140 83 153 78 Z"
        />
        {/* Lower-Left Frond */}
        <path
          d="M 153 78 C 144 84 134 94 130 106 C 138 98 146 90 153 78 Z"
        />
        {/* Center Crown Upright Spike */}
        <path
          d="M 153 78 C 151 60 152 50 155 48 C 156 56 155 68 153 78 Z"
        />
      </g>

      {/* 5. CASCADING MULTI-TONAL COASTAL WAVES */}
      <g>
        {/* Top Wave: Deep Pine / Tropical Emerald */}
        <path
          d="M 66 168 C 90 158 116 150 148 152 C 176 154 196 150 216 146 C 205 156 186 166 160 168 C 130 170 102 178 66 168 Z"
          fill={pineColor}
        />

        {/* Middle Wave Ribbon: Ocean Blue */}
        <path
          d="M 74 174 C 104 167 138 163 172 162 C 196 161 210 156 218 153 C 204 165 180 175 148 177 C 118 179 92 183 74 174 Z"
          fill={oceanColor}
        />

        {/* Third Wave Ribbon: Sage Green */}
        <path
          d="M 86 180 C 114 174 144 171 176 170 C 196 169 206 165 214 162 C 200 172 176 181 146 183 C 120 185 98 187 86 180 Z"
          fill={sageColor}
        />

        {/* Bottom Accent Ribbon: Warm Gold / Sand */}
        <path
          d="M 98 185 C 124 180 154 178 180 176 C 194 175 202 172 208 169 C 196 178 174 187 146 188 C 124 189 108 190 98 185 Z"
          fill={goldColor}
        />
      </g>

      {/* 6. ICONIC 5-PETAL PLUMERIA FLOWER */}
      {/* Positioned on the left side of the waves at (64, 160) */}
      <g transform="translate(64, 160)">
        {/* Soft backing circle to guarantee contrast on any backdrop */}
        <circle
          cx="0"
          cy="0"
          r="38"
          fill={isWhite ? 'rgba(26,59,52,0.3)' : 'rgba(249,247,242,0.85)'}
        />

        {/* 5 Overlapping Spiral Plumeria Petals */}
        {/* Petal 1 - Top Left */}
        <path
          d="M 0 0 C -14 -12 -25 -28 -14 -40 C -2 -50 18 -38 10 -16 Z"
          fill={petalFill}
          stroke={petalStroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Petal 2 - Top Right */}
        <path
          d="M 0 0 C 10 -16 28 -25 38 -17 C 48 -9 42 12 20 14 Z"
          fill={petalFill}
          stroke={petalStroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Petal 3 - Bottom Right */}
        <path
          d="M 0 0 C 16 5 32 16 29 28 C 26 40 8 42 -5 24 Z"
          fill={petalFill}
          stroke={petalStroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Petal 4 - Bottom Left */}
        <path
          d="M 0 0 C -4 16 -16 32 -28 27 C -40 22 -34 4 -16 -4 Z"
          fill={petalFill}
          stroke={petalStroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Petal 5 - Left */}
        <path
          d="M 0 0 C -20 -2 -38 -8 -38 -20 C -38 -32 -20 -26 -6 -9 Z"
          fill={petalFill}
          stroke={petalStroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Flower Center - Golden Sunburst Corona */}
        <circle cx="0" cy="0" r="14" fill={isWhite ? '#F6E7A7' : '#F6E7A7'} />
        <circle cx="0" cy="0" r="8" fill={goldColor} />
        <circle cx="0" cy="0" r="3.5" fill={goldDark} />

        {/* Delicate Center Floral Accent Rays */}
        <path
          d="M 0 0 L -6 -13 M 0 0 L 13 -6 M 0 0 L 10 10 M 0 0 L -9 10 M 0 0 L -13 -3"
          stroke={goldDark}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
