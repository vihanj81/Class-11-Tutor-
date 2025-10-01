
import React, { useState } from 'react';
import { Chapter, Mode } from './types';
import ChapterSelection from './components/ChapterSelection';
import TutorView from './components/TutorView';
import { BookOpenIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);

  const handleChapterSelect = (chapter: Chapter) => {
    setCurrentChapter(chapter);
  };

  const handleBackToChapters = () => {
    setCurrentChapter(null);
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 antialiased">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <BookOpenIcon className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Accounts Tutor 11
              </h1>
            </div>
            {currentChapter && (
              <button
                onClick={handleBackToChapters}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                &larr; Back to Chapters
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {!currentChapter ? (
          <ChapterSelection onChapterSelect={handleChapterSelect} />
        ) : (
          <TutorView chapter={currentChapter} />
        )}
      </main>
       <footer className="text-center py-4 text-xs text-slate-500">
        <p>Powered by AI. Always verify information with your teacher.</p>
      </footer>
    </div>
  );
};

export default App;
