'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

import { Products } from "../app/product/type";

// Shaping of the context value
interface StateContextValue {
    setShowCart: (show: boolean) => void;
    cartItems: any[];
    showCart: boolean;
    totalPrice: number;
    totalQuantities: number;
    qty: number;
    incQty: () => void;
    decQty: () => void;
    onAdd: (product: Products, quantity: number) => void;
}

const Context = createContext<StateContextValue | undefined>(undefined);;

export const StateContext = ({ children }: { children: ReactNode }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    const onAdd = (product: Products, quantity: number) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        if(checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                } 
            })

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            
            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`);
    };

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;

            return prevQty - 1
        }
    );
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart: (show) => setShowCart(show),
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useStateContext must be used within a StateContext Provider');
    }
    return context;
}