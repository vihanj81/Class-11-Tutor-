
import React from 'react';
import { Mode } from '../types';
import { AcademicCapIcon, BeakerIcon, CheckBadgeIcon } from './IconComponents';

interface ModeSelectorProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

const modes: { id: Mode; name: string; icon: React.ElementType }[] = [
  { id: 'LEARN', name: 'Learn', icon: AcademicCapIcon },
  { id: 'PRACTICE', name: 'Practice', icon: BeakerIcon },
  { id: 'ASSESS', name: 'Assess', icon: CheckBadgeIcon },
];

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="flex space-x-2 mt-4">
      {modes.map(({ id, name, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onModeChange(id)}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            currentMode === id
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          <Icon className="h-5 w-5" />
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
