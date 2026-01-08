import { useState } from 'react';
import { Menu, User, Bell } from 'lucide-react';
import { NavigationMenu } from './NavigationMenu';
import type { Screen, Question, Answer } from '../App';

interface DualScreenLayoutProps {
  samScreen: Screen;
  maxScreen: Screen;
  questions: Question[];
  addQuestion: (question: Question) => void;
  addAnswer: (questionId: string, answer: Answer) => void;
  navigateToSam: (screen: Screen) => void;
  navigateToMax: (screen: Screen) => void;
  renderSamScreen: () => React.ReactNode;
  renderMaxScreen: () => React.ReactNode;
}

export function DualScreenLayout({
  samScreen,
  maxScreen,
  questions,
  navigateToSam,
  navigateToMax,
  renderSamScreen,
  renderMaxScreen,
}: DualScreenLayoutProps) {
  const [samMenuOpen, setSamMenuOpen] = useState(false);
  const [maxMenuOpen, setMaxMenuOpen] = useState(false);

  // Get unread notifications for Max (questions from Sam)
  const maxNotifications = questions.filter(q => q.askedBy === 'sam' && q.answers.length === 0).length;

  return (
    <div className="h-screen flex">
      {/* SAM'S SCREEN (LEFT) */}
      <div className="w-1/2 border-r-4 border-gray-300 relative flex flex-col">
        {/* Sam's Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg z-10">
          <div className="flex items-center gap-3">
            <div className="size-12 bg-white rounded-full flex items-center justify-center">
              <User className="size-7 text-gray-800" />
            </div>
            <div>
              <h2 className="text-white">Sam's Screen</h2>
              <p className="text-xs text-gray-300">Question Asker</p>
            </div>
          </div>
          <button
            onClick={() => setSamMenuOpen(true)}
            className="size-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
          >
            <Menu className="size-6 text-white" />
          </button>
        </div>

        {/* Sam's Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {renderSamScreen()}
        </div>

        {/* Sam's Navigation Menu */}
        <NavigationMenu
          isOpen={samMenuOpen}
          onClose={() => setSamMenuOpen(false)}
          navigateTo={navigateToSam}
          currentScreen={samScreen}
          currentUser="samin"
        />
      </div>

      {/* MAX'S SCREEN (RIGHT) */}
      <div className="w-1/2 relative flex flex-col">
        {/* Max's Header */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-4 flex items-center justify-between shadow-lg z-10">
          <div className="flex items-center gap-3">
            <div className="size-12 bg-white rounded-full flex items-center justify-center">
              <User className="size-7 text-gray-700" />
            </div>
            <div>
              <h2 className="text-white">Max's Screen</h2>
              <p className="text-xs text-gray-300">Question Answerer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification Badge */}
            <button
              onClick={() => navigateToMax('notification')}
              className="relative size-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
            >
              <Bell className="size-6 text-white" />
              {maxNotifications > 0 && (
                <span className="absolute -top-1 -right-1 size-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {maxNotifications}
                </span>
              )}
            </button>
            <button
              onClick={() => setMaxMenuOpen(true)}
              className="size-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
            >
              <Menu className="size-6 text-white" />
            </button>
          </div>
        </div>

        {/* Max's Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {renderMaxScreen()}
        </div>

        {/* Max's Navigation Menu */}
        <NavigationMenu
          isOpen={maxMenuOpen}
          onClose={() => setMaxMenuOpen(false)}
          navigateTo={navigateToMax}
          currentScreen={maxScreen}
          currentUser="john"
        />
      </div>

      {/* Divider Label */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full px-6 py-3 shadow-xl border-4 border-gray-300 z-20 pointer-events-none">
        <p className="font-semibold text-gray-900 text-center">
          🌱 GrowthPilot Demo 🌱
        </p>
        <p className="text-xs text-gray-600 text-center">
          Sam Asks → Max Answers → Plant Grows
        </p>
      </div>
    </div>
  );
}