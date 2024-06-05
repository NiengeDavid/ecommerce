'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineRight, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '@/lib/client';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart } = useStateContext();

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className="cart-container">
        <button 
          className="cart-heading"
          type='button'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} Items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart flex flex-col items-center justify-center">
            <AiOutlineShopping size={150} />
            <h3 className='text-gray-400 text-xl'>Your shopping bag is empty</h3>
            <Link href="/">
              <button 
                className="btn"
                type='button'
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} alt={item.name} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>{item.price}</h4>
                </div>
                <div className="flex bottom justify-around space-x-2">
                  <div>
                    <p className="quantity-desc flex items-center justify-center mx-auto text-lg py-3 px-1.5">
                      <span className="minus border-r border-gray-500 text-lg py-3 px-1.5" /*onClick={decQty}*/ >
                        <AiOutlineMinus />
                      </span>
                      <span className="num">0</span>
                      <span className="plus text-lg p-0 border-gray-500" /*onClick={incQty}*/ >
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button 
                    className="remove-item"
                    type='button'
                    /*onClick='*/
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cart;