import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, HealthMetric, JournalEntry, Activity, StepWork, GuestAccess, StepFeedback } from '../types';

interface Store {
  user: User | null;
  setUser: (user: User) => void;
  updateHealthMetrics: (metrics: Partial<HealthMetric>) => void;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  customActivities: Activity[];
  addCustomActivity: (activity: Activity) => void;
  activityCompletions: Record<string, number>;
  incrementActivityCount: (activityId: string) => void;
  stepWork: StepWork[];
  addStepWork: (work: Omit<StepWork, 'id' | 'date' | 'feedback'>) => void;
  updateStepWork: (id: string, work: Partial<StepWork>) => void;
  addStepFeedback: (stepId: string, feedback: Omit<StepFeedback, 'id' | 'date'>) => void;
  guestPins: GuestAccess[];
  addGuestAccess: (guest: Omit<GuestAccess, 'id' | 'createdAt'>) => void;
  removeGuestAccess: (id: string) => void;
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
      updateHealthMetrics: (metrics) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                healthMetrics: { ...state.user.healthMetrics, ...metrics },
              }
            : null,
        })),
      journalEntries: [],
      addJournalEntry: (entry) =>
        set((state) => ({
          journalEntries: [
            {
              ...entry,
              id: crypto.randomUUID(),
              date: new Date(),
            },
            ...state.journalEntries,
          ],
        })),
      customActivities: [],
      addCustomActivity: (activity) =>
        set((state) => ({
          customActivities: [...state.customActivities, activity],
        })),
      activityCompletions: {},
      incrementActivityCount: (activityId) =>
        set((state) => ({
          activityCompletions: {
            ...state.activityCompletions,
            [activityId]: (state.activityCompletions[activityId] || 0) + 1,
          }
        })),
      stepWork: [],
      addStepWork: (work) =>
        set((state) => ({
          stepWork: [
            ...state.stepWork,
            {
              ...work,
              id: crypto.randomUUID(),
              date: new Date(),
              feedback: [],
            },
          ],
        })),
      updateStepWork: (id, work) =>
        set((state) => ({
          stepWork: state.stepWork.map((sw) =>
            sw.id === id ? { ...sw, ...work } : sw
          ),
        })),
      addStepFeedback: (stepId, feedback) =>
        set((state) => ({
          stepWork: state.stepWork.map((sw) =>
            sw.id === stepId
              ? {
                  ...sw,
                  feedback: [
                    ...sw.feedback,
                    {
                      ...feedback,
                      id: crypto.randomUUID(),
                      date: new Date(),
                    },
                  ],
                }
              : sw
          ),
        })),
      guestPins: [],
      addGuestAccess: (guest) =>
        set((state) => ({
          guestPins: [
            ...state.guestPins,
            {
              ...guest,
              id: crypto.randomUUID(),
              createdAt: new Date(),
            },
          ],
        })),
      removeGuestAccess: (id) =>
        set((state) => ({
          guestPins: state.guestPins.filter((g) => g.id !== id),
        })),
      verifyGuestPin: (pin) => {
        const guest = get().guestPins.find((g) => g.pin === pin);
        if (guest) {
          set((state) => ({
            guestPins: state.guestPins.map((g) =>
              g.id === guest.id ? { ...g, lastAccess: new Date() } : g
            ),
          }));
        }
        return guest || null;
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
        customActivities: state.customActivities,
        activityCompletions: state.activityCompletions,
        journalEntries: state.journalEntries,
        stepWork: state.stepWork,
        guestPins: state.guestPins,
      }),
    }
  )
);