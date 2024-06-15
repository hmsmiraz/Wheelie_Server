# Wheelie Server

[![Build Status](https://travis-ci.org/hmsmiraz/Wheelie_Server.svg?branch=main)](https://travis-ci.org/hmsmiraz/Wheelie_Server)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Project Description

Wheelie Server is a robust and scalable backend server for the Wheelie application. This server handles various functionalities such as user authentication, data management, and communication with the Wheelie client. This repository contains all the necessary code and documentation to set up and run the Wheelie server.

## Live URL

The live version of the Wheelie application can be accessed at: [Wheelie Live](https://wheelie-live-url.com)

## Features

- **User Authentication**: Secure user registration and login functionalities.
- **Data Management**: Efficient handling of user data and application state.
- **API Integration**: RESTful APIs for seamless communication with the client-side application.
- **Real-time Updates**: Use of WebSockets for real-time updates and notifications.
- **Scalability**: Built with scalability in mind to handle a growing user base and data.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time Communication**: Socket.io
- **Version Control**: Git, GitHub

## Getting Started

Follow these instructions to set up and run the Wheelie Server on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/hmsmiraz/Wheelie_Server.git
    cd Wheelie_Server
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=mongodb+srv://Wheelie_Server:admin123123@cluster0.meftkqt.mongodb.net/Wheelie?retryWrites=true&w=majority&appName=Cluster0
   BCRYPT_SALT_ROUNDS=12
   DEFAULT_PASS=wheelie123
   JWT_ACCESS_SECRET=7a30dda472a876edb7789c3e86ad4b51162551a494aad0888b1269ae2564a357
   JWT_ACCESS_EXPIRES_IN=1d
    ```

4. **Build the project:**

    ```bash
    npm run build
    ```

5. **Start the server in development mode:**

    ```bash
    npm run start:dev
    ```

    Alternatively, you can start the server in production mode after building the project:

    ```bash
    npm run start:prod
    ```

### Available Scripts

- **Build the project:**

    ```bash
    npm run build
    ```

- **Start the server in development mode:**

    ```bash
    npm run start:dev
    ```

- **Start the server in production mode:**

    ```bash
    npm run start:prod
    ```

- **Lint the code:**

    ```bash
    npm run lint
    ```

- **Fix linting errors:**

    ```bash
    npm run lint:fix
    ```

- **Format the code with Prettier:**

    ```bash
    npm run pretty
    ```

- **Fix code formatting with Prettier:**

    ```bash
    npm run pretty:fix
    ```

### Running Tests

Currently, the test script is a placeholder. You can add your test configurations and scripts as needed.

```bash
npm test
