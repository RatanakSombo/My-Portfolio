import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Mail } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-page fade-in">
      <div className="home-hero-container">
        {/* Text Section */}
        <div className="hero-text-section">
          <span className="hero-welcome">Welcome to my professional space</span>
          <h1 className="hero-name">Chhoeun Ratanaksombo</h1>
          <h2 className="hero-title">Software Engineering Student</h2>

          <p className="hero-intro">
            Hello! I am a passionate software engineering student at Camtech University.
            I love learning modern technologies and building clean, responsive full-stack applications.
            Explore my website to see my skills, projects, and educational journey!
          </p>

          {/* Call to Actions (CTAs) */}
          <div className="hero-ctas">
            <Link to="/projects" className="btn btn-primary">
              View My Projects <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Me <Mail size={18} />
            </Link>
            <a
              href="/Ratanaksombo CV.pdf"
              download="Ratanaksombo CV.pdf"
              className="btn btn-outline"
            >
              Download CV <Download size={18} />
            </a>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="hero-image-section">
          <div className="avatar-frame">
            {/* We will use a professional placeholder illustration */}
            <img
              src="/photo_2026-07-01_18-44-49.jpg"
              alt="Chhoeun Ratanaksombo Avatar"
              className="avatar-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
