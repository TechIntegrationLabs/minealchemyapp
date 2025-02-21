import { z } from 'zod';
import { Timestamp } from 'firebase/firestore';

export interface HealthMetricValue {
  value: number;
  lastUpdated: Date;
}

export interface HealthMetric {
  mental: HealthMetricValue;
  spiritual: HealthMetricValue;
  physical: HealthMetricValue;
  social: HealthMetricValue;
}

export interface Activity {
  id: string;
  userId: string;
  name: string;
  type: keyof HealthMetric;
  description: string;
  healthBoost: string;
  completionCount: number;
  isCustom?: boolean;
  isDefault?: boolean;
  isSuggestion?: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  location: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  recoveryStartDate: string;
  preferredName: string;
  pronouns: string;
  bio: string;
  supportGroups: string[];
  triggers: string[];
  copingStrategies: string[];
  goals: {
    shortTerm: string[];
    longTerm: string[];
  };
}

export interface UserProfile {
  id: string;
  email: string;
  personalInfo: PersonalInfo;
  healthMetrics: {
    mental: HealthMetricValue;
    spiritual: HealthMetricValue;
    physical: HealthMetricValue;
    social: HealthMetricValue;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  profile: UserProfile;
  healthMetrics: HealthMetric;
  goals?: Goal[];
  customActivities?: Activity[];
  activityCompletions?: Record<string, number>;
  stepWork?: StepWork[];
  guestPins?: GuestAccess[];
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  category: keyof HealthMetric;
  progress: number;
  dueDate: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  date: Date;
  tags: string[];
  type: 'text' | 'voice';
  createdAt: Date;
  updatedAt: Date;
}

export interface StepWork {
  id: string;
  userId: string;
  stepNumber: number;
  content: string;
  status: 'in-progress' | 'completed' | 'reviewed';
  feedback?: StepFeedback[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface StepFeedback {
  id: string;
  userId: string;
  guestId: string;
  content: string;
  date: Timestamp;
  isAnonymous: boolean;
  createdAt: Timestamp;
}

export interface GuestAccess {
  id: string;
  userId: string;
  pin: string;
  name: string;
  role: 'sponsor' | 'mentor' | 'therapist';
  accessLevel: 'all' | 'specific';
  specificSteps?: number[];
  createdAt: Timestamp;
  lastAccess?: Timestamp;
  updatedAt: Timestamp;
}