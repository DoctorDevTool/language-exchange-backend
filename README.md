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
DB_PORT=4444
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=language_exchange
JWT_SECRET=your_jwt_secret_key
PORT=3333
```

## commands to start the app

npm start
npm run dev (if you using nodemon)

## API Endpoints Overview

_auth_
POST/api/auth/register **register user**
POST/api/auth/login **login**

_user_
GET/api/users **search partners**
GET/api/users/me **get current user**
PUT/api/users/me/languages **update user languages**

_requests_
POST/api/requests **create request**
DELETE/api/requests/:id **delete request**
GET/api/requests/incoming **get all incoming requests**
GET/api/requests/outgoing **get all outgoing requests**
PUT/api/requests/:id/accept **accept the request**
PUT/api/requests/:id/decline **decline request**
GET/api/requests/matches **get all accepted requests**

_language_
POST/api/languages **add new language**
GET/api/languages **get all languages**
