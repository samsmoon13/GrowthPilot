import { MessageSquarePlus, TreeDeciduous, Building2, Sparkles, TrendingUp, Users, Bell, ChevronRight, Droplet, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { DepartmentTree } from './trees/TreeIcons';
import { DepartmentSeed } from './seeds/SeedIcons';
import logoImage from 'figma:asset/26f77b31633d6e8f651ea4a90982052eaca4f33a.png';
import type { Screen, Question } from '../App';

interface DashboardScreenProps {
  navigateTo: (screen: Screen) => void;
  currentUser: 'samin' | 'john';
  questions: Question[];
}

export function DashboardScreen({ navigateTo, currentUser, questions }: DashboardScreenProps) {
  const userName = currentUser === 'samin' ? 'Samin' : 'John';
  
  // Mock data for dashboard
  const stats = {
    mySeeds: 3,
    myTrees: 5,
    waterDrops: 12,
    companyTrees: 24,
  };

  const recentActivity = [
    { 
      id: '1', 
      type: 'answer', 
      user: 'John D.', 
      action: 'watered your seed',
      question: 'How to improve team presentations?',
      time: '2 hours ago',
      department: 'creativity'
    },
    { 
      id: '2', 
      type: 'growth', 
      user: 'System', 
      action: 'Your seed grew into a tree',
      question: 'Best practices for API design?',
      time: '5 hours ago',
      department: 'tech'
    },
    { 
      id: '3', 
      type: 'new', 
      user: 'Alice M.', 
      action: 'planted a new seed',
      question: 'Code review checklist recommendations?',
      time: '1 day ago',
      department: 'coding'
    },
  ];

  const quickActions = [
    {
      title: 'Plant a Seed',
      description: 'Ask a question to grow knowledge',
      icon: MessageSquarePlus,
      color: 'bg-gray-700',
      hoverColor: 'hover:bg-gray-800',
      screen: 'ask' as Screen,
    },
    {
      title: 'My Garden',
      description: 'View your knowledge trees',
      icon: TreeDeciduous,
      color: 'bg-gray-600',
      hoverColor: 'hover:bg-gray-700',
      screen: 'my-garden' as Screen,
    },
    {
      title: 'Company Garden',
      description: 'Explore all departments',
      icon: Building2,
      color: 'bg-gray-500',
      hoverColor: 'hover:bg-gray-600',
      screen: 'company-garden' as Screen,
    },
    {
      title: 'AI Insights',
      description: 'View knowledge analytics',
      icon: Sparkles,
      color: 'bg-gray-800',
      hoverColor: 'hover:bg-gray-900',
      screen: 'ai-insights' as Screen,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white">
                <img src={logoImage} alt="GrowthPilot" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-gray-900">GrowthPilot</h1>
                <p className="text-gray-500 text-sm">Grow knowledge together</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigateTo('home')}
                className="text-gray-600 hover:text-gray-900"
              >
                <Home className="w-5 h-5 mr-2" />
                Demo Hub
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigateTo('notification')}
                className="relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <button
                onClick={() => navigateTo('profile')}
                className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              >
                <div className="text-right">
                  <p className="text-sm text-gray-500">Welcome back,</p>
                  <p className="text-gray-900">{userName}</p>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span>{userName[0]}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">Welcome back, {userName}! 👋</h2>
          <p className="text-gray-600">Ready to grow some knowledge today?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <MessageSquarePlus className="w-6 h-6 text-gray-700" />
              </div>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm mb-1">My Seeds</p>
            <p className="text-gray-900">{stats.mySeeds}</p>
          </Card>

          <Card className="p-6 bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <TreeDeciduous className="w-6 h-6 text-gray-700" />
              </div>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm mb-1">My Trees</p>
            <p className="text-gray-900">{stats.myTrees}</p>
          </Card>

          <Card className="p-6 bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Droplet className="w-6 h-6 text-gray-700" />
              </div>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm mb-1">Water Drops Given</p>
            <p className="text-gray-900">{stats.waterDrops}</p>
          </Card>

          <Card className="p-6 bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-gray-700" />
              </div>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm mb-1">Company Trees</p>
            <p className="text-gray-900">{stats.companyTrees}</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => navigateTo(action.screen)}
                  className="text-left"
                >
                  <Card className="p-6 bg-white border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all h-full">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-gray-900 mb-2">{action.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{action.description}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <span>Get started</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Recent Activity</h3>
              <Button 
                variant="ghost" 
                onClick={() => navigateTo('notification')}
              >
                View all
              </Button>
            </div>
            <Card className="bg-white border-gray-200">
              <div className="divide-y divide-gray-100">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {activity.type === 'answer' && (
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-gray-600" />
                          </div>
                        )}
                        {activity.type === 'growth' && (
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <TreeDeciduous className="w-5 h-5 text-gray-600" />
                          </div>
                        )}
                        {activity.type === 'new' && (
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <MessageSquarePlus className="w-5 h-5 text-gray-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900">
                          <span>{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-gray-600 text-sm mt-1 truncate">
                          {activity.question}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {activity.department}
                          </Badge>
                          <span className="text-gray-400 text-xs">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Growing Now */}
          <div>
            <h3 className="text-gray-900 mb-4">Growing Now</h3>
            <Card className="bg-white border-gray-200 p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <DepartmentTree department="creativity" stage="young" className="w-24 h-24" />
                  </div>
                  <h4 className="text-gray-900 mb-2">Presentation Tips</h4>
                  <p className="text-gray-600 text-sm mb-3">3 answers • 2 more needed for full tree</p>
                  <Button 
                    onClick={() => navigateTo('my-garden')}
                    variant="outline" 
                    className="w-full"
                  >
                    View in Garden
                  </Button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-500 text-sm mb-3">Seeds waiting for water</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <DepartmentSeed department="tech" className="w-8 h-8" />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 text-sm truncate">API Design</p>
                        <p className="text-gray-500 text-xs">1 answer</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <DepartmentSeed department="coding" className="w-8 h-8" />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 text-sm truncate">Code Reviews</p>
                        <p className="text-gray-500 text-xs">1 answer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Helpful Tip */}
            <Card className="bg-gray-100 border-gray-200 p-6 mt-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-gray-700 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-900 mb-1">💡 Tip of the day</p>
                  <p className="text-sm text-gray-700">
                    AI provides instant insights, but only human answers produce water drops and help seeds grow into trees!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}