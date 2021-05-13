import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export const getDecodedToken = () => {
  const token = Cookies.get("jwt");
  return token ? jwt.verify(token, "tripsy@2021") : undefined;
};
