import axios from "axios";

import { getAuthToken } from "@/utils";
import { User } from "../types";

export const list = (): Promise<User[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_USER_API_URL;
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  return axios
    .get(`${apiUrl}/users/?tenant_id=a838726b-699f-45b5-9a07-5ee092ae84f2`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.detail || "User listing failed");
    });
};
