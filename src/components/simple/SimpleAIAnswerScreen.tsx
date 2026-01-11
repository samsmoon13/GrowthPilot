import { useState, useEffect } from 'react';
import { Sparkles, Home as HomeIcon, Trees, TreeDeciduous, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { getDepartmentById } from '../../config/departments';
import { DepartmentGeometricTree } from '../trees/GeometricTrees';
import type { Screen, Question } from '../../App';

interface SimpleAIAnswerScreenProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  canGoBack: boolean;
  currentUser: string;
  currentQuestion: Question | undefined;
  notifications: Record<string, any[]>;
  questions: Question[];
  setCurrentQuestionId: (id: string) => void;
  setCurrentUser: (user: string) => void;
  setNotifications: (notifications: Record<string, any[]>) => void;
}

export function SimpleAIAnswerScreen({
  navigateTo,
  goBack,
  canGoBack,
  currentUser,
  currentQuestion,
  notifications,
  questions,
  setCurrentQuestionId,
  setCurrentUser,
  setNotifications,
}: SimpleAIAnswerScreenProps) {
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
        <p className="text-gray-600">No question found</p>
      </div>
    );
  }

  // Auto-advance to My Garden after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigateTo('my-garden');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigateTo]);

  const aiAnswer = currentQuestion.answers.find(a => a.isAI);
  const dept = getDepartmentById(currentQuestion.department);

  // Find related questions from the same department with growth level > 0
  const relatedTrees = questions
    .filter(q => 
      q.id !== currentQuestion.id && 
      q.department === currentQuestion.department && 
      q.growthLevel > 0
    )
    .sort((a, b) => b.growthLevel - a.growthLevel)
    .slice(0, 3); // Show top 3 related trees

  const handleTreeClick = (questionId: string) => {
    setCurrentQuestionId(questionId);
    navigateTo('answer-question');
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] relative" style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <SimpleNav currentScreen="my-garden" navigateTo={navigateTo} currentUser={currentUser} notifications={notifications} setCurrentUser={setCurrentUser} setCurrentQuestionId={setCurrentQuestionId} setNotifications={setNotifications} goBack={goBack} canGoBack={canGoBack} />
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        {isGenerating ? (
          <div className="text-center space-y-8 py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-full animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900 mb-2">AI is analyzing your question...</h2>
              <p className="text-gray-600">Searching company knowledge base</p>
            </div>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Title */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-5 h-5 text-gray-700" />
                <span className="text-gray-900 text-sm">AI Insight for Your Question</span>
              </div>
              <h1 className="text-gray-900 mb-2">Answer Generated</h1>
              <p className="text-gray-600">"{currentQuestion.text}"</p>
            </div>

            {/* AI Answer */}
            <div className="bg-purple-50 rounded-2xl p-8 border-2 border-purple-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-purple-900 mb-3">AI Copilot</h3>
                  <p className="text-sm text-purple-600 mb-3 italic">
                    📄 Based on the documents of the company
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {aiAnswer?.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Related Trees - Reference Section */}
            {relatedTrees.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Trees className="w-5 h-5 text-[#3d2817]" />
                  <h3 className="text-[#3d2817]">🌳 Here are some trees you can refer to</h3>
                </div>
                <div className="space-y-3">
                  {relatedTrees.map((tree) => {
                    const treeDept = getDepartmentById(tree.department);
                    return (
                      <div
                        key={tree.id}
                        onClick={() => handleTreeClick(tree.id)}
                        className="flex items-center gap-4 p-4 bg-[#faf9f7] rounded-xl hover:bg-gray-100 transition-all cursor-pointer border-2 border-transparent hover:border-[rgb(213,192,93)] hover:scale-102"
                      >
                        <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                          <DepartmentGeometricTree
                            department={tree.department}
                            color={treeDept?.color || '#10b981'}
                            size={60}
                            growthLevel={tree.growthLevel}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-[#3d2817] mb-1">{tree.text}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span
                              className="px-2 py-0.5 rounded-full text-xs"
                              style={{ backgroundColor: treeDept?.color + '20', color: treeDept?.color }}
                            >
                              {treeDept?.name}
                            </span>
                            <span>•</span>
                            <span>Level {tree.growthLevel}/10</span>
                            <span>•</span>
                            <span>{tree.answers.filter(a => !a.isAI).length} answers</span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Note */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
              <p className="text-gray-600 text-sm">
                AI cannot grow seeds. Only people can. 🌱
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Share your question with colleagues to help it grow into a tree
              </p>
            </div>

            {/* Action */}
            <div className="flex justify-center">
              <Button
                onClick={() => navigateTo('my-garden')}
                className="bg-gray-900 hover:bg-black text-white h-12 px-8 rounded-xl"
              >
                View in My Garden
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
      <SimpleFooter />
    </div>
  );
}