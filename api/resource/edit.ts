import axios from "axios";
import { Resource } from "./create";

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
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.detail || "Resource creation failed");
    });
};
