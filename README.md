# Monorepo for Fullstack Application

This monorepo contains both the backend and frontend repositories of a full-stack application. It is organized into two separate projects: `backend-repo` for the backend services and `frontend-repo` for the frontend user interface.

## Overview

- **Backend**: A Node.js/TypeScript-based backend service with Firebase integration.
- **Frontend**: A React.js/TypeScript frontend with Redux for state management.

## Directory Structure

```
monorepo/
├── backend-repo/
│   ├── config/
│   │   └── firebaseConfig.ts
│   ├── controller/
│   │   └── api.ts
│   ├── core/
│   │   └── app.ts
│   │   └── index.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   ├── repository/
│   │   └── userCollection.ts
│   ├── routes/
│   │   └── userRoutes.ts
│   ├── service/
│   │   └── userService.ts
│   └── package.json
│
├── frontend-repo/
│   ├── apis/
│   │   └── userApi.ts
│   ├── app/
│   │   └── index.tsx
│   ├── theme/
│   │   └── theme.ts
│   ├── components/
│   │   └── UpdateButton.tsx
│   ├── store/
│   │   ├── actions.ts
│   │   ├── reducers.ts
│   │   └── store.ts
│   └── package.json
```

## Backend Setup

### Prerequisites
- **Node.js** and **npm** installed
- **Firebase CLI** installed and configured

### Instructions

1. Install dependencies:
   ```bash
   cd backend-repo
   npm install
   ```

2. Configure Firebase:
   Update the Firebase credentials in `config/firebaseConfig.ts`.

3. Start the backend server:
   ```bash
   npm run dev
   ```

### Folder Breakdown

- `config/`: Stores configuration files, e.g., Firebase setup.
- `controller/`: Defines API logic for handling requests.
- `core/`: Contains the core server setup (e.g., Express app initialization).
- `entities/`: Contains data models such as `user.ts`.
- `middleware/`: Handles middleware like authentication.
- `repository/`: Manages database interactions, e.g., `userCollection.ts`.
- `routes/`: Defines API routes (e.g., `/users`).

## Frontend Setup

### Prerequisites
- **Node.js** and **npm** installed

### Instructions

1. Install dependencies:
   ```bash
   cd frontend-repo
   npm install
   ```

2. Start the frontend:
   ```bash
   npm run dev
   ```

### Folder Breakdown

- `apis/`: Manages API calls, such as `userApi.ts`.
- `app/`: Main application setup, including React entry point (`index.tsx`).
- `theme/`: Defines UI theme (e.g., colors, fonts).
- `components/`: Contains reusable React components, e.g., `UpdateButton.tsx`.
- `store/`: Manages Redux state, including actions, reducers, and store setup.

## Monorepo Tools and Scripts

- **Turborepo** is used to manage the monorepo and ensure efficient building of both frontend and backend projects.
- Shared scripts for starting both frontend and backend can be configured in the root directory.
- You also can run both apps in one script with turbo in the root directory
    ```bash
    npm run dev
    ```
