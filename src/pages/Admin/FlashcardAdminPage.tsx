import React, { useEffect, useState } from 'react';
import { Section } from '@/components/Section';
import { useFlashcards } from '@/hooks/useFlashcards';
import { Flashcard, FlashcardInput } from '@/types/flashcard.types';
import { FlashcardForm } from '@/components/FlashcardForm';
import { cn } from '@/utils/cn';
import {
  Plus,
  Edit2,
  Trash2,
  Tag,
  Award,
  CheckCircle2,
  XCircle,
  Loader2,
  Search,
  ChevronLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '@/routes';

export const FlashcardAdminPage: React.FC = () => {
  const { cards, loading, fetchCards, createCard, updateCard, deleteCard, toggleActive } =
    useFlashcards();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterCardType, setFilterCardType] = useState<string>('all');
  const [filterActive, setFilterActive] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleCreate = async (data: FlashcardInput) => {
    await createCard(data);
    setIsFormOpen(false);
  };

  const handleUpdate = async (data: FlashcardInput) => {
    if (editingCard) {
      await updateCard(editingCard.id, data);
      setEditingCard(undefined);
      setIsFormOpen(false);
    }
  };

  const filteredCards = cards.filter(card => {
    const matchesSearch =
      card.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty =
      filterDifficulty === 'all' || card.difficulty === parseInt(filterDifficulty, 10);

    const matchesCardType =
      filterCardType === 'all' || card.cardType === filterCardType;

    const matchesActive =
      filterActive === 'all' ||
      (filterActive === 'active' && card.isActive) ||
      (filterActive === 'inactive' && !card.isActive);

    return matchesSearch && matchesDifficulty && matchesCardType && matchesActive;
  });

  return (
    <Section id="admin-cards" className="min-h-screen max-w-6xl">
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <button
              onClick={() => navigate(ROUTES.flashcards.path)}
              className="button button-ghost button-sm gap-2 mb-4"
            >
              <ChevronLeft size={14} />
              Back to Game
            </button>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Card <span className="text-primary">Management</span>
            </h1>
            <p className="text-neutral-foreground text-sm">Manage your technical flashcard collection</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-foreground" size={16} />
              <input
                type="text"
                placeholder="Search cards or tags…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="form-input pl-10 w-full md:w-56"
              />
            </div>

            {/* Filter Difficulty */}
            <select
              value={filterDifficulty}
              onChange={e => setFilterDifficulty(e.target.value)}
              className="form-select w-full md:w-32"
            >
              <option value="all">Difficulty: All</option>
              <option value="1">Difficulty: 1</option>
              <option value="2">Difficulty: 2</option>
              <option value="3">Difficulty: 3</option>
              <option value="4">Difficulty: 4</option>
              <option value="5">Difficulty: 5</option>
            </select>

            {/* Filter Card Type */}
            <select
              value={filterCardType}
              onChange={e => setFilterCardType(e.target.value)}
              className="form-select w-full md:w-36"
            >
              <option value="all">Type: All</option>
              <option value="recall">Recall</option>
              <option value="understanding">Understanding</option>
              <option value="structure">Structure</option>
              <option value="fill-in">Fill-in</option>
            </select>

            {/* Filter Active Status */}
            <select
              value={filterActive}
              onChange={e => setFilterActive(e.target.value)}
              className="form-select w-full md:w-32"
            >
              <option value="all">Status: All</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>

            {/* Create Card Button */}
            <button
              onClick={() => {
                setEditingCard(undefined);
                setIsFormOpen(true);
              }}
              className="button button-primary p-2.5! w-full md:w-auto"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Card List */}
        {loading && cards.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredCards.map(card => (
              <div
                key={card.id}
                className="card group p-6 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        'badge',
                        card.isActive ? 'badge-success' : '',
                      )}>
                        {card.isActive ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                        <span className="ml-1">{card.isActive ? 'Active' : 'Inactive'}</span>
                      </span>
                      <span className="text-[10px] font-bold text-neutral-foreground uppercase tracking-widest flex items-center gap-1">
                        <Award size={10} />
                        Diff: {card.difficulty}
                      </span>
                      <span className="text-[10px] font-bold text-neutral-foreground uppercase tracking-widest">
                        {card.cardType}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-foreground font-medium text-lg line-clamp-2 leading-snug">
                        {card.question}
                      </h3>
                      <p className="text-neutral-foreground text-sm mt-2 line-clamp-1 italic">
                        {card.fixedAnswer}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {card.tags.map(tag => (
                        <span key={tag} className="badge flex items-center gap-1">
                          <Tag size={8} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-start">
                    <button
                      onClick={() => toggleActive(card.id, card.isActive)}
                      title={card.isActive ? 'Deactivate' : 'Activate'}
                      className={cn(
                        'button button-sm',
                        card.isActive ? 'button-success' : 'button-secondary',
                      )}
                    >
                      {card.isActive ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    </button>
                    <button
                      onClick={() => {
                        setEditingCard(card);
                        setIsFormOpen(true);
                      }}
                      className="button button-sm button-secondary"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this card?')) deleteCard(card.id);
                      }}
                      className="button button-sm button-danger"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredCards.length === 0 && !loading && (
              <div className="text-center py-20 border-2 border-dashed border-border rounded-3xl">
                <p className="text-neutral-foreground font-medium">
                  No cards found matching your search.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Overlay Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsFormOpen(false)}
          />
          <div className="relative w-full max-w-2xl card p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <FlashcardForm
              title={editingCard ? 'Edit Flashcard' : 'New Flashcard'}
              initialData={editingCard}
              onSubmit={editingCard ? handleUpdate : handleCreate}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}
    </Section>
  );
};
