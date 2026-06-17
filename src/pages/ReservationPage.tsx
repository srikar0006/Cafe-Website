// CO5: Form engineering: validation pipelines, controlled forms, error surfaces
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { api } from '../services/api';
import { useReservations } from '../context/ReservationContext';
import { useOrder } from '../context/OrderContext';

export const ReservationPage: React.FC = () => {
    const { addReservation } = useReservations();
    const { orderItems, removeItem, clearOrder } = useOrder();
    const [activeTab, setActiveTab] = useState('reserve');
    
    const [formData, setFormData] = useState({ name: '', email: '', date: '', time: '', guests: 1 });
    const [pickupData, setPickupData] = useState({ name: '', phone: '', time: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [invalidFields, setInvalidFields] = useState<string[]>([]);

    // Custom validation — no browser popup
    const validateReserve = (): boolean => {
        const errors: string[] = [];
        if (!formData.name.trim()) errors.push('res-name');
        if (!formData.email.trim()) errors.push('res-email');
        if (!formData.date) errors.push('res-date');
        if (!formData.time) errors.push('res-time');
        setInvalidFields(errors);
        if (errors.length > 0) setTimeout(() => setInvalidFields([]), 2000);
        return errors.length === 0;
    };

    const validatePickup = (): boolean => {
        const errors: string[] = [];
        if (!pickupData.name.trim()) errors.push('pick-name');
        if (!pickupData.phone.trim()) errors.push('pick-phone');
        if (!pickupData.time) errors.push('pick-time');
        setInvalidFields(errors);
        if (errors.length > 0) setTimeout(() => setInvalidFields([]), 2000);
        return errors.length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateReserve()) return;
        setError(null);
        setSuccess(false);
        setIsSubmitting(true);
        try {
            const newRes = await api.createReservation(formData);
            addReservation(newRes);
            setSuccess(true);
            setFormData({ name: '', email: '', date: '', time: '', guests: 1 });
        } catch (err: unknown) {
            if (err instanceof Error) { setError(err.message); }
            else { setError("Failed to create reservation."); }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePickupSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validatePickup()) return;
        setSuccess(true);
        clearOrder();
        setPickupData({ name: '', phone: '', time: '' });
    };

    const isInvalid = (field: string) => invalidFields.includes(field);
    const orderTotal = orderItems.reduce((sum, o) => sum + o.item.price * o.quantity, 0);

    return (
        <>
            <PageHeader title="Reserve Your Experience." subtitle="Join Us" imagePath="/images/cafe_vibes.png" height="50vh">
                <p className="fade-up delay-1" style={{ fontSize: '1.15rem', marginTop: '1rem', color: 'var(--clr-text)' }}>
                    Book a table or order ahead for a quick pickup.
                </p>
            </PageHeader>

            <section className="booking-ordering">
                <div className="container">
                    <div className="action-card">
                        <div className="tab-container">
                            <button className={`tab-btn ${activeTab === 'reserve' ? 'active' : ''}`} onClick={() => { setActiveTab('reserve'); setSuccess(false); setError(null); setInvalidFields([]); }}>Book a Table</button>
                            <button className={`tab-btn ${activeTab === 'pickup' ? 'active' : ''}`} onClick={() => { setActiveTab('pickup'); setSuccess(false); setError(null); setInvalidFields([]); }}>
                                Order for Pickup {orderItems.length > 0 && `(${orderItems.length})`}
                            </button>
                        </div>

                        <div className="form-container">
                            {success && <div style={{ color: '#4caf50', marginBottom: '20px', padding: '15px', background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.3)', borderRadius: '8px', textAlign: 'center' }}>✓ Successfully confirmed!</div>}
                            {error && <div style={{ color: '#f44336', marginBottom: '20px', padding: '15px', background: 'rgba(244,67,54,0.08)', border: '1px solid rgba(244,67,54,0.3)', borderRadius: '8px', textAlign: 'center' }}>{error}</div>}

                            {activeTab === 'reserve' ? (
                                <form className="action-form fade-in" onSubmit={handleSubmit} noValidate>
                                    <h3>Reserve Your Table</h3>
                                    <div className="form-grid">
                                        <div className={`input-group ${isInvalid('res-name') ? 'input-error' : ''}`}>
                                            <label htmlFor="res-name">Full Name</label>
                                            <input type="text" id="res-name" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                        </div>
                                        <div className={`input-group ${isInvalid('res-email') ? 'input-error' : ''}`}>
                                            <label htmlFor="res-email">Email Address</label>
                                            <input type="email" id="res-email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                        </div>
                                        <div className={`input-group ${isInvalid('res-date') ? 'input-error' : ''}`}>
                                            <label htmlFor="res-date">Date</label>
                                            <input type="date" id="res-date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                                        </div>
                                        <div className={`input-group ${isInvalid('res-time') ? 'input-error' : ''}`}>
                                            <label htmlFor="res-time">Time</label>
                                            <input type="time" id="res-time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                                        </div>
                                        <div className="input-group">
                                            <label htmlFor="res-guests">Guests</label>
                                            <select id="res-guests" value={formData.guests} onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}>
                                                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n === 6 ? '6+' : n} {n === 1 ? 'Person' : 'People'}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="input-group full-width">
                                        <label htmlFor="res-notes">Special Requests</label>
                                        <textarea id="res-notes" rows={3} placeholder="Anniversary, dietary needs..."></textarea>
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="btn btn-primary submit-btn">{isSubmitting ? 'Processing...' : 'Confirm Reservation'}</button>
                                </form>
                            ) : (
                                <form className="action-form fade-in" onSubmit={handlePickupSubmit} noValidate>
                                    <h3>Order for Pickup</h3>

                                    {orderItems.length > 0 && (
                                        <div className="order-items-list">
                                            <label style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Your selected items:</label>
                                            {orderItems.map(o => (
                                                <div key={o.item.id} className="order-line-item">
                                                    <span>{o.quantity}x {o.item.name}</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <span className="price">${(o.item.price * o.quantity).toFixed(2)}</span>
                                                        <button type="button" className="remove-item-btn" onClick={() => removeItem(o.item.id)}>✕</button>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="order-total"><span>Total</span><span className="price">${orderTotal.toFixed(2)}</span></div>
                                        </div>
                                    )}

                                    {orderItems.length === 0 && (
                                        <div style={{ textAlign: 'center', padding: '20px', color: 'var(--clr-text-muted)', marginBottom: '20px' }}>
                                            No items selected yet. <Link to="/menu" style={{ color: 'var(--clr-accent)' }}>Browse our menu →</Link>
                                        </div>
                                    )}

                                    <div className="form-grid">
                                        <div className={`input-group ${isInvalid('pick-name') ? 'input-error' : ''}`}>
                                            <label htmlFor="pick-name">Full Name</label>
                                            <input type="text" id="pick-name" placeholder="John Doe" value={pickupData.name} onChange={e => setPickupData({...pickupData, name: e.target.value})} />
                                        </div>
                                        <div className={`input-group ${isInvalid('pick-phone') ? 'input-error' : ''}`}>
                                            <label htmlFor="pick-phone">Phone</label>
                                            <input type="tel" id="pick-phone" placeholder="(555) 000-0000" value={pickupData.phone} onChange={e => setPickupData({...pickupData, phone: e.target.value})} />
                                        </div>
                                        <div className={`input-group ${isInvalid('pick-time') ? 'input-error' : ''}`}>
                                            <label htmlFor="pick-time">Pickup Time</label>
                                            <input type="time" id="pick-time" value={pickupData.time} onChange={e => setPickupData({...pickupData, time: e.target.value})} />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary submit-btn">Place Order</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
