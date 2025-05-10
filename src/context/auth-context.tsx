
'use client';

import type { User, AuthError } from 'firebase/auth';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile, // Import updateProfile
} from 'firebase/auth';
import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/config';
import type * as z from 'zod';
import { loginSchema, signupSchema } from '@/lib/schemas/auth-schemas';

// Helper function to set a cookie
function setTokenCookie(token: string) {
  const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  document.cookie = `firebaseIdToken=${token}; path=/; expires=${expiryDate.toUTCString()}; SameSite=Lax; Secure`; // Added Secure flag
}

// Helper function to delete a cookie
function deleteTokenCookie() {
  document.cookie = 'firebaseIdToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure'; // Added Secure flag
}


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
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          setTokenCookie(token); 
          setUser(currentUser);
        } catch (error) {
          console.error("Error getting ID token:", error);
          deleteTokenCookie(); 
          setUser(null);
        }
      } else {
        deleteTokenCookie(); 
        setUser(null);
      }
      setLoading(false);
    }, (error) => {
        console.error("Auth state change error:", error);
        deleteTokenCookie();
        setUser(null);
        setLoading(false);
    });


    if (!auth) {
        console.error("Firebase Auth instance is not available in AuthProvider.");
        deleteTokenCookie();
        setLoading(false);
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
      deleteTokenCookie(); 
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
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      // After creating the user, update their profile with the username
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: values.username,
        });
        // Re-fetch the user to get the updated profile information, or onAuthStateChanged will handle it.
        // Forcing a reload of the user data might be necessary if onAuthStateChanged doesn't pick it up immediately.
        // However, onAuthStateChanged should trigger with the updated user.
      }
       setLoading(false);
      return { success: true };
    } catch (error) {
       setLoading(false);
       deleteTokenCookie(); 
      return { success: false, error: error as AuthError };
    }
  };

  const logout = async () => {
    if (!auth) {
        console.error("Firebase Auth not initialized for logout.");
        setLoading(false);
        return;
    }
    setLoading(true);
    try {
        await signOut(auth);
        deleteTokenCookie();
    } catch(error) {
        console.error("Error signing out: ", error);
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { loginSchema, signupSchema } from '@/lib/schemas/auth-schemas';
