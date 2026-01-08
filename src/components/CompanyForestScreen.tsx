import { TreeDeciduous, Sparkles, Filter, Search, Menu, Sprout, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { Screen, Question } from '../App';

interface CompanyForestScreenProps {
  navigateTo: (screen: Screen) => void;
  currentUser: 'samin' | 'john';
  questions: Question[];
}

const stageIcons = {
  seed: '🌱',
  sprout: '🌿',
  'small-plant': '🪴',
  'young-tree': '🌳',
  'full-tree': '🌲',
};

// Mock department data
const departments = [
  { id: 'marketing', name: 'Marketing', color: 'purple', icon: '📢' },
  { id: 'engineering', name: 'Engineering', color: 'blue', icon: '⚙️' },
  { id: 'design', name: 'Design', color: 'pink', icon: '🎨' },
  { id: 'product', name: 'Product', color: 'green', icon: '🚀' },
];

// Mock additional trees for a fuller forest
const mockTrees: Question[] = [
  {
    id: 'mock1',
    text: 'Best practices for code reviews?',
    category: 'technical',
    askedBy: 'john',
    answers: [
      { id: '1', text: 'AI: Use checklist...', author: 'AI Copilot', isAI: true, timestamp: new Date() },
      { id: '2', text: 'Focus on...', author: 'john', isAI: false, timestamp: new Date() },
      { id: '3', text: 'Always check...', author: 'samin', isAI: false, timestamp: new Date() },
      { id: '4', text: 'Consider...', author: 'john', isAI: false, timestamp: new Date() },
    ],
    stage: 'full-tree',
  },
  {
    id: 'mock2',
    text: 'How to improve team collaboration?',
    category: 'culture',
    askedBy: 'samin',
    answers: [
      { id: '1', text: 'AI: Based on studies...', author: 'AI Copilot', isAI: true, timestamp: new Date() },
      { id: '2', text: 'Regular meetings...', author: 'john', isAI: false, timestamp: new Date() },
      { id: '3', text: 'Use async tools...', author: 'samin', isAI: false, timestamp: new Date() },
    ],
    stage: 'young-tree',
  },
  {
    id: 'mock3',
    text: 'What are our design system principles?',
    category: 'creativity',
    askedBy: 'john',
    answers: [
      { id: '1', text: 'AI: Consistency, accessibility...', author: 'AI Copilot', isAI: true, timestamp: new Date() },
      { id: '2', text: 'Focus on user needs...', author: 'samin', isAI: false, timestamp: new Date() },
    ],
    stage: 'small-plant',
  },
];

export function CompanyForestScreen({ navigateTo, currentUser, questions }: CompanyForestScreenProps) {
  const allTrees = [...questions, ...mockTrees].filter(q => q.stage !== 'seed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateTo('login')}
                className="size-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
              >
                <Sprout className="size-5 text-green-600" />
              </button>
              <div>
                <h2 className="text-gray-900">Company Forest</h2>
                <p className="text-sm text-gray-600">Collective knowledge across all departments</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigateTo('ask')}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
              >
                Plant New Seed
              </Button>
              <button
                onClick={() => navigateTo('login')}
                className="size-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Menu className="size-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            <button
              onClick={() => navigateTo('my-garden')}
              className="px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
            >
              My Garden
            </button>
            <button className="px-4 py-3 text-green-600 border-b-2 border-green-600">
              Company Forest
            </button>
            <button
              onClick={() => navigateTo('company-garden')}
              className="px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
            >
              Company Garden (Detailed)
            </button>
            <button
              onClick={() => navigateTo('ai-insights')}
              className="px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
            >
              AI Insights
            </button>
            <button
              onClick={() => navigateTo('knowledge-graph')}
              className="px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
            >
              Knowledge Graph
            </button>
            <button
              onClick={() => navigateTo('profile')}
              className="px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
            >
              Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TreeDeciduous className="size-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">{allTrees.length}</p>
                  <p className="text-sm text-gray-600">Total Trees</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="size-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">
                    {allTrees.reduce((sum, q) => sum + q.answers.filter(a => a.isAI).length, 0)}
                  </p>
                  <p className="text-sm text-gray-600">AI Answers</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="size-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">
                    {allTrees.reduce((sum, q) => sum + q.answers.filter(a => !a.isAI).length, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Human Answers</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🌲</span>
                </div>
                <div>
                  <p className="text-2xl text-gray-900">
                    {allTrees.filter(q => q.stage === 'full-tree').length}
                  </p>
                  <p className="text-sm text-gray-600">Fully Grown</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  placeholder="Search knowledge trees..."
                  className="pl-10 rounded-xl border-gray-200"
                />
              </div>
              <Button variant="outline" className="rounded-xl">
                <Filter className="mr-2 size-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Department Sections */}
          {departments.map((dept) => {
            const deptTrees = allTrees.filter(q => {
              if (dept.id === 'marketing') return q.category === 'culture' || q.category === 'strategy';
              if (dept.id === 'engineering') return q.category === 'technical';
              if (dept.id === 'design') return q.category === 'creativity';
              if (dept.id === 'product') return q.category === 'process';
              return false;
            });

            if (deptTrees.length === 0) return null;

            return (
              <div key={dept.id} className="space-y-4">
                {/* Department Header */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{dept.icon}</span>
                  <div>
                    <h3 className="text-gray-900">{dept.name}</h3>
                    <p className="text-sm text-gray-600">{deptTrees.length} knowledge trees</p>
                  </div>
                </div>

                {/* Trees Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {deptTrees.map((tree) => (
                    <div
                      key={tree.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className={`h-2 bg-gradient-to-r from-${dept.color}-400 to-${dept.color}-500`} />
                      
                      <div className="p-5 space-y-3">
                        {/* Tree Header */}
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-3xl flex-shrink-0">{stageIcons[tree.stage]}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 line-clamp-2">{tree.text}</p>
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center gap-2 text-xs">
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {tree.category}
                          </span>
                          <span className="text-gray-500">by {tree.askedBy}</span>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <Sparkles className="size-3 text-purple-600" />
                            <span className="text-xs text-gray-600">
                              {tree.answers.filter(a => a.isAI).length} AI
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="size-3 text-blue-600" />
                            <span className="text-xs text-gray-600">
                              {tree.answers.filter(a => !a.isAI).length} Human
                            </span>
                          </div>
                        </div>

                        {/* Recently Grown Badge */}
                        {tree.id === questions[questions.length - 1]?.id && (
                          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg px-3 py-2 border border-green-200">
                            <p className="text-xs text-green-900">✨ Recently grown</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}