import * as React from 'react';

interface GeometricTreeProps {
  color: string;
  size?: number;
  className?: string;
  growthLevel: number; // 0-10
}

// Creativity Department - Round/Organic Geometric Trees
export const CreativityTree: React.FC<GeometricTreeProps> = ({ color, size = 80, className = '', growthLevel }) => {
  if (growthLevel === 0) {
    // Seed
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="72" rx="8" ry="3" fill="#8B7355" opacity="0.3" />
        <ellipse cx="40" cy="68" rx="4" ry="5" fill={color} />
        <ellipse cx="40" cy="67" rx="3" ry="4" fill={color} opacity="0.7" />
      </svg>
    );
  }

  if (growthLevel === 1) {
    // Sprout
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="72" rx="10" ry="3" fill="#8B7355" opacity="0.3" />
        <rect x="39" y="65" width="2" height="7" fill="#6B4423" />
        <circle cx="40" cy="63" r="3" fill={color} />
        <circle cx="40" cy="62" r="2" fill={color} opacity="0.7" />
      </svg>
    );
  }

  if (growthLevel === 2) {
    // Small trunk + tiny crown
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="72" rx="12" ry="4" fill="#8B7355" opacity="0.3" />
        <rect x="38" y="58" width="4" height="14" fill="#6B4423" rx="1" />
        <ellipse cx="40" cy="56" rx="6" ry="7" fill={color} />
        <ellipse cx="40" cy="54" rx="5" ry="6" fill={color} opacity="0.8" />
        <ellipse cx="40" cy="53" rx="4" ry="5" fill={color} opacity="0.6" />
      </svg>
    );
  }

  if (growthLevel === 3) {
    // Growing - layered round shape
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="73" rx="14" ry="4" fill="#8B7355" opacity="0.3" />
        <rect x="38" y="52" width="4" height="21" fill="#6B4423" rx="1" />
        <ellipse cx="40" cy="50" rx="8" ry="9" fill={color} />
        <ellipse cx="40" cy="47" rx="7" ry="8" fill={color} opacity="0.85" />
        <ellipse cx="40" cy="45" rx="6" ry="7" fill={color} opacity="0.7" />
        <circle cx="40" cy="43" r="4" fill={color} opacity="0.5" />
      </svg>
    );
  }

  if (growthLevel === 4) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="74" rx="16" ry="4" fill="#8B7355" opacity="0.3" />
        <rect x="37" y="46" width="6" height="28" fill="#6B4423" rx="2" />
        <ellipse cx="40" cy="44" rx="10" ry="11" fill={color} />
        <ellipse cx="40" cy="40" rx="9" ry="10" fill={color} opacity="0.9" />
        <ellipse cx="40" cy="37" rx="8" ry="9" fill={color} opacity="0.75" />
        <ellipse cx="40" cy="35" rx="6" ry="7" fill={color} opacity="0.6" />
      </svg>
    );
  }

  if (growthLevel === 5) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="74" rx="18" ry="5" fill="#8B7355" opacity="0.3" />
        <rect x="37" y="42" width="6" height="32" fill="#6B4423" rx="2" />
        <ellipse cx="40" cy="40" rx="12" ry="13" fill={color} />
        <ellipse cx="40" cy="35" rx="11" ry="12" fill={color} opacity="0.9" />
        <ellipse cx="40" cy="31" rx="10" ry="11" fill={color} opacity="0.8" />
        <ellipse cx="40" cy="28" rx="8" ry="9" fill={color} opacity="0.65" />
        <circle cx="40" cy="26" r="5" fill={color} opacity="0.5" />
      </svg>
    );
  }

  if (growthLevel === 6) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="75" rx="20" ry="5" fill="#8B7355" opacity="0.3" />
        <rect x="36" y="38" width="8" height="37" fill="#6B4423" rx="2" />
        <ellipse cx="40" cy="36" rx="14" ry="15" fill={color} />
        <ellipse cx="40" cy="30" rx="13" ry="14" fill={color} opacity="0.9" />
        <ellipse cx="40" cy="26" rx="12" ry="13" fill={color} opacity="0.8" />
        <ellipse cx="40" cy="22" rx="10" ry="11" fill={color} opacity="0.7" />
        <ellipse cx="40" cy="20" rx="7" ry="8" fill={color} opacity="0.55" />
      </svg>
    );
  }

  if (growthLevel === 7) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="75" rx="22" ry="5" fill="#8B7355" opacity="0.3" />
        <rect x="36" y="34" width="8" height="41" fill="#6B4423" rx="2" />
        <ellipse cx="40" cy="32" rx="16" ry="17" fill={color} />
        <ellipse cx="40" cy="25" rx="15" ry="16" fill={color} opacity="0.95" />
        <ellipse cx="40" cy="20" rx="14" ry="15" fill={color} opacity="0.85" />
        <ellipse cx="40" cy="16" rx="12" ry="13" fill={color} opacity="0.75" />
        <ellipse cx="40" cy="13" rx="9" ry="10" fill={color} opacity="0.6" />
      </svg>
    );
  }

  if (growthLevel === 8) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="76" rx="24" ry="5" fill="#8B7355" opacity="0.3" />
        <rect x="35" y="30" width="10" height="46" fill="#6B4423" rx="3" />
        <ellipse cx="40" cy="28" rx="18" ry="19" fill={color} />
        <ellipse cx="40" cy="20" rx="17" ry="18" fill={color} opacity="0.95" />
        <ellipse cx="40" cy="14" rx="16" ry="17" fill={color} opacity="0.9" />
        <ellipse cx="40" cy="10" rx="14" ry="15" fill={color} opacity="0.8" />
        <ellipse cx="40" cy="7" rx="10" ry="11" fill={color} opacity="0.65" />
      </svg>
    );
  }

  if (growthLevel === 9) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="76" rx="26" ry="6" fill="#8B7355" opacity="0.3" />
        <rect x="35" y="26" width="10" height="50" fill="#6B4423" rx="3" />
        <ellipse cx="40" cy="24" rx="20" ry="21" fill={color} />
        <ellipse cx="40" cy="15" rx="19" ry="20" fill={color} opacity="0.95" />
        <ellipse cx="40" cy="9" rx="18" ry="19" fill={color} opacity="0.9" />
        <ellipse cx="40" cy="5" rx="16" ry="17" fill={color} opacity="0.8" />
        <ellipse cx="40" cy="3" rx="12" ry="13" fill={color} opacity="0.7" />
      </svg>
    );
  }

  // Level 10 - Fully mature
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
      <ellipse cx="40" cy="76" rx="28" ry="6" fill="#8B7355" opacity="0.3" />
      <rect x="34" y="22" width="12" height="54" fill="#6B4423" rx="3" />
      <ellipse cx="40" cy="20" rx="22" ry="23" fill={color} />
      <ellipse cx="40" cy="10" rx="21" ry="22" fill={color} opacity="0.95" />
      <ellipse cx="40" cy="4" rx="20" ry="21" fill={color} opacity="0.9" />
      <ellipse cx="40" cy="0" rx="18" ry="19" fill={color} opacity="0.85" />
      <ellipse cx="40" cy="-2" rx="14" ry="15" fill={color} opacity="0.7" />
      <circle cx="35" cy="15" r="3" fill="#FCD34D" opacity="0.8" />
      <circle cx="45" cy="12" r="3" fill="#FCD34D" opacity="0.8" />
    </svg>
  );
};

// Tech Department - Geometric Cube Stack Trees
export const TechTree: React.FC<GeometricTreeProps> = ({ color, size = 80, className = '', growthLevel }) => {
  const cubeColor = color;
  const darkColor = adjustColor(color, -30);
  const lightColor = adjustColor(color, 20);

  if (growthLevel === 0) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="72" rx="8" ry="3" fill="#8B7355" opacity="0.3" />
        <rect x="37" y="66" width="6" height="6" fill={cubeColor} rx="1" />
      </svg>
    );
  }

  if (growthLevel === 1) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="72" rx="10" ry="3" fill="#8B7355" opacity="0.3" />
        <rect x="38" y="64" width="4" height="8" fill="#6B4423" />
        <path d="M 40 60 L 34 63 L 34 67 L 40 64 Z" fill={darkColor} />
        <path d="M 40 60 L 46 63 L 46 67 L 40 64 Z" fill={cubeColor} />
        <path d="M 40 60 L 46 63 L 40 66 L 34 63 Z" fill={lightColor} />
      </svg>
    );
  }

  if (growthLevel === 2) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="73" rx="12" ry="4" fill="#8B7355" opacity="0.3" />
        <rect x="38" y="58" width="4" height="15" fill="#6B4423" />
        <path d="M 40 54 L 32 58 L 32 64 L 40 60 Z" fill={darkColor} />
        <path d="M 40 54 L 48 58 L 48 64 L 40 60 Z" fill={cubeColor} />
        <path d="M 40 54 L 48 58 L 40 62 L 32 58 Z" fill={lightColor} />
      </svg>
    );
  }

  if (growthLevel === 3) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="74" rx="14" ry="4" fill="#8B7355" opacity="0.3" />
        <rect x="38" y="52" width="4" height="22" fill="#6B4423" />
        <g>
          <path d="M 40 48 L 30 53 L 30 61 L 40 56 Z" fill={darkColor} />
          <path d="M 40 48 L 50 53 L 50 61 L 40 56 Z" fill={cubeColor} />
          <path d="M 40 48 L 50 53 L 40 58 L 30 53 Z" fill={lightColor} />
        </g>
      </svg>
    );
  }

  if (growthLevel === 4) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="74" rx="16" ry="4" fill="#8B7355" opacity="0.3" />
        <rect x="38" y="46" width="4" height="28" fill="#6B4423" />
        <g>
          <path d="M 40 42 L 28 48 L 28 58 L 40 52 Z" fill={darkColor} />
          <path d="M 40 42 L 52 48 L 52 58 L 40 52 Z" fill={cubeColor} />
          <path d="M 40 42 L 52 48 L 40 54 L 28 48 Z" fill={lightColor} />
        </g>
        <g opacity="0.8">
          <path d="M 40 35 L 32 39 L 32 45 L 40 41 Z" fill={darkColor} />
          <path d="M 40 35 L 48 39 L 48 45 L 40 41 Z" fill={cubeColor} />
          <path d="M 40 35 L 48 39 L 40 43 L 32 39 Z" fill={lightColor} />
        </g>
      </svg>
    );
  }

  if (growthLevel === 5) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="75" rx="18" ry="5" fill="#8B7355" opacity="0.3" />
        <rect x="38" y="40" width="4" height="35" fill="#6B4423" />
        <g>
          <path d="M 40 36 L 26 43 L 26 55 L 40 48 Z" fill={darkColor} />
          <path d="M 40 36 L 54 43 L 54 55 L 40 48 Z" fill={cubeColor} />
          <path d="M 40 36 L 54 43 L 40 50 L 26 43 Z" fill={lightColor} />
        </g>
        <g opacity="0.85">
          <path d="M 40 28 L 30 33 L 30 41 L 40 36 Z" fill={darkColor} />
          <path d="M 40 28 L 50 33 L 50 41 L 40 36 Z" fill={cubeColor} />
          <path d="M 40 28 L 50 33 L 40 38 L 30 33 Z" fill={lightColor} />
        </g>
      </svg>
    );
  }

  if (growthLevel === 6) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="75" rx="20" ry="5" fill="#8B7355" opacity="0.3" />
        <rect x="38" y="34" width="4" height="41" fill="#6B4423" />
        <g>
          <path d="M 40 30 L 24 38 L 24 52 L 40 44 Z" fill={darkColor} />
          <path d="M 40 30 L 56 38 L 56 52 L 40 44 Z" fill={cubeColor} />
          <path d="M 40 30 L 56 38 L 40 46 L 24 38 Z" fill={lightColor} />
        </g>
        <g opacity="0.9">
          <path d="M 40 21 L 28 27 L 28 37 L 40 31 Z" fill={darkColor} />
          <path d="M 40 21 L 52 27 L 52 37 L 40 31 Z" fill={cubeColor} />
          <path d="M 40 21 L 52 27 L 40 33 L 28 27 Z" fill={lightColor} />
        </g>
        <g opacity="0.75">
          <path d="M 40 15 L 34 18 L 34 24 L 40 21 Z" fill={darkColor} />
          <path d="M 40 15 L 46 18 L 46 24 L 40 21 Z" fill={cubeColor} />
          <path d="M 40 15 L 46 18 L 40 21 L 34 18 Z" fill={lightColor} />
        </g>
      </svg>
    );
  }

  if (growthLevel === 7) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="76" rx="22" ry="5" fill="#8B7355" opacity="0.3" />
        <rect x="38" y="28" width="4" height="48" fill="#6B4423" />
        <g>
          <path d="M 40 24 L 22 34 L 22 50 L 40 40 Z" fill={darkColor} />
          <path d="M 40 24 L 58 34 L 58 50 L 40 40 Z" fill={cubeColor} />
          <path d="M 40 24 L 58 34 L 40 44 L 22 34 Z" fill={lightColor} />
        </g>
        <g opacity="0.9">
          <path d="M 40 14 L 26 22 L 26 34 L 40 26 Z" fill={darkColor} />
          <path d="M 40 14 L 54 22 L 54 34 L 40 26 Z" fill={cubeColor} />
          <path d="M 40 14 L 54 22 L 40 30 L 26 22 Z" fill={lightColor} />
        </g>
        <g opacity="0.8">
          <path d="M 40 8 L 32 12 L 32 20 L 40 16 Z" fill={darkColor} />
          <path d="M 40 8 L 48 12 L 48 20 L 40 16 Z" fill={cubeColor} />
          <path d="M 40 8 L 48 12 L 40 16 L 32 12 Z" fill={lightColor} />
        </g>
      </svg>
    );
  }

  if (growthLevel === 8) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="76" rx="24" ry="6" fill="#8B7355" opacity="0.3" />
        <rect x="38" y="22" width="4" height="54" fill="#6B4423" />
        <g>
          <path d="M 40 18 L 20 30 L 20 48 L 40 36 Z" fill={darkColor} />
          <path d="M 40 18 L 60 30 L 60 48 L 40 36 Z" fill={cubeColor} />
          <path d="M 40 18 L 60 30 L 40 42 L 20 30 Z" fill={lightColor} />
        </g>
        <g opacity="0.9">
          <path d="M 40 9 L 24 18 L 24 32 L 40 23 Z" fill={darkColor} />
          <path d="M 40 9 L 56 18 L 56 32 L 40 23 Z" fill={cubeColor} />
          <path d="M 40 9 L 56 18 L 40 27 L 24 18 Z" fill={lightColor} />
        </g>
        <g opacity="0.85">
          <path d="M 40 3 L 30 8 L 30 18 L 40 13 Z" fill={darkColor} />
          <path d="M 40 3 L 50 8 L 50 18 L 40 13 Z" fill={cubeColor} />
          <path d="M 40 3 L 50 8 L 40 13 L 30 8 Z" fill={lightColor} />
        </g>
      </svg>
    );
  }

  if (growthLevel === 9) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="77" rx="26" ry="6" fill="#8B7355" opacity="0.3" />
        <rect x="38" y="16" width="10" height="61" fill="#6B4423" rx="3" />
        <g>
          <path d="M 40 12 L 18 26 L 18 46 L 40 32 Z" fill={darkColor} />
          <path d="M 40 12 L 62 26 L 62 46 L 40 32 Z" fill={cubeColor} />
          <path d="M 40 12 L 62 26 L 40 40 L 18 26 Z" fill={lightColor} />
        </g>
        <g opacity="0.95">
          <path d="M 40 4 L 22 14 L 22 30 L 40 20 Z" fill={darkColor} />
          <path d="M 40 4 L 58 14 L 58 30 L 40 20 Z" fill={cubeColor} />
          <path d="M 40 4 L 58 14 L 40 24 L 22 14 Z" fill={lightColor} />
        </g>
        <g opacity="0.9">
          <path d="M 40 -1 L 28 5 L 28 17 L 40 11 Z" fill={darkColor} />
          <path d="M 40 -1 L 52 5 L 52 17 L 40 11 Z" fill={cubeColor} />
          <path d="M 40 -1 L 52 5 L 40 11 L 28 5 Z" fill={lightColor} />
        </g>
      </svg>
    );
  }

  // Level 10 - Fully mature
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
      <ellipse cx="40" cy="77" rx="28" ry="6" fill="#8B7355" opacity="0.3" />
      <rect x="37" y="10" width="6" height="67" fill="#6B4423" />
      <g>
        <path d="M 40 6 L 16 22 L 16 44 L 40 28 Z" fill={darkColor} />
        <path d="M 40 6 L 64 22 L 64 44 L 40 28 Z" fill={cubeColor} />
        <path d="M 40 6 L 64 22 L 40 38 L 16 22 Z" fill={lightColor} />
      </g>
      <g opacity="0.95">
        <path d="M 40 -2 L 20 10 L 20 28 L 40 16 Z" fill={darkColor} />
        <path d="M 40 -2 L 60 10 L 60 28 L 40 16 Z" fill={cubeColor} />
        <path d="M 40 -2 L 60 10 L 40 22 L 20 10 Z" fill={lightColor} />
      </g>
      <g opacity="0.9">
        <path d="M 40 -7 L 26 1 L 26 15 L 40 7 Z" fill={darkColor} />
        <path d="M 40 -7 L 54 1 L 54 15 L 40 7 Z" fill={cubeColor} />
        <path d="M 40 -7 L 54 1 L 40 9 L 26 1 Z" fill={lightColor} />
      </g>
      <circle cx="35" cy="20" r="3" fill="#FCD34D" opacity="0.8" />
      <circle cx="45" cy="18" r="3" fill="#FCD34D" opacity="0.8" />
    </svg>
  );
};

function adjustColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}

interface DepartmentGeometricTreeProps {
  department: string;
  color: string;
  size?: number;
  className?: string;
  growthLevel: number; // 0-10
}

export const DepartmentGeometricTree: React.FC<DepartmentGeometricTreeProps> = ({ 
  department, 
  color, 
  size = 80,
  className = '',
  growthLevel 
}) => {
  // Use different tree types for each department
  switch (department) {
    case 'creativity':
      return <CreativityTree color={color} size={size} className={className} growthLevel={growthLevel} />;
    case 'tech':
      return <TechTree color={color} size={size} className={className} growthLevel={growthLevel} />;
    case 'coding':
      return <TechTree color={color} size={size} className={className} growthLevel={growthLevel} />;
    case 'management':
      return <CreativityTree color={color} size={size} className={className} growthLevel={growthLevel} />;
    case 'design':
      return <CreativityTree color={color} size={size} className={className} growthLevel={growthLevel} />;
    default:
      return <CreativityTree color={color} size={size} className={className} growthLevel={growthLevel} />;
  }
};