import Cookies from "js-cookie";

const isProduction = process.env.NODE_ENV === "production";

const setAuthToken = (token: string) => {
  Cookies.set("authToken", token, {
    expires: 1,
    path: "/",
    secure: isProduction,
    sameSite: "Lax",
  });
};

const getAuthToken = () => {
  return Cookies.get("authToken");
};

const removeAuthToken = () => {
  Cookies.remove("authToken", {
    path: "/",
    secure: isProduction,
    sameSite: "Lax",
  });
};

export { setAuthToken, getAuthToken, removeAuthToken };
