/*
* DB schema
https://dbdiagram.io/d/61e5281150665b330437beec

 */

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
    }
  }
  Task.init(
    {
      // ! schema 작성 
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};