import React, { useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { JournalEditor } from '../components/journal/JournalEditor';
import { JournalEntry } from '../components/journal/JournalEntry';
import { useJournal } from '../hooks/useJournal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { journalService } from '../services/journal';
import { useUser } from '@clerk/clerk-react';

export const Journal: React.FC = () => {
  const { entries, isLoading, error, addEntry } = useJournal();
  const { user } = useUser();

  // Test journal entry creation
  useEffect(() => {
    const testConnection = async () => {
      if (!user?.id) {
        console.log('No user ID available');
        return;
      }

      try {
        console.log('Testing journal entry creation with user ID:', user.id);
        const testEntry = {
          content: 'Test entry ' + new Date().toISOString(),
          type: 'text' as const,
          mood: 'neutral' as const,
          tags: ['test']
        };

        const result = await journalService.addEntry(user.id, testEntry);
        console.log('Test entry created successfully:', result);
      } catch (error) {
        console.error('Failed to create test entry:', error);
      }
    };

    testConnection();
  }, [user?.id]);

  const handleSave = async (content: string, tags: string[]) => {
    if (!content.trim() || !user?.id) return;
    
    try {
      await addEntry({
        content: content.trim(),
        tags,
        type: 'text',
        mood: 'neutral',
      });
    } catch (error) {
      console.error('Failed to save journal entry:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>Error loading journal entries</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Journal"
        description="Record your thoughts, feelings, and progress on your journey"
      />
      <JournalEditor onSave={handleSave} />
      <div className="space-y-6">
        {entries.map(entry => (
          <JournalEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};