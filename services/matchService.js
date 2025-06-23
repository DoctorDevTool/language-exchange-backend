const {
    MatchRequestModel,
    UserModel,
} = require('./../models/index');

const { Op } = require('sequelize');

const createRequest = async (fromUserId, toUserId) => {
    if (fromUserId === toUserId) {
        throw new Error('Cannot send request to yourself');
    }

    return await MatchRequestModel.create({
        from_user_id: fromUserId,
        to_user_id: toUserId,
        status: 'pending',
    });
};

const fetchIncoming = async (userId) => {
    return await MatchRequestModel.findAll({
        where: {
            to_user_id: userId,
            status: 'pending',
        },
        include: [{ model: UserModel, as: 'fromUser' }],
    });
};

const fetchOutgoing = async (userId) => {
    return await MatchRequestModel.findAll({
        where: {
            from_user_id: userId,
            status: 'pending',
        },
        include: [{ model: UserModel, as: 'toUser' }],
    });
};

const acceptRequest = async (requestId, userId) => {
    const request = await MatchRequestModel.findOne({
        where: { id: requestId },
    });
    if (!request || request.to_user_id !== userId) {
        throw new Error('Unauthorized or not found');
    }

    request.status = 'accepted';
    await request.save();
    return request;
};

const declineRequest = async (requestId, userId) => {
    const request = await MatchRequestModel.findOne({
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
    return await MatchRequestModel.findAll({
        where: {
            status: 'accepted',
            [Op.or]: [{ from_user_id: userId }, { to_user_id: userId }],
        },
        include: [
            { model: User, as: 'fromUser' },
            { model: User, as: 'toUser' },
        ],
    });
};

module.exports = {
    createRequest,
    fetchIncoming,
    fetchOutgoing,
    acceptRequest,
    declineRequest,
    fetchMatches,
};
