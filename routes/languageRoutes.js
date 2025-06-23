const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middleware/authMiddleware');
const languageController = require('../controllers/languageController');

router.post('/', authMiddleware, languageController.createLanguage);
router.get('/', languageController.getLanguages);
module.exports = router;
