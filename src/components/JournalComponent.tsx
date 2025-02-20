import { useState } from 'react';
import { useJournal } from '../hooks/useJournal';
import type { JournalEntry } from '../types';

export const JournalComponent = () => {
  const { entries, isLoading, addEntry, error } = useJournal();
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setSubmitting(true);
      await addEntry({ content });
      setContent(''); // Clear the form after successful submission
      // Entry saved successfully!
    } catch (error) {
      console.error('Failed to save entry:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
    </div>
  );

  if (error) return (
    <div className="p-4 text-red-600 bg-red-50 rounded-lg">
      Error: {error.message}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Journal Entry Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your journal entry..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
            disabled={submitting}
          />
        </div>
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className={`px-4 py-2 rounded-lg bg-blue-600 text-white ${
            submitting || !content.trim() 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-blue-700'
          }`}
        >
          {submitting ? 'Saving...' : 'Save Entry'}
        </button>
      </form>

      {/* Journal Entries List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Journal Entries</h2>
        {entries.length === 0 ? (
          <p className="text-gray-500">No entries yet. Start writing!</p>
        ) : (
          entries.map((entry) => (
            <div 
              key={entry.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="whitespace-pre-wrap">{entry.content}</p>
              <span className="text-sm text-gray-500">
                {new Date(entry.date).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
