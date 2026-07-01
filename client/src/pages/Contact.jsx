import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  // 1. Form state variables
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // 2. Status states to track API communication
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Handler to update form fields when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value // Dynamic update based on the input name attribute
    });
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop standard browser page reload
    setSuccessMsg('');
    setErrorMsg('');

    const { name, email, subject, message } = formData;

    // A. Client-Side Validation
    if (!name || !email || !subject || !message) {
      setErrorMsg('All form fields are required. Please fill them out.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // B. Send data to the backend API
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Something went wrong while sending your message.');
      }

      // Success
      setSuccessMsg(responseData.message || 'Thank you! Your message has been sent successfully.');
      
      // Clear the form fields
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Could not connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page fade-in">
      <div className="page-header">
        <h1>Contact Me</h1>
        <p className="subtitle">Feel free to drop a message! I will get back to you as soon as possible.</p>
      </div>

      <div className="contact-grid">
        {/* Left Side: Contact Information Cards */}
        <div className="contact-info-column">
          <div className="card info-card">
            <Mail className="info-card-icon" size={28} />
            <div>
              <h3>Email Me</h3>
              <p><a href="mailto:rc6025010072@student.university.edu">rc6025010072@student.university.edu</a></p>
            </div>
          </div>

          <div className="card info-card">
            <MapPin className="info-card-icon" size={28} />
            <div>
              <h3>Location</h3>
              <p>Phnom Penh, Cambodia</p>
            </div>
          </div>

          <div className="card info-card">
            <Phone className="info-card-icon" size={28} />
            <div>
              <h3>Phone Number</h3>
              <p>+855 (0) 12 345 678</p>
            </div>
          </div>
        </div>

        {/* Right Side: The Contact Form */}
        <div className="card contact-form-card">
          <h2>Send a Message</h2>
          
          {/* Show Success Notification */}
          {successMsg && (
            <div className="success-box">
              <CheckCircle size={20} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Show Error Notification */}
          {errorMsg && <div className="error-box">{errorMsg}</div>}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter your full name"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                placeholder="What is this regarding?"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5"
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Write your message here..."
                required 
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-submit"
              disabled={loading}
            >
              {loading ? (
                'Sending...'
              ) : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
