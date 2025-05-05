
'use client';

import type { User, AuthError } from 'firebase/auth';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/config';
import type * as z from 'zod'; // Import zod
import type { loginSchema, signupSchema } from '@/lib/schemas/auth-schemas'; // Assuming schemas exist


type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (values: z.infer<typeof loginSchema>) => Promise<{ success: boolean; error?: AuthError }>;
  signup: (values: z.infer<typeof signupSchema>) => Promise<{ success: boolean; error?: AuthError }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    }, (error) => { // Add error handling for onAuthStateChanged
        console.error("Auth state change error:", error);
        setUser(null); // Ensure user is null on error
        setLoading(false);
    });


    // Initial check to see if auth is available
    if (!auth) {
        console.error("Firebase Auth instance is not available in AuthProvider.");
        setLoading(false); // Stop loading if auth fails early
    }


    return () => unsubscribe();
  }, []);

  const login = async (values: z.infer<typeof loginSchema>) => {
    if (!auth) {
        console.error("Firebase Auth not initialized for login.");
        return { success: false, error: { code: 'auth/internal-error', message: 'Auth not initialized' } as AuthError };
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error as AuthError };
    }
  };

  const signup = async (values: z.infer<typeof signupSchema>) => {
    if (!auth) {
        console.error("Firebase Auth not initialized for signup.");
        return { success: false, error: { code: 'auth/internal-error', message: 'Auth not initialized' } as AuthError };
     }
     setLoading(true);
    try {
      // Note: Firebase createUser only requires email and password.
      // Username would typically be saved separately (e.g., Firestore) or in user profile update.
      await createUserWithEmailAndPassword(auth, values.email, values.password);
       // TODO: Optionally update user profile with username here
       // await updateProfile(auth.currentUser, { displayName: values.username });
       setLoading(false);
      return { success: true };
    } catch (error) {
       setLoading(false);
      return { success: false, error: error as AuthError };
    }
  };

  const logout = async () => {
    if (!auth) {
        console.error("Firebase Auth not initialized for logout.");
        // Handle the case where logout is attempted without auth
        setLoading(false); // Ensure loading state is reset
        return; // Exit early
    }
    setLoading(true);
    try {
        await signOut(auth);
    } catch(error) {
        console.error("Error signing out: ", error);
        // Optionally handle logout error (e.g., show a toast)
    } finally {
        setLoading(false);
    }

  };

  const contextValue = { user, loading, login, signup, logout };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This error is thrown if useAuth is called outside of AuthProvider's context.
    // Check component tree structure and ensure Firebase initializes correctly.
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Re-export schemas defined in the dedicated schema file
export { loginSchema, signupSchema } from '@/lib/schemas/auth-schemas';
