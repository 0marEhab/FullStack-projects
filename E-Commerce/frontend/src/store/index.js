import { configureStore } from "@reduxjs/toolkit";
import { editSlice } from "./editSlice";
import cartReducer from "./cartSlice";
export const store = configureStore({
  reducer: {
    edit: editSlice.reducer,
    cart: cartReducer,
  },
});
