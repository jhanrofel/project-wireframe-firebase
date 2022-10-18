import FileDownload from "js-file-download";
import AuthToken from "../Utilitites/Authentication";


const axios = require("axios").default;
axios.defaults.baseURL = 'http://localhost:5000';


//Users
export const ApiGetUsers = async () => {
  return await axios({
    url: `/users`,
    method: "get",
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ApiGetUserOne = async (userId) => {
  return await axios({
    url: `/users/${userId}`,
    method: "get",
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ApiPostUser = async (formValues) => {
  return await axios({
    url: `/users`,
    method: "post",
    data: formValues,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ApiLoginUser = async (formValues) => {
  return await axios({
    url: `/users/login`,
    method: "post",
    data: formValues,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ApiUpdateUser = async (userId, formValues) => {
  return await axios({
    url: `/users/${userId}`,
    method: "put",
    data: formValues,
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ApiDeleteUser = async (userId) => {
  return await axios({
    url: `/users/${userId}`,
    method: "delete",
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

//Chats
export const ApiGetChats = async () => {
  return await axios({
    url: `/chats`,
    method: "get",
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ApiPostChat = async (formValues) => {
  return await axios({
    url: `/chats`,
    method: "post",
    data: formValues,
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

//Upload
export const ApiGetUserFiles = async (userId) => {
  return await axios({
    url: `/upload-files/user/${userId}`,
    method: "get",
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ApiPostFile = async (formValues) => {
  return await axios({
    url: `/upload-files`,
    method: "post",
    data: formValues,
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ApiDeleteUpload = async (uploadId) => {
  return await axios({
    url: `/upload-files/${uploadId}`,
    method: "delete",
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ApiUpdateUpload = async (uploadId, formValues) => {
  return await axios({
    url: `/upload-files/${uploadId}`,
    method: "put",
    data: formValues,
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ApiDownloadFile = async (formValues) => {
  return await axios({
    url: `/upload-files/download`,
    method: "post",
    data: formValues,
    responseType: "blob",
    headers: {
      Authorization: AuthToken(),
    },
  }).then((res) => {
    FileDownload(res.data,formValues.filename);
  });
};

//Share
export const ApiGetShareUpload = async (uploadId) => {
  return await axios({
    url: `/share-files/upload-file/${uploadId}`,
    method: "get",
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ApiGetShareToUser = async (userId) => {
  return await axios({
    url: `/share-files/user/${userId}`,
    method: "get",
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ApiGetUserToShare = async (uploadId, userId) => {
  return await axios({
    url: `/users/user-to-share/${uploadId}/${userId}`,
    method: "get",
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ApiPostShareFile = async (formValues) => {
  return await axios({
    url: `/share-files`,
    method: "post",
    data: formValues,
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const ApiDeleteShareFile = async (shareId) => {
  return await axios({
    url: `/share-files/${shareId}`,
    method: "delete",
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
