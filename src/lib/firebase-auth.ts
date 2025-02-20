import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { app } from './firebase';

export const auth = getAuth(app);

export const signInWithClerk = async (token: string) => {
  try {
    await signInWithCustomToken(auth, token);
  } catch (error) {
    console.error('Error signing in with custom token:', error);
    throw error;
  }
};
