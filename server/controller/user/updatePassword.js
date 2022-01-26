const crypto = require('crypto');
const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    try {
      const [password, newPassword] = [req.body.password, req.body.newPassword];
      const hashPassword = crypto.createHash('sha512').update(password).digest('hex');
      // Cookie Header 존재 여부, 유효한 JWT 토큰 탐색
      // 토큰의 ID가 가입이 된 ID인지(Users 모델에서 일치하는 ID가 있는지) 검색
      const userInfo = isAuthorized(req);
      if (!userInfo) {
        return res.status(400).send({ message: 'bad request' });
      } else {
        const { userId } = userInfo;
        const user = await Users.findOne({
          attributes: ['id', 'name', 'email', 'userId', 'createdAt', 'updatedAt'],
          where: { userId: userId, password: hashPassword }
        });

        if (!user) { return res.status(401).send({ message: 'not authorized' }); } else {
          // 인증 후 Users 모델에서 해당 userId 관련 정보 수정
          const hashNewPassword = crypto.createHash('sha512').update(newPassword).digest('hex');
          const updateInfo = {
            password: hashNewPassword
          };
          await Users.update(updateInfo, {
            where: { userId }
          });
          return res.status(200).send({
            message: 'password successfully changed'
          });
        }
      }
    } catch (err) {
      res.status(500).send({ message: 'server error' });
    }
  }
};
