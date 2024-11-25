import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { JournalEditor } from '../components/journal/JournalEditor';
import { JournalEntry } from '../components/journal/JournalEntry';
import { useStore } from '../store/useStore';

const mockEntries = [
  {
    id: '1',
    content: "Today's therapy session was incredibly insightful. We discussed patterns in my thought process and identified several triggers I wasn't aware of before.",
    date: new Date('2024-03-10'),
    tags: ['therapy', 'reflection', 'growth'],
    type: 'text' as const,
  },
  {
    id: '2',
    content: "Completed my first group meditation session. The sense of community and shared purpose was powerful. I'm starting to understand the importance of spiritual connection in recovery.",
    date: new Date('2024-03-09'),
    tags: ['meditation', 'spiritual', 'community'],
    type: 'text' as const,
  },
];

export const Journal: React.FC = () => {
  const handleSave = (content: string, tags: string[]) => {
    console.log('Saving entry:', { content, tags });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Journal"
        description="Record your thoughts, feelings, and progress on your journey"
      />
      <JournalEditor onSave={handleSave} />
      <div className="space-y-6">
        {mockEntries.map((entry) => (
          <JournalEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};