// const User = require('../repositories/models/User');
// const UserLanguage = require('../repositories/models/UserLanguage');
// const Language = require('../repositories/models/Language');
const {
    UserLanguageModel,
    UserModel,
    LanguageModel,
} = require('./../repositories/models/index');

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

module.exports = { updateLanguages };
