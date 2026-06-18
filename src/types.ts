import type { ReactNode } from 'react';

export type MenuItem = {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  notes: string[];
  badge: string;
  prepTime: string;
  pairing: string;
  image: string;
  detail: string;
};

export type CartItem = MenuItem & {
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  itemCount: number;
  cartTotal: number;
  addToCart: (item: MenuItem | CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  decrementCartItem: (cartItemId: string) => void;
  clearCart: () => void;
};

export type BookingMode = 'reserve' | 'pickup';

export type BookingForm = {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  type: BookingMode;
};

export type BookingErrors = Partial<Record<keyof BookingForm | 'order', string>>;

export type Booking = BookingForm & {
  id: string;
  order: string;
  createdAt: string;
};

export type NewBooking = Omit<Booking, 'id'> & {
  id?: string;
};

export type BookingContextType = {
  bookings: Booking[];
  lastBooking: Booking | null;
  bookingLabel: string;
  saveBooking: (booking: NewBooking) => void;
  clearBookings: () => void;
};

export type PropsWithChildren = {
  children: ReactNode;
};
