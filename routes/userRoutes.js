const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, userController.searchPartners);
router.get('/me', authMiddleware, userController.getMe);
router.put('/me/languages', authMiddleware, userController.putLanguages);

module.exports = router;
