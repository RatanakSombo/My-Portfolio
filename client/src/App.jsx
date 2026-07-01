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

function App() {
  return (
    <Router>
      {/* Root Wrapper to stretch elements and position header/footer */}
      <div className="app-wrapper">
        
        {/* Navigation Bar (Shared across all pages) */}
        <Navbar />
        
        {/* Main Content Area: React Router will display components here based on the URL */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
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
