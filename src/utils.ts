import Cookies from "js-cookie";

const isProduction = process.env.NODE_ENV === "production";

const getAuthToken = () => {
  return Cookies.get("auth_token") || null;
};

const setAuthToken = (token: string) => {
  Cookies.set("auth_token", token, {
    expires: 1,
    path: "/",
    secure: isProduction,
    sameSite: "Lax",
  });
};

const removeAuthToken = () => {
  Cookies.remove("auth_token", {
    path: "/",
    secure: isProduction,
    sameSite: "Lax",
  });
};

export type StoredUser = {
  id: string;
  email: string;
  name?: string;
  role?: string;
};

const USER_STORAGE_KEY = "current_user";

const getStoredUser = (): StoredUser | null => {
  if (typeof window === "undefined") return null;

  try {
    const userJson = localStorage.getItem(USER_STORAGE_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error("Error reading user from localStorage:", error);
    return null;
  }
};

const setStoredUser = (user: StoredUser) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
};

const removeStoredUser = () => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error("Error removing user from localStorage:", error);
  }
};

export {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getStoredUser,
  setStoredUser,
  removeStoredUser,
};
