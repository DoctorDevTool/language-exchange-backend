require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const requestRoutes = require('../routes/requestRoutes');
const app = express();

const PORT = process.env.PORT || 3333;

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);

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
