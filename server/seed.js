import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/Project.js";
import Skill from "./models/Skill.js";
import Education from "./models/Education.js";
import Experience from "./models/Experience.js";

// Load environment variables from .env file
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "ERROR: MONGODB_URI is not defined in your environment variables. Seeding aborted.",
  );
  process.exit(1);
}

// Sample Data to insert
const sampleProjects = [


  {
    title: "Gym Management System",
    description:
      "A Java console-based Gym Management System that handles member registration, staff role management, tiered membership plans, and payment processing using core Object-Oriented Programming principles.",
    problem:
      "Gym businesses need a structured system to manage members, subscriptions, and payments efficiently — without relying on manual paper records or spreadsheets.",
    technologies: ["Java", "OOP", "SQL", "PostgreSQL"],
    imageUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    githubUrl: "https://github.com/RatanakSombo/Object_Oriented_Concept",
    liveUrl: "",
    contribution:
      "Designed and implemented the full class hierarchy from the abstract Person base class, through Staff roles (Admin, Cashier) down to Member entities, and built all three service layers — MemberService, MembershipService, and PaymentService — along with the SQL database schema.",
    challenges:
      "Designing a clean role-based permission system where Admins and Cashiers have different access rights, and modeling membership lifecycles (PENDING → ACTIVE → EXPIRED) across both the Java layer and the relational database schema.",
    lessonsLearned:
      "Gained deep understanding of OOP pillars — inheritance, polymorphism, abstraction, and encapsulation — and learned how to translate Java class relationships into a normalized SQL schema with proper foreign key constraints and data validation.",
    featured: true,
  },

  {
    title: "SaveEat — Food Rescue Marketplace",
    description:
      "A full-stack web platform connecting food merchants (bakeries, cafes, supermarkets) with surplus items to budget-conscious consumers, reducing food waste through discounted last-minute deals.",
    problem:
      "Tons of unsold food go to waste daily because merchants have no efficient way to reach buyers at the last minute. Consumers also lack a centralized platform to discover discounted surplus food nearby.",
    technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "HTML5", "CSS3", "React Native"],
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop",
    githubUrl: "https://github.com/developtp/SaveEat",
    contribution:
      "Architected the full authentication system using JWT access tokens with HttpOnly refresh cookies and CSRF header protection. Built the vendor dashboard with full CRUD operations for food listing management, and designed the responsive landing page from scratch using vanilla CSS Grid and Flexbox.",
    challenges:
      "Designing a secure, stateless authentication flow that defends against both XSS and CSRF attacks simultaneously — using a hybrid cookie/in-memory token model with automatic token rotation and account lockout on brute-force attempts.",
    lessonsLearned:
      "Deepened understanding of real-world web security architecture (JWT rotation, CSRF mitigation, bcrypt hashing). Also learned how to plan a phased project across two academic terms, aligning a web backend in Term 2 to serve a mobile app client in Term 3.",
    featured: true,
  },
];

const sampleSkills = [
  { name: "HTML5 & CSS3", category: "Front-End Technologies", level: 50 },
  { name: "JavaScript (ES6+)", category: "Programming Languages", level: 20 },
  { name: "React.js", category: "Front-End Technologies", level: 10 },
  { name: "Node.js & Express", category: "Back-End Technologies", level: 15 },
  { name: "MongoDB & Mongoose", category: "Databases", level: 15 },
  { name: "Git & GitHub", category: "Development Tools", level: 50 },
];

const sampleEducation = [
  {
    institution: "Camtech University",
    degree: "Bachelor of Software Engineering",
    startDate: "2025",
    endDate: "2029",
    description:
      "Specializing in Software Engineering. Maintained a high GPA. Key coursework: Data Structures, Web Applications Development, Databases, and Systems Design.",
  },
  {
    institution: "NGS Preshsisowat",
    degree: "High School Diploma",
    startDate: "2019",
    endDate: "2024",
    description:
      "Completed high school education with a focus on Math and Physics.",
  }
];

const sampleExperience = [
  {
    company: "Good citizen",
    position: "Executive Team",
    startDate: "8 December",
    endDate: "Present",
    description:
      "Collaborated with the team to identify and solve challenges for target schools, while organizing events, coordinating technical support, and assisting with overall program execution.",
  },
  {
    company: "Digital Literacy ",
    position: "Trainer",
    startDate: "2025",
    endDate: "2026",
    description: "Delivered digital literacy training to youth, building essential tech skills and supporting community learning. Contributed to training programs in Stung Treng Province, helping the team achieve Top 1 among 4 provinces."
  }

];

// Seeding logic
const seedDatabase = async () => {
  try {
    // Connect to database
    console.log("Connecting to database for seeding...");
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected successfully.");

    // 1. Clean existing records to avoid duplicates
    console.log("Clearing old database records...");
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Education.deleteMany({});
    await Experience.deleteMany({});
    console.log("Cleared existing records.");

    // 2. Insert Projects
    console.log("Inserting sample projects...");
    await Project.insertMany(sampleProjects);

    // 3. Insert Skills
    console.log("Inserting sample skills...");
    await Skill.insertMany(sampleSkills);

    // 4. Insert Education
    console.log("Inserting sample education records...");
    await Education.insertMany(sampleEducation);

    // 5. Insert Experience
    console.log("Inserting sample experience records...");
    await Experience.insertMany(sampleExperience);

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding database failed with error:", error.message);
    process.exit(1);
  }
};

// Run the script
seedDatabase();
