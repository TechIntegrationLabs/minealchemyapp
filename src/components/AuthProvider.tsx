import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getUserProgress } from '../lib/firebaseFunctions';

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Load user progress from Firestore
        const progress = await getUserProgress(user.uid);
        setUserProgress(progress);
      } else {
        setUserProgress(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, userProgress }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
