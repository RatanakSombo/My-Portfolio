import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Programming Languages', 'Front-End Technologies', 'Back-End Technologies', 'Databases', 'Development Tools', 'Other']
  },
  level: { 
    type: Number, 
    required: true,
    min: 0,
    max: 100,
    default: 80 // Proficiency level as a percentage (0-100)
  }
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
