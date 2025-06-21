const { DataTypes } = require('sequelize');
const sequelize = require('../../main/db');

const Language = sequelize.define(
    'Language',
    {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'languages',
    }
);

module.exports = Language;
