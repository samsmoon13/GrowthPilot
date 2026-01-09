import { useState } from 'react';
import { Trees, Filter, Trophy, Medal, Award, Map } from 'lucide-react';
import { Button } from '../ui/button';
import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { DepartmentGeometricTree } from '../trees/GeometricTrees';
import { getDepartmentById, departments } from '../../config/departments';
import type { Screen, Question } from '../../App';
import type { Notification } from '../../App';

interface SimpleForestScreenProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  canGoBack: boolean;
  currentUser: string;
  questions: Question[];
  notifications: Record<string, any[]>;
  setCurrentQuestionId: (id: string | null) => void;
  setCurrentUser: (user: string) => void;
}

export function SimpleForestScreen({ navigateTo, goBack, canGoBack, currentUser, questions, notifications, setCurrentQuestionId, setCurrentUser }: SimpleForestScreenProps) {
  const [filterDepartment, setFilterDepartment] = useState<string>('all');

  const getGrowthStage = (level: number): 'seed' | 'sprout' | 'young' | 'mature' => {
    if (level === 0) return 'seed';
    if (level <= 2) return 'sprout';
    if (level <= 5) return 'young';
    return 'mature';
  };

  // Calculate top contributors
  const contributorStats = questions.reduce((acc, question) => {
    const bestAnswer = question.answers.find(a => a.id === question.bestAnswerId);
    if (bestAnswer && !bestAnswer.isAI) {
      acc[bestAnswer.author] = (acc[bestAnswer.author] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topContributors = Object.entries(contributorStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Filter questions
  const filteredQuestions = filterDepartment === 'all'
    ? questions
    : questions.filter(q => q.department === filterDepartment);

  return (
    <div className="min-h-screen bg-[#faf9f7] relative" style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <SimpleNav currentScreen="forest" navigateTo={navigateTo} currentUser={currentUser} notifications={notifications} setCurrentUser={setCurrentUser} goBack={goBack} canGoBack={canGoBack} />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Trees className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-gray-900 mb-2">Company Forest</h1>
          <p className="text-gray-600">All knowledge trees across the organization</p>
          
          {/* Tree Map Button */}
          <div className="mt-4">
            <Button
              onClick={() => navigateTo('tree-map')}
              className="bg-[rgb(213,192,93)] hover:bg-[rgb(193,172,73)] text-white"
            >
              <Map className="w-4 h-4 mr-2" />
              View Tree Map
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
          <Button
            variant={filterDepartment === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterDepartment('all')}
            className={filterDepartment === 'all' ? 'bg-gray-900 text-white' : 'border-gray-300 text-gray-700'}
            size="sm"
          >
            All Departments
          </Button>
          {departments.map((dept) => (
            <Button
              key={dept.id}
              variant={filterDepartment === dept.id ? 'default' : 'outline'}
              onClick={() => setFilterDepartment(dept.id)}
              className={filterDepartment === dept.id ? 'bg-gray-900 text-white' : 'border-gray-300 text-gray-700'}
              size="sm"
            >
              {dept.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Trees */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuestions.map((question) => {
                const dept = getDepartmentById(question.department);
                const stage = getGrowthStage(question.growthLevel);
                const humanAnswers = question.answers.filter(a => !a.isAI);
                const canAnswer = question.growthLevel < 10;
                
                return (
                  <div
                    key={question.id}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    {/* Tree/Seed visualization */}
                    <div className="flex justify-center mb-6">
                      <DepartmentGeometricTree
                        department={question.department}
                        color={dept?.color || '#10b981'}
                        size={120}
                        growthLevel={question.growthLevel}
                      />
                    </div>

                    {/* Question */}
                    <h3 className="text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                      {question.text}
                    </h3>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>{humanAnswers.length} answers</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {dept?.name}
                      </span>
                    </div>

                    {/* Growth level */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Growth</span>
                        <span>{question.growthLevel}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${(question.growthLevel / 10) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Answer button */}
                    {canAnswer && (
                      <Button
                        onClick={() => {
                          setCurrentQuestionId(question.id);
                          navigateTo('answer-question');
                        }}
                        variant="outline"
                        size="sm"
                        className="w-full"
                        style={{ borderColor: dept?.color, color: dept?.color }}
                      >
                        Add Answer
                      </Button>
                    )}

                    {!canAnswer && (
                      <div className="text-center">
                        <span className="text-xs text-green-600">✓ Fully Grown</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Contributors */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-gray-700" />
                <h3 className="text-gray-900">Top Contributors</h3>
              </div>

              <div className="space-y-4">
                {topContributors.length === 0 ? (
                  <p className="text-sm text-gray-600">No contributors yet</p>
                ) : (
                  topContributors.map(([name, count], index) => {
                    const icons = [Trophy, Medal, Award];
                    const colors = ['text-yellow-500', 'text-gray-400', 'text-orange-500'];
                    const Icon = icons[index] || Award;
                    const color = colors[index] || 'text-gray-500';
                    
                    return (
                      <div
                        key={name}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-shrink-0">
                          <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-700">{name[0]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 truncate">{name}</p>
                          <p className="text-xs text-gray-600">
                            {count} best answer{count !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-xs text-gray-700">
                  <strong>How to get here:</strong>
                  <br />
                  Answer questions and have your answers marked as "best" by the question asker.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SimpleFooter />
    </div>
  );
}