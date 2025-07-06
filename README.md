# Language Exchange Backend

Backend server for the Language Exchange App, built with **Node.js** and **Express** using **Sequelize** as ORM for PostgreSQL.

## Technologies Used

-   Node.js
-   Express.js
-   Sequelize ORM
-   PostgreSQL
-   JSON Web Tokens (JWT)
-   dotenv
-   bcryptjs

## ENV Variables

Create a `.env` file in the root of your project with the following:

```env
DB_HOST=localhost
DB_PORT=your_db_port (by default 5432)
DB_USER=your_db_user (by default postgres)
DB_PASSWORD=your_db_password
DB_NAME=language_exchange
JWT_SECRET=your_jwt_secret_key
PORT=3333
```

## APP Setup

### **initialise the project**

npm init

### **install all dependencies**

-   "bcryptjs"
-   "cors"
-   "dotenv"
-   "express"
-   "jsonwebtoken"
-   "pg"
-   "pg-hstore"
-   "sequelize"

### **in package.json add this script**

"start": "node main/app.js"

> [!NOTE]
> npm start --_this is the command to start the app_

## API Endpoints Overview

### auth

POST/api/auth/register **--register user**\
POST/api/auth/login **--login**

### user

GET/api/users **--search partners**\
GET/api/users/me **--get current user**\
PUT/api/users/me/languages **--update user languages**

### requests

POST/api/requests **--create request**\
DELETE/api/requests/:id **--delete request**\
GET/api/requests/incoming **--get all incoming requests**\
GET/api/requests/outgoing **--get all outgoing requests**\
PUT/api/requests/:id/accept **--accept the request**\
PUT/api/requests/:id/decline **--decline request**\
GET/api/requests/matches **--get all accepted requests**

### language

POST/api/languages **--add new language**\
GET/api/languages **--get all languages**
