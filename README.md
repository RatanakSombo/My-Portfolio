# My Professional Portfolio Website

A full-stack, responsive web application built for my Web Development Final Assessment. It highlights my skills, education, experience, and projects as a software engineering student, and provides an administrative interface for project data management and contact messages viewing.

---

## 1. Project Title
**My Professional Portfolio Website**  
*Student ID:* rc6025010072  
*Full Name:* Chhoeun Ratanaksombo  
*Course:* Web Development Final Assessment  

---

## 2. Project Overview
This project is a complete full-stack portfolio web application designed for students and junior developers to showcase their work to recruiters, lecturers, and professional contacts. The application communicates with a MongoDB Atlas database via a Node.js/Express RESTful API backend, while the user interface is rendered dynamically using React and modern CSS.

---

## 3. Main Features
*   **Hero Landing Section:** Welcomes visitors, introduces my professional title, and provides quick Call-To-Action (CTA) buttons.
*   **About Me Section:** Details my professional summary, strengths, and lists educational milestones and experiences dynamically.
*   **Skills Section:** Displays key software engineering technologies grouped into visual card categories with progress bars.
*   **Projects Section:** Fetches and displays portfolio projects in a responsive grid. Clicking on any project launches an interactive details popup modal showing individual contributions, challenges, and lessons learned.
*   **Contact Form:** A secure form allowing visitors to send messages. Includes real-time client-side email format validation.
*   **Admin Dashboard:** A private workspace containing:
    *   **Manage Projects (CRUD):** Visual interface to Add new projects, View existing ones, Edit fields, or Delete them from the database.
    *   **View Messages:** A secure layout displaying received contact messages, complete with names, emails, subjects, contents, and timestamps.
*   **Administrative Security:** Protects project write/delete requests and private messages using a server-side API Key authorization header check.

---

## 4. Technologies Used
*   **Frontend:** React (Vite), React Router DOM (client-side routing), Lucide React (vector icons), Vanilla CSS3.
*   **Backend:** Node.js, Express.js (REST API server), Cors, Dotenv.
*   **Database:** MongoDB Atlas (Cloud database), Mongoose (Object Data Modeling).
*   **Development Tools:** Git, GitHub, npm, Nodemon.

---

## 5. Application Architecture
The application splits concerns between the Client (frontend) and Server (backend) as follows:

```
                            +-----------------------------------+
                            |           React Frontend          |
                            |         (localhost:5173)          |
                            +-----------------+-----------------+
                                              |
                                     HTTP Requests (Fetch)
                                              |
                                              v
                            +-----------------+-----------------+
                            |       Express API Backend         |
                            |         (localhost:5000)          |
                            +-----------------+-----------------+
                                              |
                                     Mongoose Driver queries
                                              |
                                              v
                            +-----------------+-----------------+
                            |         MongoDB Database          |
                            |        (MongoDB Atlas Cloud)      |
                            +-----------------------------------+
```

---

## 6. Installation Instructions
To set up and run this project locally, ensure you have **Node.js** (v18+) and **npm** installed.

1.  Clone this repository to your local machine:
    ```bash
    git clone <your-repository-url>
    cd portfolio-project
    ```
2.  Install dependencies for both the frontend and backend:
    ```bash
    # Install client dependencies
    cd client
    npm install
    
    # Install server dependencies
    cd ../server
    npm install
    ```

---

## 7. Environment Variable Instructions
To securely connect to the database and set up administrator security, create a `.env` file inside the `server/` directory:

```env
# Port on which the Express server will listen
PORT=5000

# MongoDB Connection String (Replace with your Atlas or Local URI)
MONGODB_URI=mongodb://khsombo18_db_user:<password>@ac-fs9bcia-shard-00-00.yxutnon.mongodb.net:27017/portfolio?ssl=true&authSource=admin&retryWrites=true&w=majority

# Secret administrative authorization key
ADMIN_SECRET_KEY=sombo_admin_123
```
*(A template configuration is provided in `server/.env.example`).*

---

## 8. Instructions for Running the Frontend
Start the Vite development server:
```bash
cd client
npm run dev
```
The client will start running locally at: **http://localhost:5173/**.

---

## 9. Instructions for Running the Backend
Start the Express API development server (which automatically reloads when files change):
```bash
cd server
npm run dev
```
The server will start running locally at: **http://localhost:5000/** and output: `Successfully connected to MongoDB Host`.

To seed your database with sample projects and data for first-time use, run:
```bash
cd server
node seed.js
```

---

## 10. API Endpoint Summary

### Project Endpoints
| HTTP Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| **GET** | `/api/projects` | Fetch all projects | No |
| **GET** | `/api/projects/:id` | Fetch a single project | No |
| **POST** | `/api/projects` | Create a new project | **Yes** (Admin Key) |
| **PUT** | `/api/projects/:id` | Update an existing project | **Yes** (Admin Key) |
| **DELETE** | `/api/projects/:id` | Delete a project | **Yes** (Admin Key) |

### Skill, Education & Experience Endpoints
| HTTP Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| **GET** | `/api/skills` | Fetch all skills | No |
| **GET** | `/api/education` | Fetch education records | No |
| **GET** | `/api/experience` | Fetch experience records | No |

### Message Endpoints
| HTTP Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| **POST** | `/api/messages` | Submit a new contact message | No |
| **GET** | `/api/messages` | Retrieve all messages (for Admin panel) | **Yes** (Admin Key) |

---

## 11. Screenshots
*(Screenshots can be added here once the application is running in production).*
- **Home Landing Page:** Introduces the software engineering student.
- **Projects Modal View:** Popup modal demonstrating the project contributions.
- **Admin panel:** Project creation form alongside message management tables.

---

## 12. Live Website URL
*(To be populated after AWS deployment)*  
*Frontend URL:* [To be deployed]  
*Backend URL:* [To be deployed]  

---

## 13. GitHub Repository URL
*URL:* [To be populated after committing code to Git]

---

## 14. Known Limitations
*   **Media Upload:** Image upload is not supported in the basic CRUD dashboard yet; images must be provided via external URLs.
*   **Simple Authorization:** Administrative routes are protected using a simple secret header key instead of a multi-user login session, which is optimal for a student-only portfolio but less suitable for multi-administrator corporate blogs.

---

## 15. Future Improvements
*   **Image Hosting:** Add cloud image upload integrations (such as AWS S3 bucket uploads) in the admin panel.
*   **Full JWT Authentication:** Upgrade header-key security into a cookie-based JSON Web Token login flow.

---

## 16. Author Information
*   **Name:** Chhoeun Ratanaksombo
*   **Student ID:** rc6025010072
*   **University:** Norton University
*   **Major:** Software Engineering
