import { configureStore } from "@reduxjs/toolkit";
import { editSlice } from "./editSlice";
export const store = configureStore({
  reducer: {
    edit: editSlice.reducer,
  },
});
