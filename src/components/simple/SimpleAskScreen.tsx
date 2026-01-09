import { useState, useEffect } from 'react';
import { Sprout, Send, Sparkles, ArrowRight, Trees, TreeDeciduous } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { DepartmentSeed } from '../seeds/SeedIcons';
import { DepartmentGeometricTree } from '../trees/GeometricTrees';
import { departments, getDepartmentById } from '../../config/departments';
import type { Screen, Question, Answer, Notification } from '../../App';
import { USERS } from '../../App';

interface SimpleAskScreenProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  canGoBack: boolean;
  currentUser: string;
  addQuestion: (question: Question) => void;
  notifications: Record<string, Notification[]>;
  setNotifications: (notifications: Record<string, Notification[]>) => void;
  questions: Question[];
  setCurrentQuestionId: (id: string) => void;
  setCurrentUser: (user: string) => void;
}

export function SimpleAskScreen({ navigateTo, goBack, canGoBack, currentUser, addQuestion, notifications, setNotifications, questions, setCurrentQuestionId, setCurrentUser }: SimpleAskScreenProps) {
  const [questionText, setQuestionText] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('creativity');
  const [showAIPreview, setShowAIPreview] = useState(false);
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentNewQuestion, setCurrentNewQuestion] = useState<Question | null>(null);
  const [pendingQuestion, setPendingQuestion] = useState<Question | null>(null);

  const handleSubmit = () => {
    if (!questionText.trim()) return;

    // Show generating animation
    setIsGenerating(true);

    const newQuestion: Question = {
      id: Date.now().toString(),
      text: questionText,
      department: selectedDepartment,
      askedBy: currentUser,
      answers: [],
      growthLevel: 0,
    };

    // Add AI answer immediately
    const aiAnswer: Answer = {
      id: `${newQuestion.id}-ai`,
      text: `Based on the company documents and internal knowledge base, here are some insights that can help answer your question. This response has been generated from analyzing past discussions, best practices, and organizational documentation related to "${questionText}". Remember, AI provides initial guidance but human expertise is needed to grow the knowledge tree!`,
      author: 'AI Copilot',
      isAI: true,
      timestamp: new Date(),
    };

    newQuestion.answers.push(aiAnswer);
    setPendingQuestion(newQuestion);

    // Simulate AI generation time
    setTimeout(() => {
      setIsGenerating(false);
      setShowAIPreview(true);
    }, 2000);
  };

  const handleConfirmPlant = () => {
    if (!pendingQuestion) return;

    // Now actually add the question
    addQuestion(pendingQuestion);
    setCurrentQuestionId(pendingQuestion.id);
    setCurrentNewQuestion(pendingQuestion);

    // Create notifications for all users in this department (except the asker)
    const newNotifications = { ...notifications };
    Object.entries(USERS).forEach(([userName, user]) => {
      if (userName !== currentUser && user.departments.includes(selectedDepartment)) {
        const notification: Notification = {
          id: `${pendingQuestion.id}-${userName}`,
          type: 'new-question',
          questionId: pendingQuestion.id,
          questionText: pendingQuestion.text,
          department: selectedDepartment,
          from: currentUser,
          timestamp: new Date(),
          read: false,
        };
        newNotifications[userName] = [...(newNotifications[userName] || []), notification];
      }
    });
    setNotifications(newNotifications);

    // Show the success state
    setShowAIPreview(false);
    setShowAIResponse(true);
  };

  const handleCancelPlant = () => {
    // Go back to the form
    setShowAIPreview(false);
    setPendingQuestion(null);
    setQuestionText('');
  };

  const handleViewInGarden = () => {
    navigateTo('my-garden');
  };

  const handleTreeClick = (questionId: string) => {
    setCurrentQuestionId(questionId);
    navigateTo('answer-question');
  };

  // Find related trees
  const relatedTrees = currentNewQuestion
    ? questions
        .filter(q => 
          q.id !== currentNewQuestion.id && 
          q.department === currentNewQuestion.department && 
          q.growthLevel > 0
        )
        .sort((a, b) => b.growthLevel - a.growthLevel)
        .slice(0, 3)
    : [];

  // Find related trees for preview
  const relatedTreesPreview = pendingQuestion
    ? questions
        .filter(q => 
          q.department === pendingQuestion.department && 
          q.growthLevel > 0
        )
        .sort((a, b) => b.growthLevel - a.growthLevel)
        .slice(0, 3)
    : [];

  const aiAnswer = currentNewQuestion?.answers.find(a => a.isAI);

  return (
    <div className="min-h-screen bg-[#faf9f7] relative" style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <SimpleNav currentScreen="my-garden" navigateTo={navigateTo} currentUser={currentUser} notifications={notifications} setCurrentUser={setCurrentUser} goBack={goBack} canGoBack={canGoBack} />
      
      <div className="max-w-2xl mx-auto px-6 py-12">
        {!showAIResponse && !isGenerating && !showAIPreview && (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Sprout className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-gray-900 mb-2">Plant a Seed</h1>
              <p className="text-gray-600">Ask a question and watch knowledge grow</p>
            </div>

            {/* Form */}
            <div className="space-y-8">
              {/* Question input */}
              <div>
                <label className="block text-gray-900 mb-3">Your Question</label>
                <Textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="What would you like to know?"
                  className="min-h-32 resize-none rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                />
              </div>

              {/* Department selection */}
              <div>
                <label className="block text-gray-900 mb-3">Select Department (Seed Type)</label>
                <div className="grid grid-cols-5 gap-4">
                  {departments.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => setSelectedDepartment(dept.id)}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                        selectedDepartment === dept.id
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <DepartmentSeed 
                        seedType={dept.seedType}
                        color={dept.color}
                        size={48}
                      />
                      <span className="text-xs text-gray-700 mt-2">{dept.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit button */}
              <Button
                onClick={handleSubmit}
                disabled={!questionText.trim()}
                className="w-full bg-[rgb(213,192,93)] hover:bg-[rgb(193,172,73)] text-white h-14 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="mr-2 w-5 h-5" />
                Plant Seed
              </Button>
            </div>
          </>
        )}

        {/* AI Generating Animation */}
        {isGenerating && (
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
        )}

        {/* AI Preview Section */}
        {showAIPreview && pendingQuestion && (
          <div className="space-y-8">
            {/* Title */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-5 h-5 text-gray-700" />
                <span className="text-gray-900 text-sm">AI Insight for Your Question</span>
              </div>
              <h1 className="text-gray-900 mb-2">Answer Generated</h1>
              <p className="text-gray-600">"{pendingQuestion.text}"</p>
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
                    {pendingQuestion.answers.find(a => a.isAI)?.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Related Trees - Reference Section */}
            {relatedTreesPreview.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Trees className="w-5 h-5 text-[#3d2817]" />
                  <h3 className="text-[#3d2817]">🌳 Here are some trees you can refer to</h3>
                </div>
                <div className="space-y-3">
                  {relatedTreesPreview.map((tree) => {
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

            {/* Confirmation Section */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-900 text-center">
              <div className="mb-6">
                <h2 className="text-gray-900 mb-2">Do you still want to plant the seed?</h2>
                <p className="text-gray-600 text-sm">
                  AI has provided an initial answer. If you're satisfied, you might not need to plant a seed.<br/>
                  Plant the seed only if you need additional human expertise and insights.
                </p>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleConfirmPlant}
                  className="bg-[rgb(213,192,93)] hover:bg-[rgb(193,172,73)] text-white h-12 px-8 rounded-xl"
                >
                  <Sprout className="mr-2 w-5 h-5" />
                  Yes, Plant Seed
                </Button>
                <Button
                  onClick={handleCancelPlant}
                  variant="outline"
                  className="border-2 border-gray-300 hover:bg-gray-100 text-gray-700 h-12 px-8 rounded-xl"
                >
                  No, I'm Satisfied
                </Button>
              </div>
            </div>

            {/* Note */}
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-gray-600 text-xs">
                💡 Remember: AI provides insights but only human answers grow the tree. Each human answer adds a water drop! 🌱
              </p>
            </div>
          </div>
        )}

        {/* AI Response Section */}
        {showAIResponse && currentNewQuestion && (
          <div className="space-y-8">
            {/* Title */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-5 h-5 text-gray-700" />
                <span className="text-gray-900 text-sm">AI Insight for Your Question</span>
              </div>
              <h1 className="text-gray-900 mb-2">Answer Generated</h1>
              <p className="text-gray-600">"{currentNewQuestion.text}"</p>
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
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 text-center">
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
                onClick={handleViewInGarden}
                className="bg-[rgb(213,192,93)] hover:bg-[rgb(193,172,73)] text-white h-12 px-8 rounded-xl"
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