# Library Management API

This is the backend part of the Library Management system. It is built with Node.js, Express, and Prisma. The API supports CRUD operations for books and categories and allows uploading of book cover images.

## Prerequisites

- Node.js (version 14 or above)
- MySQL database

## Setup Instructions

### 1. Clone the repository

```sh
git clone https://github.com/your-username/library-management-backend.git
cd library-management-backend
```
### 2. Configure environment variables

Create a `.env` file in the root directory of the project and add your database connection string. You can copy the example configuration from `.env.example`.

```sh
cp .env.example .env
```

### 3. Set up the database

Run the following Prisma commands to create the database tables and seed the database with initial data (if any):

```sh
npx prisma migrate dev --dev init // for develoment
npx prisma migrate dev --test init // for unit test
### 4. Start the server
```

npm start
The server will start on http://localhost:5000.
