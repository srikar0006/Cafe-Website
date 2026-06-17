// CO2: TS types/interfaces/generics to enforce UI correctness

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'coffee' | 'pastry';
}

export interface Reservation {
    id: string;
    name: string;
    email: string;
    date: string;
    time: string;
    guests: number;
    status: 'pending' | 'confirmed' | 'cancelled';
}

export type AppState = {
    reservations: Reservation[];
    isLoading: boolean;
    error: string | null;
};
