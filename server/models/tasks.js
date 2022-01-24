'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Tasks.init({
    userId: DataTypes.STRING,
    tag: DataTypes.STRING,
    task: DataTypes.STRING,
    time: DataTypes.DATE,
    check: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tasks'
  });
  return Tasks;
};
