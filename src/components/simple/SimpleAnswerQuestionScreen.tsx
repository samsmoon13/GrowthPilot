import { useState } from 'react';
import { ArrowLeft, Send, Droplets, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { DepartmentGeometricTree } from '../trees/GeometricTrees';
import { getDepartmentById } from '../../config/departments';
import type { Screen, Question, Answer } from '../../App';

interface SimpleAnswerQuestionScreenProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  canGoBack: boolean;
  currentUser: string;
  currentQuestion: Question | undefined;
  addAnswer: (questionId: string, answer: Answer) => void;
  notifications: Record<string, any[]>;
  setCurrentUser: (user: string) => void;
  setCurrentQuestionId: (id: string) => void;
  setNotifications: (notifications: Record<string, any[]>) => void;
}

export function SimpleAnswerQuestionScreen({
  navigateTo,
  goBack,
  canGoBack,
  currentUser,
  currentQuestion,
  addAnswer,
  notifications,
  setCurrentUser,
  setCurrentQuestionId,
  setNotifications,
}: SimpleAnswerQuestionScreenProps) {
  const [answerText, setAnswerText] = useState('');
  const [showGrowthAnimation, setShowGrowthAnimation] = useState(false);
  const [animatingGrowthLevel, setAnimatingGrowthLevel] = useState(0);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#faf9f7]" style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        <SimpleNav currentScreen="answer-question" navigateTo={navigateTo} currentUser={currentUser} notifications={notifications} setCurrentUser={setCurrentUser} setCurrentQuestionId={setCurrentQuestionId} setNotifications={setNotifications} />
        <div className="max-w-3xl mx-auto px-6 py-12">
          <p className="text-gray-600 text-center">Question not found</p>
        </div>
      </div>
    );
  }

  const dept = getDepartmentById(currentQuestion.department);
  const growthLevel = currentQuestion.growthLevel;

  const handleSubmitAnswer = () => {
    if (!answerText.trim()) return;

    const currentGrowth = growthLevel;
    const newGrowth = Math.min(currentGrowth + 1, 10);

    const newAnswer: Answer = {
      id: `${currentQuestion.id}-${Date.now()}`,
      text: answerText,
      author: currentUser,
      isAI: false,
      timestamp: new Date(),
    };

    // Show growth animation
    setAnimatingGrowthLevel(currentGrowth);
    setShowGrowthAnimation(true);
    
    // Add answer after a brief moment
    setTimeout(() => {
      addAnswer(currentQuestion.id, newAnswer);
      setAnswerText('');
      
      // Animate growth level increase
      setTimeout(() => {
        setAnimatingGrowthLevel(newGrowth);
      }, 300);
      
      // Navigate away after animation completes
      setTimeout(() => {
        setShowGrowthAnimation(false);
        navigateTo('forest');
      }, 3000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] relative" style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <SimpleNav currentScreen="answer-question" navigateTo={navigateTo} currentUser={currentUser} notifications={notifications} setCurrentUser={setCurrentUser} setCurrentQuestionId={setCurrentQuestionId} setNotifications={setNotifications} goBack={goBack} canGoBack={canGoBack} />

      {/* Magical Growth Animation Overlay */}
      {showGrowthAnimation && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative">
            {/* Sparkles and magical effects */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(12)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute text-yellow-400 animate-ping"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.15}s`,
                    width: `${20 + Math.random() * 20}px`,
                    height: `${20 + Math.random() * 20}px`,
                  }}
                />
              ))}
            </div>

            {/* Water Droplets */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(8)].map((_, i) => (
                <Droplets
                  key={i}
                  className="absolute text-blue-400 animate-bounce"
                  style={{
                    top: `${-20 + i * 10}%`,
                    left: `${40 + Math.random() * 20}%`,
                    animationDelay: `${i * 0.2}s`,
                    width: '24px',
                    height: '24px',
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>

            {/* Growing Tree - Large Scale */}
            <div className="bg-white rounded-3xl p-12 shadow-2xl animate-pulse">
              <div className="transform transition-all duration-1000 ease-out scale-110">
                <DepartmentGeometricTree
                  department={currentQuestion.department}
                  color={dept?.color || '#10b981'}
                  size={200}
                  growthLevel={animatingGrowthLevel}
                />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-2xl font-extrabold text-[#3d2817] mb-2">
                  🌱 Knowledge Growing!
                </h3>
                <p className="text-lg" style={{ color: dept?.color }}>
                  Level {animatingGrowthLevel}/10
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back Button */}
        {/* Removed duplicate - using BackButton at the top of screen */}

        {/* Question Card */}
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm mb-6">
          {/* Tree Visualization */}
          <div className="flex justify-center mb-6">
            <DepartmentGeometricTree
              department={currentQuestion.department}
              color={dept?.color || '#10b981'}
              size={120}
              growthLevel={growthLevel}
            />
          </div>

          {/* Question Details */}
          <div className="text-center mb-6">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs mb-3"
              style={{ backgroundColor: dept?.color + '20', color: dept?.color }}
            >
              {dept?.name}
            </span>
            <h2 className="text-gray-900 mb-2">{currentQuestion.text}</h2>
            <p className="text-sm text-gray-600">
              Asked by <strong>{currentQuestion.askedBy}</strong>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Growth Level: {growthLevel}/10 · {currentQuestion.answers.filter(a => !a.isAI).length} human answers
            </p>
          </div>

          {/* Existing Answers */}
          {currentQuestion.answers.length > 0 && (
            <div className="space-y-3 mb-6 border-t border-gray-200 pt-6">
              <h3 className="text-sm text-gray-700 mb-3">Existing Answers</h3>
              {currentQuestion.answers.map((answer) => (
                <div
                  key={answer.id}
                  className={`p-4 rounded-lg ${
                    answer.isAI
                      ? 'bg-purple-50 border border-purple-200'
                      : 'bg-gray-50 border border-gray-200'
                  } group action-reveal`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium" style={{ color: answer.isAI ? '#9333ea' : dept?.color }}>
                      {answer.author}
                    </span>
                    {answer.isAI && (
                      <span className="text-xs text-purple-600">(AI - no growth)</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700">{answer.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Answer Form */}
        {growthLevel < 10 && (
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-gray-900 mb-4">Your Answer</h3>
            <Textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Share your knowledge and help the tree grow..."
              className="mb-4 min-h-[120px]"
            />
            <Button
              onClick={handleSubmitAnswer}
              disabled={!answerText.trim()}
              className="w-full"
              style={{ backgroundColor: dept?.color }}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Answer & Grow Tree
            </Button>
            <p className="text-xs text-gray-500 text-center mt-3">
              Your answer will add +1 growth to this tree
            </p>
          </div>
        )}

        {growthLevel >= 10 && (
          <div className="bg-green-50 rounded-2xl p-6 border border-green-200 text-center">
            <p className="text-green-800">
              🎉 This tree is fully grown! The knowledge is deeply rooted.
            </p>
          </div>
        )}
      </div>
      <SimpleFooter />
    </div>
  );
}