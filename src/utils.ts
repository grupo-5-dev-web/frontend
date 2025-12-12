import Cookies from "js-cookie";

const isProduction = process.env.NODE_ENV === "production";

const getAuthToken = () => {
  return Cookies.get("auth_token") || null;
};

const setAuthToken = (token: string) => {
  Cookies.set("auth_token", token, {
    expires: 1,
    path: "/",
    secure: isProduction,
    sameSite: "Lax",
  });
};

const removeAuthToken = () => {
  Cookies.remove("auth_token", {
    path: "/",
    secure: isProduction,
    sameSite: "Lax",
  });
};

export { getAuthToken, setAuthToken, removeAuthToken };
