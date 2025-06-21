const LanguageModel = require('./Language');
const UserModel = require('./User');
const UserLanguageModel = require('./UserLanguage');

UserModel.hasMany(UserLanguageModel, { foreignKey: 'user_id' });
UserLanguageModel.belongsTo(UserModel, { foreignKey: 'user_id' });
UserLanguageModel.belongsTo(LanguageModel, { foreignKey: 'language_id' });

module.exports = { UserLanguageModel, UserModel, LanguageModel };
