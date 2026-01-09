import { useState } from 'react';
import { Sprout, LogIn, UserPlus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { DepartmentSeed } from '../seeds/SeedIcons';
import { departments } from '../../config/departments';
import type { Screen, Notification } from '../../App';

interface SimpleLoginScreenProps {
  navigateTo: (screen: Screen) => void;
  currentUser: string;
  setCurrentUser: (user: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  goBack?: () => void;
  canGoBack?: boolean;
  notifications?: Record<string, Notification[]>;
}

export function SimpleLoginScreen({ navigateTo, currentUser, setCurrentUser, setIsLoggedIn, goBack, canGoBack, notifications }: SimpleLoginScreenProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    // Simple validation - in real app would check against database
    setError('');
    setCurrentUser(username);
    setIsLoggedIn(true);
    navigateTo('home');
  };

  const handleSignup = () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }
    if (selectedDepartments.length === 0) {
      setError('Please select at least one department');
      return;
    }

    // Simple signup - in real app would create account
    setError('');
    setCurrentUser(username);
    setIsLoggedIn(true);
    navigateTo('home');
  };

  const toggleDepartment = (deptId: string) => {
    if (selectedDepartments.includes(deptId)) {
      setSelectedDepartments(selectedDepartments.filter(d => d !== deptId));
    } else {
      setSelectedDepartments([...selectedDepartments, deptId]);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7]" style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      {/* Navigation bar - same as other pages */}
      <SimpleNav 
        currentScreen="login" 
        navigateTo={navigateTo} 
        currentUser={currentUser} 
        notifications={notifications} 
        setCurrentUser={setCurrentUser}
        goBack={goBack}
        canGoBack={canGoBack}
      />

      <div className="flex items-center justify-center p-6 min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left space-y-8">
          <div className="inline-block">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-[rgb(213,192,93)] rounded-2xl flex items-center justify-center rotate-12 transform hover:rotate-0 transition-transform duration-300">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl text-[#3d2817]">GrowthPilot</h1>
            </div>
            <p className="text-xl text-gray-600 mb-6">
              Plant seeds of curiosity. Grow forests of knowledge.
            </p>
          </div>

          {/* Visual Elements */}
          <div className="hidden lg:block">
            {/* Removed animated visualization */}
          </div>
        </div>

        {/* Right Side - Login/Signup Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-3xl border-2 border-gray-900 p-8 shadow-xl">
            {/* Toggle Tabs */}
            <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-xl">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-3 rounded-lg text-sm md:text-base font-medium transition-all ${
                  mode === 'login'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LogIn className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
                Login
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 py-3 rounded-lg text-sm md:text-base font-medium transition-all ${
                  mode === 'signup'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <UserPlus className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {mode === 'login' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-gray-900 mb-2 text-xl md:text-2xl">Welcome Back!</h2>
                  <p className="text-gray-600 text-sm md:text-base">Log in to continue growing knowledge</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Username</label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="h-12 rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleLogin}
                  className="w-full bg-[rgb(213,192,93)] hover:bg-[rgb(193,172,73)] text-white h-12 rounded-xl"
                >
                  <LogIn className="mr-2 w-5 h-5" />
                  Log In
                </Button>

                <div className="text-center">
                  <button
                    onClick={() => setMode('signup')}
                    className="text-sm md:text-base text-gray-600 hover:text-gray-900 underline"
                  >
                    Don't have an account? Sign up
                  </button>
                </div>
              </div>
            )}

            {/* Signup Form */}
            {mode === 'signup' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-gray-900 mb-2 text-xl md:text-2xl">Join GrowthPilot</h2>
                  <p className="text-gray-600 text-sm md:text-base">Start your knowledge journey today</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Username</label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    className="h-12 rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@company.com"
                    className="h-12 rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="h-12 rounded-xl border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-3">Select Your Departments</label>
                  <div className="grid grid-cols-2 gap-3">
                    {departments.map((dept) => (
                      <button
                        key={dept.id}
                        onClick={() => toggleDepartment(dept.id)}
                        className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                          selectedDepartments.includes(dept.id)
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <DepartmentSeed 
                          seedType={dept.seedType}
                          color={dept.color}
                          size={36}
                        />
                        <span className="text-xs text-gray-700 mt-2">{dept.name}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    You can select multiple departments
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleSignup}
                  className="w-full bg-[rgb(213,192,93)] hover:bg-[rgb(193,172,73)] text-white h-12 rounded-xl"
                >
                  <UserPlus className="mr-2 w-5 h-5" />
                  Create Account
                </Button>

                <div className="text-center">
                  <button
                    onClick={() => setMode('login')}
                    className="text-sm md:text-base text-gray-600 hover:text-gray-900 underline"
                  >
                    Already have an account? Log in
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Note */}
          <SimpleFooter />
        </div>
      </div>
      </div>
    </div>
  );
}
