// CO4: Async data engineering; skeleton UIs; state co-location
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { api } from '../services/api';
import { useOrder } from '../context/OrderContext';
import type { MenuItem } from '../types';

// Skeleton loader component for premium loading state
const MenuSkeleton: React.FC = () => (
    <div className="menu-grid" style={{ opacity: 0.3 }}>
        {[1, 2].map(col => (
            <div key={col} className="menu-category">
                <h3 style={{ width: '120px', height: '24px', background: 'var(--clr-border)', borderRadius: '4px' }}>&nbsp;</h3>
                {[1, 2, 3].map(item => (
                    <div key={item} className="menu-item">
                        <div className="menu-item-header">
                            <div style={{ width: '140px', height: '18px', background: 'var(--clr-border)', borderRadius: '4px' }}></div>
                            <div style={{ width: '50px', height: '18px', background: 'var(--clr-border)', borderRadius: '4px' }}></div>
                        </div>
                        <div style={{ width: '200px', height: '14px', background: 'var(--clr-border)', borderRadius: '4px', marginTop: '8px' }}></div>
                    </div>
                ))}
            </div>
        ))}
    </div>
);

// Clickable menu item with subtle feedback
const ClickableMenuItem: React.FC<{ item: MenuItem; onAdd: (item: MenuItem) => void }> = ({ item, onAdd }) => {
    const [justAdded, setJustAdded] = useState(false);

    const handleClick = () => {
        onAdd(item);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 800);
    };

    return (
        <div 
            className={`menu-item clickable-item ${justAdded ? 'item-added' : ''}`}
            onClick={handleClick}
            title="Click to add to your pickup order"
        >
            <div className="menu-item-header">
                <h4>{item.name}</h4>
                <span className="price">${item.price.toFixed(2)}</span>
            </div>
            <p>{item.description}</p>
            {justAdded && <span className="added-badge">✓ Added</span>}
        </div>
    );
};

export const MenuPage: React.FC = () => {
    // CO4: State co-location; async flow control
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { addItem, orderItems } = useOrder();

    useEffect(() => {
        let isMounted = true; // Prevent race conditions (CO4)
        api.fetchMenu().then(data => {
            if (isMounted) {
                setMenu(data);
                setLoading(false);
            }
        });
        return () => { isMounted = false };
    }, []);

    // CO3: useMemo for derived state
    const coffeeItems = useMemo(() => menu.filter(item => item.category === 'coffee'), [menu]);
    const pastryItems = useMemo(() => menu.filter(item => item.category === 'pastry'), [menu]);

    // CO3: useCallback to prevent re-renders
    const handleAddItem = useCallback((item: MenuItem) => {
        addItem(item);
    }, [addItem]);

    const totalItems = orderItems.reduce((sum, o) => sum + o.quantity, 0);

    return (
        <>
            <PageHeader
                title="A Curated Menu."
                subtitle="Our Offerings"
                imagePath="/images/latte_art.png"
                height="50vh"
            >
                <p className="fade-up delay-1" style={{ marginTop: '1rem', color: 'var(--clr-text)', fontSize: '1.1rem' }}>
                    Click any item to add it to your pickup order
                </p>
            </PageHeader>

            <section className="menu">
                <div className="container">
                    {totalItems > 0 && (
                        <div className="order-indicator fade-in">
                            <span>🛒 {totalItems} item{totalItems > 1 ? 's' : ''} in your order</span>
                            <Link to="/book" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Go to Pickup →</Link>
                        </div>
                    )}

                    {loading ? (
                        <MenuSkeleton />
                    ) : (
                        <div className="menu-grid">
                            <div className="menu-category">
                                <h3>Coffee</h3>
                                {coffeeItems.map(item => (
                                    <ClickableMenuItem key={item.id} item={item} onAdd={handleAddItem} />
                                ))}
                            </div>

                            <div className="menu-category">
                                <h3>Pastries</h3>
                                {pastryItems.map(item => (
                                    <ClickableMenuItem key={item.id} item={item} onAdd={handleAddItem} />
                                ))}
                            </div>

                            <div className="menu-featured">
                                <div className="featured-card">
                                    <img src="/images/croissant_pastry.png" alt="Fresh Butter Croissant" />
                                    <div className="featured-overlay">
                                        <span>Freshly Baked Daily</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};
