const {
    UserLanguageModel,
    UserModel,
    LanguageModel,
} = require('./../repositories/models/index');
const { Op } = require('sequelize');

async function updateLanguages(userId, nativeIds, targetIds) {
    // Remove existing language preferences
    await UserLanguageModel.destroy({ where: { user_id: userId } });

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
    await UserLanguageModel.bulkCreate(inserts);

    // Fetch updated user with languages
    const user = await UserModel.findByPk(userId, {
        attributes: ['id', 'email', 'full_name'],
        include: [
            {
                model: UserLanguageModel,
                include: [LanguageModel],
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
        return UserModel.findAll({
            where: { id: { [Op.ne]: userId } },
            include: [
                {
                    model: UserLanguageModel,
                    include: [LanguageModel],
                },
            ],
        });
    }

    // Step 1: Find your native and target languages
    const yourLanguages = await UserLanguageModel.findAll({
        where: { user_id: userId },
    });

    const yourNativeLangs = yourLanguages
        .filter((l) => l.type === 'native')
        .map((l) => l.language_id);
    const yourTargetLangs = yourLanguages
        .filter((l) => l.type === 'target')
        .map((l) => l.language_id);

    // Step 2: Find matching users
    const matchingUsers = await UserModel.findAll({
        where: { id: { [Op.ne]: userId } },
        include: [
            {
                model: UserLanguageModel,
                required: true,
                where: {
                    [Op.or]: [
                        { type: 'native', language_id: target }, // they are native in your target
                        { type: 'target', language_id: native }, // they want to learn your native
                    ],
                },
                include: [LanguageModel],
            },
        ],
    });

    return matchingUsers;
};
module.exports = { updateLanguages, findPartners };
