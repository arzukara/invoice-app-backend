# Invoice App - MERN Project - Backend

This repository contains the backend (server-side) code for the MERN stack application.

The backend is deployed on an AWS EC2 instance using GitHub Actions for continuous deployment.

## Overview

This backend is built using:
- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework for Node.js to create the RESTful API.
- **MongoDB**: NoSQL database to store application data.

The backend handles API requests, connects to the MongoDB database, and serves data to the frontend.

## Installation

### Prerequisites
- Node.js installed on your machine.
- MongoDB instance running (local or cloud, e.g., MongoDB Atlas).

### Steps

1. Clone the repository:
   ```
   git clone https://github.com/arzukara/invoice-app-backend.git
   cd invoice-app-backend
   ```
2. Install dependencies:
    ```
    npm install
    ```
3. Configure environment variables:<br/>
    Create a .env file in the root directory. Project requires a url to connect mongodb.
    For more info and example =>[How to Use MERN Stack: A Complete Guide](https://www.mongodb.com/resources/languages/mern-stack-tutorial)
    ```
    ATLAS_URI=connection_string_here
    ```
4. Start the development server:<br/>
    To run the application in development mode, you will need `nodemon`. `Nodemon` is a tool that automatically restarts your Node.js application when file changes in the directory are detected, making it ideal for development environments.
    ```
    npm install nodemon --save-dev
    ```
Once nodemon is installed, you can start the development server using the following command:
    ```
    npm run dev
    ```

Alternatively, if you prefer not to use nodemon, you can run the application with:
    ```
    npm start
    ```
