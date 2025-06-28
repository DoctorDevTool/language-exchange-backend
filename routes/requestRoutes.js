const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middleware/authMiddleware');
const requestController = require('../controllers/requestController');

router.post('/', authMiddleware, requestController.createRequest);
router.delete('/:id', authMiddleware, requestController.deleteRequest);
router.get('/incoming', authMiddleware, requestController.fetchIncoming);
router.get('/outgoing', authMiddleware, requestController.fetchOutgoing);
router.put('/:id/accept', authMiddleware, requestController.acceptRequest);
router.put('/:id/decline', authMiddleware, requestController.declineRequest);
router.get('/matches', authMiddleware, requestController.fetchMatches);

module.exports = router;
