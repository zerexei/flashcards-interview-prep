import React, { useState, useEffect, useMemo } from 'react';
import { Section } from '@/components/Section';
import { useAuthContext } from '@/context/AuthContext';
import { cn } from '@/utils/cn';
import {
  ChevronRight,
  RotateCcw,
  Tag,
  Award,
  Brain,
  Send,
  Loader2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useFlashcards } from '@/hooks/useFlashcards';
import { Flashcard, TAG_CATEGORIES } from '@/types/flashcard.types';
import { Link } from 'react-router-dom';
import { useModel } from '@/hooks/useModel';
import ROUTES from '@/routes';

interface AiEvaluationResult {
  score: number;
  correct: string[];
  missing: string[];
  suggestion: string;
}

export const FlashcardGamePage: React.FC = () => {
  const { isAuth, isAdmin } = useAuthContext();

  const { cards, loading, fetchCards } = useFlashcards();
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Deep Mode — persisted to localStorage
  const [isDeepMode, setIsDeepMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('deepMode') === 'true';
  });
  const [userAnswer, setUserAnswer] = useState('');
  const [aiResponse, setAiResponse] = useState<AiEvaluationResult | null>(null);

  const model = useModel();

  useEffect(() => {
    fetchCards(true); // Only active cards
  }, [fetchCards]);

  useEffect(() => {
    localStorage.setItem('deepMode', String(isDeepMode));
  }, [isDeepMode]);

  const filteredCards = useMemo(
    () =>
      selectedTags.length > 0
        ? cards.filter(card => card.tags.some(tag => selectedTags.includes(tag)))
        : cards,
    [cards, selectedTags],
  );

  const getRandomCard = (): Flashcard | null => {
    if (filteredCards.length === 0) return null;
    if (filteredCards.length === 1) return filteredCards[0];

    // Avoid repeating the same card back-to-back
    const pool = currentCard
      ? filteredCards.filter(c => c.id !== currentCard.id)
      : filteredCards;

    return pool[Math.floor(Math.random() * pool.length)];
  };

  const resetCardState = () => {
    setIsRevealed(false);
    setUserAnswer('');
    setAiResponse(null);
  };

  const handleStart = () => {
    setCurrentCard(getRandomCard());
    setHasStarted(true);
    resetCardState();
  };

  const handleNext = () => {
    setCurrentCard(getRandomCard());
    resetCardState();
  };

  const aiValidation = async () => {
    if (!userAnswer.trim() || !currentCard) return;

    setAiResponse(null);

    const prompt = `
      Evaluate the following flashcard answer.
      Question: ${currentCard.question}
      Expected Answer: ${currentCard.fixedAnswer}
      User's Answer: ${userAnswer}
      Card Type: ${currentCard.cardType}
      Difficulty: ${currentCard.difficulty}
      Tags: ${currentCard.tags.join(', ')}

      Return a JSON object in this format:
      {
        "score": number (1-5),
        "correct": string[],
        "missing": string[],
        "suggestion": string
      }
      Return ONLY the JSON object. No markdown code blocks, no extra explanation. Be strict but fair in scoring.
    `;

    try {
      const response = await model.generate(prompt);
      const cleanJson = response.replace(/```json|```/g, '').trim();
      const result = JSON.parse(cleanJson) as AiEvaluationResult;

      // Use != null to correctly handle a score of 0
      if (result.score != null && result.suggestion) {
        setAiResponse(result);
        setIsRevealed(true);
      }
    } catch (err) {
      console.error('AI evaluation failed:', err);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    );
  };

  if (loading && cards.length === 0) {
    return (
      <Section className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </Section>
    );
  }

  return (
    <Section
      id="flashcards"
      className="min-h-[80vh] flex flex-col items-center justify-center max-w-3xl"
    >
      <div className="w-full space-y-6">
        {/* Unified Session Controls Toolbar */}
        {hasStarted && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
            <div className="text-left">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Study <span className="text-primary">Session</span>
              </h1>
              <p className="text-neutral-foreground text-xs">Test your computer science and engineering knowledge</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={cn(
                  'button button-sm gap-2',
                  isSettingsOpen ? 'button-primary' : 'button-secondary',
                )}
              >
                <Brain size={16} />
                {isSettingsOpen ? 'Hide Filters' : 'Show Filters'}
              </button>

              <button
                onClick={() => setIsDeepMode(!isDeepMode)}
                disabled={!isAuth}
                title={isAuth ? 'Toggle AI Evaluation' : 'Log in to use AI Evaluation'}
                className={cn(
                  'button button-sm gap-2',
                  isDeepMode ? 'button-accent' : 'button-secondary',
                  !isAuth && 'cursor-not-allowed opacity-50',
                )}
              >
                <Sparkles size={14} />
                Deep Mode {isDeepMode ? 'On' : 'Off'}
              </button>
            </div>
          </div>
        )}

        {/* Filter Panel (Inline Collapsible) */}
        {hasStarted && isSettingsOpen && (
          <div className="card p-6 rounded-2xl animate-slide-up space-y-6 border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain size={16} className="text-primary" />
                <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">
                  Filter by Topic
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedTags([])}
                  className="button button-link text-[10px] uppercase tracking-widest font-bold"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="button button-link text-[10px] uppercase tracking-widest font-bold"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[40vh] overflow-y-auto pr-2">
              {Object.entries(TAG_CATEGORIES).map(([category, tags]) => (
                <div key={category} className="space-y-3">
                  <h4 className="text-[10px] font-bold text-neutral-foreground uppercase tracking-widest border-b border-border pb-1">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          'badge transition-all duration-200 cursor-pointer',
                          selectedTags.includes(tag) ? 'badge-info' : 'hover:border-primary/50',
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!hasStarted ? (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Technical <span className="text-primary">Flashcards</span>
              </h1>
              <p className="text-neutral-foreground text-sm max-w-sm mx-auto">
                Test your knowledge with quick technical questions.
              </p>
            </div>
            <button
              onClick={handleStart}
              className="button button-primary button-lg rounded-full px-10"
            >
              Start Session
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">

            {/* Card UI */}
            <div
              className={cn(
                'card relative min-h-[350px] w-full p-8 md:p-12 rounded-3xl flex flex-col justify-center transition-all duration-500',
                (isRevealed || aiResponse) && 'border-primary/30',
              )}
            >
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-4 text-[10px] uppercase tracking-widest font-bold text-neutral-foreground">
                <span className="flex items-center gap-1">
                  <Award size={12} className="text-primary" />
                  Difficulty: {currentCard?.difficulty}/5
                </span>
              </div>

              <div className="space-y-6 text-center">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-primary font-bold">
                    {currentCard?.questionPrompt}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-medium text-foreground leading-tight">
                    {currentCard?.question}
                  </h2>
                </div>

                {/* Deep Mode Input */}
                {isDeepMode && !isRevealed && !aiResponse && (
                  <div className="pt-4 space-y-4 animate-slide-up">
                    <textarea
                      value={userAnswer}
                      onChange={e => setUserAnswer(e.target.value)}
                      placeholder="Type your answer here…"
                      className="form-textarea h-32 resize-none"
                    />
                    <button
                      onClick={aiValidation}
                      disabled={!userAnswer.trim() || model.loading}
                      className="w-full button button-secondary gap-2"
                    >
                      {model.loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Evaluating your answer…
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Submit for AI Review
                        </>
                      )}
                    </button>

                    {model.error && (
                      <div className="badge badge-danger w-full justify-center rounded-xl py-3">
                        Something went wrong. Please try again.
                      </div>
                    )}
                  </div>
                )}

                {/* AI Response Display */}
                {aiResponse && (
                  <div className="pt-8 border-t border-border text-left space-y-6 animate-slide-up">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <Sparkles size={18} />
                        <span className="uppercase tracking-widest text-xs">AI Evaluation</span>
                      </div>
                      <div className="text-2xl font-bold text-foreground">
                        Score: {aiResponse.score}/5
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-success uppercase tracking-widest">
                          What&apos;s correct:
                        </h4>
                        <ul className="text-sm text-neutral-foreground space-y-1 list-disc pl-4">
                          {aiResponse.correct.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-danger uppercase tracking-widest">
                          What&apos;s missing:
                        </h4>
                        <ul className="text-sm text-neutral-foreground space-y-1 list-disc pl-4">
                          {aiResponse.missing.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                      <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                        Suggestion:
                      </h4>
                      <p className="text-sm text-neutral-foreground italic">
                        &ldquo;{aiResponse.suggestion}&rdquo;
                      </p>
                    </div>
                  </div>
                )}

                {/* Fixed Answer Reveal */}
                {isRevealed && !aiResponse && (
                  <div className="pt-8 border-t border-border animate-slide-up">
                    <p className="text-foreground text-lg leading-relaxed">
                      {currentCard?.fixedAnswer}
                    </p>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="absolute bottom-3 left-0 right-0 px-8 flex flex-wrap justify-center gap-2">
                {currentCard?.tags.map(tag => (
                  <span key={tag} className="badge flex items-center gap-1">
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              {!isRevealed && !aiResponse && !isDeepMode && (
                <button
                  onClick={() => setIsRevealed(true)}
                  className="w-full sm:w-auto button button-secondary button-lg"
                >
                  Reveal Answer
                </button>
              )}

              {(isRevealed || aiResponse) && (
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto button button-primary button-lg group"
                >
                  Next Card
                  <ChevronRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </button>
              )}

              <button
                onClick={() => {
                  setHasStarted(false);
                  resetCardState();
                }}
                className="button button-ghost button-sm gap-2"
              >
                <RotateCcw size={14} />
                Reset session
              </button>
            </div>
          </div>
        )}

        {/* Admin Entry */}
        {isAdmin && (
          <div className="mt-16 pt-6 border-t border-border flex justify-center animate-fade-in">
            <Link
              to={ROUTES.admin.flashcards.path}
              className="group flex items-center gap-2 text-xs font-bold text-neutral-foreground hover:text-primary transition-colors uppercase tracking-wider"
            >
              <ShieldCheck size={14} />
              Manage Cards
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        )}
      </div>
    </Section>
  );
};
