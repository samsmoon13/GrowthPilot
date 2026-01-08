import { Sparkles, CheckCircle, AlertCircle, Lightbulb, BookOpen, ArrowLeft, ThumbsUp } from 'lucide-react';
import { Button } from './ui/button';
import type { Screen, Question } from '../App';

interface AIFeedbackScreenProps {
  navigateTo: (screen: Screen) => void;
  currentQuestion: Question | undefined;
}

export function AIFeedbackScreen({ navigateTo, currentQuestion }: AIFeedbackScreenProps) {
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No question found</p>
      </div>
    );
  }

  const userAnswer = currentQuestion.answers.find(a => !a.isAI && a.author === 'john');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateTo('my-garden')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="size-5" />
              Back to Garden
            </button>
            <div className="flex items-center gap-2">
              <div className="size-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="size-5 text-white" />
              </div>
              <span className="text-gray-900">AI Copilot Feedback</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {/* Header Card */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center size-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4 shadow-lg">
              <Sparkles className="size-10 text-white" />
            </div>
            <h1 className="text-gray-900 mb-2">AI Feedback on Your Answer</h1>
            <p className="text-gray-600">
              Helping you improve your knowledge sharing
            </p>
          </div>

          {/* Your Answer */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 px-6 py-4 border-b border-gray-200">
              <h3 className="text-gray-900">Your Answer</h3>
              <p className="text-sm text-gray-600">Question: {currentQuestion.text}</p>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                {userAnswer?.text || 'Your answer goes here...'}
              </p>
            </div>
          </div>

          {/* Quality Score */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white mb-2">Quality Score</h2>
                  <p className="text-white/80">Your answer is helpful and accurate</p>
                </div>
                <div className="text-center">
                  <div className="size-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
                    <span className="text-4xl text-white">85</span>
                  </div>
                  <p className="text-white/80 text-sm">out of 100</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="size-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="size-5 text-white" />
                  </div>
                  <p className="text-white mb-1">90%</p>
                  <p className="text-white/70 text-sm">Accuracy</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="size-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Lightbulb className="size-5 text-white" />
                  </div>
                  <p className="text-white mb-1">85%</p>
                  <p className="text-white/70 text-sm">Clarity</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="size-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="size-5 text-white" />
                  </div>
                  <p className="text-white mb-1">80%</p>
                  <p className="text-white/70 text-sm">Depth</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="size-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <ThumbsUp className="size-5 text-white" />
                  </div>
                  <p className="text-white mb-1">85%</p>
                  <p className="text-white/70 text-sm">Helpfulness</p>
                </div>
              </div>
            </div>
          </div>

          {/* What's Good */}
          <div className="bg-white rounded-2xl shadow-lg border border-green-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="size-6 text-green-600" />
                <h3 className="text-gray-900">What's Working Well</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="size-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600">✓</span>
                </div>
                <div>
                  <p className="text-gray-900 mb-1">Clear and structured</p>
                  <p className="text-sm text-gray-600">
                    Your answer is well-organized with numbered points, making it easy to follow
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="size-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600">✓</span>
                </div>
                <div>
                  <p className="text-gray-900 mb-1">Specific examples included</p>
                  <p className="text-sm text-gray-600">
                    You mentioned the Marketing team's Q3 presentation as a concrete example
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600">✓</span>
                </div>
                <div>
                  <p className="text-gray-900 mb-1">Actionable advice</p>
                  <p className="text-sm text-gray-600">
                    Your suggestions are practical and can be immediately applied
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Suggestions for Improvement */}
          <div className="bg-white rounded-2xl shadow-lg border border-orange-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 px-6 py-4 border-b border-orange-200">
              <div className="flex items-center gap-3">
                <AlertCircle className="size-6 text-orange-600" />
                <h3 className="text-gray-900">Suggestions for Improvement</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="size-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lightbulb className="size-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-900 mb-1">Add more context</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Consider explaining <span className="italic">why</span> these techniques work. For example, "Visual storytelling works because..."
                  </p>
                  <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                    <p className="text-sm text-gray-700">
                      💡 <span className="text-gray-900">Try adding:</span> Research shows that visual storytelling increases retention by 65% compared to text-only presentations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="size-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lightbulb className="size-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-900 mb-1">Include resource links</p>
                  <p className="text-sm text-gray-600">
                    Link to the Design System 2.0 documentation or the actual Q3 presentation for reference
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lightbulb className="size-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-900 mb-1">Address potential challenges</p>
                  <p className="text-sm text-gray-600">
                    Mention common pitfalls or obstacles people might face when implementing these strategies
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-blue-200">
              <div className="flex items-center gap-3">
                <BookOpen className="size-6 text-blue-600" />
                <h3 className="text-gray-900">Related Resources</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                These resources might help you give even better answers in the future:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                  <span className="text-2xl block mb-2">📚</span>
                  <p className="text-sm text-gray-900 mb-1">Effective Communication Guide</p>
                  <p className="text-xs text-gray-600">Internal documentation</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <span className="text-2xl block mb-2">🎨</span>
                  <p className="text-sm text-gray-900 mb-1">Design System 2.0</p>
                  <p className="text-xs text-gray-600">Company resource</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <span className="text-2xl block mb-2">📊</span>
                  <p className="text-sm text-gray-900 mb-1">Presentation Best Practices</p>
                  <p className="text-xs text-gray-600">Knowledge base article</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
                  <span className="text-2xl block mb-2">🎥</span>
                  <p className="text-sm text-gray-900 mb-1">Marketing Q3 Presentation</p>
                  <p className="text-xs text-gray-600">Example case study</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-start gap-4">
              <Sparkles className="size-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-gray-900 mb-2">AI Summary</h4>
                <p className="text-gray-700">
                  <span className="text-gray-900">Your answer is correct and helpful!</span> With a few additions like more context, 
                  resource links, and addressing potential challenges, it could become even more valuable to your colleagues. 
                  Keep up the great work sharing your knowledge!
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => navigateTo('my-garden')}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-8"
            >
              Back to My Garden
            </Button>
            <Button
              onClick={() => navigateTo('ai-insights')}
              variant="outline"
              className="rounded-xl px-8"
            >
              View AI Insights
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
