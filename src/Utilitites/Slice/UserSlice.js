import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ApiGetUsers,
  ApiGetUserOne,
  ApiPostUser,
  ApiUpdateUser,
  ApiDeleteUser,
} from "../Api";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await ApiGetUsers()
    .then((res) => res)
    .catch((err) => err);
});

export const fetchUserOne = createAsyncThunk(
  "users/fetchUserOne",
  async (userId) => {
    return await ApiGetUserOne(userId)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const postUser = createAsyncThunk(
  "users/postUser",
  async (formValues, { rejectWithValue }) => {
    return await ApiPostUser(formValues)
      .then((res) => {
        if (res.status !== "ok") {
          return rejectWithValue(res.message);
        } else {
          return (res = {
            ...res,
            newFullname: formValues.fullname,
            newEmail: formValues.email,
          });
        }
      })
      .catch((err) => err);
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (data, { rejectWithValue }) => {
    const { userId, formValues } = data;
    return await ApiUpdateUser(userId, formValues)
      .then((res) => {
        if (res.status !== "ok") {
          return rejectWithValue(res.message);
        } else {
          return (res = {
            ...res,
            newFullname: formValues.fullname,
            newEmail: formValues.email,
          });
        }
      })
      .catch((err) => err);
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    return await ApiDeleteUser(userId)
      .then((res) => (res = { ...res, userId: userId }))
      .catch((err) => err);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    dataOne: {},
    isSuccess: false,
    message: "",
    loading: false,
  },
  reducers: {
    clearUser: (state) => {
      state.data = [];
      state.dataOne = {};
      state.isSuccess = "";
      state.message = "";
      state.loading = "";
    }
  },
  extraReducers: {
    //fetch User
    [fetchUsers.pending]: (state) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.isSuccess = true;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = false;
    },
    //fetch  User one
    [fetchUserOne.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserOne.fulfilled]: (state, action) => {
      state.loading = true;
      state.dataOne = action.payload.user;
      state.isSuccess = true;
      state.message = "";
    },
    [fetchUserOne.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload.message;
      state.isSuccess = false;
    },
    //post User
    [postUser.pending]: (state) => {
      state.loading = true;
    },
    [postUser.fulfilled]: (state, action) => {
      state.loading = true;
      state.isSuccess = true;
      state.data = [...state.data, action.payload.data];
      state.message = "";
    },
    [postUser.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.isSuccess = false;
    },
    //edit User
    [editUser.pending]: (state) => {
      state.loading = true;
    },
    [editUser.fulfilled]: (state, action) => {
      state.loading = true;
      state.isSuccess = true;
      state.data = state.data.map((user) =>
        user._id === action.payload.data._id
          ? {
              ...user,
              fullname: action.payload.newFullname,
              email: action.payload.newEmail,
            }
          : user
      );
      state.message = "";
    },
    [editUser.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.isSuccess = false;
    },
    //delete user
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = true;
      state.isSuccess = true;
      state.data = state.data.filter(
        (user) => user._id !== action.payload.userId
      );
      state.message = "";
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = false;
    },
  },
});


export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
