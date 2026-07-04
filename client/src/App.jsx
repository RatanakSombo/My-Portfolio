import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Skills from './pages/Skills.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import Admin from './pages/Admin.jsx';
import './App.css';

// Single-page portfolio: all sections rendered vertically on one page
const PortfolioPage = () => {
  return (
    <>
      <section id="home" className="portfolio-section">
        <Home />
      </section>
      <section id="about" className="portfolio-section">
        <About />
      </section>
      <section id="skills" className="portfolio-section">
        <Skills />
      </section>
      <section id="projects" className="portfolio-section">
        <Projects />
      </section>
      <section id="contact" className="portfolio-section">
        <Contact />
      </section>
    </>
  );
};

function App() {
  return (
    <Router>
      {/* Root Wrapper to stretch elements and position header/footer */}
      <div className="app-wrapper">
        
        {/* Navigation Bar (Shared across all pages) */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        
        {/* Footer (Shared across all pages) */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
