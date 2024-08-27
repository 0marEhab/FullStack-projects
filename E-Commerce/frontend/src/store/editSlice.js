import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
};

export const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    open: (state) => {
      state.toggle = true;
    },
    close: (state) => {
      state.toggle = false;
    },
  },
});
