// CO4: State co-location; global state via Context
import React, { createContext, useContext, useState } from 'react';
import type { MenuItem } from '../types';

interface OrderItem {
    item: MenuItem;
    quantity: number;
}

interface OrderContextType {
    orderItems: OrderItem[];
    addItem: (item: MenuItem) => void;
    removeItem: (itemId: string) => void;
    clearOrder: () => void;
    getOrderText: () => string;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

    const addItem = (item: MenuItem) => {
        setOrderItems(prev => {
            const existing = prev.find(o => o.item.id === item.id);
            if (existing) {
                // Increment quantity if already in order
                return prev.map(o =>
                    o.item.id === item.id ? { ...o, quantity: o.quantity + 1 } : o
                );
            }
            return [...prev, { item, quantity: 1 }];
        });
    };

    const removeItem = (itemId: string) => {
        setOrderItems(prev => prev.filter(o => o.item.id !== itemId));
    };

    const clearOrder = () => setOrderItems([]);

    const getOrderText = () => {
        return orderItems.map(o => `${o.quantity}x ${o.item.name}`).join(', ');
    };

    return (
        <OrderContext.Provider value={{ orderItems, addItem, removeItem, clearOrder, getOrderText }}>
            {children}
        </OrderContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error("useOrder must be used within an OrderProvider");
    return context;
};
