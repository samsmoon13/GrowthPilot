import { Bell, Plus, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { SimpleNav } from './SimpleNav';
import { SimpleFooter } from './SimpleFooter';
import { BackButton } from './BackButton';
import { getDepartmentById } from '../../config/departments';
import type { Screen, Question, Notification, Answer } from '../../App';

interface SimpleNotificationsScreenProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  canGoBack: boolean;
  currentUser: string;
  questions: Question[];
  notifications: Record<string, Notification[]>;
  setNotifications: (notifications: Record<string, Notification[]>) => void;
  addAnswer: (questionId: string, answer: Answer) => void;
  setCurrentQuestionId: (id: string | null) => void;
  setCurrentUser: (user: string) => void;
}

export function SimpleNotificationsScreen({
  navigateTo,
  goBack,
  canGoBack,
  currentUser,
  questions,
  notifications,
  setNotifications,
  addAnswer,
  setCurrentQuestionId,
  setCurrentUser,
}: SimpleNotificationsScreenProps) {
  const userNotifications = notifications[currentUser] || [];
  const unreadCount = userNotifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications({
      ...notifications,
      [currentUser]: userNotifications.map(n =>
        n.id === notification.id ? { ...n, read: true } : n
      ),
    });

    // Navigate to answer the question
    setCurrentQuestionId(notification.questionId);
    navigateTo('answer-question');
  };

  const markAllAsRead = () => {
    setNotifications({
      ...notifications,
      [currentUser]: userNotifications.map(n => ({ ...n, read: true })),
    });
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] relative" style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      {canGoBack && <BackButton onClick={goBack} />}
      <SimpleNav
        currentScreen="notifications"
        navigateTo={navigateTo}
        currentUser={currentUser}
        notifications={notifications}
        setCurrentUser={setCurrentUser}
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline" size="sm">
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        {userNotifications.length === 0 ? (
          <div className="text-center py-24">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {userNotifications
              .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
              .map((notification) => {
                const dept = getDepartmentById(notification.department);
                return (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                      notification.read
                        ? 'bg-white border-gray-200'
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: dept?.color + '20' }}
                      >
                        <MessageCircle className="w-5 h-5" style={{ color: dept?.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm" style={{ color: dept?.color }}>
                            {dept?.name}
                          </span>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-gray-900 mb-1">
                          <strong>{notification.from}</strong> asked: {notification.questionText}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notification.timestamp.toLocaleString()}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Answer
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <SimpleFooter />
    </div>
  );
}