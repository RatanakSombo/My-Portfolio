import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: { 
    type: String, 
    required: true 
  },
  position: { 
    type: String, 
    required: true 
  },
  startDate: { 
    type: String, 
    required: true 
  },
  endDate: { 
    type: String, 
    default: 'Present' 
  },
  description: { 
    type: String, 
    default: '' 
  }
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
