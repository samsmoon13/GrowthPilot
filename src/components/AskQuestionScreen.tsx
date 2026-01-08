import { useState } from 'react';
import { ArrowLeft, Sparkles, Sprout } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { departments } from '../config/departments';
import { DepartmentSeed } from './seeds/SeedIcons';
import type { Screen, Question } from '../App';

interface AskQuestionScreenProps {
  navigateTo: (screen: Screen) => void;
  currentUser: 'samin' | 'john';
  addQuestion: (question: Question) => void;
}

export function AskQuestionScreen({ navigateTo, currentUser, addQuestion }: AskQuestionScreenProps) {
  const [questionText, setQuestionText] = useState('');
  const [department, setDepartment] = useState('creativity');
  const [showAnimation, setShowAnimation] = useState(false);

  const selectedDept = departments.find(d => d.id === department);

  const handlePlantSeed = () => {
    if (!questionText.trim()) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      text: questionText,
      category: department,
      department: department,
      askedBy: currentUser === 'samin' ? 'sam' : 'max',
      answers: [],
      growthLevel: 0, // Start at level 0 (seed)
    };

    addQuestion(newQuestion);
    setShowAnimation(true);

    // Show seed animation then navigate
    setTimeout(() => {
      navigateTo('ai-answer');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigateTo('login')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="size-5" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <Sprout className="size-6 text-gray-700" />
            <span className="text-gray-900">GrowthPilot</span>
          </div>
          <div className="w-20" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center size-20 bg-gray-200 rounded-full mb-4">
            <Sprout className="size-10 text-gray-700" />
          </div>
          <h1 className="text-gray-900 mb-2">Plant a Seed</h1>
          <p className="text-gray-600">
            Ask a question and watch it grow into knowledge
          </p>
        </div>

        {showAnimation ? (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
            <div className="space-y-6">
              <div className="relative inline-block">
                <div className="animate-bounce">
                  <div className="size-16 bg-gray-700 rounded-full opacity-80" />
                </div>
                <div className="absolute top-20 left-1/2 -translate-x-1/2">
                  <div className="w-32 h-2 bg-gradient-to-r from-transparent via-gray-800 to-transparent rounded-full animate-pulse" />
                </div>
              </div>
              <p className="text-gray-600">Planting your seed...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 space-y-6">
            {/* Question Input */}
            <div className="space-y-2">
              <label className="text-gray-700">
                Your Question
              </label>
              <Textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Type your question…"
                className="min-h-32 resize-none rounded-xl border-gray-200 focus:border-gray-500 focus:ring-gray-500"
              />
              <p className="text-sm text-gray-500">
                Example: "How can I improve creativity workflow presentations?"
              </p>
            </div>

            {/* Category Selector */}
            <div className="space-y-2">
              <label className="text-gray-700">
                Department
              </label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="rounded-xl border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      <span style={{ color: dept.color }}>●</span> {dept.name} - {dept.treeSpecies} tree
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedDept && (
                <p className="text-sm text-gray-500">
                  {selectedDept.description}
                </p>
              )}
            </div>

            {/* Visual Preview */}
            <div className="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-300">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center space-y-2">
                  {selectedDept && (
                    <div className="mx-auto flex items-center justify-center">
                      <DepartmentSeed 
                        seedType={selectedDept.seedType}
                        color={selectedDept.color}
                        size={48}
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-600">
                    Your {selectedDept?.name} seed will be planted here
                  </p>
                  <p className="text-sm" style={{ color: selectedDept?.color }}>
                    Will grow into a {selectedDept?.treeSpecies} tree
                  </p>
                </div>
              </div>
            </div>

            {/* AI Badge */}
            <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <Sparkles className="size-5 text-gray-700 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm text-gray-900">AI will provide the first answer</p>
                  <p className="text-sm text-gray-600">
                    After you plant your seed, our AI will immediately analyze company knowledge to provide an initial answer
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={handlePlantSeed}
              disabled={!questionText.trim()}
              className="w-full bg-gray-900 hover:bg-black text-white h-12 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sprout className="mr-2 size-5" />
              Plant Seed
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}