import {CookiesToken} from "./Cookies";

const AuthToken = () => {
  const token = CookiesToken();
  return `Bearer ${token}`;
};

export default AuthToken;
