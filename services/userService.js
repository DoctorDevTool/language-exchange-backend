const models = require('./../models/index');
const { Op, where } = require('sequelize');

async function updateLanguages(userId, nativeIds, targetIds) {
    // Remove existing language preferences
    await models.UserLanguage.destroy({ where: { user_id: userId } });
    // await models.UserLanguage.find;

    // Build new insert list
    const inserts = [
        ...nativeIds.map((id) => ({
            user_id: userId,
            language_id: id,
            type: 'native',
        })),
        ...targetIds.map((id) => ({
            user_id: userId,
            language_id: id,
            type: 'target',
        })),
    ];

    // Bulk insert new preferences
    await models.UserLanguage.bulkCreate(inserts);

    // Fetch updated user with languages
    const user = await models.User.findByPk(userId, {
        attributes: ['id', 'email', 'full_name'],
        include: [
            {
                model: models.UserLanguage,
                include: [models.Language],
            },
        ],
    });

    const languages = user.UserLanguages.map((ul) => ({
        language_id: ul.language_id,
        type: ul.type,
        name: ul.Language.name,
    }));

    return {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        languages,
    };
}

const findPartners = async (userId, native, target) => {
    const filtersExist = native && target;

    if (!filtersExist) {
        // Return all users except current
        return models.User.findAll({
            where: { id: { [Op.ne]: userId } },
            include: [
                {
                    model: models.UserLanguage,
                    include: [models.Language],
                },
            ],
        });
    }

    // Step 1: Find all wanted native and target languages
    const targetLanguages = await models.UserLanguage.findAll({
        where: {
            user_id: { [Op.ne]: userId },
            language_id: target,
            type: 'target',
        },
    });
    const nativeLanguages = await models.UserLanguage.findAll({
        where: {
            user_id: { [Op.ne]: userId },
            language_id: native,
            type: 'native',
        },
    });

    // Step 2: Find IDs of users matching for native and target
    const usersId = [];
    targetLanguages.forEach((lang) => {
        for (let i = 0; i < nativeLanguages.length; i++) {
            if (nativeLanguages[i].user_id === lang.user_id) {
                usersId.push(lang.user_id);
            }
        }
    });

    // Step 3: Find matching users
    const allMatch = await models.User.findAll({
        where: {
            id: { [Op.in]: usersId },
        },
        include: [
            {
                model: models.UserLanguage,
                include: [models.Language],
            },
        ],
    });

    return allMatch;
};
module.exports = { updateLanguages, findPartners };
