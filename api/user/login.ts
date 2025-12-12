import { setAuthToken } from "@/utils";
import axios from "axios";

export type Login = {
  email: string;
  password: string;
};

export const login = ({ email, password }: Login) => {
  const data = new URLSearchParams({ email, password }).toString();

  return axios
    .post(
      "https://user-service-production-6b5a.up.railway.app/users/login",
      data
    )
    .then((response) => {
      setAuthToken(response.data.access_token);
    })
    .catch((error) => {
      throw new Error(error.response?.detail || "User login failed");
    });
};
