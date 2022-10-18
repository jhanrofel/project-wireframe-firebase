import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiGetChats, ApiPostChat } from "../Api";

export const fetchChats = createAsyncThunk("chats/fetchChats", async () => {
  return await ApiGetChats()
    .then((res) => res)
    .catch((err) => err);
});

export const postChat = createAsyncThunk("chats/postChat", async (data) => {
  const { chatData, newChat } = data;
  return await ApiPostChat(chatData)
    .then((res) => (res = { ...res, newChat: newChat }))
    .catch((err) => err);
});

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    data: [],
    isSuccess: false,
    message: "",
    loading: false,
  },
  reducers: {
    clearChat: (state) => {
      state.data = [];
      state.isSuccess = "";
      state.message = "";
      state.loading = "";
    },
  },
  extraReducers: {
    [fetchChats.pending]: (state) => {
      state.loading = true;
    },
    [fetchChats.fulfilled]: (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.isSuccess = true;
    },
    [fetchChats.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = false;
    },
    [postChat.pending]: (state) => {
      state.loading = true;
    },
    [postChat.fulfilled]: (state, action) => {
      state.loading = true;
      state.data = [...state.data, action.payload.newChat];
      state.isSuccess = true;
    },
    [postChat.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload.message;
      state.isSuccess = false;
    },
  },
});

export const { clearChat } = chatSlice.actions;
export default chatSlice.reducer;
