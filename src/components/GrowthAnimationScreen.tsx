import { useEffect, useState } from 'react';
import { Droplet, Sparkles, ArrowRight, Users } from 'lucide-react';
import { Button } from './ui/button';
import { PlantVisualization } from './PlantVisualization';
import { getDepartmentById } from '../config/departments';
import type { Screen, Question } from '../App';

interface GrowthAnimationScreenProps {
  navigateTo: (screen: Screen) => void;
  currentQuestion: Question | undefined;
  currentUser: 'samin' | 'john';
}

const stageNames = {
  seed: 'Seed',
  sprout: 'Sprout',
  young: 'Young Tree',
  mature: 'Mature Tree',
};

export function GrowthAnimationScreen({ 
  navigateTo, 
  currentQuestion,
  currentUser 
}: GrowthAnimationScreenProps) {
  const [animationStage, setAnimationStage] = useState<'watering' | 'growing' | 'complete'>('watering');
  const [showFeedback, setShowFeedback] = useState(false);

  const department = currentQuestion?.department ? getDepartmentById(currentQuestion.department) : null;

  useEffect(() => {
    // Water drop animation
    const timer1 = setTimeout(() => {
      setAnimationStage('growing');
    }, 1500);

    // Growth animation
    const timer2 = setTimeout(() => {
      setAnimationStage('complete');
    }, 3000);

    // Show feedback option
    const timer3 = setTimeout(() => {
      setShowFeedback(true);
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No question found</p>
      </div>
    );
  }

  const humanAnswersCount = currentQuestion.answers.filter(a => !a.isAI).length;
  const maxAnswers = 10;
  const progress = Math.min((humanAnswersCount / maxAnswers) * 100, 100);
  
  const growthStage: 'seed' | 'sprout' | 'young' | 'mature' = 
    humanAnswersCount === 0 ? 'seed' :
    humanAnswersCount <= 2 ? 'sprout' :
    humanAnswersCount <= 5 ? 'young' : 'mature';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Animation Area */}
          <div className="relative bg-gradient-to-b from-sky-100 to-green-100 p-16">
            {/* Water Drop Animation */}
            {animationStage === 'watering' && (
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <Droplet className="size-24 text-green-500 animate-bounce" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-16 bg-green-400 rounded-full animate-ping opacity-75" />
                  </div>
                </div>
                <p className="text-gray-700">Human answer watering the seed...</p>
                <p className="text-sm text-green-600">✅ Growth activated!</p>
              </div>
            )}

            {/* Growing Animation */}
            {animationStage === 'growing' && department && (
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <div className="animate-in zoom-in duration-1000">
                    <PlantVisualization
                      growthLevel={currentQuestion.growthLevel - 1}
                      size={120}
                      showAnimation={true}
                    />
                  </div>
                  <div className="absolute -top-4 -right-4">
                    <Sparkles className="size-12 text-green-500 animate-spin" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent animate-pulse" />
                </div>
                <p className="text-gray-700">Growing to Level {currentQuestion.growthLevel}...</p>
              </div>
            )}

            {/* Complete Animation */}
            {animationStage === 'complete' && department && (
              <div className="text-center space-y-6 animate-in zoom-in duration-700">
                <div className="relative inline-block">
                  <PlantVisualization
                    growthLevel={currentQuestion.growthLevel}
                    size={140}
                    showAnimation={false}
                  />
                  <div className="absolute -top-4 -right-4 -left-4 -bottom-4 border-4 rounded-full animate-ping opacity-50" style={{ borderColor: department.color }} />
                </div>
                <div className="space-y-2">
                  <h2 style={{ color: department.color }}>Growth Complete! 🎉</h2>
                  <p className="text-gray-700">
                    Your {department.name} plant reached: <strong>Level {currentQuestion.growthLevel} / 10</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentQuestion.growthLevel === 10 ? 'Fully Mature Tree! 🌳' : `${10 - currentQuestion.growthLevel} more answers to reach full tree`}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="p-8 space-y-6">
            {/* Department Info */}
            {department && (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border" style={{ borderColor: department.color }}>
                <div className="flex items-center gap-3">
                  <DepartmentSeed 
                    seedType={department.seedType}
                    color={department.color}
                    size={32}
                  />
                  <div>
                    <p className="text-sm text-gray-900">
                      <strong>{department.name}</strong> Department
                    </p>
                    <p className="text-xs text-gray-600">
                      {department.treeSpecies.charAt(0).toUpperCase() + department.treeSpecies.slice(1)} tree • {department.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Growth Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                <Droplet className="size-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl text-gray-900">{humanAnswersCount}</p>
                <p className="text-xs text-gray-600">Human Waters</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                <Sparkles className="size-6 text-gray-400 mx-auto mb-2" />
                <p className="text-2xl text-gray-900">
                  {currentQuestion.answers.filter(a => a.isAI).length}
                </p>
                <p className="text-xs text-gray-600">AI Insights (No Growth)</p>
              </div>

              <div className="text-center p-4 rounded-xl border" style={{ backgroundColor: `${department?.color}15`, borderColor: department?.color }}>
                <Users className="size-6 mx-auto mb-2" style={{ color: department?.color }} />
                <p className="text-2xl text-gray-900">{humanAnswersCount}</p>
                <p className="text-xs text-gray-600">Contributors</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Growth Progress</span>
                <span className="text-gray-900">{currentQuestion.answers.length} / 4 answers</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 transition-all duration-1000"
                  style={{ width: `${(currentQuestion.answers.length / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            {showFeedback && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {currentUser === 'john' && (
                  <Button
                    onClick={() => navigateTo('ai-feedback')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 rounded-xl"
                  >
                    <Sparkles className="mr-2 size-5" />
                    View AI Feedback on Your Answer
                  </Button>
                )}
                
                <Button
                  onClick={() => navigateTo('my-garden')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-xl"
                >
                  View My Garden
                  <ArrowRight className="ml-2 size-5" />
                </Button>

                <button
                  onClick={() => navigateTo('company-forest')}
                  className="w-full text-gray-600 hover:text-gray-900 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  View Company Forest
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Celebration Confetti Effect */}
        {animationStage === 'complete' && (
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute size-3 bg-green-500 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}