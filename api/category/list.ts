import axios from "axios";

import { getAuthToken } from "@/utils";
import { Category } from "../types";

export const list = (): Promise<Category[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_RESOURCE_API_URL;
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  return axios
    .get(`${apiUrl}/categories/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.detail || "Categories listing failed");
    });
};
