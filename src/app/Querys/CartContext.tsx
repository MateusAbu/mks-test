"use client"

import { createContext, useContext, ReactNode, useState } from 'react';

type CartContextProps = {
  children: ReactNode;
};

type CartProduct = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  photo: string;
};

type CartContextType = {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: number) => void;
  editQuantity: (productId: number, newQuantity: number) => void;
  getTotal: () => number;
  getProductById: (productId: number) => CartProduct | undefined;
  getCartItems: () => CartProduct[];
  getTotalItems: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartContextProps> = ({ children }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const addToCart = (product: CartProduct) => {
    const existingProduct = cart.find((p) => p.id === product.id);

    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== productId));
  };

  const editQuantity = (productId: number, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((p) =>
        p.id === productId ? { ...p, quantity: newQuantity } : p
      )
    );
  };

  const getTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const getProductById = (productId: number) => {
    return cart.find((product) => product.id === productId);
  };

  const getCartItems = () => {
    return [...cart];
  };

  const getTotalItems = () => {
    return cart.reduce((totalItems, product) => totalItems + product.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    editQuantity,
    getTotal,
    getProductById,
    getCartItems,
    getTotalItems
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
