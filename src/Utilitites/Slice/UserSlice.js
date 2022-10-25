import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../Database/config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const usersCollectionRef = collection(db, "users");

  return await getDocs(usersCollectionRef).then((data) => {
    let lists = [];
    lists = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return lists;
  });
});

export const fetchUserOne = createAsyncThunk(
  "users/fetchUserOne",
  async (userId) => {
    const userDoc = doc(db, "users", userId);
    return await getDoc(userDoc).then((doc) => doc.data());
  }
);

export const postUser = createAsyncThunk(
  "users/postUser",
  async (formValues) => {
    const usersCollectionRef = collection(db, "users");
    await addDoc(usersCollectionRef, {
      fullname: formValues.fullname,
      email: formValues.email,
      password: formValues.password,
    });

    return formValues;
  }
);

export const editUser = createAsyncThunk("users/editUser", async (data) => {
  const { userId, formValues } = data;
  const userDoc = doc(db, "users", userId);
  await updateDoc(userDoc, {
    fullname: formValues.fullname,
    email: formValues.email,
  });

  return data;
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    const userDoc = doc(db, "users", userId);
    await deleteDoc(userDoc);
    return userId;
    // return await ApiDeleteUser(userId)
    //   .then((res) => (res = { ...res, userId: userId }))
    //   .catch((err) => err);
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
    },
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
      state.dataOne = action.payload;
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
      state.data = [...state.data, action.payload];
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
        user.id === action.payload.userId
          ? {
              ...user,
              fullname: action.payload.formValues.fullname,
              email: action.payload.formValues.email,
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
      state.data = state.data.filter((user) => user.id !== action.payload);
      state.message = "";
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
