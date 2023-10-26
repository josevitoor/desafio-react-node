# Full Stack Developer Challenge

Challenge in React and Node.js

---

# System Documentation

## Overview

This system demonstrates the initial creation of a system for registering and viewing financial transactions. It is divided into two parts: the back-end and the front-end.

- **Back-end**: The back-end is built with Node.js, Express, Prisma, and uses a PostgreSQL database. It provides APIs for uploading financial transaction files, storing these transactions in the database, and providing access to transaction data. The back-end application is contained in the `api` folder.

- **Front-end**: The front-end is built with React and uses the Ant Design (antd) framework for the user interface. It communicates with the back-end through Axios to upload files and to retrieve and display transactions registered in the database. The front-end application is contained in the `public` folder.

## Environment Setup

To run the application on your machine, follow the steps below:

### Prerequisites

- Node.js and npm: Make sure you have Node.js and npm installed on your machine.
- Docker: You need to have Docker installed to run the PostgreSQL database..

### Installing Dependencies

In the project's root directory, navigate to the `api` and `public` folders and run the following command to install dependencies:

```bash
npm install
```

### Initialization

- **Back-end**

1. To start the back-end, go to the `api` folder and run:

```bash
npm run dev
```

This will start the Express server and allow the back-end to receive HTTP requests.

- **Database**

1. Ensure that Docker is running.
2. In the `api` folder, run the following command to start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```

The PostgreSQL database will be accessible on port 5432.

3. In the `api`, folder, run the following command to start Prisma Studio:

```bash
npx prisma studio
```

Prisma Studio will open a graphical interface that allows you to view, edit, and manage database data, if preferred.

- **Front-end**

1. To start the front-end, go to the `public` folder and run:

```bash
npm start
```

React will start and be accessible at `http://localhost:3000`.

### System Usage

After following the setup steps above, you can use the application as follows:

1. AAccess the front-end at `http://localhost:3000` in your web browser.

---

# Comitts

- initial api setup: Initializing the project by creating an 'api' folder where the Node.js backend implementation will take place. Additionally, I performed the initial installation of the key tools I would use for this: node, nodemon, express, Docker configuration, and the beginning of the PostgreSQL database setup.

- using prisma and set routes: Using Prisma for PostgreSQL database implementation and creating routes for transaction listing and transaction upload.

- integrating back and front: Creating a React app and integrating the backend with the frontend using Axios. Some Ant Design components were used for the form. Additionally, some modifications were made to the upload route to enable parsing of the text document.

- bringing the amount: Bringing the total value of all transactions made and adjusting some architectural points for better development.

- feedback messages: Bringing some user feedback messages and reorganizing some folders.
