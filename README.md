# SeyCodes

A full-stack application for learning data structures and algorithms, solving coding problems, and engaging with a community discussion forum.

## Project Structure

```
SeyCodes/
├── backend/          # Express.js REST API
├── frontend/         # React + Vite + TypeScript frontend
└── package.json      # Root package.json with scripts
```

## Features

- **Authentication**: User registration and login with JWT cookies
- **Problem Solving**: Code editor with support for JavaScript, Python, and C++
- **Discussion Forum**: Create posts, add comments, and favorite discussions
- **Learning Resources**: Guides on Arrays, Linked Lists, Stacks, Queues, Trees, and Graphs

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Setup

### 1. Install Dependencies

Install all dependencies for root, backend, and frontend:

```bash
npm run install:all
```

Or install them separately:

```bash
# Root dependencies
npm install

# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables

#### Backend

Create a `.env` file in the `backend/` directory (optional):

```env
PORT=3000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

#### Frontend

Create a `.env` file in the `frontend/` directory (optional):

```env
VITE_API_URL=http://localhost:3000/api
```

### 3. Database

The backend uses SQLite with Prisma ORM. To set up the database:

```bash
cd backend

# Push the schema to the database
npm run db:push

# Seed the database with sample problems
npm run db:seed
```

The database file (`dev.db`) will be created in the `backend/prisma/` directory.

## Running the Application

### Development Mode

Run both backend and frontend concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### Production Mode

```bash
# Build frontend
npm run build:frontend

# Start backend
npm run start:backend
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:problemId` - Get a specific problem
- `POST /api/problems/run` - Execute code

### Discussion
- `GET /api/discussion/posts` - Get all posts
- `GET /api/discussion/posts/favorites` - Get favorite posts
- `GET /api/discussion/posts/:postId` - Get a specific post
- `POST /api/discussion/posts` - Create a new post
- `DELETE /api/discussion/posts/:postId` - Delete a post
- `POST /api/discussion/posts/:postId/favorite` - Add to favorites
- `DELETE /api/discussion/posts/:postId/favorite` - Remove from favorites
- `GET /api/discussion/posts/:postId/comments` - Get comments for a post
- `POST /api/discussion/posts/:postId/comments` - Add a comment
- `DELETE /api/discussion/comments/:commentId` - Delete a comment

## Technology Stack

### Backend
- Express.js
- Prisma ORM
- SQLite
- JWT for authentication
- CORS for cross-origin requests

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- shadcn/ui components
- Tailwind CSS
- Axios for API calls

## Scripts

### Root Scripts
- `npm run dev` - Run both backend and frontend in development mode
- `npm run dev:backend` - Run only backend
- `npm run dev:frontend` - Run only frontend
- `npm run install:all` - Install all dependencies
- `npm run build:frontend` - Build frontend for production
- `npm run start:backend` - Start backend in production mode
- `npm test` - Run backend tests

### Backend Scripts
- `npm run db:push` - Push Prisma schema to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:generate` - Generate Prisma client

## License

ISC
