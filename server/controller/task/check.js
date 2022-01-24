const { Tasks } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    try {
      const { id, check } = req.body;
      const userInfo = isAuthorized(req);
      if (!userInfo) {
        return res.status(400).send({ message: 'bad request' });
      } else {
        const { userId } = userInfo;
        const user = await Tasks.findOne({
          where: { userId }
        });
        if (!user) {
          return res.status(400).send({ message: 'bad request' });
        } else {
          await Tasks.update({ check }, { where: { id } });
          return res.status(200).send({ message: 'ok' });
        }
      }
    } catch (err) {
      res.status(500).send({ message: 'server error' });
    }
  }
};
