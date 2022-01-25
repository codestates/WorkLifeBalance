const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: (req, res) => {
    console.log(req.headers.cookie);
    try {
      const userInfo = isAuthorized(req);
      if (userInfo) {
        return res.clearCookie('jwt').status(205).send({ message: 'Logged out successfully' });
      }
    } catch (err) {
      return res.status(500).send({ message: 'server error' });
    }
  }
};
