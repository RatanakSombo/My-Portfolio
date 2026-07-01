import Skill from '../models/Skill.js';

// Get all skills
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load skills', error: error.message });
  }
};

// Add a new skill
export const createSkill = async (req, res) => {
  try {
    const { name, category, level } = req.body;

    if (!name || !category) {
      return res.status(400).json({ message: 'Name and Category are required' });
    }

    const newSkill = new Skill({ name, category, level });
    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create skill', error: error.message });
  }
};

// Update an existing skill
export const updateSkill = async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update skill', error: error.message });
  }
};

// Delete a skill
export const deleteSkill = async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res.status(404).json({ message: 'Skill not found to delete' });
    }
    res.status(200).json({ message: 'Skill successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete skill', error: error.message });
  }
};
