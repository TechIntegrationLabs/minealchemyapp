import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { journalService } from '../services/journal';
import type { JournalEntry } from '../types';

export const useJournal = (userId?: string) => {
  const { user } = useUser();
  const actualUserId = userId ?? user?.id;
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!actualUserId) {
      setIsLoading(false);
      return;
    }
    
    const loadEntries = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Loading entries for user:', actualUserId);
        const userEntries = await journalService.getUserEntries(actualUserId);
        setEntries(userEntries);
      } catch (err) {
        console.error('Error loading entries:', err);
        setError(err instanceof Error ? err : new Error('Failed to load journal entries'));
      } finally {
        setIsLoading(false);
      }
    };

    loadEntries();
  }, [actualUserId]);

  const addEntry = async (entry: Omit<JournalEntry, 'id' | 'date' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!actualUserId) throw new Error('User must be logged in to add entries');

    try {
      setError(null);
      const newEntry = await journalService.addEntry(actualUserId, entry);
      setEntries(prev => [newEntry, ...prev]);
      return newEntry.id;
    } catch (err) {
      console.error('Error adding entry:', err);
      setError(err instanceof Error ? err : new Error('Failed to add journal entry'));
      throw err;
    }
  };

  const updateEntry = async (entryId: string, updates: Partial<JournalEntry>) => {
    if (!actualUserId) throw new Error('User must be logged in to update entries');

    try {
      setError(null);
      await journalService.updateEntry(entryId, actualUserId, updates);
      setEntries(prev => 
        prev.map(entry => 
          entry.id === entryId 
            ? { ...entry, ...updates, updatedAt: new Date() }
            : entry
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update journal entry'));
      throw err;
    }
  };

  const deleteEntry = async (entryId: string) => {
    if (!actualUserId) throw new Error('User must be logged in to delete entries');

    try {
      setError(null);
      await journalService.deleteEntry(entryId, actualUserId);
      setEntries(prev => prev.filter(entry => entry.id !== entryId));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete journal entry'));
      throw err;
    }
  };

  return {
    entries,
    isLoading,
    error,
    addEntry,
    updateEntry,
    deleteEntry
  };
};
