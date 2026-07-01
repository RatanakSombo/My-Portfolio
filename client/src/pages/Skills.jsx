import React, { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/skills');
        if (!response.ok) {
          throw new Error('Failed to load skills from database');
        }
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch technical skills. Please verify the backend is running!');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Standard categories to group skills under
  const categories = [
    'Programming Languages',
    'Front-End Technologies',
    'Back-End Technologies',
    'Databases',
    'Development Tools'
  ];

  // Simple filter function to get skills belonging to a specific category
  const getSkillsByCategory = (categoryName) => {
    return skills.filter(skill => skill.category === categoryName);
  };

  return (
    <div className="skills-page fade-in">
      <div className="page-header">
        <h1>Technical Skills</h1>
        <p className="subtitle">Here are the main technical languages, tools, and platforms I have studied.</p>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading tech stack...</p>
        </div>
      )}

      {/* Error State */}
      {error && <div className="error-box">{error}</div>}

      {/* Skills Display Grid */}
      {!loading && !error && (
        <div className="skills-grid">
          {categories.map((category) => {
            const categorySkills = getSkillsByCategory(category);
            
            // If we don't have any skills under this category, don't show the card
            if (categorySkills.length === 0) return null;

            return (
              <div key={category} className="card skill-card">
                <div className="skill-card-header">
                  <Cpu className="skill-card-icon" size={24} />
                  <h2>{category}</h2>
                </div>
                
                <div className="skill-items-list">
                  {categorySkills.map((skill) => (
                    <div key={skill._id} className="skill-progress-block">
                      <div className="skill-labels">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      
                      {/* Visual progress bar */}
                      <div className="progress-bar-bg">
                        <div 
                          className="progress-bar-fill" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Skills;
