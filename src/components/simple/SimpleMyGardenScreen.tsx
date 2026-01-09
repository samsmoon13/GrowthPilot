import { useState } from 'react';
import { User as UserIcon, Sprout, TreeDeciduous, ArrowRight, Eye, Star, CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { DepartmentGeometricTree } from '../trees/GeometricTrees';
import { DepartmentSeed } from '../seeds/SeedIcons';
import { getDepartmentById } from '../../config/departments';
import type { Screen, Question, Notification } from '../../App';

interface SimpleMyGardenScreenProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  canGoBack: boolean;
  currentUser: string;
  questions: Question[];
  markBestAnswer: (questionId: string, answerId: string) => void;
  notifications: Record<string, Notification[]>;
  setCurrentQuestionId: (id: string) => void;
  setCurrentUser: (user: string) => void;
}

export function SimpleMyGardenScreen({ navigateTo, goBack, canGoBack, currentUser, questions, markBestAnswer, notifications, setCurrentQuestionId, setCurrentUser }: SimpleMyGardenScreenProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [viewingAnswers, setViewingAnswers] = useState(false);

  // Filter questions by current user
  const myQuestions = questions.filter(q => q.askedBy === currentUser);

  // Calculate stats (from profile)
  const seedsPlanted = myQuestions.length;
  
  const treesGrown = myQuestions.filter(q => q.growthLevel >= 6).length;
  
  const bestAnswersGiven = questions.reduce((count, question) => {
    const bestAnswer = question.answers.find(a => a.id === question.bestAnswerId);
    if (bestAnswer && bestAnswer.author === currentUser && !bestAnswer.isAI) {
      return count + 1;
    }
    return count;
  }, 0);

  const totalAnswers = questions.reduce((count, question) => {
    return count + question.answers.filter(a => a.author === currentUser && !a.isAI).length;
  }, 0);

  const contributionScore = bestAnswersGiven * 10 + totalAnswers * 2;

  // Personal Growth Tree visualization - grows with best answers
  const personalTreeStage = bestAnswersGiven === 0 ? 'seed' : 
                           bestAnswersGiven <= 2 ? 'sprout' : 
                           bestAnswersGiven <= 5 ? 'young' : 'mature';

  const getGrowthStage = (level: number): 'seed' | 'sprout' | 'young' | 'mature' => {
    if (level === 0) return 'seed';
    if (level <= 2) return 'sprout';
    if (level <= 5) return 'young';
    return 'mature';
  };

  const handleViewAnswers = (question: Question) => {
    setSelectedQuestion(question);
    setViewingAnswers(true);
    setCurrentQuestionId(question.id);
  };

  const handleMarkBest = (answerId: string) => {
    if (selectedQuestion) {
      markBestAnswer(selectedQuestion.id, answerId);
      setViewingAnswers(false);
      setSelectedQuestion(null);
    }
  };

  if (viewingAnswers && selectedQuestion) {
    return (
      <div className="min-h-screen bg-[#faf9f7]" style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        <SimpleNav currentScreen="my-garden" navigateTo={navigateTo} currentUser={currentUser} notifications={notifications} setCurrentUser={setCurrentUser} />
        
        <div className="max-w-3xl mx-auto px-6 py-12">
          <Button
            variant="ghost"
            onClick={() => setViewingAnswers(false)}
            className="mb-6"
          >
            ← Back to My Garden
          </Button>

          <div className="text-center mb-8">
            <h2 className="text-gray-900 mb-2">{selectedQuestion.text}</h2>
            <p className="text-gray-600 text-sm">
              {selectedQuestion.answers.filter(a => !a.isAI).length} human answers · Select the best one
            </p>
          </div>

          <div className="space-y-4">
            {selectedQuestion.answers.map((answer) => {
              const isBest = selectedQuestion.bestAnswerId === answer.id;
              const isAI = answer.isAI;
              
              return (
                <div
                  key={answer.id}
                  className={`bg-white rounded-xl p-6 border-2 transition-all ${
                    isBest
                      ? 'border-green-500 bg-green-50'
                      : isAI
                      ? 'border-gray-200 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isAI ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      {isAI ? (
                        <span className="text-white text-sm">AI</span>
                      ) : (
                        <span className="text-gray-700 text-sm">{answer.author[0]}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-900">{answer.author}</span>
                        {isAI && (
                          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                            AI
                          </span>
                        )}
                        {isBest && (
                          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Best Answer
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-3">{answer.text}</p>
                      {!isAI && !isBest && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkBest(answer.id)}
                          className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Best Answer
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] relative" style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <SimpleNav currentScreen="my-garden" navigateTo={navigateTo} currentUser={currentUser} notifications={notifications} setCurrentUser={setCurrentUser} goBack={goBack} canGoBack={canGoBack} />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <TreeDeciduous className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-gray-900 mb-2">My Garden</h1>
          <p className="text-gray-600">Your knowledge trees and stats</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sprout className="w-6 h-6 text-gray-700" />
            </div>
            <p className="text-gray-900 text-2xl mb-1">{seedsPlanted}</p>
            <p className="text-gray-600 text-sm">Seeds Planted</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TreeDeciduous className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-gray-900 text-2xl mb-1">{treesGrown}</p>
            <p className="text-gray-600 text-sm">Trees Grown</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-gray-900 text-2xl mb-1">{bestAnswersGiven}</p>
            <p className="text-gray-600 text-sm">Best Answers</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-gray-700" />
            </div>
            <p className="text-gray-900 text-2xl mb-1">{contributionScore}</p>
            <p className="text-gray-600 text-sm">Contribution Score</p>
          </div>
        </div>

        {/* Trees grid */}
        {myQuestions.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-600 mb-6">You haven't planted any seeds yet</p>
            <Button
              onClick={() => navigateTo('ask')}
              className="bg-[rgb(213,192,93)] hover:bg-[rgb(193,172,73)] text-white"
            >
              Plant Your First Seed
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myQuestions.map((question) => {
              const dept = getDepartmentById(question.department);
              const stage = getGrowthStage(question.growthLevel);
              const humanAnswers = question.answers.filter(a => !a.isAI);
              const bestAnswer = question.answers.find(a => a.id === question.bestAnswerId);
              
              return (
                <div
                  key={question.id}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow group"
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
                    <span>{humanAnswers.length} / 10 answers</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {dept?.name}
                    </span>
                  </div>

                  {/* Best answer preview */}
                  {bestAnswer && (
                    <div className="bg-[#fef9e7] rounded-lg p-3 mb-4 border-2 border-[rgb(213,192,93)]">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-[rgb(213,192,93)] fill-[rgb(213,192,93)]" />
                        <span className="text-xs text-[#3d2817]">Best Answer by {bestAnswer.author}</span>
                      </div>
                      <p className="text-xs text-gray-700 line-clamp-2">{bestAnswer.text}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <Button
                    onClick={() => handleViewAnswers(question)}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-900 hover:bg-gray-900 hover:text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Answers
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {/* Personal Growth Tree Section */}
        <div className="mt-16 bg-gradient-to-br from-green-50 to-white rounded-2xl p-12 border-2 border-green-200">
          <div className="text-center mb-8">
            <h2 className="text-gray-900 mb-2">🌳 Your Personal Growth Tree</h2>
            <p className="text-gray-600">
              Grows when you answer questions and help others
            </p>
          </div>

          {/* Tree visualization */}
          <div className="flex justify-center mb-8">
            {personalTreeStage === 'seed' ? (
              <div className="relative">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                  <Sprout className="w-16 h-16 text-green-500" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-gray-200">
                  <span className="text-xs text-gray-600">Seed</span>
                </div>
              </div>
            ) : personalTreeStage === 'sprout' ? (
              <div className="relative">
                <svg width="160" height="160" viewBox="0 0 160 160" className="drop-shadow-lg">
                  {/* Ground */}
                  <ellipse cx="80" cy="140" rx="40" ry="8" fill="#9ca3af" opacity="0.3" />
                  {/* Stem */}
                  <rect x="75" y="100" width="10" height="40" fill="#22c55e" rx="2" />
                  {/* Leaves */}
                  <ellipse cx="70" cy="110" rx="15" ry="8" fill="#10b981" transform="rotate(-30 70 110)" />
                  <ellipse cx="90" cy="115" rx="15" ry="8" fill="#10b981" transform="rotate(30 90 115)" />
                  {/* Small sprout */}
                  <circle cx="80" cy="95" r="5" fill="#22c55e" />
                </svg>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-gray-200">
                  <span className="text-xs text-gray-600">Sprout</span>
                </div>
              </div>
            ) : personalTreeStage === 'young' ? (
              <div className="relative">
                <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
                  {/* Ground */}
                  <ellipse cx="100" cy="180" rx="60" ry="10" fill="#9ca3af" opacity="0.3" />
                  {/* Trunk */}
                  <rect x="90" y="120" width="20" height="60" fill="#78716c" rx="3" />
                  {/* Branches */}
                  <line x1="100" y1="140" x2="75" y2="120" stroke="#78716c" strokeWidth="6" strokeLinecap="round" />
                  <line x1="100" y1="145" x2="125" y2="125" stroke="#78716c" strokeWidth="6" strokeLinecap="round" />
                  {/* Foliage */}
                  <circle cx="75" cy="115" r="25" fill="#22c55e" opacity="0.8" />
                  <circle cx="100" cy="105" r="30" fill="#10b981" opacity="0.9" />
                  <circle cx="125" cy="120" r="25" fill="#22c55e" opacity="0.8" />
                </svg>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-gray-200">
                  <span className="text-xs text-gray-600">Young Tree</span>
                </div>
              </div>
            ) : (
              <div className="relative">
                <svg width="240" height="240" viewBox="0 0 240 240" className="drop-shadow-lg">
                  {/* Ground */}
                  <ellipse cx="120" cy="220" rx="80" ry="12" fill="#9ca3af" opacity="0.3" />
                  {/* Trunk */}
                  <rect x="105" y="140" width="30" height="80" fill="#78716c" rx="4" />
                  {/* Main branches */}
                  <line x1="120" y1="160" x2="80" y2="130" stroke="#78716c" strokeWidth="8" strokeLinecap="round" />
                  <line x1="120" y1="165" x2="160" y2="135" stroke="#78716c" strokeWidth="8" strokeLinecap="round" />
                  <line x1="115" y1="150" x2="90" y2="120" stroke="#78716c" strokeWidth="6" strokeLinecap="round" />
                  <line x1="125" y1="155" x2="150" y2="125" stroke="#78716c" strokeWidth="6" strokeLinecap="round" />
                  {/* Rich foliage */}
                  <circle cx="80" cy="125" r="35" fill="#22c55e" opacity="0.8" />
                  <circle cx="120" cy="110" r="40" fill="#10b981" opacity="0.9" />
                  <circle cx="160" cy="130" r="35" fill="#22c55e" opacity="0.8" />
                  <circle cx="100" cy="100" r="30" fill="#16a34a" opacity="0.85" />
                  <circle cx="140" cy="105" r="30" fill="#16a34a" opacity="0.85" />
                </svg>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-gray-200">
                  <span className="text-xs text-gray-600">Mature Tree</span>
                </div>
              </div>
            )}
          </div>

          {/* Growth info */}
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4 text-center">Tree Growth</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total answers given</span>
                  <span className="text-gray-900">{totalAnswers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Best answers (branches)</span>
                  <span className="text-gray-900">{bestAnswersGiven}</span>
                </div>
                <div className="h-px bg-gray-200 my-3" />
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Current stage</span>
                  <span className="text-gray-900 capitalize">{personalTreeStage}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
              <p className="text-xs text-gray-700">
                <strong>Your tree grows when you help others.</strong>
                <br />
                Each best answer adds a new branch to your personal growth tree.
              </p>
            </div>
          </div>
        </div>
      </div>
      <SimpleFooter />
    </div>
  );
}