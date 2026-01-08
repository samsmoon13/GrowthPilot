import { Home, TreeDeciduous, Trees, User, Bell, ArrowLeft, ChevronDown, LogOut, MessageCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import logoImage from 'figma:asset/26f77b31633d6e8f651ea4a90982052eaca4f33a.png';
import type { Screen, Notification } from '../../App';
import { USERS } from '../../App';
import { getDepartmentById } from '../../config/departments';

interface SimpleNavProps {
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
  currentUser: string;
  notifications?: Record<string, Notification[]>;
  setCurrentUser?: (user: string) => void;
}

export function SimpleNav({ currentScreen, navigateTo, currentUser, notifications, setCurrentUser }: SimpleNavProps) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const handleSwitchUser = (userName: string) => {
    if (setCurrentUser) {
      setCurrentUser(userName);
      setIsProfileDropdownOpen(false);
      navigateTo('home');
    }
  };

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    navigateTo('login');
  };

  const handleNotificationClick = (notification: Notification) => {
    setIsProfileDropdownOpen(false);
    navigateTo('notifications');
  };

  const navItems = [
    { screen: 'home' as Screen, label: 'Home', icon: Home },
    { screen: 'my-garden' as Screen, label: 'My Garden', icon: TreeDeciduous },
    { screen: 'forest' as Screen, label: 'Forest', icon: Trees },
    { screen: 'login' as Screen, label: 'My Profile', icon: User },
  ];

  const userNotifications = notifications?.[currentUser] || [];
  const unreadCount = userNotifications.filter(n => !n.read).length;
  const recentNotifications = userNotifications.slice(0, 3); // Show only 3 most recent

  // Show back button for screens that aren't home
  const showBackButton = currentScreen !== 'home';

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <nav className="bg-[#faf9f7] border-b border-[#3d2817]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Back Button */}
          <div className="flex items-center gap-3">
            {showBackButton && (
              <button
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#3d2817] hover:bg-[#3d2817]/5 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-bold">Back</span>
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => navigateTo(item.screen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User & Notifications */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button
              onClick={() => navigateTo('notifications')}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell className={`w-5 h-5 ${currentScreen === 'notifications' ? 'text-gray-900' : 'text-gray-600'}`} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* User */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm text-gray-700">{currentUser[0]}</span>
                </div>
                <span className="text-sm text-gray-700">{currentUser}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border-2 border-gray-900 rounded-xl shadow-xl z-50 max-h-[600px] overflow-y-auto">
                  <div className="p-2">
                    {/* Current User Header */}
                    <div className="px-3 py-2 border-b border-gray-200 mb-2">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm text-gray-900">{currentUser}</p>
                    </div>

                    {/* Notifications Section */}
                    {recentNotifications.length > 0 && (
                      <div className="mb-2 border-b border-gray-200 pb-2">
                        <div className="flex items-center justify-between px-3 py-1 mb-1">
                          <p className="text-xs text-gray-500">Recent Notifications</p>
                          {unreadCount > 0 && (
                            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                              {unreadCount} new
                            </span>
                          )}
                        </div>
                        <div className="space-y-1">
                          {recentNotifications.map(notification => {
                            const dept = getDepartmentById(notification.department);
                            return (
                              <button
                                key={notification.id}
                                onClick={() => handleNotificationClick(notification)}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-gray-50 ${
                                  !notification.read ? 'bg-blue-50' : ''
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  <MessageCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-900 truncate">
                                      <span className="font-medium">{notification.from}</span> planted in {dept?.name}
                                    </p>
                                    <p className="text-xs text-gray-600 truncate mt-0.5">
                                      {notification.questionText}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                      {formatTimestamp(notification.timestamp)}
                                    </p>
                                  </div>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        {userNotifications.length > 3 && (
                          <button
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              navigateTo('notifications');
                            }}
                            className="w-full px-3 py-2 text-xs text-[rgb(213,192,93)] hover:bg-gray-50 rounded-lg transition-colors mt-1"
                          >
                            View all {userNotifications.length} notifications →
                          </button>
                        )}
                      </div>
                    )}

                    {/* Switch User Section */}
                    <div className="mb-2">
                      <p className="px-3 py-1 text-xs text-gray-500">Switch User (Demo)</p>
                      {Object.keys(USERS).map(userName => {
                        const userUnreadCount = (notifications?.[userName] || []).filter(n => !n.read).length;
                        return (
                          <button
                            key={userName}
                            onClick={() => {
                              if (userName === currentUser) {
                                handleLogout();
                              } else {
                                handleSwitchUser(userName);
                              }
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                              userName === currentUser
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <div className="w-6 h-6 bg-[rgb(213,192,93)] rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs text-white">{userName[0]}</span>
                            </div>
                            <span className="flex-1 text-left">{userName}</span>
                            <div className="flex items-center gap-2">
                              {userUnreadCount > 0 && (
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                  {userUnreadCount}
                                </span>
                              )}
                              {userName === currentUser && (
                                <span className="text-xs text-gray-500">✓</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-200 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}