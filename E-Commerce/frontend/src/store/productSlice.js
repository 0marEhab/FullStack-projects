import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
};

export const productSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    add: (state, action) => {

    state.product = {
        name: action.payload.name,
        description: action.payload.description,
        stock: action.payload.stock,
        price: action.payload.price,
        category: action.payload.category,
    };
    },
  },
});
