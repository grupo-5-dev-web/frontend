import axios from "axios";

import { getAuthToken } from "@/utils";
import { Booking } from "../types";

export const create = ({
  user_id,
  resource_id,
  start_time,
  end_time,
  notes,
}: Booking) => {
  const apiUrl = process.env.NEXT_PUBLIC_BOOKING_API_URL;
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  return axios
    .post(
      `${apiUrl}/bookings/`,
      {
        resource_id,
        user_id,
        start_time,
        end_time,
        notes,
        tenant_id: "a838726b-699f-45b5-9a07-5ee092ae84f2", // TODO: tenant_id está hardcoded pra simplificar a criação de booking (remover a etapa de criação de tenant/empresa)
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
