import { Bell, Sparkles, User, Droplet, ArrowRight, Sprout } from 'lucide-react';
import { Button } from './ui/button';
import { PlantVisualization } from './PlantVisualization';
import type { Screen, Question } from '../App';

interface NotificationScreenProps {
  navigateTo: (screen: Screen) => void;
  currentUser: 'samin' | 'john';
  questions: Question[];
  setCurrentQuestionId: (id: string) => void;
}

export function NotificationScreen({ 
  navigateTo, 
  currentUser,
  questions,
  setCurrentQuestionId 
}: NotificationScreenProps) {
  const handleViewQuestion = (questionId: string) => {
    setCurrentQuestionId(questionId);
    navigateTo('answer-question');
  };

  // Filter questions from other users that need answers
  const notificationsForMax = questions.filter(q => 
    q.askedBy === 'sam' && (q.answers.length === 0 || q.growthLevel < 10)
  );
  
  const notificationsForSam = questions.filter(q => 
    q.askedBy === 'max' && (q.answers.length === 0 || q.growthLevel < 10)
  );

  const notifications = currentUser === 'john' ? notificationsForMax : notificationsForSam;
  const userName = currentUser === 'samin' ? 'Sam' : 'Max';
  const otherUser = currentUser === 'samin' ? 'Max' : 'Sam';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Sprout className="size-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-gray-900">GrowthPilot</h2>
                <p className="text-sm text-gray-600">Logged in as John</p>
              </div>
            </div>
            <button
              onClick={() => navigateTo('dashboard')}
              className="size-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <User className="size-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Welcome Message */}
          <div className="text-center">
            <div className="size-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👋</span>
            </div>
            <h1 className="text-gray-900 mb-2">Welcome Back, {userName}</h1>
            <p className="text-gray-600">
              {notifications.length > 0 
                ? `You have ${notifications.length} seed${notifications.length > 1 ? 's' : ''} that need${notifications.length === 1 ? 's' : ''} your expertise`
                : "You're all caught up!"}
            </p>
          </div>

          {/* Notifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="size-5 text-gray-600" />
              <h3 className="text-gray-900">Notifications</h3>
              {notifications.length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{notifications.length}</span>
              )}
            </div>

            {notifications.length > 0 ? (
              notifications.map((question) => (
                <div key={question.id} className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 overflow-hidden">
                  {/* New Badge */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <Bell className="size-5" />
                        <span>New Seed Planted</span>
                      </div>
                      <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Just now</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Question Info */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="size-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="size-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">Samin asked a question</p>
                          <p className="text-xs text-gray-600">Category: {question.category}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <p className="text-gray-900">{question.text}</p>
                      </div>
                    </div>

                    {/* AI Status */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-start gap-3">
                        <Sparkles className="size-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 mb-1">AI has already answered</p>
                          <p className="text-sm text-gray-600">
                            The AI Copilot provided an initial answer based on company knowledge. 
                            Now humans can add more perspectives.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Current Status */}
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🌱</span>
                        <div>
                          <p className="text-sm text-gray-900">Current Stage: Sprout</p>
                          <p className="text-xs text-gray-600">
                            {question.answers.length} answer{question.answers.length !== 1 ? 's' : ''} (AI + Human)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplet className="size-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Needs more water</span>
                      </div>
                    </div>

                    {/* AI Answer Preview */}
                    <div className="border-l-4 border-purple-400 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="size-4 text-purple-600" />
                        <span className="text-sm text-gray-700">AI Copilot's Answer:</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {question.answers[0]?.text || 'AI answer pending...'}
                      </p>
                    </div>

                    {/* Call to Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-900">Help this seed grow</p>
                        <p className="text-xs text-gray-600">Share your expertise and add another answer</p>
                      </div>
                      <Button
                        onClick={() => handleViewQuestion(question.id)}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
                      >
                        <Droplet className="mr-2 size-4" />
                        Water the Seed
                        <ArrowRight className="ml-2 size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="size-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bell className="size-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 mb-1">No other notifications</p>
                    <p className="text-sm text-gray-600">You're all caught up!</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <button
              onClick={() => navigateTo('my-garden')}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-green-300 hover:shadow-md transition-all text-center"
            >
              <div className="size-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sprout className="size-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-900">My Garden</p>
            </button>

            <button
              onClick={() => navigateTo('company-forest')}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-green-300 hover:shadow-md transition-all text-center"
            >
              <div className="size-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sprout className="size-6 text-purple-600" />
              </div>
              <p className="text-sm text-gray-900">Company Forest</p>
            </button>

            <button
              onClick={() => navigateTo('ai-insights')}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-purple-300 hover:shadow-md transition-all text-center"
            >
              <div className="size-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="size-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-900">AI Insights</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}