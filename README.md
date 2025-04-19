# MERN Blog Platform with Rich Text Editor

This is a full-stack blog platform built using the **MERN stack** (MongoDB, Express, React, Node.js) with full **authentication**, **CRUD functionality**, and an integrated **rich text editor** using **TipTap**. The app allows users to create, edit, and view blogs with HTML-rich content.

## Project Structure

```
📦 project-root
├── frontend  👉 React + Vite + Tailwind (Client)
└── backend   👉 Express + MongoDB + JWT (API Server)
```

## Features

### Frontend

- Rich Text Blog Editor (TipTap)
- User Authentication (Login & Signup)
- Routing with React Router v7
- Redux Toolkit for global state
- Toast notifications via `react-toastify`
- Fully responsive design using TailwindCSS
- Image upload (Cloudinary integration)

### Backend

- JWT-based Authentication
- Blog CRUD APIs
- MongoDB for storage
- Password hashing with bcrypt
- Cloudinary for image uploads

## Tech Stack

| Layer       | Tech                                           |
|-------------|------------------------------------------------|
| Frontend    | React, Vite, Tailwind CSS, Redux Toolkit       |
| Rich Editor |  TipTap                                        |
| Backend     | Node.js, Express.js, MongoDB                   |
| Auth        | JWT, bcryptjs                                  |
| File Upload | Cloudinary, Multer                             |

## Installation

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud)
- Cloudinary account for image upload

### 1. Clone the Repository

```bash
git clone https://github.com/adeebkhans/BlogArnifi
cd BlogArnifi
```

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

### 3. Environment Setup

#### Backend `.env`

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
#### Frontend `.env`

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Run the App

#### Backend

```bash
cd backend
npm start
```

#### Frontend

```bash
cd frontend
npm run dev
```

## Scripts

### Frontend (`frontend/package.json`)

| Script   | Description            |
|----------|------------------------|
| `dev`    | Run development server |
| `build`  | Production build       |
| `preview`| Preview build          |
| `lint`   | Run ESLint             |

### Backend (`backend/package.json`)

| Script   | Description                  |
|----------|------------------------------|
| `start`  | Start server with `nodemon`  |

## Credits

- [TipTap](https://tiptap.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudinary](https://cloudinary.com/)


