# 🎬 **Deep Movie Downloader**  

A **modern** and **feature-packed** movie downloading platform with a sleek UI, categorized trending movies, real-time notifications, and a smooth user experience! 🚀  

![License](https://img.shields.io/badge/license-MIT-blue.svg)  
![Tech Stack](https://img.shields.io/badge/Stack-MERN-blueviolet)  
![Build](https://img.shields.io/badge/Build-Passing-brightgreen)  

---

## 📌 **Features**  

✅ **Trending Movies Section** – Stay updated with the latest releases 🔥  
✅ **Category-Based Browsing** – Easily find movies in your favorite genres 🎭  
✅ **Real-time Notifications** – Never miss an update with a modern notification sidebar 🔔  
✅ **Sleek & Modern UI** – Fully responsive with an intuitive design ✨  
✅ **Sidebar Navigation** – Quick access to movies, notifications, and profile ⚡  
✅ **Interactive Movie Slider** – Browse top-rated movies with a smooth carousel 🎥  
✅ **Fast & Secure Authentication** – Sign up and log in with ease 🔐  

---

## 🚀 **Installation & Setup**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/DEEP992006/movie-downloader.git
cd movie-downloader
```

### **2️⃣ Backend Setup**  
```sh
cd backend
npm install or yarn   # Install dependencies
```

🔑 **Set Up Environment Variables (`.env`)**  
```makefile
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

🚀 **Start the Server**  
```sh
nodemon app.js  
```
Your backend will be live at **`http://localhost:3000`**.  

---

### **3️⃣ Frontend Setup**  
```sh
cd ..
npm install or yarn    # Install dependencies
npm run dev or yarn dev    # Start the React App
```
Your frontend will be live at **`http://localhost:3000`**.  

---

## 📂 **Project Structure**  

```
movie-downloader/
├── backend/
│   ├── models/         # Database models (MongoDB)
│   ├── routes/         # API routes
│   ├── .env            # Environment variables
│   ├── app.js          # Main server file
│   ├── package.json    # Backend dependencies
│   ├── yarn.lock       # Package lock
│

├── public/         # Static assets
└────────src/
│       ├── assets/     # Images & icons
│       ├── components/ # Reusable UI components
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   ├── NotificationForm.jsx
│       │   ├── NotificationPage.jsx
│       │   ├── Slider.jsx
│       │   ├── SearchBar.jsx
│       │   ├── TrendCard.jsx
│       ├── lib/        # Utility functions
│       ├── pages/      # Page components
│       ├── store.js    # State management
│       ├── App.jsx     # Main entry point
│       ├── index.css   # Global styles
│       ├── main.jsx    # App bootstrapping
│
├── .gitignore          # Ignored files
├── README.md           # Project documentation
├── package.json        # Frontend dependencies
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.js      # Vite configuration
└── yarn.lock           # Package lock
```

---

## 🔗 **API Endpoints**  

### 🔹 **Movies API**  
| Method | Endpoint                    | Description |
|--------|-----------------------------|-------------|
| GET    | `/movie/`                    | Fetch all movies |
| GET    | `/movie/trending`            | Fetch trending movies |
| GET    | `/movie/:id`                 | Get movie by ID |
| GET    | `/movie/category/:id`        | Get movies by category |
| GET    | `/movie/mymovie/:id`         | Get user-uploaded movies |
| GET    | `/movie/download/:id`        | Get movie download link |
| POST   | `/movie/new`                 | Upload a new movie |
| DELETE | `/movie/:id`                 | Delete a movie |

### 🔹 **User Authentication API**  
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| POST   | `/api/signup`  | Register a new user |
| POST   | `/api/login`   | Authenticate a user |

### 🔹 **Notifications API**  
| Method | Endpoint                        | Description |
|--------|---------------------------------|-------------|
| GET    | `/api/notifications`            | Fetch all notifications |
| POST   | `/api/notifications`            | Create a new notification |
| PATCH  | `/api/notifications/:id/read`   | Mark a notification as read |
| PATCH  | `/api/notifications/mark-all-read` | Mark all as read |
| DELETE | `/api/notifications/:id`        | Delete a notification |

---

## 🎨 **UI & UX Enhancements**  

✨ **Framer Motion Animations** – Smooth transitions and interactions 🎭  
📱 **Fully Responsive Design** – Works flawlessly on mobile & desktop 📲  
📂 **Sidebar Navigation** – Easy access to movies, notifications, and profile 🏆  
🎞️ **Movie Slider** – Browse trending movies with an interactive carousel 🎡  

---

## ⚡ **Tech Stack**  

🚀 **Backend:**  
- **Node.js** – Fast & scalable server  
- **Express.js** – API handling  
- **MongoDB & Mongoose** – Database & ORM  
- **JWT & Bcrypt.js** – Secure authentication  
- **Multer & Cloudinary** – File storage  

🎨 **Frontend:**  
- **React.js** – UI development  
- **Tailwind CSS** – Modern styling  
- **Framer Motion** – Animations  
- **Axios** – API calls  
- **React Router** – Navigation  

---

## 🌟 **Future Enhancements**  

🔹 **Movie Ratings & Reviews** ⭐  
🔹 **User Watchlist & Favorites** 📌  
🔹 **Admin Panel for Moderation** ⚙️  
🔹 **Dark Mode UI** 🌙  

---

## 📜 **License**  

This project is **open-source** under the **MIT License**.  

📩 **Have questions or suggestions?** Open an issue or contribute! 🚀  

---

### 🎬 **Deep Movie Downloader – Your Ultimate Movie Experience!** 🍿  

This **README** is designed to look **sleek and professional** while keeping it **engaging and easy to navigate**. 🚀🔥 Let me know if you want any more refinements!
