"use client";

import React, { createContext, useContext, useState } from "react";

import { getStoredUser, setStoredUser, removeStoredUser } from "@/utils";
import { User } from "@/api/types";

type UserContextType = {
  userState: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userState, setUserState] = useState<User | null>(() => {
    return getStoredUser();
  });
  const [isLoading, setIsLoading] = useState(false);

  const setUser = (newUser: User | null) => {
    setIsLoading(true);
    setUserState(newUser);

    if (newUser) {
      setStoredUser(newUser);
      setIsLoading(false);
    } else {
      removeStoredUser();
      setIsLoading(false);
    }
  };

  const clearUser = () => {
    setUserState(null);
    removeStoredUser();
  };

  return (
    <UserContext.Provider value={{ userState, isLoading, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
