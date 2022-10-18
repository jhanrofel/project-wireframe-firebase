import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ApiGetUserFiles,
  ApiPostFile,
  ApiUpdateUpload,
  ApiDeleteUpload,
} from "../Api";

export const fetchUploads = createAsyncThunk(
  "uploads/fetchUploads",
  async (userId) => {
    return await ApiGetUserFiles(userId)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const postUpload = createAsyncThunk(
  "uploads/postUpload",
  async (formValues) => {
    return await ApiPostFile(formValues)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const updateUpload = createAsyncThunk(
  "uploads/updateUpload",
  async (data) => {
    const { editUploadId, fileLabel } = data;
    return await ApiUpdateUpload(editUploadId, { label: fileLabel })
      .then((res) => (res = { ...res, newFileLabel: fileLabel }))
      .catch((err) => err);
  }
);

export const deleteUpload = createAsyncThunk(
  "uploads/deleteUpload",
  async (uploadId) => {
    return await ApiDeleteUpload(uploadId)
      .then((res) => (res = { ...res, uploadId: uploadId }))
      .catch((err) => err);
  }
);

export const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    data: [],
    dataOne: {},
    isSuccess: false,
    message: "",
    loading: false,
  },
  reducers: {
    clearUpload: (state) => {
      state.data = [];
      state.dataOne = {};
      state.isSuccess = "";
      state.message = "";
      state.daloadingta = "";
    },
  },
  extraReducers: {
    //fect uploads
    [fetchUploads.pending]: (state) => {
      state.loading = true;
    },
    [fetchUploads.fulfilled]: (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.isSuccess = true;
    },
    [fetchUploads.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = false;
    },
    // post uploads
    [postUpload.pending]: (state) => {
      state.loading = true;
    },
    [postUpload.fulfilled]: (state, action) => {
      state.loading = true;
      state.data = [...state.data, action.payload.data];
      state.isSuccess = true;
    },
    [postUpload.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload.message;
      state.isSuccess = false;
    },
    // update uploads
    [updateUpload.pending]: (state) => {
      state.loading = true;
    },
    [updateUpload.fulfilled]: (state, action) => {
      state.loading = true;
      state.data.find(
        (upload) => upload._id === action.payload.data._id
      ).label = action.payload.newFileLabel;
      state.isSuccess = true;
    },
    [updateUpload.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload.message;
      state.isSuccess = false;
    },
    // delete uploads
    [deleteUpload.pending]: (state) => {
      state.loading = true;
    },
    [deleteUpload.fulfilled]: (state, action) => {
      state.loading = true;
      state.isSuccess = true;
      state.data = state.data.filter(
        (user) => user._id !== action.payload.uploadId
      );
    },
    [deleteUpload.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload.message;
      state.isSuccess = false;
    },
  },
});

export const { clearUpload } = uploadSlice.actions;
export default uploadSlice.reducer;
