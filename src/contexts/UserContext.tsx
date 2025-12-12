"use client";

import React, { createContext, useContext, useState } from "react";
import { getStoredUser, setStoredUser, removeStoredUser } from "@/utils";

export type User = {
  id: string;
  email: string;
  name?: string;
  role?: string;
  // Add other user properties as needed
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage (only runs once on mount)
  const [user, setUserState] = useState<User | null>(() => {
    return getStoredUser();
  });
  const [isLoading, setIsLoading] = useState(false);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      setStoredUser(newUser);
    } else {
      removeStoredUser();
    }
  };

  const clearUser = () => {
    setUserState(null);
    removeStoredUser();
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
