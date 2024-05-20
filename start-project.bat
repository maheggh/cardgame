@echo off

echo Installing npm packages in the frontend folder...
cd frontend
npm install
cd ..

echo Installing npm packages in the backend folder...
cd backend
npm install
cd ..

echo Starting frontend service in a new command prompt window...
start cmd /k "cd frontend && npm run dev"

echo Starting backend service in a new command prompt window...
start cmd /k "cd backend && nodemon server"