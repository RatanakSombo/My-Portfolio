import Education from '../models/Education.js';

// Get all education items
export const getEducation = async (req, res) => {
  try {
    const educationList = await Education.find();
    res.status(200).json(educationList);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load education records', error: error.message });
  }
};

// Add a new education item
export const createEducation = async (req, res) => {
  try {
    const { institution, degree, startDate, endDate, description } = req.body;

    if (!institution || !degree || !startDate) {
      return res.status(400).json({ message: 'Institution, Degree, and Start Date are required' });
    }

    const newEducation = new Education({
      institution,
      degree,
      startDate,
      endDate,
      description
    });

    const savedEducation = await newEducation.save();
    res.status(201).json(savedEducation);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create education record', error: error.message });
  }
};

// Update an existing education item
export const updateEducation = async (req, res) => {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEducation) {
      return res.status(404).json({ message: 'Education record not found' });
    }
    res.status(200).json(updatedEducation);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update education record', error: error.message });
  }
};

// Delete an education item
export const deleteEducation = async (req, res) => {
  try {
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);
    if (!deletedEducation) {
      return res.status(404).json({ message: 'Education record not found to delete' });
    }
    res.status(200).json({ message: 'Education record successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete education record', error: error.message });
  }
};
