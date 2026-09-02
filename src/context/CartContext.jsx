import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const { data } = await api.get('/cart');
      const validCart = data && Array.isArray(data.cart?.items) ? data.cart : { items: [] };
      setCart(validCart);
    } catch {
      setCart({ items: [] });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      const { data } = await api.post('/cart/add', { productId, quantity });
      setCart(data.cart);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    setLoading(true);
    try {
      const { data } = await api.put('/cart/update', { productId, quantity });
      setCart(data.cart);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      const { data } = await api.delete(`/cart/remove/${productId}`);
      setCart(data.cart);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      const { data } = await api.delete('/cart/clear');
      setCart(data.cart);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const itemCount = (cart?.items || []).reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = (cart?.items || []).reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    cart,
    loading,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    itemCount,
    subtotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}