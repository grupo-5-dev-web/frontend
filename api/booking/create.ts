import { getAuthToken } from "@/utils";
import axios from "axios";

export type Booking = {
  userId: string;
  resourceId: string;
  startTime: string;
  endTime: string;
  notes?: string;
};

export const create = ({
  userId,
  resourceId,
  startTime,
  endTime,
  notes,
}: Booking) => {
  const apiUrl = process.env.NEXT_PUBLIC_BOOKING_API_URL;
  const token = getAuthToken();

  return axios
    .post(
      `${apiUrl}/bookings/`,
      {
        resource_id: resourceId,
        user_id: userId,
        start_time: startTime,
        end_time: endTime,
        notes,
        tenant_id: "a838726b-699f-45b5-9a07-5ee092ae84f2", // TODO: Test tenant_id, should be handled properly
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.detail || "Booking creation failed");
    });
};
