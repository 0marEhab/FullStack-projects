import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tokenLoader } from "../util/auth";
import summaryApi from "../common";
import { toast } from "react-toastify";

export const fetchCart = createAsyncThunk(
  summaryApi.getCart.url,
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(summaryApi.getCart.url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenLoader()}`, // Call the tokenLoader function
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      return data.cart; // Return the cart items
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add Item to Cart
export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await fetch(summaryApi.addToCart.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenLoader()}`, // Ensure tokenLoader is invoked
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        toast.error("Please Login first");

        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      toast.success("Product Added");
      return data.cart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Decrement Item Quantity
export const decrementItemInCart = createAsyncThunk(
  "cart/decrementItem",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${summaryApi.decrementCart.url}/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenLoader()}`, // Ensure tokenLoader is invoked
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      toast.success("Product decremented");
      return data; // Updated cart
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Item from Cart
export const deleteItemFromCart = createAsyncThunk(
  "cart/deleteItem",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${summaryApi.removeFromCart.url}/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenLoader()}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      toast.success("Product deleted from cart successfully");
      return data; // Updated cart
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(decrementItemInCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(decrementItemInCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Update the cart items
      })
      .addCase(decrementItemInCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteItemFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Update the cart items
      })
      .addCase(deleteItemFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Update the cart items
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
