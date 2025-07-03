const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('./../models/index');

const register = async (req, res) => {
    const { email, password, full_name } = req.body;

    // checking password lenght
    if (password.length < 6) {
        return res
            .status(400)
            .json({ message: 'Password must be 6 simbols minimum' });
    }
    try {
        // checking if email is avalable
        const existing = await models.User.findOne({ where: { email } });
        if (existing)
            return res.status(400).json({ message: 'Email already in use' });

        // hashing the password and creating a new user
        const hash = await bcrypt.hash(password, 10);
        await models.User.create({
            email,
            full_name,
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
        // finding user by email
        const user = await models.User.findOne({ where: { email } });
        if (!user)
            return res.status(401).json({ message: 'Invalid credentials' });

        // checking if entered password is right
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match)
            return res.status(401).json({ message: 'Invalid credentials' });

        // creating token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        return res.json({
            token,
            user: { id: user.id, email: user.email, full_name: user.full_name },
        });
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Server error', error: err.message });
    }
};

module.exports = { register, login };
