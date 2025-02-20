import { doc, setDoc, getDoc, collection, query, where, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

export type HealthMetrics = {
  mental: { mood?: number; stressLevel?: number; sleepQuality?: number };
  spiritual: { meditationTime?: number; gratitudeCount?: number };
  physical: { stepsTaken?: number; exerciseDuration?: number };
  social: { socialInteractions?: number };
};

export type UserProgress = {
  profile: {
    name: string;
    email: string;
    photoURL?: string;
  };
  healthMetrics: HealthMetrics;
  journalEntries?: any[];
  recoveryActivities?: any[];
  stepWork?: any[];
  scheduledSessions?: any[];
  mealLogs?: any[];
  customActivities?: any[];
};

/**
 * Save or update a user's progress data
 */
export async function saveUserProgress(uid: string, progress: Partial<UserProgress>) {
  const userDocRef = doc(db, 'users', uid);
  await setDoc(userDocRef, progress, { merge: true });
}

/**
 * Retrieve a user's progress data
 */
export async function getUserProgress(uid: string): Promise<UserProgress | null> {
  const userDocRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userDocRef);
  return docSnap.exists() ? docSnap.data() as UserProgress : null;
}

/**
 * Add a journal entry
 */
export async function addJournalEntry(uid: string, entry: { text: string; timestamp: Date }) {
  const entriesRef = collection(db, 'journalEntries');
  await addDoc(entriesRef, {
    userId: uid,
    ...entry,
  });
}

/**
 * Get user's journal entries
 */
export async function getJournalEntries(uid: string) {
  const entriesRef = collection(db, 'journalEntries');
  const q = query(entriesRef, where('userId', '==', uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Update health metrics
 */
export async function updateHealthMetrics(uid: string, metrics: Partial<HealthMetrics>) {
  const userDocRef = doc(db, 'users', uid);
  await updateDoc(userDocRef, { healthMetrics: metrics });
}

/**
 * Add recovery activity
 */
export async function addRecoveryActivity(uid: string, activity: { 
  type: string;
  timestamp: Date;
  duration: number;
  notes?: string;
}) {
  const activitiesRef = collection(db, 'recoveryActivities');
  await addDoc(activitiesRef, {
    userId: uid,
    ...activity,
  });
}

/**
 * Get user's recovery activities
 */
export async function getRecoveryActivities(uid: string) {
  const activitiesRef = collection(db, 'recoveryActivities');
  const q = query(activitiesRef, where('userId', '==', uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
