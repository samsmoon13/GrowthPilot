import { useState, useEffect } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { DepartmentGeometricTree } from '../trees/GeometricTrees';
import { getDepartmentById, departments } from '../../config/departments';
import type { Screen, Question, Answer } from '../../App';

interface SimpleDemoModeProps {
  navigateTo: (screen: Screen) => void;
  currentUser: string;
  setCurrentUser: (user: string) => void;
  addQuestion: (question: Question) => void;
  addAnswer: (questionId: string, answer: Answer) => void;
}

export function SimpleDemoMode({ 
  navigateTo, 
  currentUser, 
  setCurrentUser, 
  addQuestion, 
  addAnswer 
}: SimpleDemoModeProps) {
  const [answerText, setAnswerText] = useState('');
  const [answerCount, setAnswerCount] = useState(0);

  // Pre-loaded demo question with AI answer
  const demoQuestion: Question = {
    id: 'demo-presentation',
    text: 'What are the best practices for effective team collaboration in remote work?',
    department: 'management',
    askedBy: 'Sarah',
    answers: [
      {
        id: 'demo-ai-answer',
        text: 'AI Insight: Based on company knowledge, successful remote collaboration requires clear communication channels, regular sync meetings, documented processes, and trust-based management. Consider using async updates and establishing team rituals.',
        author: 'AI Copilot',
        isAI: true,
        timestamp: new Date(),
      }
    ],
    growthLevel: answerCount,
  };

  const dept = getDepartmentById(demoQuestion.department);
  const growthLevel = answerCount;

  const handleAddAnswer = () => {
    if (!answerText.trim()) return;

    const newAnswer: Answer = {
      id: `${demoQuestion.id}-${Date.now()}`,
      text: answerText,
      author: currentUser,
      isAI: false,
      timestamp: new Date(),
    };

    addAnswer(demoQuestion.id, newAnswer);
    
    // Update local demo question
    const updatedQuestion = {
      ...demoQuestion,
      answers: [...demoQuestion.answers, newAnswer],
      growthLevel: Math.min(demoQuestion.growthLevel + 1, 10)
    };
    setAnswerCount(prev => prev + 1);
    setAnswerText('');

    // Allow adding more answers or finishing
    if (answerCount >= 2) {
      // Option to finish demo
    }
  };

  const handleSwitchUser = () => {
    setCurrentUser(currentUser === 'Sarah' ? 'Alex' : 'Sarah');
  };

  const handleResetDemo = () => {
    setAnswerCount(0);
    setAnswerText('');
    setCurrentUser('Sarah');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-2xl mx-auto p-6 pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-gray-900 mb-2">GrowthPilot Demo</h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-gray-700">Logged in as: <strong>{currentUser}</strong></span>
            <button
              onClick={handleSwitchUser}
              className="ml-2 text-xs text-blue-600 hover:text-blue-700"
            >
              Switch
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Tree Growth Visualization */}
          {demoQuestion && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="text-center mb-6">
                <h3 className="text-gray-900 mb-2">{demoQuestion.text}</h3>
                <p className="text-sm text-gray-600">
                  Growth Level: {growthLevel}/10
                </p>
              </div>

              {/* Tree Visualization */}
              <div className="flex justify-center mb-8">
                <DepartmentGeometricTree
                  department={demoQuestion.department}
                  color={dept?.color || '#10b981'}
                  size={160}
                  growthLevel={growthLevel}
                />
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${(growthLevel / 10) * 100}%`,
                      backgroundColor: dept?.color
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  {growthLevel === 0 && 'Seed planted - waiting for human answers'}
                  {growthLevel > 0 && growthLevel < 10 && `Growing with ${growthLevel} human answer${growthLevel > 1 ? 's' : ''}`}
                  {growthLevel === 10 && 'Fully grown tree! 🎉'}
                </p>
              </div>

              {/* Answers */}
              <div className="space-y-3 mb-6">
                {demoQuestion.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className={`p-4 rounded-lg ${
                      answer.isAI
                        ? 'bg-purple-50 border border-purple-200'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
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

              {/* Answer Form */}
              {growthLevel < 10 && (
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-sm text-gray-900 mb-3">Add Your Answer</h4>
                  <Textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Share your knowledge..."
                    className="mb-3 min-h-[80px]"
                  />
                  <Button
                    onClick={handleAddAnswer}
                    disabled={!answerText.trim()}
                    className="w-full"
                    style={{ backgroundColor: dept?.color }}
                  >
                    Add Answer & Grow Tree
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Complete State */}
              {growthLevel === 10 && (
                <div className="text-center">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-green-800">
                      🎉 Tree fully grown! This knowledge is now deeply rooted in the organization.
                    </p>
                  </div>
                  <Button
                    onClick={handleResetDemo}
                    variant="outline"
                    className="w-full"
                  >
                    Start New Demo
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Exit Demo */}
          <div className="text-center">
            <button
              onClick={() => {
                setCurrentUser('Sarah');
                navigateTo('home');
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Exit Demo Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}