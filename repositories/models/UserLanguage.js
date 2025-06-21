const { DataTypes } = require('sequelize');
const sequelize = require('../../main/db');

const UserLanguage = sequelize.define(
    'UserLanguage',
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        language_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('native', 'target'),
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: 'user_languages',
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'language_id', 'type'],
            },
        ],
    }
);

module.exports = UserLanguage;
