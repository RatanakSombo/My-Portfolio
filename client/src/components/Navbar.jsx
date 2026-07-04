import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  // State for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);
  // State for tracking which section is currently in the viewport
  const [activeSection, setActiveSection] = useState('home');
  // Detect if we are on the Admin page (separate route)
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Smooth scroll to a section and close mobile menu
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false);

    // If we're on the admin page, navigate home first then scroll
    if (isAdminPage) {
      window.location.href = '/#' + sectionId;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // IntersectionObserver to highlight the active navbar link as user scrolls
  useEffect(() => {
    if (isAdminPage) return; // Don't observe on admin page

    const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];
    const observers = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [isAdminPage]);

  // Navigation items for the portfolio sections
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo / Brand Name */}
        <a href="#home" className="nav-logo" onClick={(e) => scrollToSection(e, 'home')}>
          <span>Sombo Portfolio</span>
        </a>

        {/* Desktop Menu links */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`nav-link ${!isAdminPage && activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => scrollToSection(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Link to="/admin" className={`admin-link ${isAdminPage ? 'active' : ''}`}>
              Admin
            </Link>
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
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`mobile-link ${!isAdminPage && activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => scrollToSection(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Link to="/admin" className="mobile-link admin-mobile" onClick={toggleMenu}>Admin Dashboard</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
