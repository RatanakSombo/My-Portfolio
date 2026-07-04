import React from 'react';
import { Github, Linkedin } from './Icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Author details */}
        <p className="footer-text">
          &copy; {currentYear} <strong>Chhoeun Ratanaksombo</strong>
        </p>
        <p className="footer-subtext">
          Camtech University | Student ID: rc6025010072
        </p>

        {/* Social Links */}
        <div className="footer-socials">
          <a
            href="https://github.com/RatanakSombo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="footer-icon-link"
          >
            <Github size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/sombo-kh-36b073418/?skipRedirect=true"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="footer-icon-link"
          >
            <Linkedin size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
