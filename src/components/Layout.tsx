// CO5: SPA routing fundamentals; rendering boundaries
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export const Layout: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuActive, setIsMobileMenu] = useState(false);
    const location = useLocation();

    // Side-effects as controlled event loops (CO3)
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenu(false);
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            {/* Samsung-style Edge Lighting */}
            <div className="edge-glow"></div>

            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="nav-container">
                    <Link to="/" className="logo">Aura.</Link>
                    
                    <ul className={`nav-links ${isMobileMenuActive ? 'active' : ''}`}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/book">Reservations</Link></li>
                    </ul>
                    <Link to="/book" className="cta-btn">Book / Order</Link>
                    
                    <div 
                        className="menu-toggle" 
                        onClick={() => setIsMobileMenu(!isMobileMenuActive)}
                    >
                        <span className="bar" style={{ transform: isMobileMenuActive ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
                        <span className="bar" style={{ opacity: isMobileMenuActive ? 0 : 1 }}></span>
                        <span className="bar" style={{ transform: isMobileMenuActive ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
                    </div>
                </div>
            </nav>

            <main>
                {/* Outlet renders the matched child route component */}
                <Outlet />
            </main>

            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <h2>Aura.</h2>
                            <p>Crafting exceptional coffee experiences in a space designed for connection and inspiration.</p>
                        </div>
                        <div className="footer-links">
                            <h3>Explore</h3>
                            <ul className="social-links">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/menu">Menu</Link></li>
                                <li><Link to="/book">Reservations</Link></li>
                            </ul>
                        </div>
                        <div className="footer-contact">
                            <h3>Visit Us</h3>
                            <p>123 Artisan Ave<br />Coffee District, NY 10001</p>
                        </div>
                        <div className="footer-social">
                            <h3>Connect</h3>
                            <div className="social-links">
                                <a href="#">Instagram</a>
                                <a href="#">Twitter</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2026 Aura Coffee Roasters. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};
