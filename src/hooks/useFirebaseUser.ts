import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useFirebaseUser() {
  const { getToken } = useAuth();

  useEffect(() => {
    const setupFirebaseAuth = async () => {
      try {
        // Get token from Clerk
        const token = await getToken();
        if (!token) {
          console.error('No token available from Clerk');
          return;
        }

        // Sign in to Firebase with the token
        await signInWithCustomToken(auth, token);
        console.log('Successfully signed in to Firebase');
      } catch (error) {
        console.error('Error setting up Firebase auth:', error);
      }
    };

    setupFirebaseAuth();
  }, [getToken]);

  return { getToken };
}
