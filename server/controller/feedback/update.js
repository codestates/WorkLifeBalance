const { Feedbacks } = require('../../models');
const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const { content, day } = req.body;
    const userInfo = isAuthorized(req);
    console.log(userInfo);
    if (!userInfo) {
      return res.status(400).send({ message: 'Invalid Token' });
    } else {
      const { userId } = userInfo;
      const user = await Users.findOne({
        where: { userId }
      });
      if (!user) {
        return res.status(401).send({ message: 'not authorized' });
      } else {
        const [dailyInfo, created] = await Feedbacks.findOrCreate({
          where: { day },
          defaults: { userId, content, day }
        });
        if (!created) {
          Feedbacks.update({ content }, { where: { day } });
          return res.status(200).send({ message: 'ok' });
        }
        return res.status(200).send({ message: 'ok' });
      }
    }
  }
};
