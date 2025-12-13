import axios from "axios";

import { getAuthToken } from "@/utils";
import { Resource } from "../types";

export const edit = ({
  name,
  description,
  status,
  capacity,
  location,
  availability_schedule,
  image_url,
}: Resource) => {
  const apiUrl = process.env.NEXT_PUBLIC_RESOURCE_API_URL;
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  return axios
    .put(
      `${apiUrl}/resources`,
      {
        name,
        description,
        status,
        capacity,
        location,
        availability_schedule,
        image_url,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.detail || "Resource creation failed");
    });
};
