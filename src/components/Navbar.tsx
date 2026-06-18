import { NavLink } from 'react-router-dom';
import CartMenu from './CartMenu';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo">
          Aura.
        </NavLink>
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/menu">Menu</NavLink>
          </li>
          <li>
            <NavLink to="/booking/reserve">Book</NavLink>
          </li>
          <li>
            <NavLink to="/summary">Current Bookings</NavLink>
          </li>
        </ul>
        <CartMenu />
      </div>
    </nav>
  );
}
