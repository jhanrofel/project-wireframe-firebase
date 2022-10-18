import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./Slice/UserSlice";
import chatReducer  from "./Slice/ChatSlice";
import uploadReducer  from "./Slice/UploadSlice";
import shareReducer  from "./Slice/ShareSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    upload: uploadReducer,
    share: shareReducer,
  },
});
