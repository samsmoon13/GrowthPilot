import { Sprout, Leaf } from 'lucide-react';
import { Button } from '../ui/button';
import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import type { Screen, Notification } from '../../App';

interface SimpleHomeScreenProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  canGoBack: boolean;
  currentUser: string;
  notifications: Record<string, Notification[]>;
  setCurrentUser: (user: string) => void;
}

export function SimpleHomeScreen({ navigateTo, goBack, canGoBack, currentUser, notifications, setCurrentUser }: SimpleHomeScreenProps) {
  return (
    <div className="min-h-screen bg-[#faf9f7] relative overflow-hidden flex flex-col" style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <SimpleNav currentScreen="home" navigateTo={navigateTo} currentUser={currentUser} notifications={notifications} setCurrentUser={setCurrentUser} goBack={goBack} canGoBack={canGoBack} />
      
      {/* Center hero so actions fit without scrolling */}
      <div className="max-w-2xl mx-auto px-4 py-8 text-center relative z-10 flex-1 flex flex-col justify-center">
        {/* Colorful plant illustration - More playful! */}
        <div className="mb-6 flex justify-center">
          <div className="relative transform hover:scale-110 transition-transform duration-300">
            <Leaf className="w-44 h-44 text-[rgb(213,192,93)] animate-bounce" style={{ animationDuration: '3s' }} />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/2 -left-4 w-5 h-5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/4 -right-4 w-4 h-4 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#3d2817] mb-4 leading-tight uppercase tracking-tight transform hover:scale-105 transition-transform duration-300">
          Grow Knowledge<br />Together
        </h1>
        <p className="text-lg text-[#3d2817] mb-8 max-w-md mx-auto">
          Plant questions. Nurture answers. Watch your team's knowledge blossom. 🌱
        </p>

        {/* Action buttons - More playful! */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button
            onClick={() => navigateTo('ask')}
            className="bg-[rgb(213,192,93)] hover:bg-[rgb(193,172,73)] text-white h-14 px-12 rounded-full border-4 border-[#3d2817] text-lg font-extrabold uppercase shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 transform hover:-rotate-2"
          >
            <Sprout className="mr-3 w-6 h-6" />
            Plant a Seed
          </Button>
        </div>
      </div>

      <SimpleFooter />
    </div>
  );
}