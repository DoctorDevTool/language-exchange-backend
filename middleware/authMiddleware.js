const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s/, '');
    if (!token) {
        return res.status(401).json({ message: 'Missing or invalid token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
