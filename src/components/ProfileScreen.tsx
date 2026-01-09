import { useState } from 'react';
import { User, Sprout, TreeDeciduous, Droplet, Sparkles, Award, TrendingUp, Target, Menu, Users, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { PersonalTree } from './PersonalTree';
import { PersonalTreeDetail } from './PersonalTreeDetail';
import type { Screen, Question } from '../App';

interface ProfileScreenProps {
  navigateTo: (screen: Screen) => void;
  currentUser: 'samin' | 'john';
  questions: Question[];
  openMenu: () => void;
}

const stageIcons = {
  seed: '🌱',
  sprout: '🌿',
  'small-plant': '🪴',
  'young-tree': '🌳',
  'full-tree': '🌲',
};

export function ProfileScreen({ navigateTo, currentUser, questions, openMenu }: ProfileScreenProps) {
  const [showTreeDetail, setShowTreeDetail] = useState(false);
  
  const userQuestions = questions.filter(q => q.askedBy === currentUser);
  const userAnswers = questions.filter(q => q.answers.some(a => a.author === currentUser && !a.isAI));

  // Calculate Personal Tree stats
  const answersGiven = userAnswers.reduce((acc, q) => {
    return acc + q.answers.filter(a => a.author === currentUser && !a.isAI).length;
  }, 0);

  // Mock data for demonstration
  const colleaguesHelped = currentUser === 'samin' ? 8 : 12;
  const departmentsSupported = currentUser === 'samin' 
    ? ['creativity', 'design', 'management']
    : ['tech', 'coding', 'creativity', 'management'];
  
  const contributions = [
    { id: '1', question: 'How to improve team presentations?', department: 'creativity', timestamp: '2 days ago', value: 'communication' as const },
    { id: '2', question: 'Design system consistency?', department: 'design', timestamp: '5 days ago', value: 'quality' as const },
    { id: '3', question: 'Stakeholder communication tips?', department: 'management', timestamp: '1 week ago', value: 'integrity' as const },
    { id: '4', question: 'Cross-team collaboration?', department: 'creativity', timestamp: '2 weeks ago', value: 'responsibility' as const },
    { id: '5', question: 'Best API design practices?', department: 'tech', timestamp: '3 weeks ago', value: 'quality' as const },
  ];

  // Badges earned
  const badges = [
    { 
      id: '1', 
      name: 'Mentor Leaf', 
      description: 'Helped 5+ colleagues', 
      icon: '🍃',
      earned: colleaguesHelped >= 5,
      color: '#22c55e'
    },
    { 
      id: '2', 
      name: 'Cross-Team Collaborator', 
      description: 'Supported 3+ departments', 
      icon: '🌉',
      earned: departmentsSupported.length >= 3,
      color: '#8b5cf6'
    },
    { 
      id: '3', 
      name: 'Growth Champion', 
      description: 'Answered 10+ questions', 
      icon: '🏆',
      earned: answersGiven >= 10,
      color: '#f59e0b'
    },
    { 
      id: '4', 
      name: 'Knowledge Cultivator', 
      description: 'Planted 3+ seeds', 
      icon: '🌱',
      earned: userQuestions.length >= 3,
      color: '#10b981'
    },
  ];

  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#3d2817] hover:bg-[#3d2817]/5 transition-colors"
              >
                <span className="text-lg font-semibold">Back</span>
              </button>
              <div>
                <h2 className="text-gray-900">Profile</h2>
                <p className="text-sm text-gray-600">
                  {currentUser === 'samin' ? 'Samin' : 'John'}'s knowledge journey
                </p>
              </div>
            </div>

            <button
              onClick={openMenu}
              className="size-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Menu className="size-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-6">
            <button
              onClick={() => navigateTo('my-garden')}
              className="px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
            >
              My Garden
            </button>
            <button
              onClick={() => navigateTo('company-forest')}
              className="px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
            >
              Company Forest
            </button>
            <button
              onClick={() => navigateTo('ai-insights')}
              className="px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
            >
              AI Insights
            </button>
            <button
              onClick={() => navigateTo('knowledge-graph')}
              className="px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
            >
              Knowledge Graph
            </button>
            <button className="px-4 py-3 text-green-600 border-b-2 border-green-600">
              Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-start gap-6">
                <div className="size-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                  <span className="text-5xl">{currentUser === 'samin' ? '👩' : '👨'}</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-white mb-2">{currentUser === 'samin' ? 'Samin' : 'John'}</h1>
                  <p className="text-white/80 mb-4">
                    {currentUser === 'samin' ? 'Creative Lead' : 'Senior Engineer'} • Knowledge Contributor
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <p className="text-white/70 text-sm">Member since</p>
                      <p className="text-white">Jan 2024</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <p className="text-white/70 text-sm">Contribution Score</p>
                      <p className="text-white">850 pts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Sprout className="size-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">{userQuestions.length}</p>
                  <p className="text-sm text-gray-600">Seeds Planted</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Droplet className="size-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">{userAnswers.length}</p>
                  <p className="text-sm text-gray-600">Answers Given</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TreeDeciduous className="size-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">
                    {userQuestions.filter(q => q.stage === 'full-tree').length}
                  </p>
                  <p className="text-sm text-gray-600">Trees Grown</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="size-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">3</p>
                  <p className="text-sm text-gray-600">Achievements</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Growth Tree - PROMINENT PLACEMENT */}
          <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 border-2 border-green-200 shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-gray-900 mb-2">Your Personal Growth Tree</h2>
                <p className="text-gray-600">
                  This tree represents your mentorship, collaboration, and cultural contribution at the company.
                  <br />
                  <span className="text-sm">
                    🌟 <strong>Grows ONLY when you help others</strong> — AI answers don't contribute to your growth!
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-center gap-12">
                {/* Tree Visualization */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setShowTreeDetail(true)}
                    className="hover:scale-105 transition-transform cursor-pointer"
                  >
                    <PersonalTree answersGiven={answersGiven} size={250} />
                  </button>
                </div>

                {/* Stats */}
                <div className="flex-1 space-y-4">
                  <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MessageCircle className="size-8 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-600">Questions Answered</p>
                          <p className="text-2xl text-gray-900">{answersGiven}</p>
                        </div>
                      </div>
                      <TrendingUp className="size-5 text-green-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="size-8 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Colleagues Helped</p>
                          <p className="text-2xl text-gray-900">{colleaguesHelped}</p>
                        </div>
                      </div>
                      <TrendingUp className="size-5 text-blue-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TreeDeciduous className="size-8 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-600">Departments Supported</p>
                          <p className="text-2xl text-gray-900">{departmentsSupported.length}</p>
                        </div>
                      </div>
                      <TrendingUp className="size-5 text-purple-500" />
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowTreeDetail(true)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    View Growth Timeline
                  </Button>
                </div>
              </div>

              {/* Company Values Legend */}
              <div className="mt-8 pt-8 border-t border-green-200">
                <p className="text-sm text-gray-700 mb-3 text-center">
                  🌈 Your tree branches reflect company values:
                </p>
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
                    <span className="text-sm text-gray-700">Integrity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#10b981' }} />
                    <span className="text-sm text-gray-700">Responsibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#8b5cf6' }} />
                    <span className="text-sm text-gray-700">Communication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f59e0b' }} />
                    <span className="text-sm text-gray-700">Quality Assurance</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Badges Section */}
          <Card className="bg-white border-gray-200 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Award className="size-6 text-amber-600" />
                <h3 className="text-gray-900">Your Badges</h3>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Earned Badges */}
              {earnedBadges.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-4">✨ Earned ({earnedBadges.length})</p>
                  <div className="grid grid-cols-4 gap-4">
                    {earnedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border-2 shadow-sm hover:shadow-md transition-shadow"
                        style={{ borderColor: badge.color }}
                      >
                        <div className="text-center">
                          <div
                            className="size-16 rounded-full flex items-center justify-center mx-auto mb-3"
                            style={{ backgroundColor: `${badge.color}20` }}
                          >
                            <span className="text-3xl">{badge.icon}</span>
                          </div>
                          <h4 className="text-gray-900 text-sm mb-1">{badge.name}</h4>
                          <p className="text-xs text-gray-600">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Locked Badges */}
              {lockedBadges.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-4">🔒 In Progress ({lockedBadges.length})</p>
                  <div className="grid grid-cols-4 gap-4">
                    {lockedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 opacity-60"
                      >
                        <div className="text-center">
                          <div className="size-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-3xl grayscale">{badge.icon}</span>
                          </div>
                          <h4 className="text-gray-700 text-sm mb-1">{badge.name}</h4>
                          <p className="text-xs text-gray-500">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Personal Forest Preview */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TreeDeciduous className="size-6 text-green-600" />
                  <h3 className="text-gray-900">My Personal Forest</h3>
                </div>
                <Button
                  onClick={() => navigateTo('my-garden')}
                  variant="outline"
                  className="rounded-xl"
                >
                  View All
                </Button>
              </div>
            </div>

            {userQuestions.length === 0 ? (
              <div className="p-12 text-center">
                <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sprout className="size-10 text-green-600" />
                </div>
                <p className="text-gray-600">No seeds planted yet</p>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-center gap-4 py-8">
                  {userQuestions.map((q, i) => (
                    <div key={q.id} className="text-center" style={{ animationDelay: `${i * 100}ms` }}>
                      <div className="text-5xl mb-2 animate-in zoom-in duration-500">
                        {stageIcons[q.stage]}
                      </div>
                      <p className="text-xs text-gray-600 max-w-20 truncate">{q.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Award className="size-6 text-yellow-600" />
                <h3 className="text-gray-900">Achievements</h3>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <div className="text-center">
                    <div className="size-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Sprout className="size-8 text-white" />
                    </div>
                    <h4 className="text-gray-900 mb-1">First Seed</h4>
                    <p className="text-sm text-gray-600">Planted your first question</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="text-center">
                    <div className="size-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Droplet className="size-8 text-white" />
                    </div>
                    <h4 className="text-gray-900 mb-1">Helpful Contributor</h4>
                    <p className="text-sm text-gray-600">Answered 5+ questions</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="text-center">
                    <div className="size-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TreeDeciduous className="size-8 text-white" />
                    </div>
                    <h4 className="text-gray-900 mb-1">Tree Grower</h4>
                    <p className="text-sm text-gray-600">Grew your first full tree</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI-Powered Next Steps */}
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 text-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Sparkles className="size-7 text-white" />
                </div>
                <div>
                  <h3 className="text-white mb-2">AI Recommendations for Your Growth</h3>
                  <p className="text-white/80">Personalized next steps based on your activity</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-start gap-3">
                    <Target className="size-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white mb-1">Continue exploring creativity topics</p>
                      <p className="text-white/70 text-sm">You've shown strong interest in this area. Consider sharing more insights!</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="size-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white mb-1">Help answer technical questions</p>
                      <p className="text-white/70 text-sm">Your colleagues are asking about code reviews. Share your expertise!</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-start gap-3">
                    <Award className="size-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white mb-1">You're close to "Knowledge Champion"</p>
                      <p className="text-white/70 text-sm">Answer 3 more questions to unlock this achievement!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => navigateTo('ask')}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-8"
            >
              <Sprout className="mr-2 size-4" />
              Plant a New Seed
            </Button>
            <Button
              onClick={() => navigateTo('company-forest')}
              variant="outline"
              className="rounded-xl px-8"
            >
              Explore Company Forest
            </Button>
          </div>
        </div>
      </div>

      {/* Personal Tree Detail Modal */}
      <PersonalTreeDetail
        isOpen={showTreeDetail}
        onClose={() => setShowTreeDetail(false)}
        userName={currentUser === 'samin' ? 'Samin' : 'John'}
        answersGiven={answersGiven}
        colleaguesHelped={colleaguesHelped}
        departmentsSupported={departmentsSupported}
        contributions={contributions}
      />
    </div>
  );
}