const { Tasks } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { Op } = require('sequelize');

module.exports = {
  get: async (req, res) => {
    try {
      const now = new Date();
      const userInfo = isAuthorized(req);
      console.log(userInfo);
      if (!userInfo) {
        return res.status(400).send({ message: 'bad request' });
      } else {
        console.log('1');
        const { userId } = userInfo;
        const user = await Tasks.findOne({
          where: { userId }
        });
        if (!user) {
          return res.status(401).send({ message: 'not authorized' });
        } else {
          const work1 = await Tasks.findAndCountAll({
            where: {
              tag: {
                [Op.eq]: 'W'
              }
            }
          });
          const life1 = await Tasks.findAndCountAll({
            where: {
              tag: {
                [Op.eq]: 'L'
              }
            }
          });
          const check1 = await Tasks.findAndCountAll({
            where: {
              check: {
                [Op.eq]: 1
              }
            }
          });
          const time1 = await Tasks.findAndCountAll({
            where: {
              time: {
                [Op.lt]: now
              },
              check: {
                [Op.eq]: 0
              }
            }
          });
          const work = work1.count;
          const life = life1.count;
          const check = check1.count;
          const timeout = time1.count;
          console.log(time1);
          // console.log(life1.rows[1].dataValues,'123123123')
          console.log(work, life, check, timeout);
          return res.status(200).send({ data: { work, life, check, timeout: timeout }, message: 'ok' });
        }
      }
    } catch (err) {
      res.status(500).send({ message: 'server error' });
    }
  }
};
