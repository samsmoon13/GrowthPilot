import { Sprout, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { DepartmentLegend } from './DepartmentLegend';
import type { Screen } from '../App';

interface LoginScreenProps {
  navigateTo: (screen: Screen) => void;
  currentUser: 'samin' | 'john';
}

export function LoginScreen({ navigateTo, currentUser }: LoginScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-8 p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative">
            <Sprout className="size-16 text-gray-700" strokeWidth={1.5} />
            <Sparkles className="size-6 text-gray-600 absolute -top-1 -right-1" />
          </div>
        </div>
        
        {/* App Name */}
        <div className="space-y-2">
          <h1 className="text-gray-900">GrowthPilot</h1>
          <p className="text-gray-600">
            Plant Questions. Grow Knowledge.
          </p>
        </div>

        {/* Welcome Message */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-md">
          <div className="space-y-6">
            <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">👋</span>
            </div>
            
            <div>
              <h2 className="text-gray-900 mb-2">Welcome {currentUser === 'samin' ? 'Samin' : 'John'}</h2>
              <p className="text-gray-600">
                Ready to grow your company's knowledge forest?
              </p>
            </div>

            <Button 
              onClick={() => navigateTo('dashboard')}
              className="w-full bg-gray-900 hover:bg-black text-white h-12 rounded-xl"
            >
              <Sprout className="mr-2 size-5" />
              Enter GrowthPilot
            </Button>

            {/* Quick Links */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => navigateTo('ask')}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                Ask Question
              </button>
              <button
                onClick={() => navigateTo('my-garden')}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                My Garden
              </button>
              <button
                onClick={() => navigateTo('company-forest')}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                Forest
              </button>
              <button
                onClick={() => navigateTo('profile')}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                Profile
              </button>
            </div>
          </div>
        </div>

        {/* Department Legend */}
        <div className="max-w-6xl mx-auto mt-12">
          <DepartmentLegend showDescription={false} />
        </div>

        {/* Demo User Switch */}
        <div className="pt-4">
          <p className="text-sm text-gray-500 mb-3">Demo Mode: Switch User</p>
          <div className="flex gap-2 justify-center">
            <Button
              variant={currentUser === 'samin' ? 'default' : 'outline'}
              onClick={() => {
                if (currentUser !== 'samin') {
                  window.location.reload();
                }
              }}
              className={currentUser === 'samin' ? 'bg-gray-900 hover:bg-black' : ''}
            >
              Samin
            </Button>
            <Button
              variant={currentUser === 'john' ? 'default' : 'outline'}
              onClick={() => navigateTo('notification')}
              className={currentUser === 'john' ? 'bg-gray-900 hover:bg-black' : ''}
            >
              John
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}