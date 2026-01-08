import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Home, 
  Sprout, 
  TreeDeciduous, 
  Building2, 
  Sparkles, 
  Network, 
  User,
  HelpCircle,
  LogOut 
} from 'lucide-react';
import type { Screen } from '../App';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigateTo: (screen: Screen) => void;
  currentScreen: Screen;
  currentUser: 'samin' | 'john';
}

interface MenuItem {
  id: Screen;
  label: string;
  icon: any;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'login',
    label: 'Demo Hub',
    icon: Home,
    description: 'Navigation center for demo recording'
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    description: 'Home dashboard after login'
  },
  {
    id: 'ask',
    label: 'Plant a Seed',
    icon: Sprout,
    description: 'Ask a new question'
  },
  {
    id: 'my-garden',
    label: 'My Garden',
    icon: TreeDeciduous,
    description: 'View your planted seeds and trees'
  },
  {
    id: 'company-forest',
    label: 'Company Forest',
    icon: Building2,
    description: 'Explore all organizational knowledge'
  },
  {
    id: 'company-garden',
    label: 'Company Garden',
    icon: Building2,
    description: 'Department-specific knowledge trees'
  },
  {
    id: 'ai-insights',
    label: 'AI Insights',
    icon: Sparkles,
    description: 'Discover patterns and analytics'
  },
  {
    id: 'knowledge-graph',
    label: 'Knowledge Graph',
    icon: Network,
    description: 'Interactive knowledge connections'
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    description: 'View your Personal Growth Tree'
  },
];

export function NavigationMenu({ 
  isOpen, 
  onClose, 
  navigateTo, 
  currentScreen,
  currentUser 
}: NavigationMenuProps) {
  const handleNavigate = (screen: Screen) => {
    navigateTo(screen);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-white mb-1">Navigation Menu</h2>
                  <p className="text-white/80 text-sm">
                    Logged in as {currentUser === 'samin' ? 'Samin' : 'John'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="size-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="size-6 text-white" />
                </button>
              </div>

              {/* Current Screen Indicator */}
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-white/70 text-xs mb-1">Current Page</p>
                <p className="text-white">
                  {menuItems.find(item => item.id === currentScreen)?.label || 'Unknown'}
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-6 space-y-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider px-2 mb-3">
                All Pages
              </p>
              
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-start gap-4 p-4 rounded-xl transition-all ${
                      isActive
                        ? 'bg-green-50 border-2 border-green-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className={`size-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive 
                        ? 'bg-green-500'
                        : 'bg-gray-200'
                    }`}>
                      <Icon className={`size-6 ${
                        isActive ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <p className={`text-gray-900 mb-1 ${
                          isActive ? 'font-semibold' : ''
                        }`}>
                          {item.label}
                        </p>
                        {isActive && (
                          <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Additional Options */}
            <div className="border-t border-gray-200 p-6 space-y-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider px-2 mb-3">
                Additional Options
              </p>
              
              <button
                onClick={() => {
                  handleNavigate('login');
                }}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border-2 border-transparent"
              >
                <div className="size-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <HelpCircle className="size-6 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-900 mb-1">Help & Guide</p>
                  <p className="text-sm text-gray-600">Learn how to use GrowthPilot</p>
                </div>
              </button>

              <button
                onClick={() => {
                  handleNavigate('login');
                }}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-red-50 hover:bg-red-100 transition-colors border-2 border-transparent"
              >
                <div className="size-12 bg-red-200 rounded-lg flex items-center justify-center">
                  <LogOut className="size-6 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-900 mb-1">Sign Out</p>
                  <p className="text-sm text-gray-600">Return to login screen</p>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Sprout className="size-6 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-900">GrowthPilot</p>
                  <p className="text-sm text-gray-600">Version 1.0</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                AI provides insights, humans drive growth 🌱
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
