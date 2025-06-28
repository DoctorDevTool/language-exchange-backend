const Language = require('./Language');
const User = require('./User');
const UserLanguage = require('./UserLanguage');
const MatchRequest = require('./MatchRequest');

// Associations
User.hasMany(UserLanguage, { foreignKey: 'user_id' });
UserLanguage.belongsTo(User, { foreignKey: 'user_id' });
UserLanguage.belongsTo(Language, { foreignKey: 'language_id' });
User.hasMany(MatchRequest, {
    foreignKey: 'from_user_id',
    as: 'sentRequests',
});
User.hasMany(MatchRequest, {
    foreignKey: 'to_user_id',
    as: 'receivedRequests',
});
MatchRequest.belongsTo(User, {
    foreignKey: 'from_user_id',
    as: 'fromUser',
});
MatchRequest.belongsTo(User, {
    foreignKey: 'to_user_id',
    as: 'toUser',
});

module.exports = {
    UserLanguage,
    User,
    Language,
    MatchRequest,
};
