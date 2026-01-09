import * as React from 'react';

interface SeedIconProps {
  color: string;
  size?: number;
  className?: string;
}

export const RoundSeed: React.FC<SeedIconProps> = ({ color, size = 40, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
    <circle cx="20" cy="20" r="16" fill={color} opacity="0.3" />
    <circle cx="20" cy="20" r="12" fill={color} opacity="0.6" />
    <circle cx="20" cy="20" r="8" fill={color} />
    <circle cx="16" cy="16" r="3" fill="white" opacity="0.4" />
  </svg>
);

export const AngularSeed: React.FC<SeedIconProps> = ({ color, size = 40, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
    <polygon points="20,4 35,15 35,25 20,36 5,25 5,15" fill={color} opacity="0.3" />
    <polygon points="20,8 31,17 31,23 20,32 9,23 9,17" fill={color} opacity="0.6" />
    <polygon points="20,12 27,18 27,22 20,28 13,22 13,18" fill={color} />
    <polygon points="18,14 22,14 23,18 19,18" fill="white" opacity="0.4" />
  </svg>
);

export const BinarySeed: React.FC<SeedIconProps> = ({ color, size = 40, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
    <rect x="8" y="8" width="24" height="24" rx="4" fill={color} opacity="0.3" />
    <rect x="11" y="11" width="18" height="18" rx="3" fill={color} opacity="0.6" />
    <rect x="14" y="14" width="12" height="12" rx="2" fill={color} />
    {/* Binary pattern */}
    <text x="20" y="23" fontSize="10" fill="white" textAnchor="middle" fontFamily="monospace">01</text>
  </svg>
);

export const GeometricSeed: React.FC<SeedIconProps> = ({ color, size = 40, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
    <rect x="6" y="6" width="28" height="28" fill={color} opacity="0.3" />
    <rect x="10" y="10" width="20" height="20" fill={color} opacity="0.6" />
    <rect x="14" y="14" width="12" height="12" fill={color} />
    <rect x="16" y="16" width="4" height="4" fill="white" opacity="0.4" />
  </svg>
);

export const ElegantSeed: React.FC<SeedIconProps> = ({ color, size = 40, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
    {/* Teardrop/elegant shape */}
    <ellipse cx="20" cy="22" rx="14" ry="16" fill={color} opacity="0.3" />
    <ellipse cx="20" cy="22" rx="10" ry="12" fill={color} opacity="0.6" />
    <ellipse cx="20" cy="22" rx="6" ry="8" fill={color} />
    <path d="M 20 10 Q 18 14 20 18" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
  </svg>
);

interface DepartmentSeedProps {
  seedType: 'round' | 'angular' | 'binary' | 'geometric' | 'elegant';
  color: string;
  size?: number;
  className?: string;
}

export const DepartmentSeed: React.FC<DepartmentSeedProps> = ({ seedType, color, size, className }) => {
  switch (seedType) {
    case 'round':
      return <RoundSeed color={color} size={size} className={className} />;
    case 'angular':
      return <AngularSeed color={color} size={size} className={className} />;
    case 'binary':
      return <BinarySeed color={color} size={size} className={className} />;
    case 'geometric':
      return <GeometricSeed color={color} size={size} className={className} />;
    case 'elegant':
      return <ElegantSeed color={color} size={size} className={className} />;
    default:
      return <RoundSeed color={color} size={size} className={className} />;
  }
};
