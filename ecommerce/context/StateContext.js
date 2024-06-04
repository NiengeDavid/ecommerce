import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [setshowCart, setSetshowCart] = useState(false);
    const [cartItems, setCartItems] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [totalQuantities, setTotalQuantities] = useState();
    const [qty, setQty] = useState(1);

    

    return (
        <Context.Provider
            value={{
                setshowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty
            }}
        >
            {children}
        </Context.Provider>
    )
}