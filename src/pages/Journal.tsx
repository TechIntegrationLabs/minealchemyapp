import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { JournalEditor } from '../components/journal/JournalEditor';
import { JournalEntry } from '../components/journal/JournalEntry';
import { useAuth } from '../components/AuthProvider';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, addDoc, onSnapshot, serverTimestamp, getDocs } from 'firebase/firestore';
import type { JournalEntry as JournalEntryType } from '../types';

export const Journal: React.FC = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setError('No user logged in');
      setIsLoading(false);
      return;
    }

    const journalRef = collection(db, 'journalEntries');
    const q = query(
      journalRef,
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
        const journalEntries = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            userId: data.userId,
            content: data.content,
            tags: data.tags || [],
            type: data.type || 'text',
            date: data.date?.toDate() || new Date(),
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date()
          } as JournalEntryType;
        });
        setEntries(journalEntries);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        console.error('Error processing entries:', err);
        setError('Error processing entries: ' + (err as Error).message);
        setIsLoading(false);
      }
    }, (error) => {
      console.error('Error in snapshot listener:', error);
      setError('Error loading entries: ' + error.message);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSave = async (content: string, tags: string[]) => {
    if (!user) {
      setError('Must be logged in to save entries');
      return;
    }

    if (!content.trim()) {
      setError('Entry cannot be empty');
      return;
    }

    setError(null);
    try {
      const journalRef = collection(db, 'journalEntries');
      const now = serverTimestamp();
      const newEntry = {
        userId: user.uid,
        content: content.trim(),
        tags: tags.filter(tag => tag.trim() !== ''),
        type: 'text',
        date: now,
        createdAt: now,
        updatedAt: now
      };

      await addDoc(journalRef, newEntry);
    } catch (error) {
      console.error('Error saving journal entry:', error);
      setError('Error saving entry: ' + (error as Error).message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Journal"
        description="Record your thoughts, feelings, and progress on your journey"
      />
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <JournalEditor onSave={handleSave} />
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No journal entries yet. Start writing your first entry above!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {entries.map((entry) => (
            <JournalEntry key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};