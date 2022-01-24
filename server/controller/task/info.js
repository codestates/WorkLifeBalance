const { Task } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { Op } = require('sequelize');

module.exports = {
  get: async (req, res) => {
    try {
      const userInfo = isAuthorized(req);
      console.log(userInfo);
      if (!userInfo) {
        return res.status(400).send({ message: 'bad request' });
      } else {
        const { userId } = userInfo;
        const user = await Task.findOne({
          where: { userId }
        });
        if (!user) {
          return res.status(401).send({ message: 'not authorized' });
        } else {
          const work1 = await Task.findAndCountAll({
            where: {
              tag: {
                [Op.eq]: 'W'
              }
            }
          });
          const life1 = await Task.findAndCountAll({
            where: {
              tag: {
                [Op.eq]: 'L'
              }
            }
          });
          const check1 = await Task.findAndCountAll({
            where: {
              check: {
                [Op.eq]: 1
              }
            }
          });
          const work = work1.count;
          const life = life1.count;
          const check = check1.count;
          console.log(work, life, check);
          return res.status(200).send({ data: { work, life, check }, message: 'ok' });
        }
      }
    } catch (err) {
      res.status(500).send({ message: 'server error' });
    }
  }
};
