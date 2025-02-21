import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Timestamp } from 'firebase/firestore';
import {
  saveUserProgress,
  addJournalEntry as addJournalEntryToFirestore,
  updateHealthMetrics as updateHealthMetricsInFirestore,
  addRecoveryActivity
} from '../lib/firebaseFunctions';
import type { User, HealthMetric, JournalEntry, Activity, StepWork, GuestAccess, StepFeedback, HealthMetricValue } from '../types';

interface Store {
  user: User | null;
  setUser: (user: User | null) => void;
  updateHealthMetrics: (metrics: Partial<Record<keyof HealthMetric, HealthMetricValue>>) => Promise<void>;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'date' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  customActivities: Activity[];
  addCustomActivity: (activity: Omit<Activity, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  activityCompletions: Record<string, number>;
  incrementActivityCount: (activityId: string) => Promise<void>;
  stepWork: StepWork[];
  addStepWork: (work: Omit<StepWork, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'feedback'>) => Promise<void>;
  updateStepWork: (id: string, work: Partial<StepWork>) => Promise<void>;
  addStepFeedback: (stepId: string, feedback: Omit<StepFeedback, 'id' | 'date' | 'userId' | 'createdAt'>) => Promise<void>;
  guestPins: GuestAccess[];
  addGuestAccess: (guest: Omit<GuestAccess, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  removeGuestAccess: (id: string) => Promise<void>;
  verifyGuestPin: (pin: string) => GuestAccess | null;
  activities: {
    showScheduler: boolean;
    showTracker: boolean;
    showNutrition: boolean;
    showAddActivity: boolean;
  };
  setActivityModal: (modal: keyof Store['activities'], show: boolean) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateHealthMetrics: async (metrics) => {
        const state = get();
        if (!state.user) return;

        try {
          await updateHealthMetricsInFirestore(state.user.id, metrics);
          set((state) => ({
            user: state.user
              ? {
                  ...state.user,
                  healthMetrics: { ...state.user.healthMetrics, ...metrics },
                }
              : null,
          }));
        } catch (error) {
          console.error('Error updating health metrics:', error);
        }
      },
      journalEntries: [],
      addJournalEntry: async (entry) => {
        const state = get();
        if (!state.user) return;

        try {
          const newEntry = {
            ...entry,
            userId: state.user.id,
            date: Timestamp.now(),
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          };
          
          await addJournalEntryToFirestore(state.user.id, newEntry);
          set((state) => ({
            journalEntries: [...state.journalEntries, newEntry],
          }));
        } catch (error) {
          console.error('Error adding journal entry:', error);
        }
      },
      customActivities: [],
      addCustomActivity: async (activity) => {
        const state = get();
        if (!state.user) return;

        try {
          const newActivity = {
            ...activity,
            userId: state.user.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          };

          await addRecoveryActivity(state.user.id, newActivity);
          set((state) => ({
            customActivities: [...state.customActivities, newActivity],
          }));
        } catch (error) {
          console.error('Error adding custom activity:', error);
        }
      },
      activityCompletions: {},
      incrementActivityCount: async (activityId) => {
        const state = get();
        if (!state.user) return;

        try {
          const newCount = (state.activityCompletions[activityId] || 0) + 1;
          await saveUserProgress(state.user.id, {
            activityCompletions: {
              ...state.activityCompletions,
              [activityId]: newCount,
            },
          });
          
          set((state) => ({
            activityCompletions: {
              ...state.activityCompletions,
              [activityId]: newCount,
            },
          }));
        } catch (error) {
          console.error('Error incrementing activity count:', error);
        }
      },
      stepWork: [],
      addStepWork: async (work) => {
        const state = get();
        if (!state.user) return;

        try {
          const newWork = {
            ...work,
            userId: state.user.id,
            feedback: [],
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          };

          await saveUserProgress(state.user.id, {
            stepWork: [...state.stepWork, newWork],
          });

          set((state) => ({
            stepWork: [...state.stepWork, newWork],
          }));
        } catch (error) {
          console.error('Error adding step work:', error);
        }
      },
      updateStepWork: async (id, work) => {
        const state = get();
        if (!state.user) return;

        try {
          const updatedStepWork = state.stepWork.map((sw) =>
            sw.id === id ? { ...sw, ...work, updatedAt: Timestamp.now() } : sw
          );

          await saveUserProgress(state.user.id, {
            stepWork: updatedStepWork,
          });

          set({ stepWork: updatedStepWork });
        } catch (error) {
          console.error('Error updating step work:', error);
        }
      },
      addStepFeedback: async (stepId, feedback) => {
        const state = get();
        if (!state.user) return;

        try {
          const updatedStepWork = state.stepWork.map((sw) => {
            if (sw.id === stepId) {
              const newFeedback = {
                ...feedback,
                id: Date.now().toString(),
                userId: state.user!.id,
                date: Timestamp.now(),
                createdAt: Timestamp.now(),
              };
              return {
                ...sw,
                feedback: [...(sw.feedback || []), newFeedback],
                updatedAt: Timestamp.now(),
              };
            }
            return sw;
          });

          await saveUserProgress(state.user.id, {
            stepWork: updatedStepWork,
          });

          set({ stepWork: updatedStepWork });
        } catch (error) {
          console.error('Error adding step feedback:', error);
        }
      },
      guestPins: [],
      addGuestAccess: async (guest) => {
        const state = get();
        if (!state.user) return;

        try {
          const newGuest = {
            ...guest,
            id: Date.now().toString(),
            userId: state.user.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          };

          await saveUserProgress(state.user.id, {
            guestPins: [...state.guestPins, newGuest],
          });

          set((state) => ({
            guestPins: [...state.guestPins, newGuest],
          }));
        } catch (error) {
          console.error('Error adding guest access:', error);
        }
      },
      removeGuestAccess: async (id) => {
        const state = get();
        if (!state.user) return;

        try {
          const updatedGuestPins = state.guestPins.filter((g) => g.id !== id);
          await saveUserProgress(state.user.id, {
            guestPins: updatedGuestPins,
          });

          set({ guestPins: updatedGuestPins });
        } catch (error) {
          console.error('Error removing guest access:', error);
        }
      },
      verifyGuestPin: (pin) => {
        const state = get();
        return state.guestPins.find((g) => g.pin === pin) || null;
      },
      activities: {
        showScheduler: false,
        showTracker: false,
        showNutrition: false,
        showAddActivity: false,
      },
      setActivityModal: (modal, show) =>
        set((state) => ({
          activities: {
            ...state.activities,
            [modal]: show,
          },
        })),
    }),
    {
      name: 'mine-storage',
      partialize: (state) => ({
        activities: state.activities,
      }),
    }
  )
);