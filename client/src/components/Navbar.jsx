import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Code } from 'lucide-react';

const Navbar = () => {
  // state variable to manage whether the mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // function to toggle the mobile menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo / Brand Name */}
        <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
          <span>Sombo</span>
        </Link>

        {/* Desktop Menu links (Hidden on mobile screens) */}
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              About Me
            </NavLink>
          </li>
          <li>
            <NavLink to="/skills" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Skills
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Hamburger Icon button for Mobile Menu */}
        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Navigation Menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Links List (Only visible when isOpen is true) */}
      {isOpen && (
        <ul className="mobile-nav-links">
          <li>
            <Link to="/" className="mobile-link" onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link to="/about" className="mobile-link" onClick={toggleMenu}>About Me</Link>
          </li>
          <li>
            <Link to="/skills" className="mobile-link" onClick={toggleMenu}>Skills</Link>
          </li>
          <li>
            <Link to="/projects" className="mobile-link" onClick={toggleMenu}>Projects</Link>
          </li>
          <li>
            <Link to="/contact" className="mobile-link" onClick={toggleMenu}>Contact</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
