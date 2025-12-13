import axios from "axios";
import { UUID } from "crypto";

import { getAuthToken } from "@/utils";
import { Tenant } from "../types";

export const getTenant = (tenantId?: UUID): Promise<Tenant> => {
  const apiUrl = process.env.NEXT_PUBLIC_TENANT_API_URL;
  const token = getAuthToken();

  if (!tenantId) {
    throw new Error("tenant_id is required");
  }

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  return axios
    .get(`${apiUrl}/tenants/${tenantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.detail || "Tenant fetch failed");
    });
};
