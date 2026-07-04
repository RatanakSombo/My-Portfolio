import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, X, Award } from 'lucide-react';
import { Github } from '../components/Icons';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State to track which project is currently opened in the modal details popup
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dbje835narh8b.cloudfront.net/api/projects');
        if (!response.ok) {
          throw new Error('Failed to retrieve projects list');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch projects. Please verify the API server is online!');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="projects-page fade-in">
      <div className="page-header">
        <h1>My Projects</h1>
        <p className="subtitle">Explore my academic and software engineering projects. Click on any card to see full project details.</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading projects from database...</p>
        </div>
      )}

      {/* Error State */}
      {error && <div className="error-box">{error}</div>}

      {/* Projects Grid */}
      {!loading && !error && (
        <div className="projects-grid">
          {projects.length === 0 ? (
            <p className="no-data">No projects found.</p>
          ) : (
            projects.map((project) => (
              <div key={project._id} className="card project-card">
                {/* Project Image */}
                {project.imageUrl && (
                  <div className="project-card-image-wrapper">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="project-card-image"
                    />
                  </div>
                )}
                
                {/* Project Short Details */}
                <div className="project-card-content">
                  {project.featured && (
                    <span className="featured-badge">
                      <Award size={14} /> Featured
                    </span>
                  )}
                  <h3>{project.title}</h3>
                  <p className="project-short-desc">{project.description}</p>
                  
                  {/* Tech stack tags */}
                  <div className="project-tech-tags">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  {/* View Details CTA */}
                  <button 
                    className="btn btn-secondary btn-full"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Project Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Project Details Modal (Popup) - Rendered via Portal to avoid stacking context issues */}
      {selectedProject && createPortal(
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div className="modal-header-section">
              <h2>{selectedProject.title}</h2>
              <div className="project-tech-tags">
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            {/* Modal Body Scroll Container */}
            <div className="modal-body">
              {selectedProject.imageUrl && (
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  className="modal-image"
                />
              )}

              <div className="modal-details-grid">
                <div>
                  <h3>Overview</h3>
                  <p>{selectedProject.description}</p>
                  
                  <h3>The Problem Addressed</h3>
                  <p className="problem-text">{selectedProject.problem}</p>
                </div>

                <div>
                  <h3>My Contribution</h3>
                  <p>{selectedProject.contribution}</p>
                  
                  <h3>Challenges & Solutions</h3>
                  <p>{selectedProject.challenges}</p>

                  <h3>Lessons Learned</h3>
                  <p>{selectedProject.lessonsLearned}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer (Links) */}
            <div className="modal-footer">
              {selectedProject.githubUrl && (
                <a 
                  href={selectedProject.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Github size={18} /> View GitHub Repo
                </a>
              )}
              {selectedProject.liveUrl && (
                <a 
                  href={selectedProject.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <ExternalLink size={18} /> Visit Live Site
                </a>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Projects;
