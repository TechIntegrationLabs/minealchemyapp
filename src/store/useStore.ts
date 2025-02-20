import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, HealthMetric, JournalEntry, Activity, StepWork, GuestAccess, StepFeedback } from '../types';

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    reminders: boolean;
  };
  privacy: {
    showProgress: boolean;
    showActivities: boolean;
  };
  language: string;
}

export interface UserState {
  userId: string | null;
  settings: UserSettings;
  healthMetrics: {
    mental: number;
    spiritual: number;
    physical: number;
    social: number;
  };
  lastSync: Date | null;
}

const defaultUserSettings: UserSettings = {
  theme: 'system',
  notifications: {
    email: true,
    push: true,
    reminders: true,
  },
  privacy: {
    showProgress: true,
    showActivities: true,
  },
  language: 'en',
};

interface Store {
  userState: UserState | null;
  journalEntries: JournalEntry[];
  customActivities: Activity[];
  activityCompletions: Record<string, Date[]>;
  stepWork: StepWork[];
  guestPins: GuestAccess[];
  ui: {
    activities: {
      showScheduler: boolean;
      showTracker: boolean;
      showNutrition: boolean;
      showAddActivity: boolean;
    };
  };
  isInitialized: boolean;

  // User state actions
  setUserState: (state: Partial<UserState>) => void;
  clearUserState: () => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  updateHealthMetrics: (metrics: Partial<UserState['healthMetrics']>) => void;
  setInitialized: () => void;

  // Other actions
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  addCustomActivity: (activity: Activity) => void;
  incrementActivityCount: (activityId: string) => void;
  addStepWork: (work: Omit<StepWork, 'id' | 'date' | 'feedback'>) => void;
  updateStepWork: (id: string, work: Partial<StepWork>) => void;
  addStepFeedback: (stepId: string, feedback: Omit<StepFeedback, 'id' | 'date'>) => void;
  addGuestAccess: (guest: Omit<GuestAccess, 'id' | 'createdAt'>) => void;
  removeGuestAccess: (id: string) => void;
  verifyGuestPin: (pin: string) => GuestAccess | null;
  setActivityModal: (modal: keyof Store['ui']['activities'], show: boolean) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => {
      // Initialize default state
      const defaultState = {
        userState: null,
        journalEntries: [],
        customActivities: [],
        activityCompletions: {},
        stepWork: [],
        guestPins: [],
        ui: {
          activities: {
            showScheduler: false,
            showTracker: false,
            showNutrition: false,
            showAddActivity: false,
          },
        },
        isInitialized: false,
      };

      return {
        ...defaultState,

        setUserState: (state) => {
          console.log('Setting user state:', state);
          try {
            set((prev) => {
              console.log('Previous state:', prev);
              if (prev.userState) {
                const newState = {
                  userState: {
                    ...prev.userState,
                    ...state,
                    settings: {
                      ...prev.userState.settings,
                      ...(state.settings || {}),
                    },
                    healthMetrics: {
                      ...prev.userState.healthMetrics,
                      ...(state.healthMetrics || {}),
                    },
                  },
                };
                console.log('Updated state:', newState);
                return newState;
              }

              const newState = {
                userState: {
                  userId: null,
                  settings: defaultUserSettings,
                  healthMetrics: {
                    mental: 0,
                    spiritual: 0,
                    physical: 0,
                    social: 0,
                  },
                  lastSync: null,
                  ...state,
                },
              };
              console.log('New state:', newState);
              return newState;
            });
          } catch (error) {
            console.error('Error in setUserState:', error);
            throw error;
          }
        },

        clearUserState: () => {
          console.log('Clearing user state');
          set({ ...defaultState });
        },

        updateSettings: (settings) => {
          console.log('Updating settings:', settings);
          set((prev) => ({
            userState: prev.userState
              ? {
                  ...prev.userState,
                  settings: {
                    ...prev.userState.settings,
                    ...settings,
                  },
                }
              : null,
          }));
        },

        updateHealthMetrics: (metrics) => {
          console.log('Updating health metrics:', metrics);
          set((prev) => ({
            userState: prev.userState
              ? {
                  ...prev.userState,
                  healthMetrics: {
                    ...prev.userState.healthMetrics,
                    ...metrics,
                  },
                }
              : null,
          }));
        },

        setInitialized: () => {
          console.log('Setting initialized state');
          set({ isInitialized: true });
        },

        addJournalEntry: (entry) => {
          console.log('Adding journal entry:', entry);
          set((state) => ({
            journalEntries: [
              {
                ...entry,
                id: crypto.randomUUID(),
                date: new Date(),
              },
              ...state.journalEntries,
            ],
          }));
        },

        addCustomActivity: (activity) => {
          console.log('Adding custom activity:', activity);
          set((state) => ({
            customActivities: [...state.customActivities, activity],
          }));
        },

        incrementActivityCount: (activityId) => {
          console.log('Incrementing activity count:', activityId);
          set((state) => ({
            activityCompletions: {
              ...state.activityCompletions,
              [activityId]: [
                ...(state.activityCompletions[activityId] || []),
                new Date(),
              ],
            },
          }));
        },

        addStepWork: (work) => {
          console.log('Adding step work:', work);
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
          }));
        },

        updateStepWork: (id, work) => {
          console.log('Updating step work:', id, work);
          set((state) => ({
            stepWork: state.stepWork.map((sw) =>
              sw.id === id ? { ...sw, ...work } : sw
            ),
          }));
        },

        addStepFeedback: (stepId, feedback) => {
          console.log('Adding step feedback:', stepId, feedback);
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
          }));
        },

        addGuestAccess: (guest) => {
          console.log('Adding guest access:', guest);
          set((state) => ({
            guestPins: [
              ...state.guestPins,
              {
                ...guest,
                id: crypto.randomUUID(),
                createdAt: new Date(),
              },
            ],
          }));
        },

        removeGuestAccess: (id) => {
          console.log('Removing guest access:', id);
          set((state) => ({
            guestPins: state.guestPins.filter((g) => g.id !== id),
          }));
        },

        verifyGuestPin: (pin) => {
          console.log('Verifying guest pin:', pin);
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

        setActivityModal: (modal, show) => {
          console.log('Setting activity modal:', modal, show);
          set((state) => ({
            ...state,
            ui: {
              ...state.ui,
              activities: {
                ...state.ui.activities,
                [modal]: show,
              },
            },
          }));
        },
      };
    },
    {
      name: 'mine-storage',
      storage: createJSONStorage(() => {
        const storage = localStorage;
        return {
          getItem: (name) => {
            try {
              const item = storage.getItem(name);
              console.log('Loading from storage:', { name, item });
              return item;
            } catch (error) {
              console.error('Error loading from storage:', error);
              return null;
            }
          },
          setItem: (name, value) => {
            try {
              console.log('Saving to storage:', { name, value });
              storage.setItem(name, value);
            } catch (error) {
              console.error('Error saving to storage:', error);
            }
          },
          removeItem: (name) => {
            try {
              console.log('Removing from storage:', name);
              storage.removeItem(name);
            } catch (error) {
              console.error('Error removing from storage:', error);
            }
          },
        };
      }),
      partialize: (state) => {
        const partialState = {
          userState: state.userState,
          journalEntries: state.journalEntries,
          customActivities: state.customActivities,
          activityCompletions: state.activityCompletions,
          stepWork: state.stepWork,
          guestPins: state.guestPins,
          ui: state.ui,
        };
        console.log('Persisting state:', partialState);
        return partialState;
      },
    }
  )
);