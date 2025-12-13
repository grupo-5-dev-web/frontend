import axios from "axios";

import { setAuthToken } from "@/utils";
import { Login } from "../types";

export const login = ({ email, password }: Login) => {
  const apiUrl = process.env.NEXT_PUBLIC_USER_API_URL;
  const data = new URLSearchParams({ email, password }).toString();

  return axios
    .post(`${apiUrl}/users/login`, data)
    .then((response) => {
      setAuthToken(response.data.access_token);
    })
    .catch((error) => {
      throw new Error(error.response?.detail || "User login failed");
    });
};
