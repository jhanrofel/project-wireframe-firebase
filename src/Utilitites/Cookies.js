import cookie from 'react-cookies';

export const CookiesCreate = (token) => {
  cookie.save("projwftoken",token, {path:"/"});
};

export const CookiesToken = () => {
  return cookie.load('projwftoken');
};

export const CookiesRemove = () => {
  cookie.remove('projwftoken', { path: '/' })
};
