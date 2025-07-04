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
DB_PORT=your_db_port (by defolt 5432)
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=language_exchange
JWT_SECRET=your_jwt_secret_key
PORT=3333
```

## APP Setup

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

## Usage Instracrions

    1.	Start the backend first – make sure it’s running at the API URL you configured in .env.local.
    2.	Then start the frontend with npm start.
    3.	Use the app step by step:
    •	✅ Register an account
    •	🔐 Log in
    •	🌐 Configure your native and target languages
    •	🔍 Use the search to find matching users
    •	📤 Send match requests
    •	📥 View and respond to incoming requests (accept/reject)
    •	🤝 See confirmed matches

> [!IMPORTANT]
> First register user with name `Admin`. Only this user has acces to 'Languages' page where you can add new languages to DB

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
