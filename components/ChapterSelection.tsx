
import React from 'react';
import { CHAPTERS } from '../constants';
import { Chapter } from '../types';
import { ChevronRightIcon } from './IconComponents';

interface ChapterSelectionProps {
  onChapterSelect: (chapter: Chapter) => void;
}

const ChapterSelection: React.FC<ChapterSelectionProps> = ({ onChapterSelect }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Select a Chapter</h2>
      <p className="text-slate-600 mb-8">Choose a chapter to begin your learning journey.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHAPTERS.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => onChapterSelect(chapter)}
            className="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-xl hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold text-indigo-600">Chapter {chapter.id}</p>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{chapter.title}</h3>
                <p className="text-sm text-slate-500 mt-2">{chapter.description}</p>
              </div>
              <ChevronRightIcon className="h-6 w-6 text-slate-400 mt-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChapterSelection;
