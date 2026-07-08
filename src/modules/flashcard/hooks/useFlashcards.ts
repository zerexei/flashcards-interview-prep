import { useState, useCallback } from 'react';
import { Flashcard, FlashcardInput } from '../types/flashcard.types';
import { flashcardService } from '../services/flashcardService';

export const useFlashcards = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCards = useCallback(async (onlyActive = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = onlyActive
        ? await flashcardService.getActiveFlashcards()
        : await flashcardService.getFlashcards();
      setCards(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch flashcards');
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCard = async (card: FlashcardInput) => {
    setLoading(true);
    try {
      await flashcardService.createFlashcard(card);
      await fetchCards();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create flashcard');
      setError(error);
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCard = async (id: string, card: Partial<FlashcardInput>) => {
    setLoading(true);
    try {
      await flashcardService.updateFlashcard(id, card);
      setCards(prev => prev.map(c => c.id === id ? { ...c, ...card } : c));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update flashcard');
      setError(error);
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async (id: string) => {
    setLoading(true);
    try {
      await flashcardService.deleteFlashcard(id);
      setCards(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete flashcard');
      setError(error);
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = (id: string, currentState: boolean) =>
    updateCard(id, { isActive: !currentState });

  return {
    cards,
    loading,
    error,
    fetchCards,
    createCard,
    updateCard,
    deleteCard,
    toggleActive,
  };
};
