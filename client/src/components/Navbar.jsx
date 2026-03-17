// Navbar.jsx — Sticky top navigation bar with active-link highlighting
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Home, UserPlus, PlusSquare, List } from 'lucide-react';

function Navbar() {
  // Apply 'active' CSS class when the route matches
  const linkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand logo & name */}
        <NavLink to="/" className="navbar-brand">
          <Heart size={22} fill="currentColor" />
          Volunteer<span>Connect</span>&nbsp;AI
        </NavLink>

        {/* Navigation links */}
        <div className="navbar-links">
          <NavLink to="/" end className={linkClass}>
            <Home size={16} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/opportunities" className={linkClass}>
            <List size={16} />
            <span>Opportunities</span>
          </NavLink>

          <NavLink to="/register" className={linkClass}>
            <UserPlus size={16} />
            <span>Join as Volunteer</span>
          </NavLink>

          <NavLink to="/post-opportunity" className={linkClass}>
            <PlusSquare size={16} />
            <span>Post Opportunity</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
