import Experience from '../models/Experience.js';

// Get all experience items
export const getExperience = async (req, res) => {
  try {
    const experienceList = await Experience.find();
    res.status(200).json(experienceList);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load experience records', error: error.message });
  }
};

// Add a new experience item
export const createExperience = async (req, res) => {
  try {
    const { company, position, startDate, endDate, description } = req.body;

    if (!company || !position || !startDate) {
      return res.status(400).json({ message: 'Company, Position, and Start Date are required' });
    }

    const newExperience = new Experience({
      company,
      position,
      startDate,
      endDate,
      description
    });

    const savedExperience = await newExperience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create experience record', error: error.message });
  }
};

// Update an existing experience item
export const updateExperience = async (req, res) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExperience) {
      return res.status(404).json({ message: 'Experience record not found' });
    }
    res.status(200).json(updatedExperience);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update experience record', error: error.message });
  }
};

// Delete an experience item
export const deleteExperience = async (req, res) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    if (!deletedExperience) {
      return res.status(404).json({ message: 'Experience record not found to delete' });
    }
    res.status(200).json({ message: 'Experience record successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete experience record', error: error.message });
  }
};
