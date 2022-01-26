const crypto = require('crypto');
const { Users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    try {
      const { userId, name, password, email } = req.body;
      if (!(email && userId && password && email)) {
        return res.status(400).send({ message: 'bad request' });
      }
      const hashPassword = crypto.createHash('sha512').update(password).digest('hex');
      const [userInfo, created] = await Users.findOrCreate({
        where: { email },
        defaults: { email, userId, password: hashPassword, name },
        raw: true
      });
      if (!created) {
        return res.status(409).send({ message: 'email exists' });
      }
      delete userInfo.dataValues.password;
      const jwt = generateAccessToken(userInfo.dataValues);
      sendAccessToken(res, jwt);
      return res.status(201).send(userInfo.dataValues);
    } catch (err) {
      res.status(500).send({ message: 'server error' });
    }
  }
};
