import { db } from './firebase';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import type { Activity } from '../types';

const defaultActivities: Partial<Activity>[] = [
  {
    name: 'Daily Meditation',
    type: 'spiritual',
    description: 'Take time for mindful meditation',
    healthBoost: 'Improves mental clarity and spiritual connection',
    isDefault: true,
  },
  {
    name: 'Gratitude Journaling',
    type: 'mental',
    description: 'Write down three things you\'re grateful for',
    healthBoost: 'Enhances positive thinking and emotional well-being',
    isDefault: true,
  },
  {
    name: 'Walking in Nature',
    type: 'physical',
    description: 'Take a mindful walk outdoors',
    healthBoost: 'Improves physical health and mental clarity',
    isDefault: true,
  },
  {
    name: 'Support Group Meeting',
    type: 'social',
    description: 'Attend a recovery support group',
    healthBoost: 'Strengthens social connections and support network',
    isDefault: true,
  }
];

export async function initializeUserCollections(userId: string) {
  try {
    const batch = writeBatch(db);

    // Initialize user document with personal info
    const userRef = doc(db, 'users', userId);
    batch.set(userRef, {
      id: userId,
      personalInfo: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        occupation: '',
        location: '',
        emergencyContact: {
          name: '',
          relationship: '',
          phone: ''
        },
        recoveryStartDate: new Date().toISOString().split('T')[0],
        preferredName: '',
        pronouns: '',
        bio: '',
        supportGroups: [],
        triggers: [],
        copingStrategies: [
          'Deep breathing exercises',
          'Going for a walk',
          'Calling a support person',
          'Meditation'
        ],
        goals: {
          shortTerm: ['Establish a daily routine', 'Attend weekly support meetings'],
          longTerm: ['Maintain long-term recovery', 'Build healthy relationships']
        }
      },
      healthMetrics: {
        mental: { value: 0, lastUpdated: new Date() },
        spiritual: { value: 0, lastUpdated: new Date() },
        physical: { value: 0, lastUpdated: new Date() },
        social: { value: 0, lastUpdated: new Date() }
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }, { merge: true });

    // Add default activities
    const activitiesRef = collection(db, 'activities');
    defaultActivities.forEach((activity) => {
      const activityDoc = doc(activitiesRef);
      batch.set(activityDoc, {
        ...activity,
        id: activityDoc.id,
        userId,
        completionCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    // Create initial collections
    const collections = [
      'journalEntries',
      'recoveryActivities',
      'stepWork',
      'scheduledSessions',
      'mealLogs',
      'customActivities'
    ];

    collections.forEach((collectionName) => {
      const placeholderRef = doc(db, collectionName, `${userId}_placeholder`);
      batch.set(placeholderRef, {
        userId,
        placeholder: true,
        createdAt: new Date()
      });
    });

    await batch.commit();
    console.log('Successfully initialized user collections');
  } catch (error) {
    console.error('Error initializing user collections:', error);
    throw error;
  }
}

export async function initializeGlobalCollections() {
  try {
    const batch = writeBatch(db);

    // Create quotes collection with some initial recovery-focused quotes
    const quotesRef = collection(db, 'quotes');
    const quotes = [
      {
        text: "Recovery is not a race. You don't have to feel guilty if it takes you longer than you thought it would.",
        author: "Anonymous"
      },
      {
        text: "The journey of a thousand miles begins with a single step.",
        author: "Lao Tzu"
      },
      {
        text: "Progress not perfection.",
        author: "AA Saying"
      },
      {
        text: "You are never too old to set another goal or to dream a new dream.",
        author: "C.S. Lewis"
      }
    ];

    quotes.forEach((quote) => {
      const quoteDoc = doc(quotesRef);
      batch.set(quoteDoc, {
        ...quote,
        id: quoteDoc.id,
        createdAt: new Date()
      });
    });

    // Create categories collection
    const categoriesRef = collection(db, 'categories');
    const categories = [
      { name: 'Mental Health', type: 'mental' },
      { name: 'Spiritual Growth', type: 'spiritual' },
      { name: 'Physical Wellness', type: 'physical' },
      { name: 'Social Connection', type: 'social' }
    ];

    categories.forEach((category) => {
      const categoryDoc = doc(categoriesRef);
      batch.set(categoryDoc, {
        ...category,
        id: categoryDoc.id,
        createdAt: new Date()
      });
    });

    await batch.commit();
    console.log('Successfully initialized global collections');
  } catch (error) {
    console.error('Error initializing global collections:', error);
    throw error;
  }
}
