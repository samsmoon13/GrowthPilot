import { Sprout, MessageSquarePlus, TreeDeciduous, Building2, Sparkles, Network, Bell, User, Droplet, Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import logoImage from 'figma:asset/26f77b31633d6e8f651ea4a90982052eaca4f33a.png';

interface HomeScreenProps {
  navigateTo: (screen: string) => void;
  currentUser: 'samin' | 'john';
}

export function HomeScreen({ navigateTo, currentUser }: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState<'feed' | 'forest'>('feed');
  
  // Mock data for "New Seeds Need Water" feed
  const newSeeds = [
    {
      id: '1',
      department: 'Engineering',
      departmentColor: '#3B82F6',
      seedIcon: '🥜',
      question: 'How do we implement OAuth 2.0 authentication in our React app?',
      askedBy: 'Sarah Chen',
      time: '5 minutes ago',
      answers: 0
    },
    {
      id: '2',
      department: 'Design',
      departmentColor: '#06B6D4',
      seedIcon: '💧',
      question: "What's the best way to structure our design system documentation?",
      askedBy: 'Marcus Johnson',
      time: '23 minutes ago',
      answers: 1
    },
    {
      id: '3',
      department: 'Marketing',
      departmentColor: '#EC4899',
      seedIcon: '🌸',
      question: 'How should we approach international market expansion?',
      askedBy: 'Emily Rodriguez',
      time: '1 hour ago',
      answers: 2
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white">
                <img src={logoImage} alt="GrowthPilot" className="w-full h-full object-contain" />
              </div>
              <span className="text-gray-900">GrowthPilot</span>
            </div>

            {/* Main Navigation */}
            <nav className="flex items-center gap-1">
              <button
                onClick={() => navigateTo('ask')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Ask Question</span>
              </button>
              <button
                onClick={() => setActiveTab('forest')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'forest'
                    ? 'text-gray-900 bg-gray-100'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <TreeDeciduous className="w-4 h-4" />
                <span>My Forest</span>
              </button>
              <button
                onClick={() => navigateTo('company-garden')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Building2 className="w-4 h-4" />
                <span>Company Garden</span>
              </button>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => navigateTo('profile')}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm">{currentUser === 'samin' ? 'S' : 'J'}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'feed' ? (
          /* New Seeds Need Water Feed */
          <div>
            <div className="mb-6">
              <h2 className="text-gray-900 mb-2">New Seeds Need Water</h2>
              <p className="text-gray-600">Help your colleagues by answering their questions</p>
            </div>

            <div className="space-y-4">
              {newSeeds.map((seed) => (
                <Card key={seed.id} className="p-6 bg-white border-gray-200 hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-4">
                    {/* Seed Icon */}
                    <div className="text-5xl flex-shrink-0">
                      {seed.seedIcon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: `${seed.departmentColor}15`,
                            color: seed.departmentColor 
                          }}
                        >
                          {seed.department}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {seed.time}
                        </span>
                      </div>
                      
                      <h3 className="text-gray-900 mb-2">{seed.question}</h3>
                      
                      <p className="text-sm text-gray-600 mb-4">Asked by {seed.askedBy}</p>

                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => navigateTo('answer-question')}
                          className="bg-gray-900 hover:bg-black text-white rounded-lg"
                        >
                          <Droplet className="w-4 h-4 mr-2" />
                          Water the Seed (Answer)
                        </Button>
                        {seed.answers > 0 && (
                          <span className="text-sm text-gray-600">
                            {seed.answers} answer{seed.answers !== 1 ? 's' : ''} already
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <Card className="p-4 bg-white border-gray-200 text-center">
                <p className="text-2xl text-gray-900 mb-1">12</p>
                <p className="text-sm text-gray-600">Seeds Planted</p>
              </Card>
              <Card className="p-4 bg-white border-gray-200 text-center">
                <p className="text-2xl text-gray-900 mb-1">8</p>
                <p className="text-sm text-gray-600">Trees Grown</p>
              </Card>
              <Card className="p-4 bg-white border-gray-200 text-center">
                <p className="text-2xl text-gray-900 mb-1">47</p>
                <p className="text-sm text-gray-600">Water Drops Given</p>
              </Card>
            </div>
          </div>
        ) : (
          /* My Forest View */
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900 mb-2">My Forest</h2>
                <p className="text-gray-600">Your personal knowledge garden</p>
              </div>
              <Button
                onClick={() => navigateTo('ask')}
                className="bg-gray-900 hover:bg-black text-white"
              >
                <MessageSquarePlus className="w-4 h-4 mr-2" />
                Plant New Seed
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-white border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Grown Trees</p>
                <p className="text-3xl text-gray-900">6</p>
              </Card>
              <Card className="p-6 bg-white border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Currently Growing</p>
                <p className="text-3xl text-gray-900">0</p>
              </Card>
              <Card className="p-6 bg-white border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Total Answers Received</p>
                <p className="text-3xl text-gray-900">47</p>
              </Card>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 mb-6">
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg">
                All
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
                Grown
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
                Growing
              </button>
            </div>

            {/* Tree Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Example Tree Cards */}
              <Card 
                className="overflow-hidden border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
                onClick={() => navigateTo('my-garden')}
              >
                <div className="bg-gray-100 h-48 flex items-end justify-center pb-4">
                  <div className="text-center">
                    <div className="text-6xl mb-2">🌳</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      Engineering
                    </span>
                    <span className="text-xs text-gray-500">Oak</span>
                  </div>
                  <h3 className="text-gray-900 mb-2">How do we implement OAuth 2.0 authentication?</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MessageSquarePlus className="w-4 h-4" />
                      5 answers
                    </span>
                    <span>Dec 18, 2024</span>
                  </div>
                </div>
              </Card>

              <Card 
                className="overflow-hidden border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
                onClick={() => navigateTo('my-garden')}
              >
                <div className="bg-gray-100 h-48 flex items-end justify-center pb-4">
                  <div className="text-center">
                    <div className="text-6xl mb-2">🌲</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full">
                      Design
                    </span>
                    <span className="text-xs text-gray-500">Maple</span>
                  </div>
                  <h3 className="text-gray-900 mb-2">What are the best practices for user onboarding?</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MessageSquarePlus className="w-4 h-4" />
                      8 answers
                    </span>
                    <span>Dec 15, 2024</span>
                  </div>
                </div>
              </Card>

              <Card 
                className="overflow-hidden border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
                onClick={() => navigateTo('my-garden')}
              >
                <div className="bg-gray-100 h-48 flex items-end justify-center pb-4">
                  <div className="text-center">
                    <div className="text-6xl mb-2">🌲</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-pink-100 text-pink-700 rounded-full">
                      Marketing
                    </span>
                    <span className="text-xs text-gray-500">Pine</span>
                  </div>
                  <h3 className="text-gray-900 mb-2">How to optimize our email campaign conversion?</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MessageSquarePlus className="w-4 h-4" />
                      6 answers
                    </span>
                    <span>Dec 20, 2024</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Help Button */}
      <button
        onClick={() => navigateTo('dashboard')}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gray-900 hover:bg-black text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
      >
        <span className="text-xl">?</span>
      </button>
    </div>
  );
}