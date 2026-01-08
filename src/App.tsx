import { useState } from 'react';
import { SimpleLoginScreen } from './components/simple/SimpleLoginScreen';
import { SimpleHomeScreen } from './components/simple/SimpleHomeScreen';
import { SimpleAskScreen } from './components/simple/SimpleAskScreen';
import { SimpleAIAnswerScreen } from './components/simple/SimpleAIAnswerScreen';
import { SimpleMyGardenScreen } from './components/simple/SimpleMyGardenScreen';
import { SimpleForestScreen } from './components/simple/SimpleForestScreen';
import { SimpleTreeMapScreen } from './components/simple/SimpleTreeMapScreen';
import { SimpleDemoMode } from './components/simple/SimpleDemoMode';
import { SimpleNotificationsScreen } from './components/simple/SimpleNotificationsScreen';
import { SimpleAnswerQuestionScreen } from './components/simple/SimpleAnswerQuestionScreen';

export type Screen = 
  | 'login'
  | 'home'
  | 'ask'
  | 'ai-answer'
  | 'my-garden'
  | 'forest'
  | 'tree-map'
  | 'demo-mode'
  | 'notifications'
  | 'answer-question';

export interface Question {
  id: string;
  text: string;
  department: string;
  askedBy: string;
  answers: Answer[];
  growthLevel: number; // 0-10
  bestAnswerId?: string;
}

export interface Answer {
  id: string;
  text: string;
  author: string;
  isAI: boolean;
  timestamp: Date;
}

export interface Notification {
  id: string;
  type: 'new-question' | 'new-answer';
  questionId: string;
  questionText: string;
  department: string;
  from: string;
  timestamp: Date;
  read: boolean;
}

export interface User {
  name: string;
  departments: string[]; // departments they belong to
}

// Define users and their departments
export const USERS: Record<string, User> = {
  'Sarah': { name: 'Sarah', departments: ['coding', 'management', 'design'] },
  'Alex': { name: 'Alex', departments: ['creativity', 'design', 'management'] },
  'Mike': { name: 'Mike', departments: ['tech', 'coding'] },
  'Emma': { name: 'Emma', departments: ['creativity', 'management'] },
  'John': { name: 'John', departments: ['tech', 'coding'] },
  'David': { name: 'David', departments: ['tech', 'coding', 'management'] },
  'Lisa': { name: 'Lisa', departments: ['design', 'coding'] },
  'Rachel': { name: 'Rachel', departments: ['creativity', 'design'] },
  'Chris': { name: 'Chris', departments: ['tech', 'management'] },
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [currentUser, setCurrentUser] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [screenHistory, setScreenHistory] = useState<Screen[]>(['login']);
  
  // Notifications state - per user
  const [notifications, setNotifications] = useState<Record<string, Notification[]>>({
    'Sarah': [],
    'Alex': [],
    'Mike': [],
    'Emma': [],
    'John': [],
    'David': [],
    'Lisa': [],
    'Rachel': [],
    'Chris': [],
  });
  
  // Shared question state
  const [questions, setQuestions] = useState<Question[]>([
    // Pre-populate with some example trees
    // Coding Department (Pine Trees)
    {
      id: '1',
      text: 'What are best practices for code reviews?',
      department: 'coding',
      askedBy: 'Sarah',
      answers: [
        { id: 'a1', text: 'AI Insight: Based on company knowledge, focus on clarity, test coverage, and consistent style guides.', author: 'AI Copilot', isAI: true, timestamp: new Date() },
        { id: 'a2', text: 'I always check for edge cases and security vulnerabilities first.', author: 'John', isAI: false, timestamp: new Date() },
        { id: 'a3', text: 'Focus on logic first, style second. And always be kind in comments.', author: 'Mike', isAI: false, timestamp: new Date() },
        { id: 'a4', text: 'Use automated tools for style, reserve human review for architecture.', author: 'Lisa', isAI: false, timestamp: new Date() },
      ],
      growthLevel: 3,
      bestAnswerId: 'a4'
    },
    {
      id: '3',
      text: 'How to optimize database queries?',
      department: 'coding',
      askedBy: 'Mike',
      answers: [
        { id: 'c1', text: 'AI Insight: Use indexing, avoid N+1 queries, and consider caching strategies.', author: 'AI Copilot', isAI: true, timestamp: new Date() },
        { id: 'c2', text: 'Always profile first before optimizing. Measure, don\'t guess.', author: 'Sarah', isAI: false, timestamp: new Date() },
        { id: 'c3', text: 'Use EXPLAIN to understand query execution plans.', author: 'David', isAI: false, timestamp: new Date() },
        { id: 'c4', text: 'Consider read replicas for heavy read workloads.', author: 'Emma', isAI: false, timestamp: new Date() },
        { id: 'c5', text: 'Batch operations when possible to reduce round trips.', author: 'John', isAI: false, timestamp: new Date() },
        { id: 'c6', text: 'Pagination is key for large datasets.', author: 'Lisa', isAI: false, timestamp: new Date() },
        { id: 'c7', text: 'Monitor query performance in production.', author: 'Chris', isAI: false, timestamp: new Date() },
      ],
      growthLevel: 6,
      bestAnswerId: 'c2'
    },
    {
      id: '9',
      text: 'Best practices for API versioning?',
      department: 'coding',
      askedBy: 'David',
      answers: [
        { id: 'i1', text: 'AI Insight: Use semantic versioning and maintain backward compatibility when possible.', author: 'AI Copilot', isAI: true, timestamp: new Date() },
        { id: 'i2', text: 'URL versioning is simplest: /v1/users, /v2/users', author: 'Sarah', isAI: false, timestamp: new Date() },
      ],
      growthLevel: 1,
      bestAnswerId: 'i2'
    },
    
    // Creativity Department (Maple Trees)
    {
      id: '2',
      text: 'How to improve team presentations?',
      department: 'creativity',
      askedBy: 'Sarah',
      answers: [
        { id: 'b1', text: 'AI Insight: Use visual storytelling with minimal text and strong imagery. Reference our Design System 2.0.', author: 'AI Copilot', isAI: true, timestamp: new Date() },
        { id: 'b2', text: 'Start with a hook, tell a story, end with clear action items.', author: 'Emma', isAI: false, timestamp: new Date() },
        { id: 'b3', text: 'Practice with a small group first, get feedback, iterate.', author: 'Alex', isAI: false, timestamp: new Date() },
        { id: 'b4', text: 'Use the 10-20-30 rule: 10 slides, 20 minutes, 30pt font minimum.', author: 'David', isAI: false, timestamp: new Date() },
        { id: 'b5', text: 'Know your audience and tailor content to their interests.', author: 'Rachel', isAI: false, timestamp: new Date() },
        { id: 'b6', text: 'End with Q&A to engage the audience and clarify points.', author: 'Chris', isAI: false, timestamp: new Date() },
      ],
      growthLevel: 5,
      bestAnswerId: 'b2'
    },
    {
      id: '4',
      text: 'How to brainstorm innovative product ideas?',
      department: 'creativity',
      askedBy: 'Emma',
      answers: [
        { id: 'd1', text: 'AI Insight: Use design thinking frameworks: empathize, define, ideate, prototype, test.', author: 'AI Copilot', isAI: true, timestamp: new Date() },
        { id: 'd2', text: 'Start with customer pain points, not solutions.', author: 'Sarah', isAI: false, timestamp: new Date() },
        { id: 'd3', text: 'Use "How Might We" questions to frame challenges.', author: 'Alex', isAI: false, timestamp: new Date() },
        { id: 'd4', text: 'Crazy 8s exercise: 8 ideas in 8 minutes!', author: 'Rachel', isAI: false, timestamp: new Date() },
        { id: 'd5', text: 'Look at adjacent industries for inspiration.', author: 'Mike', isAI: false, timestamp: new Date() },
        { id: 'd6', text: 'Build on "yes, and..." instead of "no, but..."', author: 'David', isAI: false, timestamp: new Date() },
        { id: 'd7', text: 'Prototype fast, fail fast, learn fast.', author: 'Lisa', isAI: false, timestamp: new Date() },
        { id: 'd8', text: 'Include diverse perspectives in the session.', author: 'Chris', isAI: false, timestamp: new Date() },
      ],
      growthLevel: 7,
      bestAnswerId: 'd2'
    },
    {
      id: '10',
      text: 'Tips for creative writing in marketing?',
      department: 'creativity',
      askedBy: 'Rachel',
      answers: [
        { id: 'j1', text: 'AI Insight: Focus on benefits over features, use emotional storytelling, and create urgency.', author: 'AI Copilot', isAI: true, timestamp: new Date() },
        { id: 'j2', text: 'Write like you talk. Be conversational and authentic.', author: 'Emma', isAI: false, timestamp: new Date() },
        { id: 'j3', text: 'Use power words that evoke emotion and action.', author: 'Alex', isAI: false, timestamp: new Date() },
      ],
      growthLevel: 2,
    },

    // Tech Department (Oak Trees)
    {
      id: '5',
      text: 'What cloud architecture should we use?',
      department: 'tech',
      askedBy: 'John',
      answers: [
        { id: 'e1', text: 'AI Insight: Consider microservices with containerization, use managed services for scalability.', author: 'AI Copilot', isAI: true, timestamp: new Date() },
        { id: 'e2', text: 'Start with serverless for rapid prototyping.', author: 'Mike', isAI: false, timestamp: new Date() },
        { id: 'e3', text: 'Use infrastructure as code from day one.', author: 'Sarah', isAI: false, timestamp: new Date() },
        { id: 'e4', text: 'Plan for multi-region redundancy early.', author: 'David', isAI: false, timestamp: new Date() },
      ],
      growthLevel: 3,
      bestAnswerId: 'e3'
    },
    {
      id: '6',
      text: 'How to ensure system reliability?',
      department: 'tech',
      askedBy: 'Mike',
      answers: [
        { id: 'f1', text: 'AI Insight: Implement monitoring, alerting, circuit breakers, and graceful degradation.', author: 'AI Copilot', isAI: true, timestamp: new Date() },
        { id: 'f2', text: 'SLOs are critical. Define them early and measure constantly.', author: 'John', isAI: false, timestamp: new Date() },
        { id: 'f3', text: 'Chaos engineering: break things on purpose to learn.', author: 'Sarah', isAI: false, timestamp: new Date() },
        { id: 'f4', text: 'Implement proper retry logic with exponential backoff.', author: 'David', isAI: false, timestamp: new Date() },
        { id: 'f5', text: 'Have runbooks for common incidents.', author: 'Emma', isAI: false, timestamp: new Date() },
        { id: 'f6', text: 'Practice incident response through regular drills.', author: 'Lisa', isAI: false, timestamp: new Date() },
      ],
      growthLevel: 5,
      bestAnswerId: 'f2'
    },
    {
      id: '11',
      text: 'Security best practices for our infrastructure?',
      department: 'tech',
      askedBy: 'David',
      answers: [
        { id: 'k1', text: 'AI Insight: Use principle of least privilege, enable MFA, encrypt at rest and in transit.', author: 'AI Copilot', isAI: true, timestamp: new Date() },
      ],
      growthLevel: 0,
    },

    // Management Department (Elm Trees)
    {
      id: '7',
      text: 'How to run effective 1-on-1 meetings?',
      department: 'management',
      askedBy: 'David',
      answers: [
        { id: 'g1', text: 'AI Insight: Create psychological safety, listen actively, focus on growth and feedback.', author: 'AI Copilot', isAI: true, timestamp: new Date() },
        { id: 'g2', text: 'Let the employee set the agenda. It\'s their time.', author: 'Emma', isAI: false, timestamp: new Date() },
        { id: 'g3', text: 'Ask open-ended questions, avoid yes/no questions.', author: 'Sarah', isAI: false, timestamp: new Date() },
        { id: 'g4', text: 'Take notes and follow up on action items.', author: 'Mike', isAI: false, timestamp: new Date() },
        { id: 'g5', text: 'Discuss career growth, not just current projects.', author: 'Alex', isAI: false, timestamp: new Date() },
      ],
      growthLevel: 4,
      bestAnswerId: 'g2'
    },
    {
      id: '8',
      text: 'Best practices for remote team management?',
      department: 'management',
      askedBy: 'Emma',
      answers: [
        { id: 'h1', text: 'AI Insight: Over-communicate, use async updates, and prioritize team bonding activities.', author: 'AI Copilot', isAI: true, timestamp: new Date() },
        { id: 'h2', text: 'Trust by default. Measure outcomes, not hours.', author: 'David', isAI: false, timestamp: new Date() },
        { id: 'h3', text: 'Schedule virtual coffee chats for team bonding.', author: 'Sarah', isAI: false, timestamp: new Date() },
        { id: 'h4', text: 'Document everything. Make information accessible.', author: 'John', isAI: false, timestamp: new Date() },
        { id: 'h5', text: 'Use video for important conversations.', author: 'Mike', isAI: false, timestamp: new Date() },
        { id: 'h6', text: 'Respect time zones and work-life boundaries.', author: 'Lisa', isAI: false, timestamp: new Date() },
        { id: 'h7', text: 'Create a virtual water cooler space for casual chat.', author: 'Alex', isAI: false, timestamp: new Date() },
        { id: 'h8', text: 'Celebrate wins publicly and often.', author: 'Rachel', isAI: false, timestamp: new Date() },
        { id: 'h9', text: 'Provide home office stipends and equipment.', author: 'Chris', isAI: false, timestamp: new Date() },
      ],
      growthLevel: 8,
      bestAnswerId: 'h2'
    },
    {
      id: '12',
      text: 'How to handle difficult conversations?',
      department: 'management',
      askedBy: 'Sarah',
      answers: [
        { id: 'l1', text: 'AI Insight: Prepare thoroughly, focus on behavior not personality, and follow up in writing.', author: 'AI Copilot', isAI: true, timestamp: new Date() },
        { id: 'l2', text: 'Use the SBI model: Situation, Behavior, Impact.', author: 'David', isAI: false, timestamp: new Date() },
        { id: 'l3', text: 'Choose the right time and private space.', author: 'Emma', isAI: false, timestamp: new Date() },
        { id: 'l4', text: 'Listen more than you speak.', author: 'Mike', isAI: false, timestamp: new Date() },
      ],
      growthLevel: 3,
    },

    // Design Department (Willow Trees)
    {
      id: '13',
      text: 'How to create accessible designs?',
      department: 'design',
      askedBy: 'Lisa',
      answers: [
        { id: 'm1', text: 'AI Insight: Follow WCAG guidelines, ensure color contrast, provide alt text, and test with screen readers.', author: 'AI Copilot', isAI: true, timestamp: new Date() },
        { id: 'm2', text: 'Design for keyboard navigation from the start.', author: 'Rachel', isAI: false, timestamp: new Date() },
        { id: 'm3', text: 'Use semantic HTML and proper heading hierarchy.', author: 'Sarah', isAI: false, timestamp: new Date() },
        { id: 'm4', text: 'Test with actual users who have disabilities.', author: 'Emma', isAI: false, timestamp: new Date() },
        { id: 'm5', text: 'Color should not be the only way to convey information.', author: 'David', isAI: false, timestamp: new Date() },
        { id: 'm6', text: 'Provide clear focus indicators for interactive elements.', author: 'Alex', isAI: false, timestamp: new Date() },
      ],
      growthLevel: 5,
      bestAnswerId: 'm3'
    },
    {
      id: '14',
      text: 'Tips for conducting user research?',
      department: 'design',
      askedBy: 'Alex',
      answers: [
        { id: 'n1', text: 'AI Insight: Define clear research goals, recruit diverse participants, and look for patterns in feedback.', author: 'AI Copilot', isAI: true, timestamp: new Date() },
        { id: 'n2', text: 'Ask "why" at least 5 times to get to root causes.', author: 'Lisa', isAI: false, timestamp: new Date() },
        { id: 'n3', text: 'Observe behavior, not just listen to what they say.', author: 'Rachel', isAI: false, timestamp: new Date() },
        { id: 'n4', text: 'Record sessions (with permission) for later analysis.', author: 'Emma', isAI: false, timestamp: new Date() },
      ],
      growthLevel: 3,
    },
    {
      id: '15',
      text: 'How to maintain design system consistency?',
      department: 'design',
      askedBy: 'Rachel',
      answers: [
        { id: 'o1', text: 'AI Insight: Create comprehensive documentation, use design tokens, and establish governance processes.', author: 'AI Copilot', isAI: true, timestamp: new Date() },
        { id: 'o2', text: 'Regular design system office hours for questions.', author: 'Lisa', isAI: false, timestamp: new Date() },
        { id: 'o3', text: 'Version your components and communicate changes.', author: 'Alex', isAI: false, timestamp: new Date() },
        { id: 'o4', text: 'Audit existing products quarterly for consistency.', author: 'Sarah', isAI: false, timestamp: new Date() },
        { id: 'o5', text: 'Make contribution easy with clear guidelines.', author: 'Emma', isAI: false, timestamp: new Date() },
        { id: 'o6', text: 'Showcase examples of good and bad usage.', author: 'David', isAI: false, timestamp: new Date() },
        { id: 'o7', text: 'Integrate design tokens into development workflow.', author: 'Mike', isAI: false, timestamp: new Date() },
      ],
      growthLevel: 6,
      bestAnswerId: 'o2'
    },
  ]);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);

  const navigateTo = (screen: Screen) => {
    setScreenHistory([...screenHistory, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop(); // Remove current screen
      const previousScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(previousScreen);
    }
  };

  const addQuestion = (question: Question) => {
    setQuestions([...questions, question]);
    setCurrentQuestionId(question.id);
  };

  const addAnswer = (questionId: string, answer: Answer) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newAnswers = [...q.answers, answer];
        const humanAnswers = newAnswers.filter(a => !a.isAI);
        const growthLevel = humanAnswers.length;
        return { ...q, answers: newAnswers, growthLevel: Math.min(growthLevel, 10) };
      }
      return q;
    }));
  };

  const markBestAnswer = (questionId: string, answerId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return { ...q, bestAnswerId: answerId };
      }
      return q;
    }));
  };

  const currentQuestion = questions.find(q => q.id === currentQuestionId);

  // Common screen props
  const screenProps = {
    navigateTo,
    goBack,
    currentUser,
    setCurrentUser,
    questions,
    addQuestion,
    addAnswer,
    markBestAnswer,
    currentQuestion,
    setCurrentQuestionId,
    notifications,
    setNotifications,
    isLoggedIn,
    setIsLoggedIn,
    canGoBack: screenHistory.length > 1,
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <SimpleLoginScreen {...screenProps} />;
      case 'home':
        return <SimpleHomeScreen {...screenProps} />;
      case 'ask':
        return <SimpleAskScreen {...screenProps} />;
      case 'ai-answer':
        return <SimpleAIAnswerScreen {...screenProps} />;
      case 'my-garden':
        return <SimpleMyGardenScreen {...screenProps} />;
      case 'forest':
        return <SimpleForestScreen {...screenProps} />;
      case 'tree-map':
        return <SimpleTreeMapScreen {...screenProps} />;
      case 'demo-mode':
        return <SimpleDemoMode {...screenProps} />;
      case 'notifications':
        return <SimpleNotificationsScreen {...screenProps} />;
      case 'answer-question':
        return <SimpleAnswerQuestionScreen {...screenProps} />;
      default:
        return <SimpleHomeScreen {...screenProps} />;
    }
  };

  return renderScreen();
}