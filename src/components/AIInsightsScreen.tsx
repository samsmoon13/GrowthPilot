import { Sparkles, TrendingUp, Lightbulb, BookOpen, Target, Menu, Sprout } from 'lucide-react';
import { Button } from './ui/button';
import type { Screen, Question } from '../App';

interface AIInsightsScreenProps {
  navigateTo: (screen: Screen) => void;
  currentUser: 'samin' | 'john';
  questions: Question[];
}

export function AIInsightsScreen({ navigateTo, currentUser, questions }: AIInsightsScreenProps) {
  const userQuestions = questions.filter(q => q.askedBy === currentUser);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateTo('login')}
                className="size-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                <Sparkles className="size-5 text-white" />
              </button>
              <div>
                <h2 className="text-gray-900">AI Copilot Insights</h2>
                <p className="text-sm text-gray-600">
                  Personalized learning recommendations for {currentUser === 'samin' ? 'Samin' : 'John'}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('login')}
              className="size-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Menu className="size-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            <button
              onClick={() => navigateTo('my-garden')}
              className="px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
            >
              My Garden
            </button>
            <button
              onClick={() => navigateTo('company-forest')}
              className="px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
            >
              Company Forest
            </button>
            <button className="px-4 py-3 text-purple-600 border-b-2 border-purple-600">
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
          {/* AI Summary Card */}
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 text-white">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="size-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="size-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white mb-1">Your Learning Path Summary</h2>
                    <p className="text-white/80 text-sm">
                      AI-generated insights based on your activity
                    </p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-white text-sm">Updated today</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <p className="text-4xl text-white mb-2">{userQuestions.length}</p>
                  <p className="text-white/80 text-sm">Questions Asked</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <p className="text-4xl text-white mb-2">
                    {questions.filter(q => q.answers.some(a => a.author === currentUser && !a.isAI)).length}
                  </p>
                  <p className="text-white/80 text-sm">Answers Given</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <p className="text-4xl text-white mb-2">
                    {Array.from(new Set(userQuestions.map(q => q.category))).length}
                  </p>
                  <p className="text-white/80 text-sm">Knowledge Areas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Topic Clusters */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <TrendingUp className="size-6 text-purple-600" />
                <div>
                  <h3 className="text-gray-900">Your Knowledge Clusters</h3>
                  <p className="text-sm text-gray-600">Topics you're most engaged with</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Creativity Cluster */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border-2 border-pink-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">🎨</span>
                        <div>
                          <h4 className="text-gray-900">Creativity</h4>
                          <p className="text-sm text-gray-600">Most active cluster</p>
                        </div>
                      </div>
                      <div className="bg-pink-200 text-pink-900 text-xs px-3 py-1 rounded-full">
                        High Interest
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">Engagement Level</span>
                        <span className="text-gray-900">85%</span>
                      </div>
                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 w-[85%]" />
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-pink-200">
                      <p className="text-sm text-gray-700">
                        Related topics: Design Systems, Presentations, Visual Communication
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical Cluster */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">⚙️</span>
                        <div>
                          <h4 className="text-gray-900">Technical</h4>
                          <p className="text-sm text-gray-600">Growing area</p>
                        </div>
                      </div>
                      <div className="bg-blue-200 text-blue-900 text-xs px-3 py-1 rounded-full">
                        Moderate
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">Engagement Level</span>
                        <span className="text-gray-900">45%</span>
                      </div>
                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-[45%]" />
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <p className="text-sm text-gray-700">
                        Related topics: Code Reviews, Architecture, Best Practices
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Topic Graph Visualization */}
              <div className="mt-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 border border-gray-200">
                <p className="text-sm text-gray-600 text-center mb-6">Topic Connection Map</p>
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="size-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white mb-2 shadow-lg">
                      <span className="text-3xl">🎨</span>
                    </div>
                    <p className="text-sm text-gray-700">Creativity</p>
                  </div>
                  
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300" />
                  
                  <div className="text-center">
                    <div className="size-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white mb-2 shadow-md">
                      <span className="text-2xl">📋</span>
                    </div>
                    <p className="text-sm text-gray-700">Process</p>
                  </div>
                  
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-300 to-cyan-300" />
                  
                  <div className="text-center">
                    <div className="size-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white mb-2 shadow-lg">
                      <span className="text-3xl">⚙️</span>
                    </div>
                    <p className="text-sm text-gray-700">Technical</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Lightbulb className="size-6 text-green-600" />
                <div>
                  <h3 className="text-gray-900">AI Recommendations</h3>
                  <p className="text-sm text-gray-600">Personalized suggestions to accelerate your growth</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Recommendation 1 */}
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                <div className="size-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="size-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">Frequent Creativity Focus</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    You frequently ask creativity questions. Based on patterns, these resources will help:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white px-3 py-1 rounded-full border border-purple-200">
                      📚 Design Systems Guide
                    </span>
                    <span className="text-xs bg-white px-3 py-1 rounded-full border border-purple-200">
                      🎥 Presentation Masterclass
                    </span>
                    <span className="text-xs bg-white px-3 py-1 rounded-full border border-purple-200">
                      ✏️ Visual Storytelling Workshop
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommendation 2 */}
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="size-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="size-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">Expand Technical Knowledge</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Based on your interests, you may benefit from learning:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="size-2 bg-blue-500 rounded-full" />
                      <span className="text-sm text-gray-700">Advanced Code Review Techniques</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-2 bg-blue-500 rounded-full" />
                      <span className="text-sm text-gray-700">System Architecture Patterns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-2 bg-blue-500 rounded-full" />
                      <span className="text-sm text-gray-700">API Design Best Practices</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation 3 */}
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="size-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="size-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">Trending in Your Network</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Your colleagues are growing knowledge in these areas:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <p className="text-sm text-gray-900">Async Communication</p>
                      <p className="text-xs text-gray-600">8 new trees</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <p className="text-sm text-gray-900">Product Strategy</p>
                      <p className="text-xs text-gray-600">6 new trees</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => navigateTo('ask')}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-8"
            >
              <Sprout className="mr-2 size-4" />
              Plant a New Seed
            </Button>
            <Button
              onClick={() => navigateTo('company-forest')}
              variant="outline"
              className="rounded-xl px-8"
            >
              Explore Company Forest
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
