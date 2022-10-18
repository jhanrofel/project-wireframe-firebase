import {CookiesToken} from "./Cookies"

export const LoggedInCreate = (user) => {
  localStorage.setItem(
    "loggedIn",
    JSON.stringify({
      userId: user._id,
      fullname: user.fullname,
      email: user.email,
    })
  );
};

export const IsLogged = () => {
  const token = CookiesToken();
  return localStorage.getItem("loggedIn") && token ? 1 : 0;
};

export const LoggedIn = () => {
  return JSON.parse(localStorage.getItem("loggedIn"));
};

export const LoggedInRemove = () => {
  localStorage.removeItem("loggedIn");
};
