const LanguageModel = require('./Language');
const UserModel = require('./User');
const UserLanguageModel = require('./UserLanguage');
const MatchRequestModel = require('./MatchRequest');

UserModel.hasMany(UserLanguageModel, { foreignKey: 'user_id' });
UserLanguageModel.belongsTo(UserModel, { foreignKey: 'user_id' });
UserLanguageModel.belongsTo(LanguageModel, { foreignKey: 'language_id' });

UserModel.hasMany(MatchRequestModel, {
    foreignKey: 'from_user_id',
    as: 'sentRequests',
});
UserModel.hasMany(MatchRequestModel, {
    foreignKey: 'to_user_id',
    as: 'receivedRequests',
});

MatchRequestModel.belongsTo(UserModel, {
    foreignKey: 'from_user_id',
    as: 'fromUser',
});
MatchRequestModel.belongsTo(UserModel, {
    foreignKey: 'to_user_id',
    as: 'toUser',
});

module.exports = {
    UserLanguageModel,
    UserModel,
    LanguageModel,
    MatchRequestModel,
};
