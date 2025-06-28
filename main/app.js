require('dotenv').config();
const cors = require('cors');
const express = require('express');
const sequelize = require('./db');
const routes = require('../routes/index');

const PORT = process.env.PORT || 3333;
// App config
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', routes.authRoutes);
app.use('/api/users', routes.userRoutes);
app.use('/api/requests', routes.requestRoutes);
app.use('/api/languages', routes.languageRoutes);

// DB + Server start
(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('DB OK!');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error('DB Error:', err);
    }
})();
