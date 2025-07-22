# NaukriVerse - A Job Portal

NaukriVerse is a full-featured job portal web application that connects job seekers with top companies. It allows users to search and apply for jobs, while recruiters can post and manage job listings. The platform is designed for a seamless, modern experience for both candidates and recruiters.

---

## 🚀 Features

### For Job Seekers
- Browse and search thousands of job listings by title, location, and category
- View detailed job descriptions, key responsibilities, and company info
- Apply for jobs directly through the portal
- Track your applications and upload your resume
- User authentication and secure profile management

### For Recruiters
- Register and log in as a company
- Post new job openings with rich descriptions and requirements
- Manage, edit, and delete job listings
- View and manage applications for posted jobs
- Toggle job visibility

### General
- Responsive, modern UI (React + Tailwind CSS)
- Rich text editor for job descriptions (Quill)
- Company logos and branding
- Secure authentication (Clerk)
- Cloudinary integration for file uploads
- RESTful API (Node.js + Express + MongoDB)
- Deployed on Vercel (frontend) and suitable for cloud backend

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Vite, Axios, Quill, Clerk
- **Backend:** Node.js, Express, MongoDB, Mongoose, Cloudinary
- **Authentication:** Clerk
- **Deployment:** Vercel (frontend), suitable for Render/Heroku/Atlas (backend)

---

## 📁 Folder Structure

```
Job-Portal/
  client/        # Frontend (React)
    src/
      assets/    # Images, icons, logos
      components/# Reusable React components
      context/   # App-wide context (state)
      pages/     # Main pages (Home, Dashboard, etc.)
    public/      # Static files (favicon, vite.png, etc.)
    ...
  server/        # Backend (Node.js/Express)
    controllers/ # API route handlers
    models/      # Mongoose models
    routes/      # Express routes
    config/      # DB, Cloudinary, middleware
    ...
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas or local MongoDB instance
- Cloudinary account (for file uploads)
- Clerk account (for authentication)

### 1. Clone the Repository
```bash
git clone https://github.com/dhruvjain2004/NaukriVerse.git
cd Job-Portal
```

### 2. Setup Backend
```bash
cd server
npm install
```

#### Create a `.env` file in `server/` with:
```
MONGO_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
```

#### Start the backend server:
```bash
npm run dev
# or
node app.js
```

### 3. Setup Frontend
```bash
cd ../client
npm install
```

#### Create a `.env` file in `client/` with:
```
VITE_BACKEND_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

#### Start the frontend:
```bash
npm run dev
```

- The app will be available at `http://localhost:5173` (or as shown in your terminal)

---

## 🌐 Deployment
- **Frontend:** Deploy the `client/` folder to Vercel (recommended) or Netlify.
- **Backend:** Deploy the `server/` folder to Render, Heroku, or any Node.js hosting with MongoDB access.
- Set environment variables in your deployment dashboard as above.

---

## 🤝 Contributing

1. Fork the repo and create your branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Clerk](https://clerk.com/)
- [Cloudinary](https://cloudinary.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 📬 Contact
For questions, suggestions, or support, please open an issue or contact the maintainer at [dhruvjain527@gmail.com](mailto:dhruvjain527@gmail.com). 