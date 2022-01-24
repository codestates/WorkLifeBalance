const { Tasks } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: async (req, res) => {
    try {
      const userInfo = isAuthorized(req);
      if (!userInfo) {
        return res.status(400).send({ message: 'bad request' });
      }
      const { userId } = userInfo;
      const user = await Tasks.findOne({
        where: { userId }
      });
      if (!user) {
        return res.status(401).send({ message: 'not authorized' });
      } else {
        const Tasks = await Tasks.findAll();
        return res.status(200).send({ data: { Tasks }, message: 'ok' });
      }
    } catch (err) {
      res.status(500).send({ message: 'server error' });
    }
  }
};

// ! query -> check, time /
// ! query -> 현재 시간 이전/이후 검색 -> timeout task
// MYSQL -> UTC_TIMESTAMP(); // time <, > UTC_TIMESTAMP();
