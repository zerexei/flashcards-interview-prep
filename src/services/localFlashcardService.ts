import { Flashcard, FlashcardInput } from '@/types/flashcard.types';
import { SEED_CARDS } from './seedCards';

const STORAGE_KEY = 'flashcards_local_v1';

function load(): Flashcard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...SEED_CARDS];
    return JSON.parse(raw) as Flashcard[];
  } catch {
    return [...SEED_CARDS];
  }
}

function save(cards: Flashcard[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function generateId(): string {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const localFlashcardService = {
  async getFlashcards(): Promise<Flashcard[]> {
    return load();
  },

  async getActiveFlashcards(): Promise<Flashcard[]> {
    return load().filter(c => c.isActive);
  },

  async createFlashcard(card: FlashcardInput): Promise<string> {
    const id = generateId();
    const cards = load();
    cards.push({ id, ...card });
    save(cards);
    return id;
  },

  async updateFlashcard(id: string, patch: Partial<FlashcardInput>): Promise<void> {
    const cards = load().map(c => (c.id === id ? { ...c, ...patch } : c));
    save(cards);
  },

  async deleteFlashcard(id: string): Promise<void> {
    save(load().filter(c => c.id !== id));
  },
};
