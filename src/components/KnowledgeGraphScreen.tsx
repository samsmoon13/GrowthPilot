import { useState } from 'react';
import { Network, Sparkles, Users, Layers, Zap, Menu, Sprout } from 'lucide-react';
import { Button } from './ui/button';
import type { Screen, Question } from '../App';

interface KnowledgeGraphScreenProps {
  navigateTo: (screen: Screen) => void;
  currentUser: 'samin' | 'john';
  questions: Question[];
}

export function KnowledgeGraphScreen({ navigateTo, currentUser, questions }: KnowledgeGraphScreenProps) {
  const [selectedView, setSelectedView] = useState<'full' | 'clusters' | 'trends'>('full');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateTo('login')}
                className="size-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                <Network className="size-5 text-white" />
              </button>
              <div>
                <h2 className="text-white">Knowledge Graph</h2>
                <p className="text-sm text-white/70">
                  Visual network of company knowledge
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigateTo('ask')}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
              >
                Plant New Seed
              </Button>
              <button
                onClick={() => navigateTo('login')}
                className="size-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                <Menu className="size-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            <button
              onClick={() => navigateTo('my-garden')}
              className="px-4 py-3 text-white/70 hover:text-white border-b-2 border-transparent"
            >
              My Garden
            </button>
            <button
              onClick={() => navigateTo('company-forest')}
              className="px-4 py-3 text-white/70 hover:text-white border-b-2 border-transparent"
            >
              Company Forest
            </button>
            <button
              onClick={() => navigateTo('ai-insights')}
              className="px-4 py-3 text-white/70 hover:text-white border-b-2 border-transparent"
            >
              AI Insights
            </button>
            <button className="px-4 py-3 text-white border-b-2 border-white">
              Knowledge Graph
            </button>
            <button
              onClick={() => navigateTo('profile')}
              className="px-4 py-3 text-white/70 hover:text-white border-b-2 border-transparent"
            >
              Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {/* View Selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedView('full')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  selectedView === 'full'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Network className="inline-block mr-2 size-4" />
                Full Network
              </button>
              <button
                onClick={() => setSelectedView('clusters')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  selectedView === 'clusters'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Layers className="inline-block mr-2 size-4" />
                Topic Clusters
              </button>
              <button
                onClick={() => setSelectedView('trends')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  selectedView === 'trends'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Zap className="inline-block mr-2 size-4" />
                Trending
              </button>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <Sparkles className="size-4 text-purple-400" />
              <span className="text-sm text-white">AI-Enhanced Visualization</span>
            </div>
          </div>

          {/* Graph Visualization */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="relative aspect-[16/10]">
              {/* Graph Canvas */}
              <div className="absolute inset-0 p-12">
                {selectedView === 'full' && (
                  <div className="relative h-full flex items-center justify-center">
                    {/* Central Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="size-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
                        <Sparkles className="size-16 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full animate-ping opacity-20" />
                    </div>

                    {/* Nodes - Employees */}
                    <div className="absolute top-1/4 left-1/4">
                      <div className="relative group">
                        <div className="size-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform">
                          <span className="text-2xl">👤</span>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-sm bg-black/60 px-2 py-1 rounded">Samin</span>
                        </div>
                        {/* Connection line */}
                        <svg className="absolute top-10 left-10 w-32 h-32 -z-10">
                          <line x1="0" y1="0" x2="100" y2="80" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute top-1/4 right-1/4">
                      <div className="relative group">
                        <div className="size-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform">
                          <span className="text-2xl">👤</span>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-sm bg-black/60 px-2 py-1 rounded">John</span>
                        </div>
                        <svg className="absolute top-10 right-10 w-32 h-32 -z-10">
                          <line x1="80" y1="0" x2="0" y2="80" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>

                    {/* Nodes - Seeds/Trees */}
                    <div className="absolute top-3/4 left-1/3">
                      <div className="relative group">
                        <div className="size-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                          <span className="text-xl">🌱</span>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs bg-black/60 px-2 py-1 rounded">Creativity</span>
                        </div>
                        <svg className="absolute bottom-8 left-8 w-40 h-40 -z-10">
                          <line x1="20" y1="140" x2="80" y2="20" stroke="rgba(236, 72, 153, 0.3)" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute top-3/4 right-1/3">
                      <div className="relative group">
                        <div className="size-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                          <span className="text-xl">🌳</span>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs bg-black/60 px-2 py-1 rounded">Technical</span>
                        </div>
                        <svg className="absolute bottom-8 right-8 w-40 h-40 -z-10">
                          <line x1="120" y1="140" x2="60" y2="20" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>

                    {/* AI Answers nodes */}
                    <div className="absolute bottom-1/4 left-1/2 -translate-x-20">
                      <div className="relative group">
                        <div className="size-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                          <Sparkles className="size-6 text-white" />
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs bg-black/60 px-2 py-1 rounded">AI Answer</span>
                        </div>
                      </div>
                    </div>

                    {/* Department nodes */}
                    <div className="absolute top-1/2 left-12">
                      <div className="relative group">
                        <div className="size-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                          <span className="text-xl">📢</span>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs bg-black/60 px-2 py-1 rounded">Marketing</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-1/2 right-12">
                      <div className="relative group">
                        <div className="size-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                          <span className="text-xl">⚙️</span>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs bg-black/60 px-2 py-1 rounded">Engineering</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedView === 'clusters' && (
                  <div className="h-full flex items-center justify-center gap-12">
                    {/* Creativity Cluster */}
                    <div className="relative">
                      <div className="size-40 bg-gradient-to-br from-pink-500/40 to-purple-500/40 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-pink-400">
                        <div className="text-center">
                          <span className="text-4xl block mb-2">🎨</span>
                          <p className="text-white text-sm">Creativity</p>
                          <p className="text-white/70 text-xs">{questions.filter(q => q.category === 'creativity').length} trees</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full animate-ping opacity-10" />
                    </div>

                    {/* Technical Cluster */}
                    <div className="relative">
                      <div className="size-48 bg-gradient-to-br from-blue-500/40 to-cyan-500/40 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-blue-400">
                        <div className="text-center">
                          <span className="text-5xl block mb-2">⚙️</span>
                          <p className="text-white">Technical</p>
                          <p className="text-white/70 text-sm">3 trees</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full animate-ping opacity-10" />
                    </div>

                    {/* Culture Cluster */}
                    <div className="relative">
                      <div className="size-36 bg-gradient-to-br from-green-500/40 to-emerald-500/40 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-green-400">
                        <div className="text-center">
                          <span className="text-3xl block mb-2">🤝</span>
                          <p className="text-white text-sm">Culture</p>
                          <p className="text-white/70 text-xs">2 trees</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full animate-ping opacity-10" />
                    </div>
                  </div>
                )}

                {selectedView === 'trends' && (
                  <div className="h-full flex flex-col justify-center gap-8 px-12">
                    {/* Trending Topic 1 */}
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="size-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Zap className="size-8 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white mb-1">Creativity & Presentations</h4>
                            <p className="text-white/70 text-sm">Most active this week</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl text-white">{questions.filter(q => q.category === 'creativity').length}</p>
                          <p className="text-white/70 text-sm">new trees</p>
                        </div>
                      </div>
                    </div>

                    {/* Trending Topic 2 */}
                    <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="size-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <TrendingUp className="size-8 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white mb-1">Code Reviews & Best Practices</h4>
                            <p className="text-white/70 text-sm">Growing rapidly</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl text-white">3</p>
                          <p className="text-white/70 text-sm">new trees</p>
                        </div>
                      </div>
                    </div>

                    {/* Knowledge Gaps */}
                    <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-6 border border-orange-400/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="size-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            <AlertCircle className="size-8 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white mb-1">Knowledge Gaps Detected</h4>
                            <p className="text-white/70 text-sm">AI recommends focus areas</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white/70 text-sm">Product Strategy</p>
                          <p className="text-white/70 text-sm">Data Analytics</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Legend & Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Users className="size-6 text-green-400" />
                <h4 className="text-white">Network Stats</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Total Nodes</span>
                  <span className="text-white">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Connections</span>
                  <span className="text-white">24</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Density</span>
                  <span className="text-white">High</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="size-6 text-purple-400" />
                <h4 className="text-white">AI Highlights</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-purple-400 rounded-full" />
                  <span className="text-white/70 text-sm">Creativity is most connected topic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-blue-400 rounded-full" />
                  <span className="text-white/70 text-sm">Samin is top contributor</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-green-400 rounded-full" />
                  <span className="text-white/70 text-sm">Knowledge growing 40% faster</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="size-6 text-blue-400" />
                <h4 className="text-white">Legend</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-3 bg-green-500 rounded-full" />
                  <span className="text-white/70 text-sm">Employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 bg-pink-500 rounded-full" />
                  <span className="text-white/70 text-sm">Seeds/Trees</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 bg-purple-500 rounded-full" />
                  <span className="text-white/70 text-sm">AI Answers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function TrendingUp({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
