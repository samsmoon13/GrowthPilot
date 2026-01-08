import { motion } from 'motion/react';

interface PlantVisualizationProps {
  growthLevel: number; // 0-10
  size?: number;
  showAnimation?: boolean;
}

export function PlantVisualization({ growthLevel, size = 200, showAnimation = false }: PlantVisualizationProps) {
  const clampedLevel = Math.max(0, Math.min(10, growthLevel));

  // Growth stage descriptions
  const getStageDescription = (level: number) => {
    if (level === 0) return 'Seed (Level 0)';
    if (level === 1) return 'Germinating (Level 1)';
    if (level === 2) return 'Sprout (Level 2)';
    if (level === 3) return 'Young Seedling (Level 3)';
    if (level === 4) return 'Growing Seedling (Level 4)';
    if (level === 5) return 'Small Sapling (Level 5)';
    if (level === 6) return 'Medium Sapling (Level 6)';
    if (level === 7) return 'Large Sapling (Level 7)';
    if (level === 8) return 'Young Tree (Level 8)';
    if (level === 9) return 'Maturing Tree (Level 9)';
    return 'Mature Tree (Level 10)';
  };

  const renderLevel0 = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      {/* Soil */}
      <ellipse cx="100" cy="180" rx="50" ry="8" fill="#8b7355" opacity="0.6" />
      
      {/* Seed buried in soil */}
      <motion.ellipse
        cx="100"
        cy="175"
        rx="8"
        ry="10"
        fill="#a16207"
        initial={showAnimation ? { scale: 0 } : {}}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.ellipse
        cx="100"
        cy="173"
        rx="6"
        ry="8"
        fill="#ca8a04"
        initial={showAnimation ? { scale: 0 } : {}}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      
      <text x="100" y="195" textAnchor="middle" fill="#9ca3af" fontSize="11">
        {getStageDescription(0)}
      </text>
    </svg>
  );

  const renderLevel1 = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <ellipse cx="100" cy="180" rx="50" ry="8" fill="#8b7355" opacity="0.6" />
      
      {/* Seed with small root */}
      <motion.ellipse cx="100" cy="172" rx="8" ry="10" fill="#a16207"
        initial={showAnimation ? { scale: 0 } : {}}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M 100 180 L 100 185"
        stroke="#8b7355"
        strokeWidth="2"
        initial={showAnimation ? { pathLength: 0 } : {}}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
      
      <text x="100" y="195" textAnchor="middle" fill="#9ca3af" fontSize="10">
        {getStageDescription(1)}
      </text>
    </svg>
  );

  const renderLevel2 = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <ellipse cx="100" cy="178" rx="60" ry="10" fill="#78716c" />
      
      {/* Tiny stem emerging */}
      <motion.path
        d="M 100 178 Q 98 165 100 155"
        stroke="#65a30d"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={showAnimation ? { pathLength: 0 } : {}}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* First tiny leaves */}
      <motion.ellipse cx="95" cy="158" rx="5" ry="3" fill="#84cc16" opacity="0.8"
        initial={showAnimation ? { scale: 0 } : {}}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      />
      <motion.ellipse cx="105" cy="156" rx="5" ry="3" fill="#84cc16" opacity="0.8"
        initial={showAnimation ? { scale: 0 } : {}}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      />
      
      <text x="100" y="195" textAnchor="middle" fill="#16a34a" fontSize="10">
        {getStageDescription(2)}
      </text>
    </svg>
  );

  const renderLevel3 = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <ellipse cx="100" cy="178" rx="65" ry="11" fill="#78716c" />
      
      {/* Growing stem */}
      <rect x="98" y="145" width="4" height="33" fill="#65a30d" rx="2" />
      
      {/* More leaves */}
      <ellipse cx="92" cy="158" rx="6" ry="4" fill="#22c55e" />
      <ellipse cx="108" cy="155" rx="6" ry="4" fill="#22c55e" />
      <ellipse cx="95" cy="150" rx="5" ry="3" fill="#16a34a" />
      <ellipse cx="105" cy="148" rx="5" ry="3" fill="#16a34a" />
      
      <text x="100" y="195" textAnchor="middle" fill="#16a34a" fontSize="10">
        {getStageDescription(3)}
      </text>
    </svg>
  );

  const renderLevel4 = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <ellipse cx="100" cy="178" rx="68" ry="11" fill="#78716c" />
      
      {/* Thicker stem */}
      <rect x="97" y="135" width="6" height="43" fill="#65a30d" rx="3" />
      
      {/* Side branches starting */}
      <path d="M 100 150 L 90 155" stroke="#84cc16" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 100 148 L 110 153" stroke="#84cc16" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Leaf clusters */}
      <circle cx="90" cy="155" r="7" fill="#22c55e" opacity="0.8" />
      <circle cx="88" cy="153" r="5" fill="#16a34a" />
      <circle cx="110" cy="153" r="7" fill="#22c55e" opacity="0.8" />
      <circle cx="112" cy="151" r="5" fill="#16a34a" />
      
      {/* Top leaves */}
      <circle cx="100" cy="135" r="8" fill="#22c55e" />
      <circle cx="98" cy="133" r="6" fill="#15803d" />
      
      <text x="100" y="195" textAnchor="middle" fill="#16a34a" fontSize="10">
        {getStageDescription(4)}
      </text>
    </svg>
  );

  const renderLevel5 = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <ellipse cx="100" cy="180" rx="70" ry="12" fill="#78716c" />
      
      {/* Young trunk forming */}
      <path d="M 96 180 L 95 125 Q 95 120 100 118 Q 105 120 105 125 L 104 180 Z" fill="#78350f" />
      
      {/* Multiple branches */}
      <path d="M 100 145 Q 85 143 75 138" stroke="#22c55e" strokeWidth="3" fill="none" />
      <path d="M 100 143 Q 115 141 125 136" stroke="#22c55e" strokeWidth="3" fill="none" />
      <path d="M 100 135 Q 92 132 85 128" stroke="#16a34a" strokeWidth="2.5" fill="none" />
      <path d="M 100 133 Q 108 130 115 126" stroke="#16a34a" strokeWidth="2.5" fill="none" />
      
      {/* Leaf clusters on branches */}
      <circle cx="75" cy="138" r="8" fill="#22c55e" />
      <circle cx="73" cy="136" r="6" fill="#15803d" />
      <circle cx="125" cy="136" r="8" fill="#22c55e" />
      <circle cx="127" cy="134" r="6" fill="#15803d" />
      <circle cx="85" cy="128" r="7" fill="#16a34a" />
      <circle cx="115" cy="126" r="7" fill="#16a34a" />
      
      {/* Top foliage */}
      <ellipse cx="100" cy="118" rx="10" ry="8" fill="#22c55e" />
      <ellipse cx="100" cy="115" rx="8" ry="6" fill="#15803d" />
      
      <text x="100" y="195" textAnchor="middle" fill="#16a34a" fontSize="10">
        {getStageDescription(5)}
      </text>
    </svg>
  );

  const renderLevel6 = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <ellipse cx="100" cy="182" rx="75" ry="13" fill="#78716c" />
      
      {/* Developing trunk */}
      <path d="M 94 182 L 93 115 Q 93 105 100 102 Q 107 105 107 115 L 106 182 Z" fill="#78350f" />
      <line x1="94" y1="165" x2="106" y2="164" stroke="#92400e" strokeWidth="0.5" opacity="0.5" />
      <line x1="94" y1="145" x2="106" y2="144" stroke="#92400e" strokeWidth="0.5" opacity="0.5" />
      
      {/* More extensive branches */}
      <path d="M 100 150 Q 80 148 65 142" stroke="#22c55e" strokeWidth="3.5" fill="none" />
      <path d="M 100 148 Q 120 146 135 140" stroke="#22c55e" strokeWidth="3.5" fill="none" />
      <path d="M 100 140 Q 85 138 72 132" stroke="#16a34a" strokeWidth="3" fill="none" />
      <path d="M 100 138 Q 115 136 128 130" stroke="#16a34a" strokeWidth="3" fill="none" />
      <path d="M 100 128 Q 90 125 80 120" stroke="#22c55e" strokeWidth="2.5" fill="none" />
      <path d="M 100 126 Q 110 123 120 118" stroke="#22c55e" strokeWidth="2.5" fill="none" />
      
      {/* Dense foliage */}
      <circle cx="65" cy="142" r="9" fill="#22c55e" opacity="0.8" />
      <circle cx="63" cy="140" r="7" fill="#15803d" />
      <circle cx="135" cy="140" r="9" fill="#22c55e" opacity="0.8" />
      <circle cx="137" cy="138" r="7" fill="#15803d" />
      <circle cx="72" cy="132" r="8" fill="#16a34a" />
      <circle cx="128" cy="130" r="8" fill="#16a34a" />
      <circle cx="80" cy="120" r="7" fill="#22c55e" />
      <circle cx="120" cy="118" r="7" fill="#22c55e" />
      
      {/* Growing crown */}
      <ellipse cx="100" cy="105" rx="12" ry="10" fill="#22c55e" />
      <ellipse cx="100" cy="102" rx="10" ry="8" fill="#15803d" />
      
      <text x="100" y="195" textAnchor="middle" fill="#16a34a" fontSize="10">
        {getStageDescription(6)}
      </text>
    </svg>
  );

  const renderLevel7 = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <ellipse cx="100" cy="184" rx="80" ry="14" fill="#78716c" />
      
      {/* Strong trunk */}
      <path d="M 92 184 L 90 105 Q 90 90 100 85 Q 110 90 110 105 L 108 184 Z" fill="#78350f" />
      <line x1="92" y1="170" x2="108" y2="169" stroke="#92400e" strokeWidth="0.8" opacity="0.5" />
      <line x1="92" y1="150" x2="108" y2="149" stroke="#92400e" strokeWidth="0.8" opacity="0.5" />
      <line x1="92" y1="125" x2="108" y2="124" stroke="#92400e" strokeWidth="0.8" opacity="0.5" />
      
      {/* Major branches */}
      <path d="M 100 155 Q 75 152 55 145" stroke="#22c55e" strokeWidth="4" fill="none" />
      <path d="M 100 153 Q 125 150 145 143" stroke="#22c55e" strokeWidth="4" fill="none" />
      <path d="M 100 145 Q 80 142 62 135" stroke="#16a34a" strokeWidth="3.5" fill="none" />
      <path d="M 100 143 Q 120 140 138 133" stroke="#16a34a" strokeWidth="3.5" fill="none" />
      <path d="M 100 130 Q 85 127 70 120" stroke="#22c55e" strokeWidth="3" fill="none" />
      <path d="M 100 128 Q 115 125 130 118" stroke="#22c55e" strokeWidth="3" fill="none" />
      <path d="M 100 115 Q 90 112 80 105" stroke="#16a34a" strokeWidth="2.5" fill="none" />
      <path d="M 100 113 Q 110 110 120 103" stroke="#16a34a" strokeWidth="2.5" fill="none" />
      
      {/* Full foliage */}
      <circle cx="55" cy="145" r="10" fill="#22c55e" opacity="0.8" />
      <circle cx="53" cy="143" r="8" fill="#15803d" />
      <circle cx="145" cy="143" r="10" fill="#22c55e" opacity="0.8" />
      <circle cx="147" cy="141" r="8" fill="#15803d" />
      <circle cx="62" cy="135" r="9" fill="#16a34a" />
      <circle cx="138" cy="133" r="9" fill="#16a34a" />
      <circle cx="70" cy="120" r="8" fill="#22c55e" />
      <circle cx="130" cy="118" r="8" fill="#22c55e" />
      <circle cx="80" cy="105" r="7" fill="#16a34a" />
      <circle cx="120" cy="103" r="7" fill="#16a34a" />
      
      {/* Large crown */}
      <ellipse cx="100" cy="90" rx="15" ry="12" fill="#22c55e" />
      <ellipse cx="100" cy="87" rx="13" ry="10" fill="#15803d" />
      <ellipse cx="100" cy="84" rx="11" ry="8" fill="#16a34a" />
      
      <text x="100" y="197" textAnchor="middle" fill="#16a34a" fontSize="10">
        {getStageDescription(7)}
      </text>
    </svg>
  );

  const renderLevel8 = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <ellipse cx="100" cy="185" rx="85" ry="15" fill="#78716c" />
      
      {/* Solid trunk with texture */}
      <path d="M 90 185 L 88 100 Q 88 80 100 75 Q 112 80 112 100 L 110 185 Z" fill="#78350f" />
      {[...Array(8)].map((_, i) => (
        <line key={i} x1="90" y1={175 - i * 10} x2="110" y2={173 - i * 10} stroke="#92400e" strokeWidth="1" opacity="0.4" />
      ))}
      
      {/* Extensive branch network */}
      <path d="M 100 160 Q 70 157 45 148" stroke="#22c55e" strokeWidth="4.5" fill="none" />
      <path d="M 100 158 Q 130 155 155 146" stroke="#22c55e" strokeWidth="4.5" fill="none" />
      <path d="M 100 148 Q 75 145 52 136" stroke="#16a34a" strokeWidth="4" fill="none" />
      <path d="M 100 146 Q 125 143 148 134" stroke="#16a34a" strokeWidth="4" fill="none" />
      <path d="M 100 135 Q 80 132 60 123" stroke="#22c55e" strokeWidth="3.5" fill="none" />
      <path d="M 100 133 Q 120 130 140 121" stroke="#22c55e" strokeWidth="3.5" fill="none" />
      <path d="M 100 120 Q 85 117 70 108" stroke="#16a34a" strokeWidth="3" fill="none" />
      <path d="M 100 118 Q 115 115 130 106" stroke="#16a34a" strokeWidth="3" fill="none" />
      <path d="M 100 105 Q 90 102 80 93" stroke="#22c55e" strokeWidth="2.5" fill="none" />
      <path d="M 100 103 Q 110 100 120 91" stroke="#22c55e" strokeWidth="2.5" fill="none" />
      
      {/* Dense canopy */}
      {[
        [45, 148], [155, 146], [52, 136], [148, 134],
        [60, 123], [140, 121], [70, 108], [130, 106],
        [80, 93], [120, 91]
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={10 + (i % 2)} fill="#22c55e" opacity="0.8" />
          <circle cx={x - 2} cy={y - 2} r={8 + (i % 2)} fill={i % 3 === 0 ? '#15803d' : '#16a34a'} />
        </g>
      ))}
      
      {/* Full crown */}
      <ellipse cx="100" cy="80" rx="18" ry="14" fill="#22c55e" opacity="0.8" />
      <ellipse cx="100" cy="77" rx="16" ry="12" fill="#15803d" />
      <ellipse cx="100" cy="74" rx="14" ry="10" fill="#16a34a" />
      <ellipse cx="100" cy="71" rx="12" ry="8" fill="#22c55e" />
      
      <text x="100" y="197" textAnchor="middle" fill="#15803d" fontSize="10">
        {getStageDescription(8)}
      </text>
    </svg>
  );

  const renderLevel9 = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <ellipse cx="100" cy="186" rx="90" ry="16" fill="#78716c" />
      <ellipse cx="100" cy="184" rx="85" ry="14" fill="#a8a29e" opacity="0.7" />
      
      {/* Wide trunk */}
      <path d="M 88 186 L 86 95 Q 86 72 100 67 Q 114 72 114 95 L 112 186 Z" fill="#78350f" />
      {[...Array(10)].map((_, i) => (
        <g key={i}>
          <line x1="88" y1={176 - i * 9} x2="112" y2={174 - i * 9} stroke="#92400e" strokeWidth="1.2" opacity="0.5" />
          <ellipse cx={92 + (i % 2) * 16} cy={172 - i * 9} rx="2" ry="3" fill="#92400e" opacity="0.3" />
        </g>
      ))}
      
      {/* Maximum branch complexity */}
      {[
        [160, 40, 150], [158, 35, 145], [148, 28, 135], [146, 23, 128], [135, 18, 120],
        [133, 15, 115], [120, 12, 105], [118, 10, 100], [105, 8, 92], [103, 7, 88]
      ].map(([y1, y2, x], i) => {
        const side = i % 2 === 0 ? -1 : 1;
        return (
          <g key={i}>
            <path
              d={`M 100 ${y1} Q ${100 + side * 25} ${y2} ${100 + side * (x - 50)}`}
              stroke={i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#16a34a' : '#15803d'}
              strokeWidth={5 - i * 0.3}
              fill="none"
            />
            <circle cx={100 + side * (x - 50)} cy={y2} r={11 - i * 0.3} fill="#22c55e" opacity="0.8" />
            <circle cx={100 + side * (x - 50) - 2} cy={y2 - 2} r={9 - i * 0.3} fill={i % 2 === 0 ? '#15803d' : '#16a34a'} />
          </g>
        );
      })}
      
      {/* Massive crown */}
      {[...Array(25)].map((_, i) => {
        const angle = (i / 25) * Math.PI * 2;
        const radius = 35 + Math.random() * 15;
        return (
          <ellipse
            key={i}
            cx={100 + Math.cos(angle) * radius}
            cy={70 + Math.sin(angle) * radius * 0.5}
            rx={8 + Math.random() * 3}
            ry={5 + Math.random() * 2}
            fill={i % 4 === 0 ? '#15803d' : i % 3 === 0 ? '#16a34a' : '#22c55e'}
            opacity={0.75 + Math.random() * 0.25}
          />
        );
      })}
      
      <text x="100" y="197" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="600">
        {getStageDescription(9)}
      </text>
    </svg>
  );

  const renderLevel10 = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      {/* Rich ground */}
      <ellipse cx="100" cy="187" rx="95" ry="16" fill="#78716c" />
      <ellipse cx="100" cy="185" rx="90" ry="14" fill="#a8a29e" opacity="0.8" />
      <ellipse cx="100" cy="183" rx="85" ry="12" fill="#d6d3d1" opacity="0.6" />
      
      {/* Lush grass */}
      {[...Array(30)].map((_, i) => (
        <path
          key={i}
          d={`M ${20 + i * 5.5} 187 Q ${20 + i * 5.5 + (i % 3 === 0 ? 3 : -2)} 176 ${20 + i * 5.5 + (i % 2 === 0 ? 1 : -1)} 170`}
          stroke={i % 4 === 0 ? '#65a30d' : '#84cc16'}
          strokeWidth="1.5"
          fill="none"
        />
      ))}
      
      {/* Maximum trunk width with detailed bark */}
      <path d="M 86 187 L 84 90 Q 84 65 100 60 Q 116 65 116 90 L 114 187 Z" fill="#78350f" />
      {[...Array(14)].map((_, i) => (
        <g key={i}>
          <line x1="86" y1={177 - i * 8} x2="114" y2={175 - i * 8} stroke="#92400e" strokeWidth="1.5" opacity="0.5" />
          <ellipse cx={90 + (i % 2) * 20} cy={173 - i * 8} rx="2.5" ry="4" fill="#92400e" opacity="0.4" />
        </g>
      ))}
      
      {/* Root system visible */}
      {[...Array(6)].map((_, i) => {
        const side = i < 3 ? -1 : 1;
        const startX = i % 3 === 0 ? 86 : i % 3 === 1 ? 95 : 114;
        return (
          <path
            key={i}
            d={`M ${startX} 184 Q ${startX + side * 20} 187 ${startX + side * 35} 189`}
            stroke="#78350f"
            strokeWidth="3.5"
            fill="none"
            opacity="0.4"
          />
        );
      })}
      
      {/* Ultimate branch network */}
      {[...Array(12)].map((_, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        const yPos = 160 - i * 8;
        const length = 45 + i * 1.5;
        return (
          <g key={i}>
            <path
              d={`M 100 ${yPos} Q ${100 + side * 28} ${yPos - 12} ${100 + side * length} ${yPos - 28}`}
              stroke={i % 4 === 0 ? '#15803d' : i % 4 === 1 ? '#16a34a' : i % 4 === 2 ? '#22c55e' : '#10b981'}
              strokeWidth={5.5 - i * 0.25}
              strokeLinecap="round"
              fill="none"
            />
            {[...Array(12)].map((_, j) => {
              const offsetX = (Math.random() - 0.5) * 22;
              const offsetY = (Math.random() - 0.5) * 18;
              return (
                <ellipse
                  key={j}
                  cx={100 + side * length + offsetX}
                  cy={yPos - 28 + offsetY}
                  rx={7 + Math.random() * 2}
                  ry={4 + Math.random() * 1}
                  fill={j % 4 === 0 ? '#15803d' : j % 4 === 1 ? '#16a34a' : j % 4 === 2 ? '#22c55e' : '#10b981'}
                  opacity={0.8 + Math.random() * 0.2}
                />
              );
            })}
          </g>
        );
      })}
      
      {/* Maximum crown density */}
      {[...Array(45)].map((_, i) => {
        const angle = (i / 45) * Math.PI * 2;
        const radius = 40 + Math.random() * 22;
        const y = 65 + Math.sin(angle) * radius * 0.5;
        return (
          <ellipse
            key={i}
            cx={100 + Math.cos(angle) * radius}
            cy={y}
            rx={9 + Math.random() * 4}
            ry={5 + Math.random() * 2}
            fill={i % 5 === 0 ? '#15803d' : i % 4 === 0 ? '#16a34a' : i % 3 === 0 ? '#22c55e' : '#10b981'}
            opacity={0.75 + Math.random() * 0.25}
          />
        );
      })}
      
      {/* Wisdom aura */}
      <motion.circle
        cx="100"
        cy="75"
        r="70"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2.5"
        opacity="0.25"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.25 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
      />
      
      <text x="100" y="197" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="700">
        ✨ {getStageDescription(10)} ✨
      </text>
    </svg>
  );

  const renderLevel = () => {
    switch (clampedLevel) {
      case 0: return renderLevel0();
      case 1: return renderLevel1();
      case 2: return renderLevel2();
      case 3: return renderLevel3();
      case 4: return renderLevel4();
      case 5: return renderLevel5();
      case 6: return renderLevel6();
      case 7: return renderLevel7();
      case 8: return renderLevel8();
      case 9: return renderLevel9();
      case 10: return renderLevel10();
      default: return renderLevel0();
    }
  };

  return <div>{renderLevel()}</div>;
}
