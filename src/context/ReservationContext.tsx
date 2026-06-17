// CO4: Global state requirements; React Context engineering rationale
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Reservation } from '../types';

interface ReservationContextType {
    reservations: Reservation[];
    addReservation: (res: Reservation) => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // State co-location and Global State
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const addReservation = (res: Reservation) => {
        setReservations(prev => [...prev, res]); // Immutability and Pure functions (CO2)
    };

    return (
        <ReservationContext.Provider value={{ reservations, addReservation }}>
            {children}
        </ReservationContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useReservations = () => {
    const context = useContext(ReservationContext);
    if (!context) {
        throw new Error("useReservations must be used within a ReservationProvider");
    }
    return context;
};
