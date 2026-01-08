import { useState } from 'react';
import { ArrowLeft, Droplet, Sparkles, User, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { PlantVisualization } from './PlantVisualization';
import { getDepartmentById } from '../config/departments';
import type { Screen, Question, Answer } from '../App';

interface AnswerQuestionScreenProps {
  navigateTo: (screen: Screen) => void;
  currentUser: 'samin' | 'john';
  currentQuestion: Question | undefined;
  addAnswer: (questionId: string, answer: Answer) => void;
}

export function AnswerQuestionScreen({ 
  navigateTo, 
  currentUser, 
  currentQuestion,
  addAnswer 
}: AnswerQuestionScreenProps) {
  const [answerText, setAnswerText] = useState('');

  const handleSubmitAnswer = () => {
    if (!answerText.trim() || !currentQuestion) return;

    const newAnswer: Answer = {
      id: Date.now().toString(),
      text: answerText,
      author: currentUser === 'samin' ? 'sam' : 'max',
      isAI: false,
      timestamp: new Date(),
    };

    addAnswer(currentQuestion.id, newAnswer);
    navigateTo('growth-animation');
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No question selected</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateTo('notification')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="size-5" />
              Back to Notifications
            </button>
            <div className="flex items-center gap-2 text-gray-600">
              <User className="size-5" />
              <span>Logged in as {currentUser === 'samin' ? 'Samin' : 'John'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-100 to-blue-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <h2 className="text-gray-900">Help this seed grow</h2>
                  <p className="text-sm text-gray-600">
                    Asked by {currentQuestion.askedBy === 'samin' ? 'Samin' : 'John'} · {currentQuestion.category}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-gray-900 mb-4">{currentQuestion.text}</h3>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌿</span>
                  <div>
                    <p className="text-sm text-gray-900">Current Stage: Sprout</p>
                    <p className="text-xs text-gray-600">
                      {currentQuestion.answers.length} answer{currentQuestion.answers.length !== 1 ? 's' : ''} so far
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{currentQuestion.answers.length} / 4</p>
                  <p className="text-xs text-gray-600">waters given</p>
                </div>
              </div>
            </div>
          </div>

          {/* Existing Answers */}
          <div className="space-y-4">
            <h3 className="text-gray-900">Existing Answers</h3>
            
            {currentQuestion.answers.map((answer) => (
              <div
                key={answer.id}
                className={`bg-white rounded-xl p-6 shadow-sm border ${
                  answer.isAI ? 'border-purple-200' : 'border-blue-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`size-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    answer.isAI 
                      ? 'bg-gradient-to-br from-purple-500 to-blue-500' 
                      : 'bg-blue-500'
                  }`}>
                    {answer.isAI ? (
                      <Sparkles className="size-5 text-white" />
                    ) : (
                      <User className="size-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-900">
                        {answer.isAI ? 'AI Copilot' : answer.author}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        answer.isAI 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {answer.isAI ? 'AI Answer' : 'Human Answer'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{answer.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Your Answer */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 px-6 py-4">
              <div className="flex items-center gap-3 text-white">
                <Droplet className="size-6" />
                <div>
                  <h3 className="text-white">Water the Seed</h3>
                  <p className="text-sm text-white/80">Share your knowledge and help it grow</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-gray-700">
                  Your Answer
                </label>
                <Textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Share your expertise, insights, or resources..."
                  className="min-h-40 resize-none rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <Sparkles className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    <p className="mb-1">💡 Tip: Quality answers include:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Specific examples or resources</li>
                      <li>Personal experience or insights</li>
                      <li>Links to relevant documentation</li>
                      <li>Clear, actionable advice</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Human Growth Contribution Banner */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border-2 border-green-400">
                <div className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-gray-900 mb-1">
                      <strong>Your answer will help the seed grow!</strong>
                    </p>
                    <p className="text-gray-700">
                      ✅ Your answer adds a green water drop<br/>
                      ✅ The plant will grow one stage closer to a mature tree<br/>
                      ✅ Maximum 10 answers will fully grow the tree
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSubmitAnswer}
                disabled={!answerText.trim()}
                className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Droplet className="mr-2 size-5" />
                Submit Answer & Water the Seed 💧
                <Send className="ml-2 size-5" />
              </Button>

              <p className="text-xs text-center text-gray-500">
                After you submit, you'll receive AI feedback on your answer quality
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}