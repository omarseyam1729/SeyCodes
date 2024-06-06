const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserProblem extends Model {}

UserProblem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    problem_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'problem',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userProblem',
  }
);

module.exports = UserProblem;
