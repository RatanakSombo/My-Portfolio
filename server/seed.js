import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Education from './models/Education.js';
import Experience from './models/Experience.js';

// Load environment variables from .env file
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('ERROR: MONGODB_URI is not defined in your environment variables. Seeding aborted.');
  process.exit(1);
}

// Sample Data to insert
const sampleProjects = [
  {
    title: 'E-Commerce Bookstore',
    description: 'A fully functional online bookstore where users can browse books, add them to a shopping cart, and simulate checkout.',
    problem: 'Traditional bookstores lack an online presence to reach digital customers, making purchasing books less convenient.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'CSS3'],
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop',
    githubUrl: 'https://github.com/ratanaksombo/ecommerce-bookstore',
    liveUrl: 'https://ecommerce-bookstore-demo.example.com',
    contribution: 'Designed and built the full Express.js backend API and integrated MongoDB database models, while also building the frontend cart state management in React.',
    challenges: 'Managing cart state synchronization between frontend local storage and backend sessions during guest checkout.',
    lessonsLearned: 'Learned how to properly structure MongoDB collections and design RESTful APIs following standard HTTP methods.',
    featured: true
  },
  {
    title: 'Student Performance Tracker',
    description: 'A dashboard web app designed for teachers to record students grades, calculate class averages, and generate performance reports.',
    problem: 'Manual spreadsheets are slow, error-prone, and hard to share among teachers and students.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop',
    githubUrl: 'https://github.com/ratanaksombo/student-tracker',
    liveUrl: 'https://student-tracker.example.com',
    contribution: 'Created the database schema design, and implemented CRUD routes to create, edit, and delete student records.',
    challenges: 'Writing complex MongoDB aggregation queries to calculate high and low average grades on the fly.',
    lessonsLearned: 'Mastered the Mongoose ODM library and gained a deep understanding of asynchronous JavaScript (async/await).',
    featured: true
  },
  {
    title: 'Personal Portfolio Website',
    description: 'A responsive full-stack portfolio site built to display projects, skills, education, and let visitors send messages.',
    problem: 'Students need a central, professional place to demonstrate their coding skills and projects to employers.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'CSS3'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    githubUrl: 'https://github.com/ratanaksombo/portfolio',
    liveUrl: 'https://ratanaksombo.example.com',
    contribution: 'Fully designed and coded the React frontend layouts, Express API routers, and deployed the stack onto cloud servers.',
    challenges: 'Designing a fully responsive and professional user interface without relying on complex UI libraries.',
    lessonsLearned: 'Solidified component-based UI engineering and learned how to build secure forms that prevent spam submissions.',
    featured: true
  }
];

const sampleSkills = [
  { name: 'HTML5 & CSS3', category: 'Front-End Technologies', level: 90 },
  { name: 'JavaScript (ES6+)', category: 'Programming Languages', level: 85 },
  { name: 'React.js', category: 'Front-End Technologies', level: 80 },
  { name: 'Node.js & Express', category: 'Back-End Technologies', level: 75 },
  { name: 'MongoDB & Mongoose', category: 'Databases', level: 75 },
  { name: 'Git & GitHub', category: 'Development Tools', level: 85 }
];

const sampleEducation = [
  {
    institution: 'Norton University',
    degree: 'Bachelor of Computer Science',
    startDate: 'October 2022',
    endDate: 'Present',
    description: 'Specializing in Software Engineering. Maintained a high GPA. Key coursework: Data Structures, Web Applications Development, Databases, and Systems Design.'
  }
];

const sampleExperience = [
  {
    company: 'Norton Coding Club',
    position: 'Active Core Member / Web Dev Lead',
    startDate: 'November 2023',
    endDate: 'Present',
    description: 'Collaborated with other students to build open-source tools, conducted coding workshops for junior peers, and practiced Git flow in team development.'
  }
];

// Seeding logic
const seedDatabase = async () => {
  try {
    // Connect to database
    console.log('Connecting to database for seeding...');
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected successfully.');

    // 1. Clean existing records to avoid duplicates
    console.log('Clearing old database records...');
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Education.deleteMany({});
    await Experience.deleteMany({});
    console.log('Cleared existing records.');

    // 2. Insert Projects
    console.log('Inserting sample projects...');
    await Project.insertMany(sampleProjects);

    // 3. Insert Skills
    console.log('Inserting sample skills...');
    await Skill.insertMany(sampleSkills);

    // 4. Insert Education
    console.log('Inserting sample education records...');
    await Education.insertMany(sampleEducation);

    // 5. Insert Experience
    console.log('Inserting sample experience records...');
    await Experience.insertMany(sampleExperience);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding database failed with error:', error.message);
    process.exit(1);
  }
};

// Run the script
seedDatabase();
