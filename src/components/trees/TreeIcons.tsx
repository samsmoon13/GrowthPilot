import React from 'react';

interface TreeIconProps {
  color: string;
  size?: number;
  className?: string;
  stage?: 'seed' | 'sprout' | 'young' | 'mature';
}

// Maple Tree - Realistic with detailed leaves and branches
export const MapleTree: React.FC<TreeIconProps> = ({ color, size = 80, className = '', stage = 'mature' }) => {
  if (stage === 'seed') return <div className={className} style={{ width: size, height: size }} />;
  
  if (stage === 'sprout') {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        {/* Ground */}
        <ellipse cx="40" cy="70" rx="25" ry="4" fill="#a8a29e" opacity="0.5" />
        {/* Stem */}
        <rect x="39" y="55" width="2" height="15" fill="#78350f" />
        {/* Small leaves */}
        <ellipse cx="35" cy="55" rx="4" ry="2" fill={color} opacity="0.8" />
        <ellipse cx="45" cy="53" rx="4" ry="2" fill={color} opacity="0.8" />
      </svg>
    );
  }
  
  if (stage === 'young') {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        {/* Ground */}
        <ellipse cx="40" cy="72" rx="30" ry="5" fill="#a8a29e" opacity="0.6" />
        {/* Trunk */}
        <path d="M 39 72 L 38 45 Q 38 40 40 38 Q 42 40 42 45 L 41 72 Z" fill="#78350f" />
        {/* Branches */}
        <path d="M 40 48 Q 32 46 28 42" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
        <path d="M 40 50 Q 48 48 52 44" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
        {/* Leaf clusters */}
        <ellipse cx="28" cy="42" rx="6" ry="4" fill={color} opacity="0.8" />
        <ellipse cx="26" cy="40" rx="5" ry="3" fill="#16a34a" opacity="0.7" />
        <ellipse cx="52" cy="44" rx="6" ry="4" fill={color} opacity="0.8" />
        <ellipse cx="54" cy="42" rx="5" ry="3" fill="#16a34a" opacity="0.7" />
        {/* Top foliage */}
        <ellipse cx="40" cy="35" rx="8" ry="5" fill={color} />
        <ellipse cx="38" cy="33" rx="6" ry="4" fill="#16a34a" />
      </svg>
    );
  }
  
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
      {/* Ground with roots */}
      <ellipse cx="40" cy="75" rx="35" ry="6" fill="#a8a29e" opacity="0.7" />
      <path d="M 35 73 Q 25 75 20 76" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M 45 73 Q 55 75 60 76" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.4" />
      
      {/* Strong trunk with texture */}
      <path d="M 37 75 L 36 42 Q 36 32 40 28 Q 44 32 44 42 L 43 75 Z" fill="#78350f" />
      <line x1="37" y1="65" x2="43" y2="64" stroke="#92400e" strokeWidth="0.5" opacity="0.5" />
      <line x1="37" y1="55" x2="43" y2="54" stroke="#92400e" strokeWidth="0.5" opacity="0.5" />
      <line x1="37" y1="45" x2="43" y2="44" stroke="#92400e" strokeWidth="0.5" opacity="0.5" />
      
      {/* Main branches */}
      <path d="M 40 48 Q 28 45 20 38" stroke={color} strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M 40 50 Q 52 47 60 40" stroke={color} strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M 40 45 Q 35 40 32 32" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M 40 46 Q 45 41 48 33" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
      
      {/* Leaf clusters - layered for depth */}
      <ellipse cx="20" cy="38" rx="8" ry="6" fill={color} opacity="0.6" />
      <ellipse cx="18" cy="36" rx="7" ry="5" fill="#16a34a" opacity="0.7" />
      <ellipse cx="60" cy="40" rx="8" ry="6" fill={color} opacity="0.6" />
      <ellipse cx="62" cy="38" rx="7" ry="5" fill="#16a34a" opacity="0.7" />
      <ellipse cx="32" cy="32" rx="7" ry="5" fill={color} opacity="0.7" />
      <ellipse cx="30" cy="30" rx="6" ry="4" fill="#15803d" />
      <ellipse cx="48" cy="33" rx="7" ry="5" fill={color} opacity="0.7" />
      <ellipse cx="50" cy="31" rx="6" ry="4" fill="#15803d" />
      
      {/* Dense crown */}
      <ellipse cx="40" cy="28" rx="12" ry="8" fill={color} opacity="0.7" />
      <ellipse cx="38" cy="25" rx="10" ry="6" fill="#16a34a" opacity="0.8" />
      <ellipse cx="42" cy="26" rx="9" ry="6" fill="#15803d" />
      <ellipse cx="40" cy="23" rx="8" ry="5" fill={color} />
    </svg>
  );
};

// Oak Tree - Strong and wide with realistic oak leaves
export const OakTree: React.FC<TreeIconProps> = ({ color, size = 80, className = '', stage = 'mature' }) => {
  if (stage === 'seed') return <div className={className} style={{ width: size, height: size }} />;
  
  if (stage === 'sprout') {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="70" rx="25" ry="4" fill="#a8a29e" opacity="0.5" />
        <rect x="39" y="58" width="2" height="12" fill="#6B4423" />
        <ellipse cx="36" cy="56" rx="4" ry="2.5" fill={color} opacity="0.8" />
        <ellipse cx="44" cy="54" rx="4" ry="2.5" fill={color} opacity="0.8" />
      </svg>
    );
  }
  
  if (stage === 'young') {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="72" rx="32" ry="5" fill="#a8a29e" opacity="0.6" />
        <path d="M 38 72 L 37 44 Q 37 38 40 36 Q 43 38 43 44 L 42 72 Z" fill="#6B4423" />
        
        {/* Oak-style branches */}
        <path d="M 40 50 Q 30 48 24 45" stroke={color} strokeWidth="2.5" fill="none" opacity="0.7" />
        <path d="M 40 52 Q 50 50 56 47" stroke={color} strokeWidth="2.5" fill="none" opacity="0.7" />
        
        {/* Oak leaf clusters */}
        <ellipse cx="24" cy="45" rx="7" ry="5" fill={color} opacity="0.8" />
        <ellipse cx="22" cy="43" rx="5" ry="4" fill="#16a34a" />
        <ellipse cx="56" cy="47" rx="7" ry="5" fill={color} opacity="0.8" />
        <ellipse cx="58" cy="45" rx="5" ry="4" fill="#16a34a" />
        
        {/* Crown */}
        <ellipse cx="40" cy="38" rx="10" ry="6" fill={color} />
        <ellipse cx="38" cy="36" rx="8" ry="5" fill="#15803d" />
      </svg>
    );
  }
  
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
      {/* Ground and roots */}
      <ellipse cx="40" cy="76" rx="38" ry="6" fill="#a8a29e" opacity="0.7" />
      <path d="M 34 74 Q 22 76 15 77" stroke="#6B4423" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M 46 74 Q 58 76 65 77" stroke="#6B4423" strokeWidth="1.5" fill="none" opacity="0.4" />
      
      {/* Wide, strong trunk */}
      <path d="M 36 76 L 34 40 Q 34 30 40 26 Q 46 30 46 40 L 44 76 Z" fill="#6B4423" />
      {/* Bark texture */}
      <ellipse cx="38" cy="60" rx="1" ry="2" fill="#92400e" opacity="0.5" />
      <ellipse cx="42" cy="55" rx="1" ry="2" fill="#92400e" opacity="0.5" />
      <ellipse cx="39" cy="48" rx="1" ry="2" fill="#92400e" opacity="0.5" />
      <line x1="35" y1="65" x2="45" y2="63" stroke="#92400e" strokeWidth="0.5" opacity="0.4" />
      <line x1="35" y1="52" x2="45" y2="50" stroke="#92400e" strokeWidth="0.5" opacity="0.4" />
      
      {/* Strong branch structure */}
      <path d="M 40 50 Q 25 48 16 42" stroke={color} strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M 40 52 Q 55 50 64 44" stroke={color} strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M 40 46 Q 32 42 28 36" stroke={color} strokeWidth="2.5" fill="none" opacity="0.7" />
      <path d="M 40 47 Q 48 43 52 37" stroke={color} strokeWidth="2.5" fill="none" opacity="0.7" />
      
      {/* Broad oak canopy */}
      <ellipse cx="16" cy="42" rx="9" ry="7" fill={color} opacity="0.6" />
      <ellipse cx="14" cy="40" rx="7" ry="6" fill="#16a34a" opacity="0.7" />
      <ellipse cx="64" cy="44" rx="9" ry="7" fill={color} opacity="0.6" />
      <ellipse cx="66" cy="42" rx="7" ry="6" fill="#16a34a" opacity="0.7" />
      
      <ellipse cx="28" cy="36" rx="8" ry="6" fill={color} opacity="0.7" />
      <ellipse cx="26" cy="34" rx="7" ry="5" fill="#15803d" />
      <ellipse cx="52" cy="37" rx="8" ry="6" fill={color} opacity="0.7" />
      <ellipse cx="54" cy="35" rx="7" ry="5" fill="#15803d" />
      
      {/* Dense top crown */}
      <ellipse cx="40" cy="30" rx="14" ry="9" fill={color} opacity="0.7" />
      <ellipse cx="36" cy="27" rx="12" ry="7" fill="#16a34a" opacity="0.8" />
      <ellipse cx="44" cy="28" rx="11" ry="7" fill="#15803d" />
      <ellipse cx="40" cy="24" rx="10" ry="6" fill={color} />
    </svg>
  );
};

// Pine Tree - Realistic conifer with needle texture
export const PineTree: React.FC<TreeIconProps> = ({ color, size = 80, className = '', stage = 'mature' }) => {
  if (stage === 'seed') return <div className={className} style={{ width: size, height: size }} />;
  
  if (stage === 'sprout') {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="70" rx="25" ry="4" fill="#a8a29e" opacity="0.5" />
        <line x1="40" y1="70" x2="40" y2="58" stroke="#654321" strokeWidth="1.5" />
        {/* Tiny pine branches */}
        <line x1="40" y1="60" x2="36" y2="62" stroke={color} strokeWidth="1.5" opacity="0.8" />
        <line x1="40" y1="60" x2="44" y2="62" stroke={color} strokeWidth="1.5" opacity="0.8" />
      </svg>
    );
  }
  
  if (stage === 'young') {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="72" rx="28" ry="5" fill="#a8a29e" opacity="0.6" />
        <rect x="39" y="50" width="2" height="22" fill="#654321" />
        
        {/* Layered pine branches */}
        <g opacity="0.7">
          <line x1="40" y1="55" x2="32" y2="58" stroke={color} strokeWidth="2" />
          <line x1="40" y1="55" x2="48" y2="58" stroke={color} strokeWidth="2" />
        </g>
        <g opacity="0.8">
          <line x1="40" y1="60" x2="30" y2="63" stroke={color} strokeWidth="2.5" />
          <line x1="40" y1="60" x2="50" y2="63" stroke={color} strokeWidth="2.5" />
        </g>
        <g>
          <line x1="40" y1="65" x2="28" y2="68" stroke={color} strokeWidth="3" />
          <line x1="40" y1="65" x2="52" y2="68" stroke={color} strokeWidth="3" />
        </g>
        
        {/* Pine needles effect */}
        <ellipse cx="40" cy="50" rx="4" ry="5" fill={color} />
      </svg>
    );
  }
  
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
      {/* Ground */}
      <ellipse cx="40" cy="75" rx="32" ry="6" fill="#a8a29e" opacity="0.7" />
      
      {/* Straight trunk */}
      <rect x="38" y="35" width="4" height="40" fill="#654321" />
      <rect x="39" y="38" width="1" height="35" fill="#92400e" opacity="0.5" />
      
      {/* Pine cone shape with realistic layers */}
      <g opacity="0.5">
        <line x1="40" y1="40" x2="30" y2="44" stroke={color} strokeWidth="2.5" />
        <line x1="40" y1="40" x2="50" y2="44" stroke={color} strokeWidth="2.5" />
      </g>
      <g opacity="0.6">
        <line x1="40" y1="45" x2="28" y2="49" stroke={color} strokeWidth="3" />
        <line x1="40" y1="45" x2="52" y2="49" stroke={color} strokeWidth="3" />
      </g>
      <g opacity="0.7">
        <line x1="40" y1="50" x2="26" y2="54" stroke={color} strokeWidth="3.5" />
        <line x1="40" y1="50" x2="54" y2="54" stroke={color} strokeWidth="3.5" />
      </g>
      <g opacity="0.8">
        <line x1="40" y1="55" x2="24" y2="59" stroke={color} strokeWidth="4" />
        <line x1="40" y1="55" x2="56" y2="59" stroke={color} strokeWidth="4" />
      </g>
      <g opacity="0.9">
        <line x1="40" y1="60" x2="22" y2="64" stroke={color} strokeWidth="4.5" />
        <line x1="40" y1="60" x2="58" y2="64" stroke={color} strokeWidth="4.5" />
      </g>
      <g>
        <line x1="40" y1="65" x2="20" y2="69" stroke={color} strokeWidth="5" />
        <line x1="40" y1="65" x2="60" y2="69" stroke={color} strokeWidth="5" />
      </g>
      
      {/* Needle texture on branches */}
      {[...Array(6)].map((_, i) => (
        <g key={i} opacity={0.4 + i * 0.1}>
          <line x1="22 + i * 6" y1={68 - i * 5} x2={18 + i * 6} y2={70 - i * 5} stroke="#15803d" strokeWidth="0.5" />
          <line x1="58 - i * 6" y1={68 - i * 5} x2={62 - i * 6} y2={70 - i * 5} stroke="#15803d" strokeWidth="0.5" />
        </g>
      ))}
      
      {/* Top point */}
      <ellipse cx="40" cy="35" rx="3" ry="5" fill={color} />
    </svg>
  );
};

// Elm Tree - Vase-shaped with detailed branching
export const ElmTree: React.FC<TreeIconProps> = ({ color, size = 80, className = '', stage = 'mature' }) => {
  if (stage === 'seed') return <div className={className} style={{ width: size, height: size }} />;
  
  if (stage === 'sprout') {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="70" rx="25" ry="4" fill="#a8a29e" opacity="0.5" />
        <line x1="40" y1="70" x2="40" y2="56" stroke="#7B5B3A" strokeWidth="2" />
        <ellipse cx="40" cy="54" rx="5" ry="3" fill={color} opacity="0.8" />
      </svg>
    );
  }
  
  if (stage === 'young') {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="72" rx="30" ry="5" fill="#a8a29e" opacity="0.6" />
        <path d="M 39 72 L 39 46 Q 39 42 40 40 Q 41 42 41 46 L 41 72 Z" fill="#7B5B3A" />
        
        {/* Vase-shaped branches */}
        <path d="M 40 48 Q 36 44 32 38" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
        <path d="M 40 48 Q 44 44 48 38" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
        
        {/* Leaf clusters */}
        <ellipse cx="32" cy="38" rx="6" ry="5" fill={color} opacity="0.8" />
        <ellipse cx="30" cy="36" rx="5" ry="4" fill="#16a34a" />
        <ellipse cx="48" cy="38" rx="6" ry="5" fill={color} opacity="0.8" />
        <ellipse cx="50" cy="36" rx="5" ry="4" fill="#16a34a" />
        
        <ellipse cx="40" cy="38" rx="7" ry="5" fill={color} />
      </svg>
    );
  }
  
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
      {/* Ground */}
      <ellipse cx="40" cy="75" rx="36" ry="6" fill="#a8a29e" opacity="0.7" />
      
      {/* Trunk */}
      <path d="M 38 75 L 37 45 Q 37 36 40 32 Q 43 36 43 45 L 42 75 Z" fill="#7B5B3A" />
      <line x1="38" y1="65" x2="42" y2="64" stroke="#92400e" strokeWidth="0.5" opacity="0.5" />
      <line x1="38" y1="55" x2="42" y2="54" stroke="#92400e" strokeWidth="0.5" opacity="0.5" />
      
      {/* Vase-shaped branch structure */}
      <path d="M 40 50 Q 34 46 26 38" stroke={color} strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M 40 50 Q 46 46 54 38" stroke={color} strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M 40 48 Q 36 44 30 35" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M 40 48 Q 44 44 50 35" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M 40 46 Q 38 42 35 28" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M 40 46 Q 42 42 45 28" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
      
      {/* Foliage clusters creating vase shape */}
      <ellipse cx="26" cy="38" rx="7" ry="6" fill={color} opacity="0.6" />
      <ellipse cx="24" cy="36" rx="6" ry="5" fill="#16a34a" opacity="0.7" />
      <ellipse cx="54" cy="38" rx="7" ry="6" fill={color} opacity="0.6" />
      <ellipse cx="56" cy="36" rx="6" ry="5" fill="#16a34a" opacity="0.7" />
      
      <ellipse cx="30" cy="35" rx="6" ry="5" fill={color} opacity="0.7" />
      <ellipse cx="28" cy="33" rx="5" ry="4" fill="#15803d" />
      <ellipse cx="50" cy="35" rx="6" ry="5" fill={color} opacity="0.7" />
      <ellipse cx="52" cy="33" rx="5" ry="4" fill="#15803d" />
      
      <ellipse cx="35" cy="28" rx="7" ry="6" fill={color} opacity="0.8" />
      <ellipse cx="33" cy="26" rx="6" ry="5" fill="#16a34a" />
      <ellipse cx="45" cy="28" rx="7" ry="6" fill={color} opacity="0.8" />
      <ellipse cx="47" cy="26" rx="6" ry="5" fill="#16a34a" />
      
      {/* Top crown */}
      <ellipse cx="40" cy="30" rx="10" ry="7" fill={color} />
      <ellipse cx="40" cy="28" rx="8" ry="5" fill="#15803d" />
    </svg>
  );
};

// Willow Tree - Realistic drooping branches
export const WillowTree: React.FC<TreeIconProps> = ({ color, size = 80, className = '', stage = 'mature' }) => {
  if (stage === 'seed') return <div className={className} style={{ width: size, height: size }} />;
  
  if (stage === 'sprout') {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="70" rx="25" ry="4" fill="#a8a29e" opacity="0.5" />
        <line x1="40" y1="70" x2="40" y2="58" stroke="#8B7355" strokeWidth="2" />
        <path d="M 40 58 Q 36 62 36 66" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
        <path d="M 40 58 Q 44 62 44 66" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      </svg>
    );
  }
  
  if (stage === 'young') {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
        <ellipse cx="40" cy="72" rx="32" ry="5" fill="#a8a29e" opacity="0.6" />
        <path d="M 39 72 L 39 45 Q 39 40 40 38 Q 41 40 41 45 L 41 72 Z" fill="#8B7355" />
        
        {/* Drooping branches */}
        <path d="M 40 46 Q 34 50 32 58" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
        <path d="M 40 48 Q 36 54 35 62" stroke={color} strokeWidth="2" fill="none" opacity="0.8" />
        <path d="M 40 46 Q 46 50 48 58" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
        <path d="M 40 48 Q 44 54 45 62" stroke={color} strokeWidth="2" fill="none" opacity="0.8" />
        
        {/* Small canopy */}
        <ellipse cx="40" cy="40" rx="8" ry="6" fill={color} opacity="0.7" />
        <ellipse cx="40" cy="38" rx="6" ry="4" fill="#16a34a" />
      </svg>
    );
  }
  
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
      {/* Ground */}
      <ellipse cx="40" cy="76" rx="38" ry="6" fill="#a8a29e" opacity="0.7" />
      
      {/* Trunk */}
      <path d="M 38 76 L 37 42 Q 37 32 40 28 Q 43 32 43 42 L 42 76 Z" fill="#8B7355" />
      <line x1="38" y1="65" x2="42" y2="64" stroke="#92400e" strokeWidth="0.5" opacity="0.5" />
      <line x1="38" y1="52" x2="42" y2="51" stroke="#92400e" strokeWidth="0.5" opacity="0.5" />
      
      {/* Characteristic drooping branches */}
      <path d="M 35 40 Q 25 48 22 60" stroke={color} strokeWidth="2.5" fill="none" opacity="0.5" />
      <path d="M 36 42 Q 28 50 26 62" stroke={color} strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M 38 44 Q 32 52 30 64" stroke={color} strokeWidth="2.5" fill="none" opacity="0.7" />
      <path d="M 40 46 Q 36 54 34 66" stroke={color} strokeWidth="2.5" fill="none" opacity="0.8" />
      <path d="M 40 46 Q 44 54 46 66" stroke={color} strokeWidth="2.5" fill="none" opacity="0.8" />
      <path d="M 42 44 Q 48 52 50 64" stroke={color} strokeWidth="2.5" fill="none" opacity="0.7" />
      <path d="M 44 42 Q 52 50 54 62" stroke={color} strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M 45 40 Q 55 48 58 60" stroke={color} strokeWidth="2.5" fill="none" opacity="0.5" />
      
      {/* Leaves along drooping branches */}
      <ellipse cx="22" cy="60" rx="3" ry="4" fill="#16a34a" opacity="0.6" />
      <ellipse cx="26" cy="62" rx="3" ry="4" fill={color} opacity="0.7" />
      <ellipse cx="30" cy="64" rx="3" ry="4" fill="#15803d" opacity="0.8" />
      <ellipse cx="34" cy="66" rx="3" ry="4" fill={color} opacity="0.9" />
      <ellipse cx="46" cy="66" rx="3" ry="4" fill={color} opacity="0.9" />
      <ellipse cx="50" cy="64" rx="3" ry="4" fill="#15803d" opacity="0.8" />
      <ellipse cx="54" cy="62" rx="3" ry="4" fill={color} opacity="0.7" />
      <ellipse cx="58" cy="60" rx="3" ry="4" fill="#16a34a" opacity="0.6" />
      
      {/* Top canopy */}
      <ellipse cx="40" cy="30" rx="12" ry="8" fill={color} opacity="0.6" />
      <ellipse cx="38" cy="28" rx="10" ry="6" fill="#16a34a" opacity="0.7" />
      <ellipse cx="42" cy="29" rx="9" ry="6" fill="#15803d" />
    </svg>
  );
};

interface DepartmentTreeProps {
  treeSpecies: 'maple' | 'oak' | 'pine' | 'elm' | 'willow';
  color: string;
  size?: number;
  className?: string;
  stage?: 'seed' | 'sprout' | 'young' | 'mature';
}

export const DepartmentTree: React.FC<DepartmentTreeProps> = ({ 
  treeSpecies, 
  color, 
  size, 
  className,
  stage = 'mature'
}) => {
  switch (treeSpecies) {
    case 'maple':
      return <MapleTree color={color} size={size} className={className} stage={stage} />;
    case 'oak':
      return <OakTree color={color} size={size} className={className} stage={stage} />;
    case 'pine':
      return <PineTree color={color} size={size} className={className} stage={stage} />;
    case 'elm':
      return <ElmTree color={color} size={size} className={className} stage={stage} />;
    case 'willow':
      return <WillowTree color={color} size={size} className={className} stage={stage} />;
    default:
      return <MapleTree color={color} size={size} className={className} stage={stage} />;
  }
};
