const { Feedbacks } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const { d } = req.query;
    // const queryDay = d.split(' ')
    // const result = queryDay[0]+"T"+queryDay[1]+"Z"
    // console.log(result)
    try {
      const userInfo = isAuthorized(req);
      if (!userInfo) {
        return res.status(400).send({ message: 'bad request' });
      } else {
        const { userId } = userInfo;
        const user = await Feedbacks.findOne({
          where: { userId }
        });
        if (!user) {
          return res.status(401).send({ message: 'not authorized' });
        } else {
          const value = await Feedbacks.findOne({
            where: {
              day: d
            }
          });
          if (!value) {
            return res.status(400).send({ message: 'bad request1' });
          } else {
            const resContent = value.dataValues.content;
            const resDay = value.dataValues.day;
            return res.status(200).send({ data: { content: resContent, day: resDay }, meesage: 'ok' });
          }
        }
      }
    } catch (err) {
      res.status(500).send({ message: 'server error' });
    }
  }
};
