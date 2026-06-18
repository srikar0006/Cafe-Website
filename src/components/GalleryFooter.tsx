export const Footer = () => {
    return (
        <footer className="footer" id="visit">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <h2>Aura.</h2>
                    <p>Crafting moments through exceptional coffee and warm hospitality.</p>
                </div>
                <div className="footer-contact">
                    <h3>Visit Us</h3>
                    <p>12 Church Street<br/>Indiranagar, Bengaluru 560038</p>
                    <p className="phone">+91 98765 43210</p>
                </div>
                <div className="footer-hours">
                    <h3>Hours</h3>
                    <p>Mon-Fri: 7am - 6pm</p>
                    <p>Sat-Sun: 8am - 5pm</p>
                </div>
                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                        <a href="#">Instagram</a>
                        <a href="#">Facebook</a>
                        <a href="#">Twitter</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Aura Coffee Roasters. All rights reserved.</p>
            </div>
        </footer>
    );
};
