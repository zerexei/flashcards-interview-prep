import { Flashcard, FlashcardInput } from '@/types/flashcard.types';

const STORAGE_KEY = 'flashcards_local_v1';

const SEED_CARDS: Flashcard[] = [
  {
    id: 'seed-1',
    question: 'What is Big-O notation and why does it matter?',
    fixedAnswer:
      "Big-O notation expresses the upper bound on an algorithm's time or space complexity as input size (n) grows. " +
      'It lets you compare algorithms independent of hardware. ' +
      'Common complexities: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) merge sort, O(n\u00B2) nested loops.',
    questionPrompt: 'Define and explain',
    tags: ['Big-O / Complexity'],
    difficulty: 2,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-2',
    question: 'What is the difference between a stack and a queue?',
    fixedAnswer:
      'Stack: LIFO (Last-In First-Out) — push/pop from one end. Used in: call stacks, undo operations, DFS. ' +
      'Queue: FIFO (First-In First-Out) — enqueue at back, dequeue from front. Used in: BFS, task scheduling, event queues.',
    questionPrompt: 'Compare and contrast',
    tags: ['Stack', 'Queue'],
    difficulty: 1,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-3',
    question: 'Explain how a hash table works and what happens on collision.',
    fixedAnswer:
      'A hash table maps keys to array indices via a hash function. ' +
      'Collisions are handled by: (1) Chaining — each bucket holds a linked list; ' +
      '(2) Open addressing — probe for the next empty slot. ' +
      'Average O(1) for get/set; worst case O(n) with many collisions.',
    questionPrompt: 'Explain the internals',
    tags: ['Hash Table'],
    difficulty: 3,
    cardType: 'understanding',
    isActive: true,
  },
];

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
