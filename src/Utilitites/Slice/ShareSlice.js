import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ApiGetShareToUser,
  ApiGetShareUpload,
  ApiGetUserToShare,
  ApiPostShareFile,
  ApiDeleteShareFile,
} from "../Api";

export const fetchShareToUser = createAsyncThunk(
  "shares/fetchShareToUser",
  async (userId) => {
    return await ApiGetShareToUser(userId)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const fetchShares = createAsyncThunk(
  "shares/fetchShares",
  async (fileId) => {
    return await ApiGetShareUpload(fileId)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const fetchUserToShare = createAsyncThunk(
  "shares/fetchUserToShare",
  async (data) => {
    const { uploadid, userId } = data;
    return await ApiGetUserToShare(uploadid, userId)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const postShare = createAsyncThunk(
  "shares/postShare",
  async (shareFileData) => {
    return await ApiPostShareFile(shareFileData)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const deleteShare = createAsyncThunk(
  "shares/deleteShare",
  async (shareId) => {
    return await ApiDeleteShareFile(shareId)
      .then((res) => (res = { ...res, shareId: shareId }))
      .catch((err) => err);
  }
);

export const shareSlice = createSlice({
  name: "share",
  initialState: {
    data: [],
    dataUser: [],
    isSuccess: false,
    message: "",
    loading: false,
  },
  reducers: {
    clearShare: (state) => {
      state.data = [];
      state.dataUser = {};
      state.isSuccess = "";
      state.message = "";
      state.loading = "";
    },
  },
  extraReducers: {
    //fecth share to user
    [fetchShareToUser.pending]: (state) => {
      state.loading = true;
    },
    [fetchShareToUser.fulfilled]: (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.isSuccess = true;
    },
    [fetchShareToUser.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = false;
    },
    //fetch share by file
    [fetchShares.pending]: (state) => {
      state.loading = true;
    },
    [fetchShares.fulfilled]: (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.isSuccess = true;
    },
    [fetchShares.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = false;
    },
    //fetch user to share
    [fetchUserToShare.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserToShare.fulfilled]: (state, action) => {
      state.loading = true;
      state.dataUser = action.payload.data;
      state.isSuccess = true;
    },
    [fetchUserToShare.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = false;
    },
    // post share
    [postShare.pending]: (state) => {
      state.loading = true;
    },
    [postShare.fulfilled]: (state, action) => {
      state.loading = true;
      const selectedUser = state.dataUser.find(
        (user) => user._id === action.payload.data.toUserId
      );
      state.data = [
        ...state.data,
        { ...action.payload.data, toUserId: selectedUser },
      ];
      state.dataUser = state.dataUser.filter(
        (user) => user._id !== action.payload.data.toUserId
      );
      state.isSuccess = true;
    },
    [postShare.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload.message;
      state.isSuccess = false;
    },
    // delete uploads
    [deleteShare.pending]: (state) => {
      state.loading = true;
    },
    [deleteShare.fulfilled]: (state, action) => {
      state.loading = true;
      state.isSuccess = true;
      const selectedUser = state.data.find(
        (share) => share._id === action.payload.shareId
      ).toUserId;
      state.dataUser = [...state.dataUser, selectedUser];
      state.data = state.data.filter(
        (share) => share._id !== action.payload.shareId
      );
    },
    [deleteShare.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload.message;
      state.isSuccess = false;
    },
  },
});

export const { clearShare } = shareSlice.actions;
export default shareSlice.reducer;
