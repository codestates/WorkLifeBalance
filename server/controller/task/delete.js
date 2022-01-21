const { Task } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const { id } = req.body;
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      return res.status(404).send({ message: 'bad request' });
    }
    const { userId } = userInfo;
    const user = await Task.findOne({
      where: { userId }
    });
    if (!user) {
      return res.status(401).send({ message: 'not authorized' });
    } else {
      await Task.findOne({ where: { id } });
      await Task.destroy({ where: { id } });
      return res.status(200).send({ message: 'ok' });
    }
  }
};
