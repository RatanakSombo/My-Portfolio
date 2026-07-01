import Project from '../models/Project.js';

// 1. Get all projects from the database
export const getProjects = async (req, res) => {
  try {
    // Project.find() tells MongoDB to fetch all documents in the projects collection
    const projects = await Project.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(projects);
  } catch (error) {
    // If something goes wrong, return error message with status code 500 (Internal Server Error)
    res.status(500).json({ message: 'Failed to retrieve projects', error: error.message });
  }
};

// 2. Get a single project by its ID
export const getProjectById = async (req, res) => {
  try {
    // req.params.id is the ID sent in the URL (e.g. /api/projects/12345)
    const project = await Project.findById(req.params.id);
    
    // If the project doesn't exist, return status 404 (Not Found)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the project', error: error.message });
  }
};

// 3. Create a new project (Add project)
export const createProject = async (req, res) => {
  try {
    // Read project data from the body of the request (sent by the frontend form)
    const { 
      title, 
      description, 
      problem, 
      technologies, 
      imageUrl, 
      githubUrl, 
      liveUrl, 
      contribution, 
      challenges, 
      lessonsLearned,
      featured 
    } = req.body;

    // Simple validation: make sure required fields are not empty
    if (!title || !description || !problem || !contribution || !challenges || !lessonsLearned) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // Create a new Project document with the data
    const newProject = new Project({
      title,
      description,
      problem,
      technologies,
      imageUrl,
      githubUrl,
      liveUrl,
      contribution,
      challenges,
      lessonsLearned,
      featured
    });

    // Save the new project to MongoDB
    const savedProject = await newProject.save();
    
    // Return status 201 (Created) along with the saved project data
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create project', error: error.message });
  }
};

// 4. Update an existing project
export const updateProject = async (req, res) => {
  try {
    // findByIdAndUpdate finds the project by ID, updates it with req.body data,
    // and { new: true } makes sure it returns the UPDATED version of the project
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // runValidators ensures the updates follow model rules
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found to update' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update project', error: error.message });
  }
};

// 5. Delete a project
export const deleteProject = async (req, res) => {
  try {
    // Find the project by ID and remove it from the database
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found to delete' });
    }

    res.status(200).json({ message: 'Project successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
};
