import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  serverTimestamp,
  Firestore
} from 'firebase/firestore/lite';
import { db } from '@/utils/database';
import { Flashcard, FlashcardInput } from '@/types/flashcard.types';
import { localFlashcardService } from '@/services/localFlashcardService';

const COLLECTION_NAME = 'cards';

// Helper to get non-null db or throw if accessed incorrectly
function getDb(): Firestore {
  if (!db) {
    throw new Error('Firestore is not initialized. Firebase is disabled.');
  }
  return db;
}

const firestoreService = {
  async getFlashcards(): Promise<Flashcard[]> {
    const q = query(collection(getDb(), COLLECTION_NAME));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Flashcard));
  },

  async getActiveFlashcards(): Promise<Flashcard[]> {
    const q = query(
      collection(getDb(), COLLECTION_NAME), 
      where('isActive', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Flashcard));
  },

  async createFlashcard(card: FlashcardInput): Promise<string> {
    const docRef = await addDoc(collection(getDb(), COLLECTION_NAME), {
      ...card,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  async updateFlashcard(id: string, card: Partial<FlashcardInput>): Promise<void> {
    const docRef = doc(getDb(), COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...card,
      updatedAt: serverTimestamp()
    });
  },

  async deleteFlashcard(id: string): Promise<void> {
    const docRef = doc(getDb(), COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }
};

// If Firebase db is configured, route to Firestore. Else, fallback to local storage.
export const flashcardService = db ? firestoreService : localFlashcardService;
