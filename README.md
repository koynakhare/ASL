# 🧏‍♀️ ASL — American Sign Language Learning Platform

**ASL** is a full-stack web application designed to help users **learn, practice, and test** their knowledge of American Sign Language (ASL) through interactive lessons and real-time sign detection.

---

## 🌍 Live Application

🔗 **Production:** [https://asl-ashy.vercel.app/](https://asl-ashy.vercel.app/)  
*(Frontend deployed on Vercel | Backend hosted on Render | Database on MongoDB Atlas)*

---

## ⚙️ Tech Stack

### 🖥️ Frontend
- **React.js (Vite)** — fast and modern frontend framework  
- **Redux Toolkit** — state management  
- **React Router DOM** — routing  
- **Tailwind CSS** — responsive styling  
- **Material UI (MUI)** — UI components  
- **Framer Motion** — smooth animations  

### 🔧 Backend
- **Node.js** with **Express.js** — REST API framework  
- **MongoDB (Mongoose)** — NoSQL database  
- **JWT Authentication** — secure login system  
- **Multer** — file upload handling  
- **Helmet**, **CORS**, **Morgan** — security and logging  

### ☁️ Deployment
- **Frontend:** [Vercel](https://vercel.com/)  
- **Backend:** [Render](https://render.com/)  
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## ✨ Key Features

- 🧩 **Learn ASL signs** through categorized lessons  
- 📸 **Real-time sign detection** using your webcam  
- 🧠 **Interactive tests** with instant feedback and scoring  
- 🔐 **User authentication** with JWT-based sessions  
- ⚙️ **Admin dashboard** for managing signs and users  
- 🌓 **Dark / Light mode** support  
- 📱 **Responsive design** for all devices  

---

## 📁 Project Structure

ASLmake/
│
├── public/ # Static assets (images, icons, manifest, etc.)
│
├── src/
│ ├── assets/ # Local images, svgs, fonts
│ ├── components/ # Reusable UI components
│ ├── config/ # App configuration (routes, constants, env utils)
│ ├── hooks/ # Custom React hooks
│ ├── layouts/ # Layout wrappers (MainLayout, AuthLayout)
│ ├── pages/ # Application pages (Home, Learn, Practice, etc.)
│ ├── services/ # API services, axios configurations
│ ├── store/ # Redux store, slices, actions
│ ├── utils/ # Helper functions, formatters
│ ├── App.js # Root component
│ ├── index.js # Entry point
│ └── styles/ # Global styles, theme configuration
│
├── .gitignore
├── package.json
├── README.md
└── yarn.lock / package-lock.json
