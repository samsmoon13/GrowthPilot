export interface Department {
  id: string;
  name: string;
  color: string;
  seedType: 'round' | 'angular' | 'binary' | 'geometric' | 'elegant';
  treeSpecies: 'maple' | 'oak' | 'pine' | 'elm' | 'willow';
  description: string;
}

export const departments: Department[] = [
  {
    id: 'creativity',
    name: 'Creativity',
    color: '#10B981', // Emerald Green
    seedType: 'round',
    treeSpecies: 'maple',
    description: 'Creative thinking and innovation'
  },
  {
    id: 'tech',
    name: 'Tech',
    color: '#059669', // Dark Emerald
    seedType: 'angular',
    treeSpecies: 'oak',
    description: 'Technology and infrastructure'
  },
  {
    id: 'coding',
    name: 'Coding',
    color: '#34D399', // Light Emerald
    seedType: 'binary',
    treeSpecies: 'pine',
    description: 'Software development and engineering'
  },
  {
    id: 'management',
    name: 'Management',
    color: '#047857', // Deep Green
    seedType: 'geometric',
    treeSpecies: 'elm',
    description: 'Leadership and operations'
  },
  {
    id: 'design',
    name: 'Design',
    color: '#6EE7B7', // Mint Green
    seedType: 'elegant',
    treeSpecies: 'willow',
    description: 'Visual design and user experience'
  }
];

export const getDepartmentById = (id: string): Department | undefined => {
  return departments.find(dept => dept.id === id);
};

export const getDepartmentColor = (id: string): string => {
  const dept = getDepartmentById(id);
  return dept?.color || '#10B981';
};

export const getDepartmentName = (id: string): string => {
  const dept = getDepartmentById(id);
  return dept?.name || 'General';
};