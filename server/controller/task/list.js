const { Tasks, Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { Op } = require('sequelize');

module.exports = {
  get: async (req, res) => {
    try {
      const userInfo = isAuthorized(req);
      if (!userInfo) {
        return res.status(400).send({ message: 'bad request' });
      }
      const { userId } = userInfo;
      const user = await Users.findOne({
        attributes: ['id', 'userId', 'email', 'name', 'createdAt', 'updatedAt'],
        where: { userId }
      });
      if (!user) {
        return res.status(401).send({ message: 'not authorized' });
      } else {
        const [check, time, index] = [req.query.check, req.query.time, Number(req.query.index)];
        let tasks;
        if (check === '0') {
          tasks = await Tasks.findAll({
            where: {
              userId: userId,
              check: '0',
              time: time === '1'
                ? { [Op.gt]: new Date() }
                : { [Op.lt]: new Date() }
            }
          });
        } else {
          tasks = await Tasks.findAll({
            where: {
              userId: userId,
              check: '1'
            }
          });
        }
        const list = tasks.sort((a, b) => a.time - b.time).slice(index, index + 5);
        return res.status(200).send({ data: { tasks: list }, message: 'ok' });
      }
    } catch (err) {
      res.status(500).send({ message: 'server error' });
    }
  }
};
