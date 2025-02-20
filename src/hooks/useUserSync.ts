import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useStore } from '../store/useStore';

export function useUserSync() {
  const { user, isSignedIn } = useUser();
  const { setUserState, clearUserState, isInitialized, setInitialized } = useStore();

  // Handle initial user state
  useEffect(() => {
    if (isSignedIn && user && !isInitialized) {
      setUserState({
        userId: user.id,
        settings: {
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
        },
        healthMetrics: {
          mental: 0,
          spiritual: 0,
          physical: 0,
          social: 0,
        },
        lastSync: new Date(),
      });
      setInitialized();
    } else if (!isSignedIn) {
      clearUserState();
    }
  }, [isSignedIn, user, setUserState, clearUserState, isInitialized, setInitialized]);

  // Handle theme changes
  useEffect(() => {
    const { userState } = useStore.getState();
    if (userState?.settings?.theme) {
      document.documentElement.classList.remove('light', 'dark');
      if (userState.settings.theme !== 'system') {
        document.documentElement.classList.add(userState.settings.theme);
      } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        }
      }
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const { userState } = useStore.getState();
    if (userState?.settings?.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);
}
