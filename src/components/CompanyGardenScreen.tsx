import { useState } from 'react';
import { ArrowLeft, Filter, Users, User, TreeDeciduous, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { departments, getDepartmentById } from '../config/departments';
import { DepartmentTree } from './trees/TreeIcons';
import { DepartmentSeed } from './seeds/SeedIcons';
import type { Screen, Question } from '../App';

interface CompanyGardenScreenProps {
  navigateTo: (screen: Screen) => void;
  questions: Question[];
}

// Mock data for demonstration
const mockTrees = [
  { id: '1', question: 'How to improve presentations?', department: 'creativity', plantedBy: 'Samin', contributors: ['Samin', 'John', 'Alice'], stage: 'mature', answers: 5 },
  { id: '2', question: 'Best API design practices?', department: 'tech', plantedBy: 'John', contributors: ['John', 'Bob'], stage: 'young', answers: 3 },
  { id: '3', question: 'Code review process?', department: 'coding', plantedBy: 'Alice', contributors: ['Alice', 'John', 'Bob', 'Carol'], stage: 'mature', answers: 6 },
  { id: '4', question: 'Team meeting structure?', department: 'management', plantedBy: 'Bob', contributors: ['Bob', 'Samin'], stage: 'sprout', answers: 2 },
  { id: '5', question: 'Design system updates?', department: 'design', plantedBy: 'Carol', contributors: ['Carol', 'Alice', 'Samin'], stage: 'mature', answers: 5 },
  { id: '6', question: 'Innovation workshop ideas?', department: 'creativity', plantedBy: 'Alice', contributors: ['Alice', 'John'], stage: 'young', answers: 3 },
  { id: '7', question: 'Database optimization?', department: 'tech', plantedBy: 'Bob', contributors: ['Bob', 'John', 'Alice', 'Carol'], stage: 'mature', answers: 6 },
  { id: '8', question: 'Testing strategies?', department: 'coding', plantedBy: 'John', contributors: ['John', 'Bob'], stage: 'sprout', answers: 2 },
];

export function CompanyGardenScreen({ navigateTo, questions }: CompanyGardenScreenProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTree, setSelectedTree] = useState<string | null>(null);

  const filteredTrees = mockTrees.filter(tree => {
    const matchesDepartment = selectedDepartment === 'all' || tree.department === selectedDepartment;
    const matchesSearch = tree.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tree.plantedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const selectedTreeData = selectedTree ? mockTrees.find(t => t.id === selectedTree) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateTo('my-garden')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="size-5" />
              Back to My Garden
            </button>
            <div className="flex items-center gap-2">
              <TreeDeciduous className="size-6 text-green-600" />
              <h1 className="text-gray-900">Company Garden</h1>
            </div>
            <div className="w-32" />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions or contributors..."
                  className="pl-10 rounded-xl border-gray-200"
                />
              </div>
            </div>
            
            <div className="w-64">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="rounded-xl border-gray-200">
                  <div className="flex items-center gap-2">
                    <Filter className="size-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      <span style={{ color: dept.color }}>●</span> {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <TreeDeciduous className="size-8 text-green-600" />
              <div>
                <p className="text-2xl text-gray-900">{mockTrees.length}</p>
                <p className="text-sm text-gray-600">Total Trees</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <Users className="size-8 text-blue-600" />
              <div>
                <p className="text-2xl text-gray-900">8</p>
                <p className="text-sm text-gray-600">Contributors</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">🌳</span>
              </div>
              <div>
                <p className="text-2xl text-gray-900">
                  {mockTrees.filter(t => t.stage === 'mature').length}
                </p>
                <p className="text-sm text-gray-600">Mature Trees</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600">🌱</span>
              </div>
              <div>
                <p className="text-2xl text-gray-900">
                  {mockTrees.filter(t => t.stage === 'sprout').length}
                </p>
                <p className="text-sm text-gray-600">Growing Seeds</p>
              </div>
            </div>
          </div>
        </div>

        {/* Department Legend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <Filter className="size-5" />
            Department Tree Types
          </h3>
          <div className="grid grid-cols-5 gap-4">
            {departments.map((dept) => (
              <div key={dept.id} className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: dept.color, backgroundColor: `${dept.color}10` }}>
                <DepartmentSeed seedType={dept.seedType} color={dept.color} size={32} />
                <div>
                  <p className="text-sm text-gray-900" style={{ color: dept.color }}>{dept.name}</p>
                  <p className="text-xs text-gray-600">{dept.treeSpecies} tree</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trees Grid */}
        <div className="grid grid-cols-4 gap-6">
          {filteredTrees.map((tree) => {
            const dept = getDepartmentById(tree.department);
            if (!dept) return null;

            return (
              <div
                key={tree.id}
                onClick={() => setSelectedTree(tree.id)}
                className="bg-white rounded-xl p-6 shadow-sm border-2 hover:shadow-lg transition-all cursor-pointer"
                style={{ 
                  borderColor: selectedTree === tree.id ? dept.color : '#e5e7eb',
                  backgroundColor: selectedTree === tree.id ? `${dept.color}05` : 'white'
                }}
              >
                {/* Tree Visualization */}
                <div className="flex justify-center mb-4">
                  <DepartmentTree
                    treeSpecies={dept.treeSpecies}
                    color={dept.color}
                    size={100}
                    stage={tree.stage as 'seed' | 'sprout' | 'young' | 'mature'}
                  />
                </div>

                {/* Department Badge */}
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full mb-2 text-xs" style={{ backgroundColor: `${dept.color}20`, color: dept.color }}>
                  {dept.name}
                </div>

                {/* Question */}
                <p className="text-sm text-gray-900 mb-3 line-clamp-2">{tree.question}</p>

                {/* Planted By */}
                <p className="text-xs text-gray-600 mb-2">
                  🌱 Planted by <strong>{tree.plantedBy}</strong>
                </p>

                {/* Contributors */}
                <div className="flex items-center gap-2 mb-2">
                  <Users className="size-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {tree.contributors.length} {tree.contributors.length === 1 ? 'person' : 'people'} contributed
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-100">
                  <span>{tree.answers} answers</span>
                  <span className="capitalize">{tree.stage}</span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTrees.length === 0 && (
          <div className="text-center py-12">
            <TreeDeciduous className="size-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No trees found matching your filters</p>
          </div>
        )}
      </div>

      {/* Tree Detail Modal */}
      {selectedTreeData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6" onClick={() => setSelectedTree(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const dept = getDepartmentById(selectedTreeData.department);
              if (!dept) return null;

              return (
                <>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-2" style={{ backgroundColor: `${dept.color}20`, color: dept.color }}>
                        {dept.name} Department
                      </div>
                      <h2 className="text-gray-900 mb-2">{selectedTreeData.question}</h2>
                      <p className="text-sm text-gray-600">
                        {dept.treeSpecies.charAt(0).toUpperCase() + dept.treeSpecies.slice(1)} tree • Planted by {selectedTreeData.plantedBy}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedTree(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-gray-50 rounded-xl p-8 mb-6">
                    <div className="flex justify-center">
                      <DepartmentTree
                        treeSpecies={dept.treeSpecies}
                        color={dept.color}
                        size={160}
                        stage={selectedTreeData.stage as 'seed' | 'sprout' | 'young' | 'mature'}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-gray-900 mb-3 flex items-center gap-2">
                        <Users className="size-5" />
                        Collaboration Impact
                      </h3>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <p className="text-gray-900 text-lg mb-1">
                          {selectedTreeData.contributors.length} people contributed
                        </p>
                        <p className="text-sm text-gray-600">
                          AI did NOT contribute to growth - only human answers helped this tree grow
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl text-gray-900">{selectedTreeData.answers}</p>
                        <p className="text-xs text-gray-600">Total Answers</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl text-gray-900">{selectedTreeData.contributors.length}</p>
                        <p className="text-xs text-gray-600">Contributors</p>
                      </div>
                      <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${dept.color}15` }}>
                        <p className="text-sm text-gray-900 capitalize">{selectedTreeData.stage}</p>
                        <p className="text-xs text-gray-600">Growth Stage</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => setSelectedTree(null)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl"
                    >
                      Close
                    </Button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}