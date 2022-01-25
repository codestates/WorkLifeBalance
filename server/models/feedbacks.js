'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedbacks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Feedbacks.init({
    userId: DataTypes.STRING,
    content: DataTypes.STRING,
    day: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Feedbacks'
  });
  return Feedbacks;
};
