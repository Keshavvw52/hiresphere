# 🚀 HireSphere – Job Portal Platform

HireSphere is a full-stack MERN job portal that connects job seekers with recruiters. It allows users to browse jobs, apply for positions, and upload resumes, while recruiters can post and manage job listings through a dedicated dashboard.

---

## 🔥 Features

### 👤 User Side

* Google Authentication (via Clerk)
* Browse available jobs
* Apply for jobs
* Upload and update resume
* View applied jobs

### 🏢 Recruiter Side

* Company registration & login
* Post new jobs
* Manage job listings
* View applicants

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Authentication

* Clerk (User Authentication)
* JWT (Company Authentication)

### Other Integrations

* Cloudinary (Resume Upload)
* Multer (File Handling)

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/hiresphere.git
cd hiresphere
```

### 2. Setup Backend

```bash
cd server
npm install
npm start
```

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Backend (.env)

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### Frontend (.env)

```
VITE_BACKEND_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_key
```

---

## 📌 Future Improvements

* Job search & filters
* Bookmark jobs
* Email notifications
* AI-based resume analysis

---

## 💡 Author

Keshav Kumar

---

⭐ If you like this project, consider giving it a star!
