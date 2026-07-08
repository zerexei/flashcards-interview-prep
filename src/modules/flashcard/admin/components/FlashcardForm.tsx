import React, { useState } from 'react';
import { Flashcard, FlashcardInput, TAG_CATEGORIES } from '../../types/flashcard.types';
import { cn } from '@/utils/cn';
import { X as CloseIcon, Plus } from 'lucide-react';

interface FlashcardFormProps {
  initialData?: Flashcard;
  onSubmit: (data: FlashcardInput) => Promise<void>;
  onCancel: () => void;
  title: string;
}

const CARD_TYPES = [
  { value: 'recall', label: 'Recall' },
  { value: 'understanding', label: 'Understanding' },
  { value: 'structure', label: 'Structure' },
  { value: 'fill-in', label: 'Fill-in' },
] as const;

export const FlashcardForm: React.FC<FlashcardFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  title,
}) => {
  const [formData, setFormData] = useState<FlashcardInput>({
    question: initialData?.question ?? '',
    fixedAnswer: initialData?.fixedAnswer ?? '',
    questionPrompt: initialData?.questionPrompt ?? '',
    tags: initialData?.tags ?? [],
    difficulty: initialData?.difficulty ?? 3,
    cardType: initialData?.cardType ?? 'recall',
    isActive: initialData?.isActive ?? true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.fixedAnswer.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plus size={18} className="text-primary" />
          <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">{title}</h3>
        </div>
        <button onClick={onCancel} className="button button-ghost p-1!">
          <CloseIcon size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Question</label>
          <textarea
            required
            value={formData.question}
            onChange={e => setFormData({ ...formData, question: e.target.value })}
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Fixed Answer</label>
          <textarea
            required
            value={formData.fixedAnswer}
            onChange={e => setFormData({ ...formData, fixedAnswer: e.target.value })}
            className="form-textarea"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Question Prompt</label>
            <input
              required
              value={formData.questionPrompt}
              onChange={e => setFormData({ ...formData, questionPrompt: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Card Type</label>
            <select
              value={formData.cardType}
              onChange={e =>
                setFormData({ ...formData, cardType: e.target.value as Flashcard['cardType'] })
              }
              className="form-select"
            >
              {CARD_TYPES.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Difficulty (1–5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={formData.difficulty}
              onChange={e => {
                const parsed = parseInt(e.target.value, 10);
                setFormData({ ...formData, difficulty: Number.isNaN(parsed) ? formData.difficulty : parsed });
              }}
              className="form-input"
            />
          </div>
          <div className="flex items-center gap-4 pt-6">
            <label className="form-checkbox-wrapper cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                  className="sr-only"
                />
                <div className={cn(
                  'w-10 h-5 rounded-full transition-colors duration-300',
                  formData.isActive ? 'bg-primary' : 'bg-neutral',
                )} />
                <div className={cn(
                  'absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-300',
                  formData.isActive ? 'translate-x-5' : 'translate-x-0',
                )} />
              </div>
              <span className="form-label group-hover:text-foreground transition-colors">
                Active Card
              </span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Tags</label>
          <div className="max-h-40 overflow-y-auto space-y-4 pr-2">
            {Object.entries(TAG_CATEGORIES).map(([category, tags]: [string, string[]]) => (
              <div key={category} className="space-y-2">
                <p className="text-[9px] text-neutral-foreground font-bold uppercase tracking-widest">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        'badge transition-all duration-200',
                        formData.tags.includes(tag)
                          ? 'badge-info'
                          : 'hover:border-primary/50',
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

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 button button-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-2 button button-primary"
          >
            {isSubmitting ? 'Saving…' : initialData ? 'Update Card' : 'Create Card'}
          </button>
        </div>
      </form>
    </div>
  );
};
