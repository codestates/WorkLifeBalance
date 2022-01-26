const { Users } = require('../../models');
const { generateAccessToken, sendAccessToken, isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    // Cookie Header 존재 여부, 유효한 JWT 토큰 탐색
    // 토큰의 ID가 가입이 된 ID인지(Users 모델에서 일치하는 ID가 있는지) 검색
    try {
      const userInfo = isAuthorized(req);
      if (!userInfo) {
        return res.status(400).send({ message: 'bad request' });
      } else {
        const { id } = userInfo;
        const user = await Users.findOne({
          attributes: ['id', 'userId', 'email', 'name', 'createdAt', 'updatedAt'],
          where: { id }
        });

        if (!user) { return res.status(401).send({ message: 'not authorized' }); } else {
          // 인증 후 Users 모델에서 해당 userId 관련 정보 수정
          const [userId, name, email] = [req.body.userId, req.body.name, req.body.email];
          const updateInfo = {
            userId: userId,
            name: name,
            email: email
          };
          await Users.update(updateInfo, {
            where: { id }
          });

          const data = await Users.findOne({
            attributes: ['id', 'userId', 'email', 'name', 'createdAt', 'updatedAt'],
            where: { id: id }
          });
          res.clearCookie('jwt');
          const jwt = generateAccessToken(data.dataValues);
          sendAccessToken(res, jwt);
          return res.status(200).send({
            token: jwt,
            data: data.dataValues,
            message: 'user info successfully modified'
          });
        }
      }
    } catch (err) {
      res.status(500).send({ message: 'server error' });
    }
  }
};
