import React, { useState, useEffect } from 'react';
import { BookOpen, Briefcase, GraduationCap, Award } from 'lucide-react';

const About = () => {
  // State variables to hold database data, loading status, and errors
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect runs automatically when the page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch education from Node/Express API
        const eduResponse = await fetch('http://localhost:5000/api/education');
        if (!eduResponse.ok) {
          throw new Error('Failed to fetch education records');
        }
        const eduData = await eduResponse.json();
        setEducation(eduData);

        // Fetch experience from Node/Express API
        const expResponse = await fetch('http://localhost:5000/api/experience');
        if (!expResponse.ok) {
          throw new Error('Failed to fetch experience records');
        }
        const expData = await expResponse.json();
        setExperience(expData);

      } catch (err) {
        console.error(err);
        setError('Could not connect to the API server. Please make sure the backend is running!');
      } finally {
        setLoading(false); // Stop showing loading spinner once fetch is complete
      }
    };

    fetchData();
  }, []); // Empty array means this runs only once when the page loads

  return (
    <div className="about-page fade-in">
      <div className="page-header">
        <h1>About Me</h1>
        <p className="subtitle">Discover my educational path, strengths, and professional background.</p>
      </div>

      {/* Main Grid */}
      <div className="about-grid">
        {/* Profile Details Card */}
        <div className="card about-bio-card">
          <h2>Who I Am</h2>
          <p>
            I am a Software Engineering student currently pursuing my Bachelor's degree at <strong>Camtech University</strong>.
            My primary focus is on web application development and software architecture. I enjoy building things that solve
            real-world challenges and improve daily life efficiency.
          </p>
          <p>
            With a solid foundation in modern JavaScript, React, Node.js, and database design, I constantly seek out new challenges
            to stretch my technical abilities. I am highly motivated, detail-oriented, and ready to learn and grow in a professional
            environment.
          </p>

          <div className="strengths-section">
            <h3>My Core Strengths</h3>
            <ul className="strengths-list">
              <li> Problem Solving & Logic</li>
              <li> Collaboration & Teamwork</li>
              <li> Fast Learner of New Tech</li>
              <li>Strong Work Ethic</li>
            </ul>
          </div>
        </div>

        {/* Education & Experience Timeline Column */}
        <div className="about-timeline-section">
          {/* Show loading indicator while fetching */}
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading education and experience details...</p>
            </div>
          )}

          {/* Show error message if API fails */}
          {error && <div className="error-box">{error}</div>}

          {/* Render Timeline when loaded successfully */}
          {!loading && !error && (
            <>
              {/* Education Timeline */}
              <div className="timeline-block">
                <h2 className="timeline-title">
                  <GraduationCap size={24} className="timeline-title-icon" />
                  Education
                </h2>
                <div className="timeline">
                  {education.length === 0 ? (
                    <p className="no-data">No education records found in database.</p>
                  ) : (
                    education.map((edu) => (
                      <div key={edu._id} className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <span className="timeline-date">{edu.startDate} - {edu.endDate}</span>
                          <h3>{edu.degree}</h3>
                          <h4>{edu.institution}</h4>
                          <p>{edu.description}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Experience Timeline */}
              <div className="timeline-block">
                <h2 className="timeline-title">
                  <Briefcase size={24} className="timeline-title-icon" />
                  Experience & Activities
                </h2>
                <div className="timeline">
                  {experience.length === 0 ? (
                    <p className="no-data">No experience records found in database.</p>
                  ) : (
                    experience.map((exp) => (
                      <div key={exp._id} className="timeline-item">
                        <div className="timeline-marker animate-marker"></div>
                        <div className="timeline-content">
                          <span className="timeline-date">{exp.startDate} - {exp.endDate}</span>
                          <h3>{exp.position}</h3>
                          <h4>{exp.company}</h4>
                          <p>{exp.description}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
