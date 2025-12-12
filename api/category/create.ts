import { getAuthToken } from "@/utils";
import axios from "axios";

export type Category = {
  name: string;
  description: string;
  type: "fisico" | "humano";
  icon?: string;
  color?: string;
};

export const create = ({ name, description, type, icon, color }: Category) => {
  const apiUrl = process.env.NEXT_PUBLIC_RESOURCE_API_URL;
  const token = getAuthToken();

  return axios
    .post(
      `${apiUrl}/categories/`,
      {
        name,
        description,
        type,
        icon,
        color,
        is_active: true,
        tenant_id: "a838726b-699f-45b5-9a07-5ee092ae84f2", // TODO: Test tenant_id, should be handled properly
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.detail || "Category creation failed");
    });
};
