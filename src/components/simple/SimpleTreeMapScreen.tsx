import { useState, useRef } from 'react';
import { Filter, Star, Grid3x3, Sparkles } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '../ui/button';
import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { BackButton } from './BackButton';
import { DepartmentGeometricTree } from '../trees/GeometricTrees';
import { getDepartmentById, departments } from '../../config/departments';
import type { Screen, Question, Notification } from '../../App';

interface SimpleTreeMapScreenProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  canGoBack: boolean;
  currentUser: string;
  questions: Question[];
  notifications: Record<string, Notification[]>;
  setCurrentQuestionId: (id: string) => void;
  setCurrentUser: (user: string) => void;
}

type ViewMode = 'scattered' | 'clustered';
type FilterType = 'all' | 'department' | 'recent';

interface TreePosition {
  left: number; // percentage 0-100
  top: number; // percentage 0-100
}

interface DraggableTreeProps {
  question: Question;
  position: { left: string; top: string };
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  onMove: (id: string, left: number, top: number) => void;
  dept: any;
  bestAnswer: any;
  getGrowthStageName: (level: number) => string;
  containerRef: React.RefObject<HTMLDivElement>;
}

const DraggableTree: React.FC<DraggableTreeProps> = ({
  question,
  position,
  isHovered,
  onHover,
  onClick,
  onMove,
  dept,
  bestAnswer,
  getGrowthStageName,
  containerRef,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TREE',
    item: { id: question.id, currentLeft: parseFloat(position.left), currentTop: parseFloat(position.top) },
    end: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (offset && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const left = ((offset.x - containerRect.left) / containerRect.width) * 100;
        const top = ((offset.y - containerRect.top) / containerRect.height) * 100;
        
        // Clamp values between 5 and 95 to keep trees visible
        const clampedLeft = Math.max(5, Math.min(95, left));
        const clampedTop = Math.max(5, Math.min(95, top));
        
        onMove(item.id, clampedLeft, clampedTop);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [question.id, position, containerRef]);

  return (
    <div
      ref={drag}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-move transition-all duration-300"
      style={{
        left: position.left,
        top: position.top,
        zIndex: isHovered ? 50 : isDragging ? 100 : 1,
        transform: isHovered ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%)',
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={() => onClick(question.id)}
      onMouseEnter={() => onHover(question.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Mini Tree */}
      <div className={`relative transition-all duration-300 ${
        isHovered ? 'filter drop-shadow-xl' : ''
      }`}>
        <DepartmentGeometricTree
          department={question.department}
          color={dept?.color || '#10b981'}
          size={question.growthLevel >= 6 ? 80 : question.growthLevel >= 3 ? 60 : 40}
          growthLevel={question.growthLevel}
        />
        
        {/* Best Answer Badge */}
        {bestAnswer && !bestAnswer.isAI && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[rgb(213,192,93)] rounded-full flex items-center justify-center">
            <Star className="w-3 h-3 text-white fill-white" />
          </div>
        )}
      </div>

      {/* Hover Tooltip */}
      {isHovered && !isDragging && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-900 p-4 w-64 z-50 pointer-events-none"
          style={{ top: '100%' }}
        >
          <div className="mb-2">
            <span className="inline-block text-xs px-2 py-1 rounded-full border border-gray-300 mb-2">
              {dept?.name}
            </span>
          </div>
          <p className="text-sm text-gray-900 mb-2 line-clamp-2">
            {question.text}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>{getGrowthStageName(question.growthLevel)}</span>
            <span>Level {question.growthLevel}/10</span>
          </div>
          {bestAnswer && !bestAnswer.isAI && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div className="flex items-center gap-1 text-xs text-[rgb(213,192,93)]">
                <Star className="w-3 h-3 fill-[rgb(213,192,93)]" />
                <span>Has Best Answer</span>
              </div>
            </div>
          )}
          <div className="mt-3 text-xs text-gray-500 text-center">
            Drag to move • Click to view details
          </div>
        </div>
      )}
    </div>
  );
};

export function SimpleTreeMapScreen({ 
  navigateTo, 
  goBack,
  canGoBack,
  currentUser, 
  questions, 
  notifications,
  setCurrentQuestionId,
  setCurrentUser
}: SimpleTreeMapScreenProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('clustered');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [hoveredTree, setHoveredTree] = useState<string | null>(null);
  const [customPositions, setCustomPositions] = useState<Record<string, TreePosition>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Get all trees (questions with at least 1 human answer)
  const allTrees = questions.filter(q => q.answers.some(a => !a.isAI));

  // Apply filters
  const filteredTrees = allTrees.filter(question => {
    if (selectedDepartment !== 'all' && question.department !== selectedDepartment) {
      return false;
    }
    return true;
  });

  // Sort by recently grown if filter is active
  const displayTrees = filterType === 'recent' 
    ? [...filteredTrees].sort((a, b) => b.growthLevel - a.growthLevel)
    : filteredTrees;

  const handleTreeClick = (questionId: string) => {
    setCurrentQuestionId(questionId);
    navigateTo('answer-question');
  };

  // Generate scattered positions for trees
  const getScatteredPosition = (index: number, total: number) => {
    const seed = index * 137.5; // Golden angle for natural distribution
    const radius = Math.sqrt(index / total) * 40;
    const angle = seed * Math.PI / 180;
    
    return {
      left: `${50 + radius * Math.cos(angle)}%`,
      top: `${50 + radius * Math.sin(angle)}%`,
    };
  };

  // Generate clustered positions by department - create clear department zones
  const getClusteredPosition = (question: Question, deptIndex: number, indexInDept: number) => {
    // Define department zones as specific regions of the map
    const departmentZones = [
      { x: 20, y: 25, label: 'Creativity' },   // Top-left
      { x: 50, y: 20, label: 'Tech' },         // Top-center
      { x: 80, y: 25, label: 'Coding' },       // Top-right
      { x: 30, y: 70, label: 'Management' },   // Bottom-left
      { x: 70, y: 70, label: 'Design' },       // Bottom-right
    ];

    const zone = departmentZones[deptIndex] || { x: 50, y: 50 };
    
    // Spread trees within the zone using circular distribution - tighter clustering
    const treesInDept = displayTrees.filter(q => q.department === question.department);
    const totalInDept = treesInDept.length;
    const angle = (indexInDept / Math.max(totalInDept, 1)) * 2 * Math.PI;
    const radius = 3 + (Math.sqrt(indexInDept) * 1.5); // Much tighter - reduced from 8 + sqrt * 3
    
    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;
    
    return {
      left: `${zone.x + offsetX}%`,
      top: `${zone.y + offsetY}%`,
    };
  };

  const getTreePosition = (question: Question, index: number) => {
    // Check if there's a custom position for this tree
    if (customPositions[question.id]) {
      return {
        left: `${customPositions[question.id].left}%`,
        top: `${customPositions[question.id].top}%`,
      };
    }

    if (viewMode === 'scattered') {
      return getScatteredPosition(index, displayTrees.length);
    } else {
      const deptIndex = departments.findIndex(d => d.id === question.department);
      const treesInDept = displayTrees.filter(q => q.department === question.department);
      const indexInDept = treesInDept.findIndex(q => q.id === question.id);
      return getClusteredPosition(question, deptIndex, indexInDept);
    }
  };

  const handleTreeMove = (id: string, left: number, top: number) => {
    setCustomPositions(prev => ({
      ...prev,
      [id]: { left, top }
    }));
  };

  const getGrowthStageName = (level: number): string => {
    if (level === 0) return 'Seed';
    if (level <= 2) return 'Sprout';
    if (level <= 5) return 'Young Plant';
    return 'Mature Tree';
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#faf9f7] relative">
        {canGoBack && <BackButton onClick={goBack} />}
        <SimpleNav currentScreen="forest" navigateTo={navigateTo} currentUser={currentUser} notifications={notifications} setCurrentUser={setCurrentUser} />
        
        <div className="px-6 py-8">
          {/* Header */}
          <div className="max-w-7xl mx-auto mb-8">
            <h1 className="text-gray-900 mb-2">Tree Distribution Map</h1>
            <p className="text-gray-600">
              {displayTrees.length} {displayTrees.length === 1 ? 'tree' : 'trees'} growing in the company forest
            </p>
          </div>

          {/* Controls */}
          <div className="max-w-7xl mx-auto mb-8 flex flex-wrap gap-4 items-center">
            {/* View Mode Toggle */}
            <div className="flex gap-2 bg-white rounded-lg p-1 border border-gray-200">
              <Button
                size="sm"
                variant={viewMode === 'scattered' ? 'default' : 'ghost'}
                onClick={() => setViewMode('scattered')}
                className={viewMode === 'scattered' ? 'bg-[rgb(213,192,93)] hover:bg-[rgb(193,172,73)] text-white' : ''}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Scattered
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'clustered' ? 'default' : 'ghost'}
                onClick={() => setViewMode('clustered')}
                className={viewMode === 'clustered' ? 'bg-[rgb(213,192,93)] hover:bg-[rgb(193,172,73)] text-white' : ''}
              >
                <Grid3x3 className="w-4 h-4 mr-2" />
                Clustered
              </Button>
            </div>

            {/* Department Filter */}
            <div className="flex gap-2 items-center">
              <Filter className="w-4 h-4 text-gray-600" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(213,192,93)]"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Recent Filter */}
            <Button
              size="sm"
              variant={filterType === 'recent' ? 'default' : 'outline'}
              onClick={() => setFilterType(filterType === 'recent' ? 'all' : 'recent')}
              className={filterType === 'recent' ? 'bg-[rgb(213,192,93)] hover:bg-[rgb(193,172,73)] text-white' : ''}
            >
              Recently Grown
            </Button>
          </div>

          {/* Tree Map Canvas */}
          <div className="max-w-7xl mx-auto">
            <div 
              ref={containerRef}
              className="relative w-full bg-gradient-to-b from-gray-50 to-white rounded-3xl border-2 border-gray-900 overflow-hidden"
              style={{ 
                height: '600px',
                backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            >
              {/* Department Zone Labels (only in clustered view) */}
              {viewMode === 'clustered' && (
                <>
                  <div className="absolute top-[5%] left-[20%] transform -translate-x-1/2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-gray-300 text-xs text-gray-600">
                    Creativity
                  </div>
                  <div className="absolute top-[5%] left-[50%] transform -translate-x-1/2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-gray-300 text-xs text-gray-600">
                    Tech
                  </div>
                  <div className="absolute top-[5%] left-[80%] transform -translate-x-1/2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-gray-300 text-xs text-gray-600">
                    Coding
                  </div>
                  <div className="absolute top-[88%] left-[30%] transform -translate-x-1/2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-gray-300 text-xs text-gray-600">
                    Management
                  </div>
                  <div className="absolute top-[88%] left-[70%] transform -translate-x-1/2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-gray-300 text-xs text-gray-600">
                    Design
                  </div>
                </>
              )}

              {displayTrees.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-600">No trees found</p>
                </div>
              ) : (
                displayTrees.map((question, index) => {
                  const dept = getDepartmentById(question.department);
                  const position = getTreePosition(question, index);
                  const bestAnswer = question.answers.find(a => a.id === question.bestAnswerId);
                  const isHovered = hoveredTree === question.id;
                  
                  return (
                    <DraggableTree
                      key={question.id}
                      question={question}
                      position={position}
                      isHovered={isHovered}
                      onHover={setHoveredTree}
                      onClick={handleTreeClick}
                      onMove={handleTreeMove}
                      dept={dept}
                      bestAnswer={bestAnswer}
                      getGrowthStageName={getGrowthStageName}
                      containerRef={containerRef}
                    />
                  );
                })
              )}
            </div>

            {/* Legend */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {departments.map(dept => (
                  <div key={dept.id} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${dept.color}20` }}>
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: dept.color }} />
                    </div>
                    <span className="text-sm text-gray-700">{dept.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 text-sm text-gray-600">
                <Star className="w-4 h-4 text-[rgb(213,192,93)] fill-[rgb(213,192,93)]" />
                <span>Golden badge indicates a tree with a best answer</span>
              </div>
            </div>
          </div>
        </div>
        <SimpleFooter />
      </div>
    </DndProvider>
  );
}