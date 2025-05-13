"use client";

import type { User, AuthError } from "firebase/auth";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { auth } from "@/lib/firebase/config";
import type * as z from "zod";
import { loginSchema, signupSchema } from "@/lib/schemas/auth-schemas";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (values: z.infer<typeof loginSchema>) => Promise<{ success: boolean; error?: AuthError }>;
  signup: (values: z.infer<typeof signupSchema>) => Promise<{ success: boolean; error?: AuthError }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const lastTokenRef = useRef<string | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to set token in HTTP-only cookie via API
  const setAuthCookie = async (token: string) => {
    try {
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      console.log("Setting auth cookie response:", response);
      if (!response.ok) console.error("Failed to set auth cookie:", await response.text());
    } catch (error) {
      console.error("Error setting auth cookie:", error);
    }
  };

  // Helper function to clear HTTP-only cookie via API
  const clearAuthCookie = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) console.error("Failed to clear auth cookie:", await response.text());
    } catch (error) {
      console.error("Error clearing auth cookie:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (currentUser) {
          try {
            const token = await currentUser.getIdToken();

            // Avoid re-sending the same token
            if (lastTokenRef.current === token) return;
            lastTokenRef.current = token;
            await setAuthCookie(token); // Set HTTP-only cookie via API
            setUser(currentUser);
          } catch (error) {
            console.error("Error getting ID token:", error);
            await clearAuthCookie(); // Clear HTTP-only cookie via API
            setUser(null);
          }
        } else {
          await clearAuthCookie(); // Clear HTTP-only cookie via API
          setUser(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Auth state change error:", error);
        clearAuthCookie(); // Clear HTTP-only cookie via API
        setUser(null);
        setLoading(false);
      }
    );

    if (!auth) {
      console.error("Firebase Auth instance is not available in AuthProvider.");
      clearAuthCookie(); // Clear HTTP-only cookie via API
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const login = async (values: z.infer<typeof loginSchema>) => {
    if (!auth) {
      console.error("Firebase Auth not initialized for login.");
      return { success: false, error: { code: "auth/internal-error", message: "Auth not initialized" } as AuthError };
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      // The token cookie will be set in the onAuthStateChanged listener
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      await clearAuthCookie(); // Clear HTTP-only cookie via API
      return { success: false, error: error as AuthError };
    }
  };

  const signup = async (values: z.infer<typeof signupSchema>) => {
    if (!auth) {
      console.error("Firebase Auth not initialized for signup.");
      return { success: false, error: { code: "auth/internal-error", message: "Auth not initialized" } as AuthError };
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      // After creating the user, update their profile with the username
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: values.username,
        });
        // The token cookie will be set in the onAuthStateChanged listener
      }
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      await clearAuthCookie(); // Clear HTTP-only cookie via API
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
      await clearAuthCookie(); // Clear HTTP-only cookie via API first
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = { user, loading, login, signup, logout };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { loginSchema, signupSchema } from "@/lib/schemas/auth-schemas";
