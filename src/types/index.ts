import { z } from 'zod';

export interface HealthMetric {
  mental: number;
  spiritual: number;
  physical: number;
  social: number;
}

export interface Activity {
  id: string;
  name: string;
  type: keyof HealthMetric;
  description: string;
  healthBoost: string;
  completionCount: number;
  isCustom?: boolean;
  isDefault?: boolean;
  isSuggestion?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  healthMetrics: HealthMetric;
  goals: Goal[];
  journalEntries: JournalEntry[];
  customActivities: Activity[];
  activityCompletions: Record<string, number>;
  stepWork: StepWork[];
  guestPins: GuestAccess[];
}

export interface Goal {
  id: string;
  title: string;
  category: keyof HealthMetric;
  progress: number;
  dueDate: Date;
}

export interface JournalEntry {
  id: string;
  content: string;
  date: Date;
  tags: string[];
  type: 'text' | 'voice';
}

export interface StepWork {
  id: string;
  step: number;
  content: string;
  date: Date;
  status: 'draft' | 'submitted' | 'reviewed';
  feedback: StepFeedback[];
  isPrivate: boolean;
}

export interface StepFeedback {
  id: string;
  guestId: string;
  content: string;
  date: Date;
  isAnonymous: boolean;
}

export interface GuestAccess {
  id: string;
  pin: string;
  name: string;
  role: 'sponsor' | 'mentor' | 'therapist';
  accessLevel: 'all' | 'specific';
  specificSteps?: number[];
  createdAt: Date;
  lastAccess?: Date;
}