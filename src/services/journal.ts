import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  Timestamp,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../lib/firebase';
import type { JournalEntry } from '../types';

const COLLECTION_NAME = 'journal_entries';

export const journalService = {
  // Test function to verify Firestore access
  async testAccess() {
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        throw new Error('No authenticated user');
      }

      console.log('Testing Firestore access...', {
        userId: auth.currentUser.uid,
        isAnonymous: auth.currentUser.isAnonymous,
      });

      const testDoc = doc(db, 'test_access', 'test_document');
      await setDoc(testDoc, { 
        timestamp: Timestamp.now(),
        userId: auth.currentUser.uid
      });
      console.log('Successfully wrote to Firestore');
      
      const docSnap = await getDoc(testDoc);
      console.log('Successfully read from Firestore:', {
        exists: docSnap.exists(),
        data: docSnap.data()
      });
      
      return true;
    } catch (error) {
      console.error('Firestore access test failed:', {
        error,
        errorCode: error.code,
        errorMessage: error.message,
        errorStack: error.stack
      });
      throw error;
    }
  },

  async addEntry(userId: string, entry: Omit<JournalEntry, 'id' | 'date'>) {
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        throw new Error('No authenticated user');
      }

      console.log('Adding journal entry:', { 
        userId,
        collectionName: COLLECTION_NAME,
        authUserId: auth.currentUser.uid
      });
      
      const entryData = {
        ...entry,
        userId,
        date: Timestamp.now(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      console.log('Entry data prepared:', entryData);
      
      const collectionRef = collection(db, COLLECTION_NAME);
      const docRef = await addDoc(collectionRef, entryData);
      console.log('Entry successfully added with ID:', docRef.id);
      
      return {
        id: docRef.id,
        ...entryData,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } catch (error) {
      console.error('Error adding journal entry:', {
        error,
        errorCode: error.code,
        errorMessage: error.message,
        errorStack: error.stack,
        userId
      });
      throw error;
    }
  },

  async getUserEntries(userId: string) {
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        throw new Error('No authenticated user');
      }

      console.log('Getting entries for user:', userId);
      console.log('Using collection:', COLLECTION_NAME);
      
      const entriesRef = collection(db, COLLECTION_NAME);
      console.log('Collection reference created');
      
      const q = query(
        entriesRef,
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );
      console.log('Query created');
      
      const querySnapshot = await getDocs(q);
      console.log('Query executed, found entries:', querySnapshot.size);
      
      const entries = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        };
      });
      
      console.log('Processed entries:', entries.length);
      return entries as JournalEntry[];
    } catch (error) {
      console.error('Error getting user journal entries:', error);
      throw error;
    }
  },

  async updateEntry(entryId: string, userId: string, updates: Partial<JournalEntry>) {
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        throw new Error('No authenticated user');
      }

      console.log('Updating entry:', entryId, 'for user:', userId);
      const docRef = doc(db, COLLECTION_NAME, entryId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
      console.log('Entry updated successfully');
    } catch (error) {
      console.error('Error updating journal entry:', error);
      throw error;
    }
  },

  async deleteEntry(entryId: string, userId: string) {
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        throw new Error('No authenticated user');
      }

      console.log('Deleting entry:', entryId, 'for user:', userId);
      const docRef = doc(db, COLLECTION_NAME, entryId);
      await deleteDoc(docRef);
      console.log('Entry deleted successfully');
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      throw error;
    }
  }
};
