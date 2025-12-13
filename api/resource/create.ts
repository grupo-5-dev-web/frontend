import axios from "axios";

import { getAuthToken } from "@/utils";
import { Resource } from "../types";

export const create = ({
  name,
  description,
  type,
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
    .post(
      `${apiUrl}/resources/`,
      {
        name,
        description,
        category_id: type,
        status,
        capacity,
        location,
        image_url,
        // TODO: A ideia é o frontend permitir a configuração do horário de disponibilidade na criação do recurso
        availability_schedule: {
          monday: ["00:00-23:59"],
          tuesday: ["00:00-23:59"],
          wednesday: ["00:00-23:59"],
          thursday: ["00:00-23:59"],
          friday: ["00:00-23:59"],
          saturday: ["00:00-23:59"],
          sunday: ["00:00-23:59"],
        },
        tenant_id: "a838726b-699f-45b5-9a07-5ee092ae84f2", // TODO: tenant_id está hardcoded pra simplificar a criação de recursos (remover a etapa de criação de tenant/empresa)
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
