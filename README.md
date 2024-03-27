# Code Snippets Submission and Display

This project is a web application that facilitates the submission and display of code snippets. It is built using Express for the backend and React for the frontend.

## Tech Stack
- Backend: Express
- Frontend: React
- Database: MySQL (hosted on Amazon RDS)
- Caching: Redis

## Features

The application consists of two main pages:

1. **Submission Form**: A form that gathers the following fields: username, preferred code language (C++, Java, JavaScript, Python), standard input (stdin), and the source code.

2. **Display Page**: A page that presents all submitted entries in a tabular format, showcasing the username, code language, stdin, and the timestamp of submission. The source code is limited to the initial 100 characters for display.

The application is designed to work seamlessly with data stored in MySQL tables and uses Redis for caching to reduce the number of database read requests. 

The application also utilizes the Judge0 API to retrieve the output of the code and exhibit it in a new column (stdout) on the Display Page.

Both the frontend and backend applications are hosted and publicly accessible.

## Live Demo

- Frontend: [https://tuf-show-code-snippets.vercel.app/](https://tuf-show-code-snippets.vercel.app/)
- Backend: [https://tuf-showcodesnippets.onrender.com/](https://tuf-showcodesnippets.onrender.com/)

## API Documentation

- Judge0 API: [https://judge0.com/](https://judge0.com/), [https://rapidapi.com/judge0-official/api/judge0-ce](https://rapidapi.com/judge0-official/api/judge0-ce)

## Project Structure

The project is divided into two main parts: the frontend and the backend.

- The frontend is located in the root directory and can be run with `npm start`. By default, it runs on `localhost:3000`.
- The backend is located in the `server/` directory and can be run with `npm start`. By default, it runs on `localhost:3001`.

## Environment Variables

You need to set up the following environment variables in your `.env` file:

- `REACT_APP_API_URL`: The URL of your backend API. For local development, this will be `http://localhost:3001/api`.
- `REACT_APP_X_RAPIDAPI_KEY`: Your Judge0 API key.

In the `server/.env` file, you need to set up the following environment variables:

- `DB_HOST`: The host of your MySQL database.
- `DB_USER`: The user for your MySQL database.
- `DB_PASSWORD`: The password for your MySQL database.
- `DB_NAME`: The name of your MySQL database.
- `X_RAPIDAPI_KEY`: Your Judge0 API key.

## Getting Started

To get a local copy up and running, follow these simple steps:

1. Clone the repository
2. Install NPM packages using `npm install`
3. Start the server using `npm start`
