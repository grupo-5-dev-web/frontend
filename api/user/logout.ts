import { removeAuthToken, removeStoredUser } from "@/utils";

export const logout = () => {
  removeAuthToken();
  removeStoredUser();

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};
