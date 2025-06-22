// const matchService = require('../services/matchService');
const matchService = require('../services/matchService');

const createRequest = async (req, res) => {
    try {
        const fromUserId = req.userId;
        const { to_user_id } = req.body;
        const request = await matchService.createRequest(
            fromUserId,
            to_user_id
        );
        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const fetchIncoming = async (req, res) => {
    const requests = await matchService.fetchIncoming(req.userId);
    res.json(requests);
};

const fetchOutgoing = async (req, res) => {
    const requests = await matchService.fetchOutgoing(req.userId);
    res.json(requests);
};

const acceptRequest = async (req, res) => {
    try {
        const request = await matchService.acceptRequest(
            req.params.id,
            req.userId
        );
        res.json(request);
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
};

const declineRequest = async (req, res) => {
    try {
        const request = await matchService.declineRequest(
            req.params.id,
            req.userId
        );
        res.json(request);
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
};

const fetchMatches = async (req, res) => {
    const matches = await matchService.fetchMatches(req.userId);
    res.json(matches);
};

module.exports = {
    createRequest,
    fetchIncoming,
    fetchOutgoing,
    acceptRequest,
    declineRequest,
    fetchMatches,
};
