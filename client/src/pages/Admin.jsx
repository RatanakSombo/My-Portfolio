import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, MessageSquare, Briefcase, CheckCircle, AlertTriangle } from 'lucide-react';

const Admin = () => {
  // Tabs: 'projects' or 'messages'
  const [activeTab, setActiveTab] = useState('projects');
  
  // Data lists
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Auth state
  const [adminKey, setAdminKey] = useState(localStorage.getItem('adminKey') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminKey'));
  const [loginKey, setLoginKey] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Form states for creating / editing projects
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmDeleteMsgId, setConfirmDeleteMsgId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    problem: '',
    technologies: '', // We will read/write this as a comma-separated string
    imageUrl: '',
    githubUrl: '',
    liveUrl: '',
    contribution: '',
    challenges: '',
    lessonsLearned: '',
    featured: false
  });

  // Success / Error messages
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginKey.trim()) {
      setLoginError('Please enter the admin secret key.');
      return;
    }
    setLoginError('');
    setAdminKey(loginKey.trim());
    localStorage.setItem('adminKey', loginKey.trim());
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    setAdminKey('');
    setLoginKey('');
    localStorage.removeItem('adminKey');
    setIsAuthenticated(false);
    setProjects([]);
    setMessages([]);
  };

  // Fetch projects and messages
  const fetchData = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      
      // Fetch projects (Public GET request)
      const projRes = await fetch('https://dbje835narh8b.cloudfront.net/api/projects');
      const projData = await projRes.json();
      setProjects(projData);

      // Fetch messages (Protected GET request: requires admin key in headers)
      const msgRes = await fetch('https://dbje835narh8b.cloudfront.net/api/messages', {
        headers: {
          'x-admin-key': adminKey
        }
      });
      
      const msgData = await msgRes.json();
      if (msgRes.ok) {
        setMessages(msgData);
      } else {
        // If the key is wrong or empty, we just clear messages and don't crash
        setMessages([]);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to connect to backend server. Make sure server is online!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [adminKey]); // Automatically refetch when the user changes their admin key!

  // Handle text field changes in the form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Clear form helper
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      problem: '',
      technologies: '',
      imageUrl: '',
      githubUrl: '',
      liveUrl: '',
      contribution: '',
      challenges: '',
      lessonsLearned: '',
      featured: false
    });
    setIsEditing(false);
    setEditId(null);
  };

  // Submit Handler for Add / Edit project
  const handleSubmitProject = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    // Convert comma-separated string into array of strings
    const techArray = formData.technologies
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '');

    const payload = {
      ...formData,
      technologies: techArray
    };

    try {
      let response;
      if (isEditing) {
        // Edit Mode: PUT request (needs auth key in headers)
        response = await fetch(`https://dbje835narh8b.cloudfront.net/api/projects/${editId}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-key': adminKey
          },
          body: JSON.stringify(payload)
        });
      } else {
        // Create Mode: POST request (needs auth key in headers)
        response = await fetch('https://dbje835narh8b.cloudfront.net/api/projects', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-key': adminKey
          },
          body: JSON.stringify(payload)
        });
      }

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Operation failed');
      }

      setSuccessMsg(isEditing ? 'Project updated successfully!' : 'Project created successfully!');
      resetForm();
      fetchData(); // Reload list
    } catch (err) {
      setErrorMsg(err.message || 'Operation failed. Try again.');
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    // If we haven't clicked once yet, put it in confirmation mode
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      return;
    }
    
    setConfirmDeleteId(null);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      // Delete request (needs auth key in headers)
      const response = await fetch(`https://dbje835narh8b.cloudfront.net/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-key': adminKey
        }
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || 'Delete failed');
      }
      setSuccessMsg('Project deleted successfully.');
      fetchData(); // Reload list
    } catch (err) {
      setErrorMsg(err.message || 'Delete failed.');
    }
  };

  // Delete contact message
  const handleDeleteMessage = async (id) => {
    // If we haven't clicked once yet, put it in confirmation mode
    if (confirmDeleteMsgId !== id) {
      setConfirmDeleteMsgId(id);
      return;
    }
    
    setConfirmDeleteMsgId(null);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      // Delete request (needs auth key in headers)
      const response = await fetch(`https://dbje835narh8b.cloudfront.net/api/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-key': adminKey
        }
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || 'Delete failed');
      }
      setSuccessMsg('Message deleted successfully.');
      fetchData(); // Reload list
    } catch (err) {
      setErrorMsg(err.message || 'Delete failed.');
    }
  };

  // Load project into form for editing
  const startEditProject = (proj) => {
    setIsEditing(true);
    setEditId(proj._id);
    setFormData({
      title: proj.title,
      description: proj.description,
      problem: proj.problem,
      technologies: proj.technologies.join(', '), // convert array to comma-separated string
      imageUrl: proj.imageUrl || '',
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      contribution: proj.contribution,
      challenges: proj.challenges,
      lessonsLearned: proj.lessonsLearned,
      featured: proj.featured || false
    });
    // Scroll form into view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Login Gate: show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="admin-page fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '40px 32px', textAlign: 'center' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ 
              width: '64px', height: '64px', borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--primary), var(--accent))', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              margin: '0 auto 16px'
            }}>
              <AlertTriangle size={28} color="#fff" />
            </div>
            <h2 style={{ marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>Admin Access</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Enter the secret key to access the administration panel.
            </p>
          </div>
          
          {loginError && <div className="error-box" style={{ marginBottom: '16px' }}>{loginError}</div>}
          
          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label htmlFor="loginKeyInput" style={{ fontWeight: '600' }}>Secret Key</label>
              <input 
                type="password" 
                id="loginKeyInput"
                value={loginKey}
                onChange={(e) => setLoginKey(e.target.value)}
                placeholder="Enter admin secret key"
                autoFocus
                style={{ marginTop: '6px' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px', padding: '12px' }}>
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1>Administration Panel</h1>
          <p className="subtitle">Manage project data (CRUD) and view messages received from visitors.</p>
        </div>
        <button 
          className="btn btn-outline" 
          onClick={handleLogout}
          style={{ padding: '8px 20px', fontSize: '0.85rem' }}
        >
          <X size={16} /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => { setActiveTab('projects'); resetForm(); }}
        >
          <Briefcase size={18} /> Manage Projects
        </button>
        <button 
          className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => { setActiveTab('messages'); resetForm(); }}
        >
          <MessageSquare size={18} /> View Messages ({messages.length})
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="success-box">
          <CheckCircle size={20} /> <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="error-box">
          <AlertTriangle size={20} /> <span>{errorMsg}</span>
        </div>
      )}

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      )}

      {!loading && activeTab === 'projects' && (
        <div className="admin-projects-layout">
          {/* Left Column: Create/Edit Form */}
          <div className="card admin-form-card">
            <h2>{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
            
            <form onSubmit={handleSubmitProject} className="admin-form">
              <div className="form-group">
                <label>Project Title *</label>
                <input 
                  type="text" name="title" value={formData.title} 
                  onChange={handleInputChange} required 
                />
              </div>

              <div className="form-group">
                <label>Short Description *</label>
                <textarea 
                  name="description" value={formData.description} 
                  onChange={handleInputChange} rows="2" required 
                />
              </div>

              <div className="form-group">
                <label>Technologies (Comma separated) *</label>
                <input 
                  type="text" name="technologies" value={formData.technologies} 
                  onChange={handleInputChange} placeholder="React, Node.js, Express, MongoDB" required 
                />
              </div>

              <div className="form-group">
                <label>Project Image URL</label>
                <input 
                  type="text" name="imageUrl" value={formData.imageUrl} 
                  onChange={handleInputChange} placeholder="https://image-url.com/pic.jpg" 
                />
              </div>

              <div className="form-group">
                <label>GitHub Repository URL</label>
                <input 
                  type="text" name="githubUrl" value={formData.githubUrl} 
                  onChange={handleInputChange} placeholder="https://github.com/..." 
                />
              </div>

              <div className="form-group">
                <label>Live Demo URL</label>
                <input 
                  type="text" name="liveUrl" value={formData.liveUrl} 
                  onChange={handleInputChange} placeholder="https://site-demo.com" 
                />
              </div>

              <div className="form-group">
                <label>Problem Addressed *</label>
                <textarea 
                  name="problem" value={formData.problem} 
                  onChange={handleInputChange} rows="2" required 
                />
              </div>

              <div className="form-group">
                <label>My Individual Contribution *</label>
                <textarea 
                  name="contribution" value={formData.contribution} 
                  onChange={handleInputChange} rows="2" required 
                />
              </div>

              <div className="form-group">
                <label>Challenges Encountered *</label>
                <textarea 
                  name="challenges" value={formData.challenges} 
                  onChange={handleInputChange} rows="2" required 
                />
              </div>

              <div className="form-group">
                <label>Lessons Learned *</label>
                <textarea 
                  name="lessonsLearned" value={formData.lessonsLearned} 
                  onChange={handleInputChange} rows="2" required 
                />
              </div>

              <div className="form-group-checkbox">
                <input 
                  type="checkbox" id="featured" name="featured" checked={formData.featured} 
                  onChange={handleInputChange} 
                />
                <label htmlFor="featured">Feature this project on landing cards?</label>
              </div>

              <div className="admin-form-actions">
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Save Changes' : 'Add Project'}
                </button>
                {isEditing && (
                  <button type="button" className="btn btn-outline" onClick={resetForm}>
                    Cancel <X size={16} />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Existing Projects List */}
          <div className="admin-list-column">
            <h2>Existing Projects ({projects.length})</h2>
            <div className="admin-items-list">
              {projects.length === 0 ? (
                <p className="no-data">No projects in database yet.</p>
              ) : (
                projects.map((proj) => (
                  <div key={proj._id} className="card admin-item-card">
                    <div className="admin-item-header">
                      <h3>{proj.title}</h3>
                      <div className="admin-item-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {confirmDeleteId === proj._id ? (
                          <>
                            <button 
                              className="btn" 
                              style={{ padding: '6px 12px', fontSize: '0.8rem', backgroundColor: 'var(--error)', color: 'white' }}
                              onClick={() => handleDeleteProject(proj._id)}
                            >
                              Confirm
                            </button>
                            <button 
                              className="btn btn-outline" 
                              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                              onClick={() => setConfirmDeleteId(null)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              className="btn-icon btn-edit" 
                              onClick={() => startEditProject(proj)}
                              title="Edit Project"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              className="btn-icon btn-delete" 
                              onClick={() => handleDeleteProject(proj._id)}
                              title="Delete Project"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="admin-item-desc">{proj.description}</p>
                    <div className="admin-item-tags">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Messages Tab View */}
      {!loading && activeTab === 'messages' && (
        <div className="admin-messages-layout">
          <h2>Received Messages ({messages.length})</h2>
          <div className="admin-messages-list">
            {messages.length === 0 ? (
              <p className="no-data">No messages received yet.</p>
            ) : (
              messages.map((msg) => (
                <div key={msg._id} className="card admin-message-card">
                   <div className="msg-header">
                     <div>
                       <h3>{msg.subject}</h3>
                       <p className="msg-meta">From: <strong>{msg.name}</strong> ({msg.email})</p>
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                       <span className="msg-date">
                         {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </span>
                       
                       {/* Message Delete Action */}
                       <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                         {confirmDeleteMsgId === msg._id ? (
                           <>
                             <button 
                               className="btn" 
                               style={{ padding: '4px 8px', fontSize: '0.75rem', backgroundColor: 'var(--error)', color: 'white' }}
                               onClick={() => handleDeleteMessage(msg._id)}
                             >
                               Confirm
                             </button>
                             <button 
                               className="btn btn-outline" 
                               style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                               onClick={() => setConfirmDeleteMsgId(null)}
                             >
                               Cancel
                             </button>
                           </>
                         ) : (
                           <button 
                             className="btn-icon btn-delete" 
                             style={{ padding: '4px', opacity: 0.7 }}
                             onClick={() => setConfirmDeleteMsgId(msg._id)}
                             title="Delete Message"
                           >
                             <Trash2 size={15} />
                           </button>
                         )}
                       </div>
                     </div>
                   </div>
                  <p className="msg-content">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
