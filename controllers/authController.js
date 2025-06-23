const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('./../models/index');

const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existing = await models.User.findOne({ where: { email } });
        if (existing)
            return res.status(400).json({ message: 'Email already in use' });

        const hash = await bcrypt.hash(password, 10);
        const user = await models.User.create({
            email,
            name,
            password_hash: hash,
        });

        return res
            .status(201)
            .json({ message: 'User registered successfully' });
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Server error', error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await models.User.findOne({ where: { email } });
        if (!user)
            return res.status(401).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match)
            return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        return res.json({
            token,
            user: { id: user.id, email: user.email, name: user.name },
        });
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Server error', error: err.message });
    }
};

module.exports = { register, login };
