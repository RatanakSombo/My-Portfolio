import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  institution: { 
    type: String, 
    required: true 
  },
  degree: { 
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

const Education = mongoose.model('Education', educationSchema);

export default Education;
