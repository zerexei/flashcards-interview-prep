import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-800 py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-lg font-bold tracking-tighter mb-2">
              AD<span className="text-accent">.</span> Flashcards
            </h3>
            <p className="text-zinc-500 text-sm max-w-xs">
              A standalone technical flashcard application with AI-powered answers review.
            </p>
          </div>
          <div>
            <p className="text-zinc-600 text-xs font-mono">
              © {new Date().getFullYear()} Angelo Dave Arcillas. Built with React & Tailwind.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
