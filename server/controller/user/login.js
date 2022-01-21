const crypto = require('crypto');
const { Users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {
  post: (req, res) => {
    const { userId, password } = req.body;
    const hashPassword = crypto.createHash('sha512').update(password).digest('hex');

    Users.findOne({
      where: {
        userId,
        password: hashPassword
      }
    })
      .then((data) => {
        if (!data) {
          return res.status(401).send({ message: 'Invalid user or password' });
        }
        delete data.dataValues.password;
        const jwt = generateAccessToken(data.dataValues);
        sendAccessToken(res, jwt);
        return res.status(200).send(data.dataValues);
      });
  }
};
