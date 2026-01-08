import { motion } from 'motion/react';

interface PersonalTreeProps {
  answersGiven: number;
  size?: number;
  showAnimation?: boolean;
}

export function PersonalTree({ answersGiven, size = 200, showAnimation = false }: PersonalTreeProps) {
  // Maximum 10 answers to fully grow the tree
  const maxAnswers = 10;
  const clampedAnswers = Math.min(answersGiven, maxAnswers);
  
  // Calculate tree stage (0-10 answers)
  const getTreeStage = (answers: number) => {
    if (answers === 0) return 'empty';
    if (answers <= 2) return 'seedling';
    if (answers <= 5) return 'sapling';
    if (answers <= 8) return 'young';
    return 'mature'; // 9-10 answers = full mature tree
  };

  const stage = getTreeStage(clampedAnswers);
  
  // Company values colors for branches
  const valueColors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

  const renderEmptyState = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      {/* Rich soil */}
      <ellipse cx="100" cy="180" rx="50" ry="8" fill="#8b7355" opacity="0.6" />
      
      {/* Small seed */}
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
        Start helping others
      </text>
    </svg>
  );

  const renderSeedling = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      {/* Ground */}
      <ellipse cx="100" cy="178" rx="60" ry="10" fill="#78716c" />
      <ellipse cx="100" cy="176" rx="55" ry="8" fill="#a8a29e" opacity="0.6" />
      
      {/* Tiny stem */}
      <motion.path
        d="M 100 175 Q 98 160 100 150"
        stroke="#65a30d"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={showAnimation ? { pathLength: 0 } : {}}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* First leaves */}
      <motion.ellipse
        cx="92"
        cy="155"
        rx="8"
        ry="5"
        fill="#84cc16"
        initial={showAnimation ? { scale: 0 } : {}}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      />
      <motion.ellipse
        cx="108"
        cy="152"
        rx="8"
        ry="5"
        fill="#84cc16"
        initial={showAnimation ? { scale: 0 } : {}}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      />
      
      <text x="100" y="195" textAnchor="middle" fill="#9ca3af" fontSize="10">
        {clampedAnswers} / {maxAnswers} answers
      </text>
    </svg>
  );

  const renderSapling = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      {/* Ground with grass */}
      <ellipse cx="100" cy="180" rx="70" ry="12" fill="#78716c" />
      <ellipse cx="100" cy="178" rx="65" ry="10" fill="#a8a29e" opacity="0.7" />
      
      {/* Grass blades */}
      <g opacity="0.6">
        {[...Array(12)].map((_, i) => (
          <path
            key={i}
            d={`M ${50 + i * 9} 180 Q ${50 + i * 9 + (i % 2 === 0 ? 2 : -2)} 172 ${50 + i * 9} 168`}
            stroke="#84cc16"
            strokeWidth="1.5"
            fill="none"
          />
        ))}
      </g>
      
      {/* Young trunk */}
      <motion.rect
        x="96"
        y="130"
        width="8"
        height="50"
        fill="#78350f"
        rx="4"
        initial={showAnimation ? { height: 0, y: 180 } : {}}
        animate={{ height: 50, y: 130 }}
        transition={{ duration: 0.6 }}
      />
      <rect x="97" y="135" width="2" height="40" fill="#92400e" opacity="0.5" />
      
      {/* Small branches with value colors */}
      {[...Array(Math.min(clampedAnswers - 2, 3))].map((_, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        const yPos = 150 - i * 12;
        return (
          <g key={i}>
            <motion.path
              d={`M 100 ${yPos} Q ${100 + side * 10} ${yPos - 3} ${100 + side * 20} ${yPos - 8}`}
              stroke={valueColors[i % valueColors.length]}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={showAnimation ? { pathLength: 0 } : {}}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
            />
            {/* Leaves on branches */}
            <motion.circle
              cx={100 + side * 20}
              cy={yPos - 8}
              r="6"
              fill="#22c55e"
              initial={showAnimation ? { scale: 0 } : {}}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.5 + i * 0.15 }}
            />
            <motion.circle
              cx={100 + side * 16}
              cy={yPos - 5}
              r="5"
              fill="#16a34a"
              initial={showAnimation ? { scale: 0 } : {}}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.6 + i * 0.15 }}
            />
          </g>
        );
      })}
      
      {/* Top leaves */}
      {[...Array(4)].map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <motion.ellipse
            key={i}
            cx={100 + Math.cos(angle) * 12}
            cy={125 + Math.sin(angle) * 8}
            rx="7"
            ry="4"
            fill="#22c55e"
            initial={showAnimation ? { scale: 0 } : {}}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.8 + i * 0.05 }}
          />
        );
      })}
      
      <text x="100" y="195" textAnchor="middle" fill="#9ca3af" fontSize="10">
        {clampedAnswers} / {maxAnswers} answers
      </text>
    </svg>
  );

  const renderYoungTree = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      {/* Rich ground */}
      <ellipse cx="100" cy="182" rx="80" ry="14" fill="#78716c" />
      <ellipse cx="100" cy="180" rx="75" ry="12" fill="#a8a29e" opacity="0.7" />
      <ellipse cx="100" cy="178" rx="70" ry="10" fill="#d6d3d1" opacity="0.5" />
      
      {/* Dense grass */}
      <g opacity="0.7">
        {[...Array(20)].map((_, i) => (
          <path
            key={i}
            d={`M ${35 + i * 7} 182 Q ${35 + i * 7 + (i % 3 === 0 ? 3 : -2)} 172 ${35 + i * 7 + (i % 2 === 0 ? 1 : -1)} 166`}
            stroke="#84cc16"
            strokeWidth="1.5"
            fill="none"
          />
        ))}
      </g>
      
      {/* Solid trunk with bark texture */}
      <motion.path
        d="M 95 180 L 92 110 Q 92 90 100 85 Q 108 90 108 110 L 105 180 Z"
        fill="#78350f"
        initial={showAnimation ? { scaleY: 0, transformOrigin: 'bottom' } : {}}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.7 }}
      />
      {/* Bark texture lines */}
      {[...Array(8)].map((_, i) => (
        <line
          key={i}
          x1="95"
          y1={170 - i * 10}
          x2="105"
          y2={168 - i * 10}
          stroke="#92400e"
          strokeWidth="1"
          opacity="0.4"
        />
      ))}
      
      {/* Main branch structure */}
      {[...Array(Math.min(clampedAnswers - 5, 4))].map((_, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        const yPos = 130 - i * 15;
        const length = 28 + i * 3;
        return (
          <g key={i}>
            {/* Main branch */}
            <motion.path
              d={`M 100 ${yPos} Q ${100 + side * 15} ${yPos - 8} ${100 + side * length} ${yPos - 18}`}
              stroke={valueColors[i % valueColors.length]}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              initial={showAnimation ? { pathLength: 0 } : {}}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
            />
            {/* Sub-branches */}
            <motion.path
              d={`M ${100 + side * length} ${yPos - 18} l ${side * 10} -8`}
              stroke={valueColors[i % valueColors.length]}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={showAnimation ? { pathLength: 0 } : {}}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.12 }}
            />
            
            {/* Realistic leaves cluster */}
            {[...Array(6)].map((_, j) => {
              const offsetX = (Math.random() - 0.5) * 15;
              const offsetY = (Math.random() - 0.5) * 10;
              return (
                <motion.ellipse
                  key={j}
                  cx={100 + side * length + offsetX}
                  cy={yPos - 18 + offsetY}
                  rx="6"
                  ry="3"
                  fill={j % 2 === 0 ? '#22c55e' : '#16a34a'}
                  opacity={0.8 + Math.random() * 0.2}
                  initial={showAnimation ? { scale: 0 } : {}}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.7 + i * 0.12 + j * 0.03 }}
                />
              );
            })}
          </g>
        );
      })}
      
      {/* Crown foliage */}
      {[...Array(15)].map((_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 25 + Math.random() * 10;
        return (
          <motion.ellipse
            key={i}
            cx={100 + Math.cos(angle) * radius}
            cy={85 + Math.sin(angle) * radius * 0.6}
            rx={7 + Math.random() * 3}
            ry={4 + Math.random() * 2}
            fill={i % 3 === 0 ? '#16a34a' : '#22c55e'}
            opacity={0.75 + Math.random() * 0.25}
            initial={showAnimation ? { scale: 0 } : {}}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.9 + i * 0.02 }}
          />
        );
      })}
      
      <text x="100" y="195" textAnchor="middle" fill="#9ca3af" fontSize="10">
        {clampedAnswers} / {maxAnswers} answers
      </text>
    </svg>
  );

  const renderMatureTree = () => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      {/* Rich, expansive ground */}
      <ellipse cx="100" cy="185" rx="95" ry="16" fill="#78716c" />
      <ellipse cx="100" cy="183" rx="90" ry="14" fill="#a8a29e" opacity="0.8" />
      <ellipse cx="100" cy="181" rx="85" ry="12" fill="#d6d3d1" opacity="0.6" />
      
      {/* Lush grass field */}
      <g opacity="0.8">
        {[...Array(30)].map((_, i) => (
          <path
            key={i}
            d={`M ${20 + i * 5.5} 185 Q ${20 + i * 5.5 + (i % 3 === 0 ? 3 : -2)} 174 ${20 + i * 5.5 + (i % 2 === 0 ? 1 : -1)} 168`}
            stroke={i % 4 === 0 ? '#65a30d' : '#84cc16'}
            strokeWidth="1.5"
            fill="none"
          />
        ))}
      </g>
      
      {/* Strong, wide trunk with detailed bark */}
      <motion.path
        d="M 90 185 L 85 105 Q 85 75 100 65 Q 115 75 115 105 L 110 185 Z"
        fill="#78350f"
        initial={showAnimation ? { scaleY: 0, transformOrigin: 'bottom' } : {}}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8 }}
      />
      {/* Detailed bark texture */}
      {[...Array(12)].map((_, i) => (
        <g key={i}>
          <line
            x1="88"
            y1={175 - i * 9}
            x2="112"
            y2={172 - i * 9}
            stroke="#92400e"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <ellipse
            cx={95 + (i % 2) * 10}
            cy={170 - i * 9}
            rx="2"
            ry="3"
            fill="#92400e"
            opacity="0.3"
          />
        </g>
      ))}
      
      {/* Root system visible */}
      <g opacity="0.4">
        {[...Array(4)].map((_, i) => {
          const side = i < 2 ? -1 : 1;
          const startX = i % 2 === 0 ? 90 : 110;
          return (
            <path
              key={i}
              d={`M ${startX} 182 Q ${startX + side * 15} 185 ${startX + side * 25} 187`}
              stroke="#78350f"
              strokeWidth="3"
              fill="none"
            />
          );
        })}
      </g>
      
      {/* Extensive branch network with all value colors */}
      {[...Array(8)].map((_, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        const yPos = 125 - i * 12;
        const length = 35 + i * 2;
        return (
          <g key={i}>
            {/* Primary branch */}
            <motion.path
              d={`M 100 ${yPos} Q ${100 + side * 20} ${yPos - 10} ${100 + side * length} ${yPos - 25}`}
              stroke={valueColors[i % valueColors.length]}
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              initial={showAnimation ? { pathLength: 0 } : {}}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            />
            {/* Secondary branches */}
            <motion.path
              d={`M ${100 + side * length} ${yPos - 25} l ${side * 12} -10`}
              stroke={valueColors[i % valueColors.length]}
              strokeWidth="3"
              strokeLinecap="round"
              initial={showAnimation ? { pathLength: 0 } : {}}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
            />
            <motion.path
              d={`M ${100 + side * length} ${yPos - 25} l ${side * 8} 6`}
              stroke={valueColors[i % valueColors.length]}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={showAnimation ? { pathLength: 0 } : {}}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2, delay: 0.6 + i * 0.1 }}
            />
            
            {/* Dense leaf clusters */}
            {[...Array(10)].map((_, j) => {
              const offsetX = (Math.random() - 0.5) * 20;
              const offsetY = (Math.random() - 0.5) * 15;
              return (
                <motion.ellipse
                  key={j}
                  cx={100 + side * length + offsetX}
                  cy={yPos - 25 + offsetY}
                  rx={6 + Math.random() * 2}
                  ry={3 + Math.random() * 1}
                  fill={j % 3 === 0 ? '#16a34a' : j % 3 === 1 ? '#22c55e' : '#15803d'}
                  opacity={0.8 + Math.random() * 0.2}
                  initial={showAnimation ? { scale: 0 } : {}}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.8 + i * 0.1 + j * 0.02 }}
                />
              );
            })}
          </g>
        );
      })}
      
      {/* Full, lush crown */}
      {[...Array(35)].map((_, i) => {
        const angle = (i / 35) * Math.PI * 2;
        const radius = 35 + Math.random() * 20;
        const y = 65 + Math.sin(angle) * radius * 0.5;
        return (
          <motion.ellipse
            key={i}
            cx={100 + Math.cos(angle) * radius}
            cy={y}
            rx={8 + Math.random() * 4}
            ry={4 + Math.random() * 2}
            fill={i % 5 === 0 ? '#15803d' : i % 3 === 0 ? '#16a34a' : '#22c55e'}
            opacity={0.75 + Math.random() * 0.25}
            initial={showAnimation ? { scale: 0 } : {}}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 1.0 + i * 0.015 }}
          />
        );
      })}
      
      {/* Wisdom glow */}
      <motion.circle
        cx="100"
        cy="80"
        r="60"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        opacity="0.2"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1, delay: 1.5 }}
      />
      
      <text x="100" y="197" textAnchor="middle" fill="#16a34a" fontSize="11" fontWeight="600">
        ✨ Fully Grown! {clampedAnswers} / {maxAnswers}
      </text>
    </svg>
  );

  switch (stage) {
    case 'empty':
      return renderEmptyState();
    case 'seedling':
      return renderSeedling();
    case 'sapling':
      return renderSapling();
    case 'young':
      return renderYoungTree();
    case 'mature':
      return renderMatureTree();
    default:
      return renderEmptyState();
  }
}
