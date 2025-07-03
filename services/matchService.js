const models = require('./../models/index');

const { Op } = require('sequelize');

const createRequest = async (fromUserId, toUserId) => {
    if (fromUserId === toUserId) {
        throw new Error('Cannot send request to yourself');
    }

    return await models.MatchRequest.create({
        from_user_id: fromUserId,
        to_user_id: toUserId,
        status: 'pending',
    });
};

const deleteRequest = async (reqId) => {
    if (!reqId) {
        throw new Error('There is no request found');
    }

    return await models.MatchRequest.destroy({
        where: {
            id: reqId,
        },
    });
};

const fetchIncoming = async (userId) => {
    return await models.MatchRequest.findAll({
        where: {
            to_user_id: userId,
            status: 'pending',
        },
        include: [{ model: models.User, as: 'fromUser' }],
    });
};

const fetchOutgoing = async (userId) => {
    return await models.MatchRequest.findAll({
        where: {
            from_user_id: userId,
        },
        include: [{ model: models.User, as: 'toUser' }],
    });
};

const acceptRequest = async (reqId, userId) => {
    const request = await models.MatchRequest.findOne({
        where: { id: reqId },
    });
    if (!request || request.to_user_id !== userId) {
        throw new Error('Unauthorized or not found');
    }

    request.status = 'accepted';
    await request.save();
    return request;
};

const declineRequest = async (requestId, userId) => {
    const request = await models.MatchRequest.findOne({
        where: { id: requestId },
    });
    if (!request || request.to_user_id !== userId) {
        throw new Error('Unauthorized or not found');
    }

    request.status = 'declined';
    await request.save();
    return request;
};

const fetchMatches = async (userId) => {
    return await models.MatchRequest.findAll({
        where: {
            status: 'accepted',
            [Op.or]: [{ from_user_id: userId }, { to_user_id: userId }],
        },
        include: [
            { model: models.User, as: 'fromUser' },
            { model: models.User, as: 'toUser' },
        ],
    });
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
