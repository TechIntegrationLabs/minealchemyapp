export type JournalEntry = {
  id: string;
  content: string;
  date: Date;
  userId: string;
  type: 'text' | 'voice';
  mood: 'happy' | 'neutral' | 'sad' | 'anxious' | 'grateful' | 'hopeful';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};
