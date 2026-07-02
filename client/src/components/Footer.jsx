import React from 'react';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Author details */}
        <p className="footer-text">
          &copy; {currentYear} <strong>Chhoeun Ratanaksombo</strong>. All rights reserved.
        </p>
        <p className="footer-subtext">
          Web Development Final Assessment | Student ID: rc6025010072
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
          <a
            href="mailto:rc6025010072@student.university.edu"
            aria-label="Email Contact"
            className="footer-icon-link"
          >
            <Mail size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
