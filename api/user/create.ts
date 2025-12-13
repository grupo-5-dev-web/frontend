import axios from "axios";

import { User } from "../types";

export const create = ({
  name,
  phone = "",
  email,
  password,
  user_type = "admin", // Consideramos "admin" como padrão, para simplificar a criação de usuários via tela de cadastro
  department = "",
}: User) => {
  const apiUrl = process.env.NEXT_PUBLIC_USER_API_URL;

  const getPermissions = () => {
    switch (user_type) {
      case "admin":
        return {
          can_book: true,
          can_manage_resources: true,
          can_manage_users: true,
          can_view_all_bookings: true,
        };
      case "user":
        return {
          can_book: true,
          can_manage_resources: false,
          can_manage_users: false,
          can_view_all_bookings: false,
        };
      default:
        return {
          can_book: false,
          can_manage_resources: false,
          can_manage_users: false,
          can_view_all_bookings: false,
        };
    }
  };

  return axios
    .post(`${apiUrl}/users/`, {
      name,
      phone,
      email,
      password,
      user_type,
      department,
      is_active: true,
      permissions: getPermissions(),
      tenant_id: "a838726b-699f-45b5-9a07-5ee092ae84f2", // TODO: tenant_id está hardcoded pra simplificar a criação de usuários (remover a etapa de criação de tenant/empresa)
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message || "User creation failed");
    });
};
