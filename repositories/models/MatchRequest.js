const { DataTypes } = require('sequelize');
const sequelize = require('../../main/db');

const MatchRequest = sequelize.define(
    'MatchRequest',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        from_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        to_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'accepted', 'declined'),
            defaultValue: 'pending',
        },
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'match_requests',
        indexes: [
            {
                unique: true,
                fields: ['from_user_id', 'to_user_id'],
            },
        ],
    }
);

module.exports = MatchRequest;
