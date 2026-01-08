import { useEffect, useState } from 'react';
import { Sparkles, TreeDeciduous, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { getDepartmentById } from '../config/departments';
import { DepartmentSeed } from './seeds/SeedIcons';
import type { Screen, Question, Answer } from '../App';

interface AIAnswerScreenProps {
  navigateTo: (screen: Screen) => void;
  currentQuestion: Question | undefined;
  addAnswer: (questionId: string, answer: Answer) => void;
}

export function AIAnswerScreen({ navigateTo, currentQuestion, addAnswer }: AIAnswerScreenProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!currentQuestion) return;

    // Automatically add AI answer if not already added
    if (currentQuestion.answers.length === 0) {
      // Simulate AI generation delay
      const timer1 = setTimeout(() => {
        const aiAnswer: Answer = {
          id: Date.now().toString(),
          text: "Based on company knowledge and past discussions, here are proven strategies that can help. This answer provides initial context and recommendations based on our organizational knowledge base. Additional perspectives from colleagues will help this knowledge grow even further.",
          author: 'AI Copilot',
          isAI: true,
          timestamp: new Date(),
        };

        addAnswer(currentQuestion.id, aiAnswer);
        setIsGenerating(false);
        setShowContent(true);
      }, 2000);

      return () => clearTimeout(timer1);
    } else {
      // AI answer already exists
      setIsGenerating(false);
      setShowContent(true);
    }
  }, [currentQuestion]);

  const handleAddToGarden = () => {
    if (!currentQuestion) return;
    
    // Navigate to garden
    navigateTo('my-garden');
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No question found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-gray-700 rounded-full flex items-center justify-center">
              <Sparkles className="size-6 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900">AI Copilot</h2>
              <p className="text-sm text-gray-600">Generating answer from company knowledge...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {isGenerating ? (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className="size-20 bg-gray-700 rounded-full animate-pulse flex items-center justify-center">
                  <Sparkles className="size-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <div className="size-6 bg-gray-400 rounded-full animate-ping" />
                </div>
              </div>
              <div>
                <h2 className="text-gray-900 mb-2">AI is analyzing your question...</h2>
                <p className="text-gray-600">
                  Searching company knowledge base, past Q&A, and related trees
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <div className="size-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="size-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Title */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full mb-4">
                <Sparkles className="size-5 text-gray-700" />
                <span className="text-gray-900">AI Insight for Your Seed</span>
              </div>
              <h1 className="text-gray-900 mb-2">Answer Generated</h1>
              <p className="text-gray-600">Your question: "{currentQuestion.text}"</p>
            </div>

            {/* Source Tree Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="size-12 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TreeDeciduous className="size-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">Source Tree Found</h3>
                  <p className="text-gray-600 mb-4">
                    This is the closest knowledge tree to your question
                  </p>
                  
                  {/* Tree Visualization */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-center gap-8">
                      <div className="text-center">
                        <div className="size-16 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                          <TreeDeciduous className="size-8 text-white" />
                        </div>
                        <p className="text-sm text-gray-900">Creative Presentations</p>
                        <p className="text-xs text-gray-600">Marketing · 12 answers</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="size-2 bg-gray-500 rounded-full" />
                          <span className="text-sm text-gray-600">AI Answer</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="size-2 bg-gray-400 rounded-full" />
                          <span className="text-sm text-gray-600">11 Human Answers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Generated Answer - NON-GROWTH */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-lg border-2 border-gray-300">
              <div className="flex items-start gap-4">
                <div className="size-12 bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="size-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-gray-900">AI Insight (Non-Growth)</h3>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                      Based on company knowledge
                    </span>
                  </div>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <p>
                      Based on company knowledge and past discussions, here are proven strategies:
                    </p>
                    <ol className="space-y-2 my-3">
                      <li>Use visual storytelling techniques with minimal text and strong imagery</li>
                      <li>Implement the "hook-story-call-to-action" framework</li>
                      <li>Reference our Design System 2.0 for consistent visual templates</li>
                    </ol>
                    <p>
                      The Marketing team's Q3 presentation received 95% positive feedback using these methods. 
                      Consider also reviewing the "Creative Presentations" knowledge tree for more examples.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seed Still in Ground - Waiting for Human Answers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-300">
              <div className="text-center space-y-4">
                <p className="text-gray-900">Your seed is planted and waiting for human answers</p>
                {currentQuestion.department && (() => {
                  const dept = getDepartmentById(currentQuestion.department);
                  if (!dept) return null;
                  return (
                    <div className="flex justify-center">
                      <DepartmentSeed 
                        seedType={dept.seedType}
                        color={dept.color}
                        size={64}
                      />
                    </div>
                  );
                })()}
                <p className="text-sm text-gray-600">
                  When colleagues add their answers, your seed will begin to grow!
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleAddToGarden}
                className="bg-gray-900 hover:bg-black text-white h-12 px-8 rounded-xl"
              >
                Add to My Garden
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
