import express from 'express';
import cors from 'cors';

// Import Route Modules
import projectRoutes from './routes/projectRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';

const app = express();

// Middleware configuration
app.use(cors({
  origin: '*', // Allow all origins (safe for a public portfolio API)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json()); // Allows the API to parse and read JSON request data

// Mount Routes
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experience', experienceRoutes);

// Test route to verify the API server is online
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is online and running successfully!' });
});

export default app;

