const { DataTypes } = require('sequelize');
const sequelize = require('../../main/db');

const User = sequelize.define(
    'User',
    {
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: 'users',
    }
);

module.exports = User;
