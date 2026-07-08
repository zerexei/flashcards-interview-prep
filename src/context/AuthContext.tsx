import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, isFirebaseEnabled } from '@/utils/database';

const ADMIN_UID = import.meta.env.VITE_FIREBASE_ADMIN_UID as string | undefined;

interface AuthState {
  user: User | null;
  isAuth: boolean;
  isAdmin: boolean;
  loading: boolean;
  isFirebaseEnabled: boolean;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseEnabled || !auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: AuthState = {
    user,
    isAuth: isFirebaseEnabled ? !!user : false,
    isAdmin: isFirebaseEnabled && !!ADMIN_UID && user?.uid === ADMIN_UID,
    loading,
    isFirebaseEnabled,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used inside <AuthProvider>');
  }
  return ctx;
}
