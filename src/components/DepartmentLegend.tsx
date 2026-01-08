import { Info } from 'lucide-react';
import { departments } from '../config/departments';
import { DepartmentSeed } from './seeds/SeedIcons';
import { DepartmentTree } from './trees/TreeIcons';

interface DepartmentLegendProps {
  compact?: boolean;
  showDescription?: boolean;
}

export function DepartmentLegend({ compact = false, showDescription = true }: DepartmentLegendProps) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border"
            style={{ 
              borderColor: dept.color,
              backgroundColor: `${dept.color}10`
            }}
          >
            <DepartmentSeed seedType={dept.seedType} color={dept.color} size={20} />
            <span className="text-sm" style={{ color: dept.color }}>
              {dept.name}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Info className="size-5 text-gray-600" />
        <h3 className="text-gray-900">Department Tree Types</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="rounded-xl p-4 border-2 transition-all hover:shadow-md"
            style={{ 
              borderColor: dept.color,
              backgroundColor: `${dept.color}05`
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <DepartmentSeed seedType={dept.seedType} color={dept.color} size={32} />
              <div className="flex-1">
                <p className="text-sm" style={{ color: dept.color }}>
                  <strong>{dept.name}</strong>
                </p>
                <p className="text-xs text-gray-600 capitalize">
                  {dept.treeSpecies} tree
                </p>
              </div>
            </div>

            {/* Description */}
            {showDescription && (
              <p className="text-xs text-gray-600 mb-3">
                {dept.description}
              </p>
            )}

            {/* Tree Preview */}
            <div className="bg-gradient-to-br from-green-50 to-gray-50 rounded-lg p-3 flex justify-center">
              <DepartmentTree
                treeSpecies={dept.treeSpecies}
                color={dept.color}
                size={60}
                stage="mature"
              />
            </div>

            {/* Seed Type Badge */}
            <div className="mt-3 text-center">
              <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${dept.color}20`, color: dept.color }}>
                {dept.seedType} seed
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Growth Rules */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-900 mb-2">
              <strong>✅ Human Answers = Growth</strong>
            </p>
            <p className="text-xs text-gray-600">
              When humans answer questions, the seed grows through stages: seed → sprout → young tree → mature tree
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-900 mb-2">
              <strong>🤖 AI Answers = No Growth</strong>
            </p>
            <p className="text-xs text-gray-600">
              AI provides helpful insights but does NOT contribute to plant growth. Only human knowledge builds trees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
