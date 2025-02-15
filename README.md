# Job Board Project

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Contributing](#contributing)


## Introduction

The Job Board Project is a full-stack web application that allows employers to post job listings and job seekers to apply for jobs. It is built using the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User authentication and authorization
- Employers can create, update, and delete job listings
- Job seekers can browse job listings and apply for jobs
- File upload for resumes
- Responsive design

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT
- **File Upload:** Multer

## Installation

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/job-board.git
   cd job-board
   
2. Install dependencies for both backend and frontend:
   ```bash
   # Install backend dependencies
   cd backend
   npm install
  
   # Install frontend dependencies
   cd ../frontend
   npm install
3. Set up environment. create .env at backend:
   ```env
   MONGO_URI = "mongodb+srv://username:<Password>@jobboardcluster.okbx6dp.mongodb.net/?retryWrites=true&w=majority&appName=JobBoardCluster"
   ACCESS_TOKEN_SECRET = "JWT SECRET"
   ACCESS_TOKEN_EXPIRY="30d"
   REFRESH_TOKEN_SECRET="REFRESH TOKEN SECRET"
   REFRESH_TOKEN_EXPIRY="30d"
  NOTE: Refresh Token Functionality Is Not Added Yet!

4. Run the application:
   ```bash
   # Start the backend server
   cd backend
   npm run dev
  
   # Start the frontend development server
   cd ../frontend
   npm run dev

## Contributing
### Contributions are welcome! Please follow these steps:

- Fork the repository.
- Create a new branch: git checkout -b feature-branch-name.
- Make your changes and commit them: git commit -m 'Add some feature'.
- Push to the branch: git push origin feature-branch-name.
- Submit a pull request.   
   

   
