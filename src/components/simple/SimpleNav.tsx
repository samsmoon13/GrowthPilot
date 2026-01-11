import { ArrowLeft, Bell, MessageCircle, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { Screen } from '../../App';
import { getDepartmentById } from '../../config/departments';

// use public logo at /logo.png to avoid bundling/type issues

interface SimpleNavProps {
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
  currentUser: string;
  notifications?: Record<string, any[]>;
  setCurrentUser?: (user: string) => void;
  setCurrentQuestionId?: (id: string) => void;
  setNotifications?: (notifications: Record<string, any[]>) => void;
  goBack?: () => void;
  canGoBack?: boolean;
}

export function SimpleNav({ currentScreen, navigateTo, currentUser, notifications, setCurrentQuestionId, setNotifications, goBack, canGoBack }: SimpleNavProps) {
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationDropdownOpen(false);
      }
    };

    if (isNotificationDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationDropdownOpen]);

  const navItems = [
    { screen: 'home' as Screen, label: 'Home' },
    { screen: 'my-garden' as Screen, label: 'My Garden' },
    { screen: 'forest' as Screen, label: 'Forest' },
    { screen: 'explore' as Screen, label: 'Explore' },
    { screen: 'login' as Screen, label: 'My Profile' },
  ];

  const userNotifications = notifications?.[currentUser] || [];
  const unreadCount = userNotifications.filter(n => !n.read).length;

  // Show back button for screens that aren't home or when canGoBack is true
  const showBackButton = canGoBack || currentScreen !== 'home';

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

  const handleNotificationClick = (notification: any) => {
    // Mark as read
    if (setNotifications && notifications) {
      const updatedNotifications = { ...notifications };
      updatedNotifications[currentUser] = userNotifications.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
      );
      setNotifications(updatedNotifications);
    }
    
    // Navigate to the question
    if (setCurrentQuestionId) {
      setCurrentQuestionId(notification.questionId);
    }
    setIsNotificationDropdownOpen(false);
    navigateTo('answer-question');
  };

  const markAllAsRead = () => {
    if (setNotifications && notifications) {
      const updatedNotifications = { ...notifications };
      updatedNotifications[currentUser] = userNotifications.map(n => ({ ...n, read: true }));
      setNotifications(updatedNotifications);
    }
  };

  return (
    <nav className="bg-[#faf9f7] border-b border-[#3d2817]/10 nav-apple">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Back Button */}
          <div className="flex items-center gap-3">
            {/* Back button in nav (top-left). Use goBack when available, otherwise navigate home. */}
            {showBackButton && (
              <button
                onClick={() => (goBack ? goBack() : navigateTo('home'))}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#3d2817] hover:bg-[#3d2817]/5 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-lg font-semibold">Back</span>
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => navigateTo(item.screen)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Notifications and User Name */}
          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            {/* User Name with Avatar */}
            {currentUser && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[rgb(213,192,93)] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{currentUser.charAt(0).toUpperCase()}</span>
                </div>
                <span className="text-base text-gray-700 font-medium">{currentUser}</span>
              </div>
            )}
            
            {/* Notification Bell */}
            <button
              onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell className={`w-6 h-6 ${isNotificationDropdownOpen ? 'text-gray-900' : 'text-gray-600'}`} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotificationDropdownOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50 max-h-[400px] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-[rgb(213,192,93)] hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="overflow-y-auto max-h-[320px]">
                  {userNotifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No notifications yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {userNotifications.map(notification => {
                        const dept = getDepartmentById(notification.department);
                        return (
                          <button
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                              !notification.read ? 'bg-blue-50/50' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ backgroundColor: dept?.color || '#10B981' }}
                              >
                                <MessageCircle className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900">
                                  <span className="font-medium">{notification.from}</span>
                                  {' '}planted a question in{' '}
                                  <span className="font-medium">{dept?.name || notification.department}</span>
                                </p>
                                <p className="text-sm text-gray-600 truncate mt-0.5">
                                  {notification.questionText}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {formatTimestamp(notification.timestamp)}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}