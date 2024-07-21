"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "@/lib/client";
import getStripe from "@/lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    try {
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });

      if (!response.ok) {
        toast.error("Failed to initiate checkout session.");
        return;
      }

      const data = await response.json();

      toast.loading("Redirecting...");

      stripe.redirectToCheckout({ sessionId: data.id });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      //toast.error("An unexpected error occurred.");
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          className="cart-heading"
          type="button"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} Items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart flex flex-col items-center justify-center">
            <AiOutlineShopping size={150} />
            <h3 className="text-gray-400 text-xl">
              Your shopping bag is empty
            </h3>
            <Link href="/">
              <button
                className="btn"
                type="button"
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  alt={item?.name}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top justify-between mx-auto items-center w-full">
                    <h5>{item.name}</h5>
                    <h4>{item.price}</h4>
                  </div>
                  <div className="flex bottom justify-around items-center space-x-4">
                    <p className="flex border text-start border-gray-500 p-2 w-10 items-center">
                      <span
                        className="text-red-500 cursor-pointer border-r border-gray-500 px-3 text-lg"
                        onClick={() => toggleCartItemQuantity(item._id, "dec")}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className="border-r border-gray-500 pr-3 text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <span
                        className="text-green-500 cursor-pointer pr-3 text-lg"
                        onClick={() => toggleCartItemQuantity(item._id, "inc")}
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>

                    <button
                      className="remove-item relative"
                      type="button"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {cartItems.length >= 1 && (
            <div className="cart-botton">
              <div className="total mx-3">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className="btn-container">
                <button type="button" className="btn" onClick={handleCheckout}>
                  Pay with Stripe
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
