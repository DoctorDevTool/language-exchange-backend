const express = require('express');
const router = express.Router();
const {
    getMe,
    putLanguages,
    searchPartners,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, searchPartners);
router.get('/me', authMiddleware, getMe);
router.put('/me/languages', authMiddleware, putLanguages);

module.exports = router;
