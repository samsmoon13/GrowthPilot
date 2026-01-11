import { useState } from 'react';
import { Building2, Trees, ArrowRight } from 'lucide-react';
import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { DepartmentGeometricTree } from '../trees/GeometricTrees';
import { departments } from '../../config/departments';
import type { Screen, Notification } from '../../App';

// Mock companies data with tree growth info
const COMPANIES = [
  { 
    id: 'techcorp', 
    name: 'TechCorp', 
    industry: 'Technology',
    color: '#3B82F6',
    employees: 1250,
    totalTrees: 156,
    grownTrees: 120,
    description: 'Leading innovation in cloud computing'
  },
  { 
    id: 'greenleaf', 
    name: 'GreenLeaf Inc', 
    industry: 'Sustainability',
    color: '#10B981',
    employees: 430,
    totalTrees: 89,
    grownTrees: 72,
    description: 'Sustainable solutions for tomorrow'
  },
  { 
    id: 'creativeminds', 
    name: 'Creative Minds', 
    industry: 'Design & Media',
    color: '#8B5CF6',
    employees: 280,
    totalTrees: 67,
    grownTrees: 45,
    description: 'Where creativity meets strategy'
  },
  { 
    id: 'financeplus', 
    name: 'Finance Plus', 
    industry: 'Financial Services',
    color: '#F59E0B',
    employees: 890,
    totalTrees: 134,
    grownTrees: 98,
    description: 'Smart financial solutions'
  },
  { 
    id: 'healthfirst', 
    name: 'HealthFirst', 
    industry: 'Healthcare',
    color: '#EF4444',
    employees: 2100,
    totalTrees: 245,
    grownTrees: 210,
    description: 'Caring for communities worldwide'
  },
  { 
    id: 'edulearn', 
    name: 'EduLearn', 
    industry: 'Education',
    color: '#06B6D4',
    employees: 560,
    totalTrees: 98,
    grownTrees: 65,
    description: 'Empowering minds through learning'
  },
];

// Generate mock trees for a company (just growth levels, no questions)
const generateCompanyTrees = (companyId: string) => {
  const treeCounts: Record<string, { department: string; growthLevel: number }[]> = {
    'techcorp': [
      { department: 'tech', growthLevel: 10 },
      { department: 'tech', growthLevel: 8 },
      { department: 'coding', growthLevel: 9 },
      { department: 'coding', growthLevel: 7 },
      { department: 'coding', growthLevel: 6 },
      { department: 'management', growthLevel: 8 },
      { department: 'management', growthLevel: 5 },
      { department: 'design', growthLevel: 4 },
    ],
    'greenleaf': [
      { department: 'management', growthLevel: 10 },
      { department: 'management', growthLevel: 9 },
      { department: 'creativity', growthLevel: 8 },
      { department: 'design', growthLevel: 7 },
      { department: 'design', growthLevel: 6 },
    ],
    'creativeminds': [
      { department: 'creativity', growthLevel: 10 },
      { department: 'creativity', growthLevel: 9 },
      { department: 'design', growthLevel: 10 },
      { department: 'design', growthLevel: 8 },
      { department: 'design', growthLevel: 7 },
      { department: 'management', growthLevel: 5 },
    ],
    'financeplus': [
      { department: 'management', growthLevel: 10 },
      { department: 'management', growthLevel: 9 },
      { department: 'management', growthLevel: 8 },
      { department: 'tech', growthLevel: 7 },
      { department: 'coding', growthLevel: 6 },
    ],
    'healthfirst': [
      { department: 'management', growthLevel: 10 },
      { department: 'tech', growthLevel: 10 },
      { department: 'tech', growthLevel: 9 },
      { department: 'creativity', growthLevel: 8 },
      { department: 'creativity', growthLevel: 7 },
      { department: 'design', growthLevel: 6 },
    ],
    'edulearn': [
      { department: 'creativity', growthLevel: 9 },
      { department: 'creativity', growthLevel: 8 },
      { department: 'management', growthLevel: 7 },
      { department: 'design', growthLevel: 6 },
      { department: 'tech', growthLevel: 5 },
    ],
  };
  return treeCounts[companyId] || [];
};

interface SimpleExploreScreenProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  canGoBack: boolean;
  currentUser: string;
  notifications: Record<string, Notification[]>;
  setCurrentQuestionId: (id: string) => void;
  setCurrentUser: (user: string) => void;
  setNotifications: (notifications: Record<string, Notification[]>) => void;
}

export function SimpleExploreScreen({
  navigateTo,
  goBack,
  canGoBack,
  currentUser,
  notifications,
  setCurrentQuestionId,
  setCurrentUser,
  setNotifications,
}: SimpleExploreScreenProps) {
  const [selectedCompany, setSelectedCompany] = useState<typeof COMPANIES[0] | null>(null);

  const handleCompanyClick = (company: typeof COMPANIES[0]) => {
    setSelectedCompany(company);
  };

  const handleBackToCompanies = () => {
    setSelectedCompany(null);
  };

  // Company Forest View - Trees scattered in different sections
  if (selectedCompany) {
    const companyTrees = generateCompanyTrees(selectedCompany.id);
    const growthProgress = Math.round((selectedCompany.grownTrees / selectedCompany.totalTrees) * 100);

    // Generate scattered positions for trees
    const treePositions = [
      { top: '10%', left: '8%' },
      { top: '5%', left: '25%' },
      { top: '15%', left: '45%' },
      { top: '8%', left: '65%' },
      { top: '12%', left: '85%' },
      { top: '35%', left: '12%' },
      { top: '40%', left: '35%' },
      { top: '30%', left: '55%' },
      { top: '38%', left: '75%' },
      { top: '45%', left: '90%' },
      { top: '55%', left: '5%' },
      { top: '60%', left: '28%' },
      { top: '52%', left: '50%' },
      { top: '58%', left: '70%' },
      { top: '50%', left: '88%' },
    ];

    return (
      <div className="min-h-screen bg-[#faf9f7] relative" style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        <SimpleNav
          currentScreen="explore"
          navigateTo={navigateTo}
          currentUser={currentUser}
          notifications={notifications}
          setCurrentUser={setCurrentUser}
          setCurrentQuestionId={setCurrentQuestionId}
          setNotifications={setNotifications}
          goBack={handleBackToCompanies}
          canGoBack={true}
        />

        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* Company Header */}
          <div className="text-center mb-6">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3"
              style={{ backgroundColor: selectedCompany.color + '20', border: `3px solid ${selectedCompany.color}` }}
            >
              <Building2 className="w-8 h-8" style={{ color: selectedCompany.color }} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{selectedCompany.name}</h1>
            
            {/* Stats Row */}
            <div className="flex items-center justify-center gap-6 mt-3">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{selectedCompany.totalTrees}</p>
                <p className="text-xs text-gray-500">Total Trees</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-green-600">{selectedCompany.grownTrees}</p>
                <p className="text-xs text-gray-500">Fully Grown</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold" style={{ color: selectedCompany.color }}>{growthProgress}%</p>
                <p className="text-xs text-gray-500">Growth</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-xs mx-auto mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all"
                  style={{ width: `${growthProgress}%`, backgroundColor: selectedCompany.color }}
                />
              </div>
            </div>
          </div>

          {/* Forest View - Trees scattered across different sections */}
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-4 mb-6">
            <div className="relative min-h-[500px] bg-gradient-to-b from-sky-100 via-green-50 to-amber-50 rounded-2xl overflow-hidden">
              {/* Sky decorations */}
              <div className="absolute top-4 left-10 w-20 h-8 bg-white/60 rounded-full blur-sm" />
              <div className="absolute top-8 right-20 w-16 h-6 bg-white/50 rounded-full blur-sm" />
              
              {/* Ground */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-200/60 to-transparent" />
              
              {/* Trees scattered in different positions */}
              {companyTrees.map((tree, index) => {
                const dept = departments.find(d => d.id === tree.department);
                const position = treePositions[index % treePositions.length];
                const scale = 0.6 + (tree.growthLevel / 10) * 0.6;
                
                return (
                  <div
                    key={index}
                    className="absolute transition-transform hover:scale-125 hover:z-10"
                    style={{ 
                      top: position.top,
                      left: position.left,
                      transform: `scale(${scale})`,
                    }}
                  >
                    <DepartmentGeometricTree
                      department={tree.department}
                      color={dept?.color || '#10B981'}
                      size={80}
                      growthLevel={tree.growthLevel}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Department Legend */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Departments</h3>
            <div className="flex flex-wrap gap-2">
              {departments.map(dept => {
                const count = companyTrees.filter(t => t.department === dept.id).length;
                if (count === 0) return null;
                return (
                  <div
                    key={dept.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: dept.color + '15' }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dept.color }} />
                    <span className="text-sm text-gray-700">{dept.name}</span>
                    <span className="text-xs text-gray-500">({count})</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <SimpleFooter />
      </div>
    );
  }

  // Companies List View - Circles in a grid layout
  return (
    <div className="min-h-screen bg-[#faf9f7] relative flex flex-col" style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <SimpleNav
        currentScreen="explore"
        navigateTo={navigateTo}
        currentUser={currentUser}
        notifications={notifications}
        setCurrentUser={setCurrentUser}
        setCurrentQuestionId={setCurrentQuestionId}
        setNotifications={setNotifications}
        goBack={goBack}
        canGoBack={canGoBack}
      />

      <div className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Companies</h1>
          <p className="text-gray-600">Discover knowledge forests from different organizations</p>
        </div>

        {/* Companies as circles in a grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 justify-items-center">
          {COMPANIES.map((company) => {
            const growthProgress = Math.round((company.grownTrees / company.totalTrees) * 100);
            
            return (
              <button
                key={company.id}
                onClick={() => handleCompanyClick(company)}
                className="transition-all duration-300 hover:scale-105 group"
              >
                {/* Outer glow on hover */}
                <div className="relative w-44 h-44">
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity blur-2xl"
                    style={{ backgroundColor: company.color }}
                  />
                  
                  {/* Main circle */}
                  <div 
                    className="relative w-44 h-44 rounded-full bg-white shadow-lg flex flex-col items-center justify-center border-4 transition-all group-hover:shadow-2xl"
                    style={{ borderColor: company.color }}
                  >
                    <h3 className="font-bold text-gray-900 text-sm text-center leading-tight mb-1 px-3">{company.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-1.5">
                      <Trees className="w-3.5 h-3.5 text-green-600" />
                      <span className="font-semibold">{company.totalTrees}</span>
                      <span>trees</span>
                    </div>
                    
                    {/* Mini progress bar */}
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ width: `${growthProgress}%`, backgroundColor: company.color }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{growthProgress}%</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <SimpleFooter />
    </div>
  );
}

