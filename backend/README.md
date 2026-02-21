# Task Management System - Backend

## Overview
This is the backend API for a Task Management System built with Node.js, Express, TypeScript, and Prisma. It provides authentication and task management functionalities.

## Folder Structure
```
backend/
├── package.json          # Project dependencies and scripts
├── prisma.config.ts      # Prisma configuration
├── tsconfig.json         # TypeScript configuration
├── prisma/
│   ├── schema.prisma     # Database schema definition
│   └── migrations/       # Database migration files
└── src/
    ├── app.ts            # Express app setup and middleware
    ├── server.ts         # Server entry point
    ├── test.ts           # Test file
    ├── config/
    │   └── prisma.ts     # Prisma client configuration
    ├── controllers/
    │   ├── auth.controller.ts    # Authentication handlers
    │   └── task.controller.ts    # Task management handlers
    ├── middlewares/
    │   └── auth.middleware.ts    # JWT authentication middleware
    ├── repositories/
    │   ├── task.repository.ts    # Task database operations
    │   └── user.repository.ts    # User database operations
    ├── routes/
    │   ├── auth.routes.ts        # Authentication routes
    │   └── task.routes.ts        # Task routes
    ├── services/
    │   ├── auth.service.ts       # Authentication business logic
    │   └── task.service.ts       # Task business logic
    └── utils/
        └── jwt.ts                # JWT token utilities
```

## API Endpoints

### Authentication Routes (`/auth`)

#### POST `/auth/register`
Register a new user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "accessToken": "string",
  "refreshToken": "string"
}
```

**Error Response:**
```json
{
  "message": "Error"
}
```

#### POST `/auth/login`
Login an existing user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "accessToken": "string",
  "refreshToken": "string"
}
```

**Error Response:**
```json
{
  "message": "Invalid"
}
```

#### POST `/auth/refresh`
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "string"
}
```

**Response:**
```json
{
  "accessToken": "string"
}
```

**Error Response:**
```json
{
  "message": "Refresh token missing"
}
```
or
```json
{
  "message": "Invalid refresh token"
}
```

#### POST `/auth/logout`
Logout user.

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

### Task Routes (`/tasks`)
All task routes require authentication (JWT token in Authorization header).

#### GET `/tasks`
Get paginated list of user's tasks with optional filtering.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `search` (optional): Search in task titles
- `status` (optional): Filter by completion status ("true" or "false")

**Response:**
```json
{
  "tasks": [
    {
      "id": "string",
      "title": "string",
      "completed": boolean,
      "userId": "string",
      "createdAt": "ISO date string"
    }
  ],
  "totalPages": number
}
```

#### POST `/tasks`
Create a new task.

**Request Body:**
```json
{
  "title": "string"
}
```

**Response:**
```json
{
  "task": {
    "id": "string",
    "title": "string",
    "completed": false,
    "userId": "string",
    "createdAt": "ISO date string"
  }
}
```

#### PATCH `/tasks/:id`
Update a task.

**Request Body:** (any combination of fields)
```json
{
  "title": "string",
  "completed": boolean
}
```

**Response:**
```json
{
  "id": "string",
  "title": "string",
  "completed": boolean,
  "userId": "string",
  "createdAt": "ISO date string"
}
```

#### DELETE `/tasks/:id`
Delete a task.

**Response:**
```json
{
  "message": "Deleted"
}
```

#### PATCH `/tasks/:id/toggle`
Toggle the completion status of a task.

**Response:**
```json
{
  "id": "string",
  "title": "string",
  "completed": boolean,
  "userId": "string",
  "createdAt": "ISO date string"
}
```

## Data Models

### User
```typescript
{
  id: string;
  email: string;
  password: string; // hashed
  tasks: Task[];
  createdAt: Date;
}
```

### Task
```typescript
{
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  user: User;
  createdAt: Date;
}
```

## Authentication
- JWT-based authentication
- Access tokens expire quickly, refresh tokens are used to get new access tokens
- Task routes require valid JWT token in Authorization header: `Bearer <token>`

## Database
- PostgreSQL with Prisma ORM
- Automatic migrations for schema changes

## Setup
1. Install dependencies: `npm install`
2. Set up database and run migrations: `npx prisma migrate dev`
3. Start server: `npm run dev`