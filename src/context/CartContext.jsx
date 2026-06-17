import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartContext } from './cartContext.jsx';

const STORAGE_KEY = 'aura-cafe-cart';

const readStoredCartItems = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.reduce((items, storedItem) => {
      if (!storedItem?.id) return items;

      const cleanItem = {
        ...storedItem,
        price: storedItem.basePrice || storedItem.price,
        quantity: storedItem.quantity || 1,
      };
      delete cleanItem.basePrice;
      delete cleanItem.cartId;
      delete cleanItem.selectedOptions;
      delete cleanItem.selectedOptionDetails;

      const existingItem = items.find((item) => item.id === cleanItem.id);
      if (!existingItem) return [...items, cleanItem];

      return items.map((item) =>
        item.id === cleanItem.id ? { ...item, quantity: item.quantity + cleanItem.quantity } : item,
      );
    }, []);
  } catch {
    return [];
  }
};

const addOrIncrementItem = (items, item) => {
  const itemExists = items.some((cartItem) => cartItem.id === item.id);

  if (!itemExists) return [...items, { ...item, quantity: 1 }];

  return items.map((cartItem) =>
    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
  );
};

const sumCartQuantities = (items) => items.reduce((total, item) => total + item.quantity, 0);

const sumCartPrices = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCartItems);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [items]);

  const addToCart = useCallback((item) => {
    setItems((current) => addOrIncrementItem(current, item));
  }, []);

  const removeFromCart = useCallback((cartItemId) => {
    setItems((current) => current.filter((item) => item.id !== cartItemId));
  }, []);

  const decrementCartItem = useCallback((cartItemId) => {
    setItems((current) =>
      current.flatMap((item) => {
        if (item.id !== cartItemId) return [item];
        if (item.quantity <= 1) return [];
        return [{ ...item, quantity: item.quantity - 1 }];
      }),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(() => sumCartQuantities(items), [items]);

  const cartTotal = useMemo(() => sumCartPrices(items), [items]);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      cartTotal,
      addToCart,
      removeFromCart,
      decrementCartItem,
      clearCart,
    }),
    [addToCart, cartTotal, clearCart, decrementCartItem, itemCount, items, removeFromCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
