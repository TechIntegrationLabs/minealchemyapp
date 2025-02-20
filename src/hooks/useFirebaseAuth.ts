import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getAuth, signInWithCustomToken, signOut } from 'firebase/auth';
import { app } from '../lib/firebase';

const auth = getAuth(app);

export function useFirebaseAuth() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const syncFirebaseAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!user) {
          await signOut(auth);
          setIsLoading(false);
          return;
        }

        // Get Clerk session token using the standard JWT template
        const sessionToken = await user.getToken({
          template: 'integration-jwt'
        });
        
        // Get Firebase token from our server
        const response = await fetch('http://localhost:5000/api/firebase-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get Firebase token');
        }

        const { firebaseToken } = await response.json();
        
        // Sign in to Firebase
        await signInWithCustomToken(auth, firebaseToken);
        console.log('Successfully signed in to Firebase');
      } catch (err) {
        console.error('Firebase auth error:', err);
        setError(err instanceof Error ? err : new Error('Firebase authentication failed'));
      } finally {
        setIsLoading(false);
      }
    };

    syncFirebaseAuth();
  }, [user]);

  return { isLoading, error };
}
