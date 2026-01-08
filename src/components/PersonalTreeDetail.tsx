import { motion } from 'motion/react';
import { X, Clock, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { departments, getDepartmentById } from '../config/departments';

interface Contribution {
  id: string;
  question: string;
  department: string;
  timestamp: string;
  value: 'integrity' | 'responsibility' | 'communication' | 'quality';
}

interface PersonalTreeDetailProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  answersGiven: number;
  colleaguesHelped: number;
  departmentsSupported: string[];
  contributions: Contribution[];
}

const companyValues = {
  integrity: { name: 'Integrity', color: '#3b82f6', icon: '🛡️' },
  responsibility: { name: 'Responsibility', color: '#10b981', icon: '🎯' },
  communication: { name: 'Communication', color: '#8b5cf6', icon: '💬' },
  quality: { name: 'Quality Assurance', color: '#f59e0b', icon: '✨' },
};

export function PersonalTreeDetail({
  isOpen,
  onClose,
  userName,
  answersGiven,
  colleaguesHelped,
  departmentsSupported,
  contributions,
}: PersonalTreeDetailProps) {
  if (!isOpen) return null;

  // Calculate value distribution
  const valueDistribution = contributions.reduce((acc, c) => {
    acc[c.value] = (acc[c.value] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-white mb-2">{userName}'s Personal Growth Tree</h2>
              <p className="text-white/90">
                A living record of knowledge shared and colleagues helped
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur rounded-lg p-3">
              <p className="text-white/80 text-sm mb-1">Questions Answered</p>
              <p className="text-white text-2xl">{answersGiven}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-3">
              <p className="text-white/80 text-sm mb-1">Colleagues Helped</p>
              <p className="text-white text-2xl">{colleaguesHelped}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-3">
              <p className="text-white/80 text-sm mb-1">Departments Supported</p>
              <p className="text-white text-2xl">{departmentsSupported.length}</p>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
          {/* Company Values Distribution */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Award className="size-5 text-gray-900" />
              <h3 className="text-gray-900">Company Values Reflected</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(companyValues).map(([key, value]) => {
                const count = valueDistribution[key] || 0;
                const percentage = answersGiven > 0 ? (count / answersGiven) * 100 : 0;
                return (
                  <div
                    key={key}
                    className="border-2 rounded-xl p-4 hover:shadow-md transition-shadow"
                    style={{ borderColor: value.color }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{value.icon}</span>
                        <p className="text-gray-900">{value.name}</p>
                      </div>
                      <Badge
                        style={{ backgroundColor: `${value.color}20`, color: value.color }}
                        className="border-0"
                      >
                        {count} answers
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: value.color,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{percentage.toFixed(0)}% of contributions</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Department Reach */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Users className="size-5 text-gray-900" />
              <h3 className="text-gray-900">Cross-Department Impact</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {departmentsSupported.map((deptId) => {
                const dept = getDepartmentById(deptId);
                if (!dept) return null;
                const count = contributions.filter((c) => c.department === deptId).length;
                return (
                  <div
                    key={deptId}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2"
                    style={{
                      borderColor: dept.color,
                      backgroundColor: `${dept.color}10`,
                    }}
                  >
                    <span className="text-lg">{dept.emoji}</span>
                    <div>
                      <p className="text-sm text-gray-900" style={{ color: dept.color }}>
                        {dept.name}
                      </p>
                      <p className="text-xs text-gray-600">{count} contributions</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Growth Timeline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="size-5 text-gray-900" />
              <h3 className="text-gray-900">Growth Timeline</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Each answer you provide adds a new branch or leaf to your Personal Tree
            </p>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-blue-500" />

              {/* Contribution nodes */}
              <div className="space-y-4">
                {contributions.map((contribution, idx) => {
                  const dept = getDepartmentById(contribution.department);
                  const value = companyValues[contribution.value];
                  if (!dept) return null;

                  return (
                    <motion.div
                      key={contribution.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="relative pl-16"
                    >
                      {/* Node marker */}
                      <div
                        className="absolute left-3 top-3 size-6 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                        style={{ backgroundColor: dept.color }}
                      >
                        <div className="size-2 bg-white rounded-full" />
                      </div>

                      {/* Content card */}
                      <div
                        className="bg-white border-2 rounded-xl p-4 hover:shadow-md transition-shadow"
                        style={{ borderColor: `${dept.color}40` }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              style={{
                                backgroundColor: `${dept.color}20`,
                                color: dept.color,
                              }}
                              className="border-0"
                            >
                              {dept.name}
                            </Badge>
                            <Badge
                              variant="outline"
                              style={{
                                borderColor: value.color,
                                color: value.color,
                              }}
                            >
                              {value.icon} {value.name}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">{contribution.timestamp}</p>
                        </div>
                        <p className="text-sm text-gray-900">{contribution.question}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Start marker */}
              <div className="relative pl-16 mt-6">
                <div className="absolute left-3 top-3 size-6 rounded-full bg-gray-300 border-4 border-white shadow flex items-center justify-center">
                  <TrendingUp className="size-3 text-white" />
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-3">
                  <p className="text-sm text-gray-600">🌱 Journey started</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>💡</span>
              <span>Keep helping colleagues to grow your Personal Tree!</span>
            </div>
            <Button
              onClick={onClose}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
