const express = require('express');
const router = express.Router();
const { getMe, putLanguages } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/me', authMiddleware, getMe);
router.put('/me/languages', authMiddleware, putLanguages);

module.exports = router;
