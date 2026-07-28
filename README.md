# PollBoard 🚀

A real-time polling and analytics platform where users can create polls, share them publicly, collect responses and analyze results.

## 🌐 Live Demo

Frontend:
https://pollboard-live.vercel.app/

Backend:
https://pollboard-l1sq.onrender.com


## ✨ Features

- 🔐 User Authentication (Signup/Login)
- 📝 Create polls with multiple questions
- ➕ Add multiple options
- ✅ Mandatory questions support
- 🔗 Share public poll links
- 📊 Real-time poll analytics
- 📈 Response tracking
- ⏳ Poll expiry support
- 🔄 Real-time updates using Socket.io
- 📢 Publish polls before collecting responses


## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Shadcn UI
- React Router
- Axios
- Socket.io Client
- Lucide Icons


### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.io
- CORS


## 📂 Project Structure
PollBoard

├── backend
│ ├── src
│ │ ├── controllers
│ │ ├── models
│ │ ├── routes
│ │ ├── middleware
│ │ ├── config
│ │ ├── app.js
│ │ └── server.js
│ └── package.json
│
└── frontend
├── src
│ ├── components
│ ├── pages
│ ├── routes
│ └── App.jsx
└── package.json



## 🚀 Installation & Setup

### Clone Repository

git clone https://github.com/malhotrasarika789-blip/PollBoard.git

## Go inside project:

cd PollBoard

## Backend Setup

cd backend
npm install

## Create .env file:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

## Run backend:

npm start

## Backend will run on:

http://localhost:4000

## Frontend Setup

Open new terminal:

cd frontend
npm install

## Run frontend:

npm run dev

## Frontend will run on:

http://localhost:5173

🔌 API Endpoints
## Authentication

 POST

## /api/users/signup

 Create new user

## POST

/api/users/login

## Login user

Polls

## GET

/api/polls

## Get all polls

POST

/api/polls/create

## Create poll

GET

/api/polls/:pollId

## Get single poll

POST

/api/polls/vote/:pollId

## Submit vote

GET

/api/polls/analytics/:pollId

Get poll analytics


🔥 Real-Time Architecture

PollBoard uses Socket.io for live updates.

When a user submits a vote:

Vote is stored in MongoDB
Server emits pollUpdated event
Connected clients receive updated poll data instantly
## Deployment

## Frontend deployed on:
Vercel

## Backend deployed on:
Render

Database:

MongoDB Atlas
Future Improvements
User dashboard improvements
Poll sharing with QR codes
Advanced charts
Email notifications
Role based access

## Author
Sarika Malhotra

Built with ❤️ using MERN Stack
