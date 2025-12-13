import axios from "axios";
import { UUID } from "crypto";

import { getAuthToken } from "@/utils";
import { Resource } from "../types";

export const getResource = (resourceId: UUID): Promise<Resource> => {
  const apiUrl = process.env.NEXT_PUBLIC_RESOURCE_API_URL;
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  return axios
    .get(`${apiUrl}/resources/${resourceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.detail || "Resource fetch failed");
    });
};
