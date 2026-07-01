import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  problem: { 
    type: String, 
    required: true 
  },
  technologies: [
    { type: String }
  ],
  imageUrl: { 
    type: String, 
    default: '' 
  },
  githubUrl: { 
    type: String, 
    default: '' 
  },
  liveUrl: { 
    type: String, 
    default: '' 
  },
  contribution: { 
    type: String, 
    required: true 
  },
  challenges: { 
    type: String, 
    required: true 
  },
  lessonsLearned: { 
    type: String, 
    required: true 
  },
  featured: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
