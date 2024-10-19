# todolist

Task Management Application

This project is a full-stack task management application with a React frontend and a Node.js backend. The app allows users to create, edit, delete, and manage tasks with different statuses (completed or pending). The application is designed to run both the frontend and backend concurrently from a single command, making development and deployment smoother.

Project Structure

The project is organized into two main directories:

backend/: Contains the Node.js backend server with REST API to manage tasks.
frontend/: Contains the React frontend that interacts with the backend.

Approach
Backend and Frontend Setup: Both the backend and frontend folders are structured independently. The backend contains the Node.js code, and the frontend uses React.

Git Setup: The .git folder was removed from the frontend to avoid any conflicts with version control as .git folder is already present in the root folder. A single .gitignore file in the root folder is used to handle ignored files for both backend and frontend.

Concurrent Execution: Using concurrently allows us to run both the backend and frontend in parallel using a single command (npm start).

Version Control: Git is initialized in the root folder, and the remote repository is linked to GitHub. Branching strategies and pull requests are handled using Git.

Setup Instructions
Prerequisites
Before setting up the project, ensure that you have the following installed:

Node.js (v14 or later)
npm (v6 or later)
Git

Cloning the Repository
git clone https://github.com/jesvinjose/todolist

cd todolist
Backend Setup

Navigate to the backend directory:
cd backend
Install the necessary dependencies:
npm install

Create a .env file in the backend directory for environment variables. Example:
PORT=5000
MONGO_URI=mongodb://localhost:27017/yourdbname


npm start
This will start the backend server on the port specified in the .env file.

Frontend Setup
Navigate to the frontend directory:

cd frontend
Install the necessary dependencies:

npm install
Start the React development server:

npm start
By default, this will start the frontend on http://localhost:3000.

Running Both Backend and Frontend Concurrently
Instead of starting the backend and frontend servers separately, you can run them both at the same time using concurrently.

From the root folder, install concurrently:

npm install concurrently --save-dev
Modify the root package.json scripts to run both servers concurrently:

"scripts": {
  "start": "concurrently \"npm run start --prefix backend\" \"npm run start --prefix frontend\""
}
To run both servers in parallel, use:
bash

npm start
This will start both the backend on http://localhost:5000 and the frontend on http://localhost:3000.

Git Workflow
Initialize Git and First Commit

Initialize the Git repository:
git init

Add a remote GitHub repository:

git remote add origin https://github.com/jesvinjose/todolist

Stage all files:

git add .
Commit the changes:

git commit -m "Initial commit"
Create a main branch:

git branch -M main
Push to the main branch:

git push -u origin main
Working on Feature Branches
Create a new branch for your feature:

git checkout -b feature-branch-name
Make your changes, then stage and commit them:

git add .
git commit -m "Description of your changes"
Switch back to the main branch:

git checkout main
Pull the latest changes:

git pull origin main
Merge your feature branch into the main branch:

git merge feature-branch-name
Push your changes to GitHub:

git push origin main

Testing the Application

Backend Testing
You can test the backend API using tools like Postman or cURL. The main endpoints available for the task management API are:

GET /api/task/getalltasks: Retrieve all tasks.
POST /api/task/addtask: Create a new task.
PATCH /api/task/edittask/:id: Update a task.
DELETE /api/task/deletetask/:id: Delete a task.
PATCH /api/task/changestatus/:id: Change completion status

Make sure the backend server is running on http://localhost:4000.

Frontend Testing
To test the frontend:

Start both the frontend and backend servers by running npm start from the root folder.
Open your browser and navigate to http://localhost:3000.

Test the UI by creating, editing, and deleting tasks.