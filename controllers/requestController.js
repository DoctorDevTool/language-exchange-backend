const reqService = require('../services/reqService');

const createRequest = async (req, res) => {
    try {
        const fromUserId = req.userId;
        const toUserId = req.body.to_user_id;

        const request = await reqService.createRequest(fromUserId, toUserId);
        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteRequest = async (req, res) => {
    try {
        const reqId = req.params.id;
        await reqService.deleteRequest(reqId);

        res.json({
            message: 'Succefuly deleted!',
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const fetchIncoming = async (req, res) => {
    const requests = await reqService.fetchIncoming(req.userId);
    res.json(requests);
};

const fetchOutgoing = async (req, res) => {
    const requests = await reqService.fetchOutgoing(req.userId);
    res.json(requests);
};

const acceptRequest = async (req, res) => {
    try {
        const request = await reqService.acceptRequest(
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
        const request = await reqService.declineRequest(
            req.params.id,
            req.userId
        );
        res.json(request);
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
};

const fetchMatches = async (req, res) => {
    const matches = await reqService.fetchMatches(req.userId);
    res.json(matches);
};

module.exports = {
    createRequest,
    deleteRequest,
    fetchIncoming,
    fetchOutgoing,
    acceptRequest,
    declineRequest,
    fetchMatches,
};
