import { Sprout, TreeDeciduous, Droplet, Sparkles, Plus, User, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { getDepartmentById } from '../config/departments';
import { DepartmentSeed } from './seeds/SeedIcons';
import { DepartmentTree } from './trees/TreeIcons';
import type { Screen, Question } from '../App';

interface MyGardenScreenProps {
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

const stageNames = {
  seed: 'Seed',
  sprout: 'Sprout',
  'small-plant': 'Small Plant',
  'young-tree': 'Young Tree',
  'full-tree': 'Full Tree',
};

const stageColors = {
  seed: 'from-yellow-100 to-green-100',
  sprout: 'from-green-100 to-green-200',
  'small-plant': 'from-green-200 to-green-300',
  'young-tree': 'from-green-300 to-green-400',
  'full-tree': 'from-green-400 to-green-500',
};

export function MyGardenScreen({ navigateTo, currentUser, questions }: MyGardenScreenProps) {
  const userQuestions = questions.filter(q => q.askedBy === currentUser);

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
                <h2 className="text-gray-900">My Garden</h2>
                <p className="text-sm text-gray-600">
                  {currentUser === 'samin' ? 'Samin' : 'John'}'s Knowledge Garden
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigateTo('ask')}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
              >
                <Plus className="mr-2 size-4" />
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
            <button className="px-4 py-3 text-green-600 border-b-2 border-green-600">
              My Garden
            </button>
            <button
              onClick={() => navigateTo('company-forest')}
              className="px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
            >
              Company Forest
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
        {userQuestions.length === 0 ? (
          <div className="text-center py-20">
            <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sprout className="size-10 text-green-600" />
            </div>
            <h2 className="text-gray-900 mb-2">Your garden is empty</h2>
            <p className="text-gray-600 mb-6">Plant your first seed to start growing knowledge</p>
            <Button
              onClick={() => navigateTo('ask')}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
            >
              <Plus className="mr-2 size-4" />
              Plant First Seed
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Sprout className="size-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">{userQuestions.length}</p>
                    <p className="text-sm text-gray-600">Seeds Planted</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Droplet className="size-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">
                      {userQuestions.reduce((sum, q) => sum + q.answers.length, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total Answers</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TreeDeciduous className="size-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">
                      {userQuestions.filter(q => q.stage === 'full-tree').length}
                    </p>
                    <p className="text-sm text-gray-600">Full Trees</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-2 gap-6">
              {userQuestions.map((question) => {
                const dept = question.department ? getDepartmentById(question.department) : null;
                const humanAnswersCount = question.answers.filter(a => !a.isAI).length;
                const growthStage: 'seed' | 'sprout' | 'young' | 'mature' = 
                  humanAnswersCount === 0 ? 'seed' :
                  humanAnswersCount === 1 ? 'sprout' :
                  humanAnswersCount === 2 ? 'young' : 'mature';

                return (
                  <div
                    key={question.id}
                    className="bg-white rounded-2xl shadow-lg border-2 overflow-hidden hover:shadow-xl transition-shadow"
                    style={{ borderColor: dept?.color || '#e5e7eb' }}
                  >
                    {/* Department Header */}
                    {dept && (
                      <div className="px-6 py-3 flex items-center justify-between" style={{ backgroundColor: `${dept.color}15` }}>
                        <div className="flex items-center gap-2">
                          <DepartmentSeed seedType={dept.seedType} color={dept.color} size={24} />
                          <span className="text-sm" style={{ color: dept.color }}>
                            {dept.name} • {dept.treeSpecies} tree
                          </span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${dept.color}30`, color: dept.color }}>
                          {stageNames[growthStage]}
                        </span>
                      </div>
                    )}
                    
                    <div className="p-6 space-y-4">
                      {/* Tree Visualization */}
                      <div className="flex justify-center py-4 bg-gradient-to-br from-green-50 to-gray-50 rounded-xl">
                        {dept && (
                          <DepartmentTree
                            treeSpecies={dept.treeSpecies}
                            color={dept.color}
                            size={100}
                            stage={growthStage}
                          />
                        )}
                      </div>

                      {/* Question Text */}
                      <div>
                        <p className="text-gray-900">{question.text}</p>
                      </div>

                      {/* Growth Info */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Human Waters (Growth)</span>
                          <span className="text-gray-900">{humanAnswersCount} / 4</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                            style={{ width: `${(humanAnswersCount / 4) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Answers Summary */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Sparkles className="size-4 text-gray-400" />
                          </div>
                          <p className="text-lg text-gray-900">{question.answers.filter(a => a.isAI).length}</p>
                          <p className="text-xs text-gray-600">AI Insights</p>
                          <p className="text-xs text-gray-500">(No Growth)</p>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Droplet className="size-4 text-green-600" />
                          </div>
                          <p className="text-lg text-gray-900">{humanAnswersCount}</p>
                          <p className="text-xs text-gray-600">Human Waters</p>
                          <p className="text-xs text-green-600">(Growth!)</p>
                        </div>
                      </div>

                      {/* AI Label if has AI answer */}
                      {question.answers.some(a => a.isAI) && (
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3 border border-gray-200">
                          <div className="flex items-center gap-2">
                            <Sparkles className="size-4 text-gray-600" />
                            <span className="text-sm text-gray-700">AI provided insight (no growth contribution)</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}