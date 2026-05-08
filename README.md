# Task_Management
A full-stack Team Task Manager web application built using:

- React + Vite
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication
- Tailwind CSS

This application allows users to:

- Register/Login
- Create Projects
- Assign Tasks
- Track Task Progress
- Manage Team Workflow

---

# Features

## Authentication

- User Signup
- User Login
- JWT Token Authentication
- Protected Routes

---

## Project Management

- Create Project
- View Projects
- Delete Projects

---

## Task Management

- Create Tasks
- Assign Tasks to Projects
- Task Priority
- Task Status Tracking
- Update Task Progress

---

## Dashboard

- Total Tasks
- Completed Tasks
- Pending Tasks
- Total Projects

---

# Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

---

## Backend

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT
- bcryptjs

---

# Folder Structure

```bash
Task/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

# Database Setup

## Create MySQL Database

```sql
CREATE DATABASE taskmanager;
```

---

# Backend Setup

## Navigate to Backend

```bash
cd backend
```

## Install Dependencies

```bash
npm install
```

## Create `.env`

```env
PORT=5000

DB_NAME=taskmanager
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost

JWT_SECRET=your_secret_key
```

---

## Start Backend Server

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## Navigate to Frontend

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

---

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

## Authentication

### Register User

```http
POST /api/auth/signup
```

### Login User

```http
POST /api/auth/login
```

---

## Projects

### Create Project

```http
POST /api/projects
```

### Get All Projects

```http
GET /api/projects
```

### Delete Project

```http
DELETE /api/projects/:id
```

---

## Tasks

### Create Task

```http
POST /api/tasks
```

### Get Tasks

```http
GET /api/tasks
```

### Update Task Status

```http
PUT /api/tasks/:id
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000

DB_NAME=taskmanager
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost

JWT_SECRET=your_secret_key
```

---

# Deployment

## Frontend Deployment

Deploy frontend using:

- Vercel
- Netlify

---

## Backend Deployment

Deploy backend using:

- Railway

---

# Screenshots

- Login Page
- Register Page
- Dashboard
- Project Management
- Task Tracking

(Add screenshots here)

---

# Future Improvements

- Team Invitations
- Role Based Permissions
- Real-time Notifications
- Drag & Drop Kanban Board
- File Uploads
- Comments System
- Dark/Light Theme Toggle

---

# Author

Developed by Tanmay Bhoyar

---

# License

This project is licensed under the MIT License.
