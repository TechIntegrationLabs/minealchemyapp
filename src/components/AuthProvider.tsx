import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getUserProgress } from '../lib/firebaseFunctions';
import { initializeUserCollections, initializeGlobalCollections } from '../lib/initializeFirestore';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  userProgress: any | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userProgress: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState<any | null>(null);
  const [isGlobalInitialized, setIsGlobalInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        try {
          // Initialize global collections if not done yet
          if (!isGlobalInitialized) {
            await initializeGlobalCollections();
            setIsGlobalInitialized(true);
          }

          // Initialize user collections and load progress
          await initializeUserCollections(user.uid);
          const progress = await getUserProgress(user.uid);
          setUserProgress(progress);
        } catch (error) {
          console.error('Error during initialization:', error);
        }
      } else {
        setUserProgress(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, [isGlobalInitialized]);

  return (
    <AuthContext.Provider value={{ user, loading, userProgress }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
