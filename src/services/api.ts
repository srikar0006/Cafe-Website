// CO4: API service layers; async flow control
import type { MenuItem, Reservation } from '../types';

// Simulated delay for async operations
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    // Fetch menu with simulated latency
    async fetchMenu(): Promise<MenuItem[]> {
        await delay(800); // Simulate network latency
        return [
            // Coffee
            { id: '1', name: 'Espresso', description: 'Rich double shot pulled from single-origin beans', price: 3.50, category: 'coffee' },
            { id: '2', name: 'Flat White', description: 'Velvety micro-foam over a strong espresso base', price: 4.50, category: 'coffee' },
            { id: '3', name: 'Lavender Latte', description: 'House-made lavender syrup with oat milk', price: 5.75, category: 'coffee' },
            { id: '4', name: 'Cold Brew', description: '18-hour steeped, served over hand-cut ice', price: 5.00, category: 'coffee' },
            { id: '5', name: 'Cortado', description: 'Equal parts espresso and steamed milk', price: 4.00, category: 'coffee' },
            { id: '6', name: 'Matcha Latte', description: 'Ceremonial grade matcha whisked with your choice of milk', price: 5.50, category: 'coffee' },
            // Pastries
            { id: '7', name: 'Butter Croissant', description: 'Flaky, golden, baked fresh every morning', price: 4.50, category: 'pastry' },
            { id: '8', name: 'Almond Tart', description: 'Frangipane filling with toasted almond slivers', price: 6.00, category: 'pastry' },
            { id: '9', name: 'Chocolate Fondant', description: 'Warm-centered, dusted with cocoa', price: 7.50, category: 'pastry' },
            { id: '10', name: 'Cinnamon Roll', description: 'Soft dough swirled with cinnamon and cream cheese glaze', price: 5.25, category: 'pastry' },
            { id: '11', name: 'Banana Bread', description: 'Moist, walnut-studded, served warm', price: 4.75, category: 'pastry' },
        ];
    },

    // Submit a reservation with simulated async processing and error boundaries
    async createReservation(data: Omit<Reservation, 'id' | 'status'>): Promise<Reservation> {
        await delay(1200);
        
        // Simulate a potential backend validation error
        if (data.guests > 10) {
            throw new Error("Cannot reserve for more than 10 guests online. Please call us directly.");
        }

        return {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            status: 'confirmed'
        };
    }
};
