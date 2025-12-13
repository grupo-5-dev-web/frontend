import axios from "axios";

import { getAuthToken } from "@/utils";
import { Booking } from "../types";

export const list = (): Promise<Booking[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_BOOKING_API_URL;
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  return axios
    .get(`${apiUrl}/bookings/?tenant_id=a838726b-699f-45b5-9a07-5ee092ae84f2`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.detail || "Booking listing failed");
    });
};
