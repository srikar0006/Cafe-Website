// CO3: Component as deterministic UI function; composition patterns
import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
    return (
        <>
            {/* ===== FULL-SCREEN HERO ===== */}
            <header className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <span className="section-subtitle fade-up">Aura Coffee Roasters</span>
                    <h1 className="fade-up">Crafted for the Senses.</h1>
                    <p className="fade-up delay-1">Artisanal coffee, freshly baked pastries, and an atmosphere designed to inspire.</p>
                    <div className="hero-buttons fade-up delay-2">
                        <Link to="/book" className="btn btn-primary">Book a Table</Link>
                        <Link to="/menu" className="btn btn-secondary">View Menu</Link>
                    </div>
                </div>
            </header>

            {/* ===== ABOUT SECTION ===== */}
            <section className="about" id="about">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-text">
                            <span className="section-subtitle">Our Philosophy</span>
                            <h2>More than just coffee.</h2>
                            <p>At Aura, we believe that every cup tells a story. From the ethically sourced beans to the careful precision of our baristas, we obsess over the details so you don't have to.</p>
                            <p>Our space is intentionally designed to be your sanctuary in the city—a place where ideas flow as freely as our espresso.</p>
                            <Link to="/menu" className="btn btn-outline">Explore Offerings</Link>
                        </div>
                        <div className="about-image-wrapper">
                            <div className="decorative-square"></div>
                            <div className="about-image-card">
                                <img src="/images/latte_art.png" alt="Latte Art Pouring" className="about-img" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== GALLERY SECTION ===== */}
            <section className="gallery">
                <div className="gallery-container">
                    <div className="gallery-item large">
                        <img src="/images/cafe_vibes.png" alt="Cafe Interior" />
                        <div className="item-overlay">The Space</div>
                    </div>
                    <div className="gallery-item">
                        <img src="/images/latte_art.png" alt="Latte Art" />
                        <div className="item-overlay">The Craft</div>
                    </div>
                    <div className="gallery-item">
                        <img src="/images/croissant_pastry.png" alt="Croissant" />
                        <div className="item-overlay">The Taste</div>
                    </div>
                    <div className="gallery-item wide">
                        <img src="/images/hero_bg.png" alt="Coffee Beans" />
                        <div className="item-overlay">The Origin</div>
                    </div>
                </div>
            </section>
        </>
    );
};
