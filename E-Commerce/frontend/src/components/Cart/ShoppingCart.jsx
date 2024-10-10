import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import Fetch from "../../util/Fetch";
import summaryApi from "../../common";
import { useDispatch } from "react-redux";
import {
  decrementItemInCart,
  deleteItemFromCart,
  addItemToCart,
  fetchCart,
} from "../../store/cartSlice";
import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";

export default function ShoppingCart() {
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();
  const user = useLoaderData();

  useEffect(() => {
    const data = async () => {
      const response = await Fetch(summaryApi.getCart.url, "GET", true);
      setItems(response.cart);
    };
    data();
  }, []);

  const handleAddItem = (productId) => {
    const updatedItems = items.map((item) =>
      item.productId._id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setItems(updatedItems);
    dispatch(addItemToCart({ productId, quantity: 1 }));
    dispatch(fetchCart());
  };

  const handleDecrement = (productId) => {
    const updatedItems = items.map((item) =>
      item.productId._id === productId && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setItems(updatedItems);
    dispatch(decrementItemInCart(productId));
    dispatch(fetchCart());
  };

  const handleDelete = (productId) => {
    const updatedItems = items.filter(
      (item) => item.productId._id !== productId
    );
    setItems(updatedItems);
    dispatch(deleteItemFromCart(productId));
    dispatch(fetchCart());
  };

  const handleCheckout = async () => {
    try {
      const billingData = {
        first_name: user.name.split(" ")[0],
        last_name: user.name.split(" ")[1] || user.name.split(" ")[0],
        email: user.email,
        phone_number: user.mobile,
        street: "123 Main St",
        building: "Building 1",
        floor: "2",
        apartment: "3B",
        city: "Cairo",
        country: "EG",
      };

      const response = await axios.post(
        "http://localhost:3000/api/create-order",
        {
          items,
          amount: subtotal * 100, // Convert to cents
          billingData,
        }
      );

      const paymentKey = response.data.paymentKey;

      // Redirect to Paymob payment page
      window.location.href = `https://accept.paymob.com/api/acceptance/iframes/867465?payment_token=${paymentKey}`;
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const subtotal = items.reduce(
    (acc, item) =>
      item.productId && item.productId.price
        ? acc + item.productId.price * item.quantity
        : acc,
    0
  );

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-12 p-4">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <p className="text-gray-500 mb-6">
          You are eligible for Free Shipping.
        </p>
        <div className="space-y-4">
          {items.map((item, index) =>
            item.productId ? (
              <CartItem
                key={index}
                item={item}
                quantity={item.quantity}
                onAdd={handleAddItem}
                onDecrement={handleDecrement}
                onDelete={handleDelete}
              />
            ) : null
          )}
        </div>
      </div>

      <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p>Shipping Tax</p>
            <p>$0</p>
          </div>
          <div className="flex justify-between mb-6">
            <p className="font-bold text-lg">Total</p>
            <p className="font-bold text-lg">${subtotal.toFixed(2)}</p>
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md mb-4"
            onClick={handleCheckout}
          >
            Checkout
          </button>
          <Link to="/products">
            <button className="w-full border border-blue-500 text-blue-500 py-2 rounded-md">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
