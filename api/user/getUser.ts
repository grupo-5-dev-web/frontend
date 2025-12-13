import axios from "axios";
import { getAuthToken } from "@/utils";

export const getUser = (userId: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_USER_API_URL;
  const token = getAuthToken();

  return axios
    .get(`${apiUrl}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.detail || "User fetch failed");
    });
};
