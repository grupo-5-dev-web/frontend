import { getAuthToken } from "@/utils";
import axios from "axios";

export const list = () => {
  const apiUrl = process.env.NEXT_PUBLIC_BOOKING_API_URL;
  const token = getAuthToken();

  return axios
    .get(`${apiUrl}/bookings/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.detail || "Booking listing failed");
    });
};
