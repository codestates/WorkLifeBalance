require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '1d' });
  },
  sendAccessToken: (res, jwt) => {
    res.cookie('jwt', jwt, {
      httpOnly: true,
      sameSite: 'None',
      secure: true
    });
  },
  isAuthorized: (req) => {
    console.log(req.headers.cookie);
    const cookie = req.headers.cookie;
    const token = cookie.split(/[=;]/)[1];
    if (!cookie || !cookie.includes('jwt')) {
      return null;
    }
    try {
      return verify(token, process.env.ACCESS_SECRET, (err, result) => {
        if (err) return null;
        else return result;
      });
    } catch (err) {
      return null;
    }
  }
};
