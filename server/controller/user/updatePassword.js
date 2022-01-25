// const crypto = require('crypto');
const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    // Cookie Header 존재 여부, 유효한 JWT 토큰 탐색
    // 토큰의 ID가 가입이 된 ID인지(Users 모델에서 일치하는 ID가 있는지) 검색
    const userInfo = isAuthorized(req);
    console.log(userInfo);
    if (!userInfo) {
      return res.status(400).send({ message: 'bad request' });
    } else {
      const { userId } = userInfo;
      const user = await Users.findOne({
        where: { userId }
      });

      if (!user) { return res.status(401).send({ message: 'not authorized' }); } else {
        // 인증 후 Users 모델에서 해당 userId 관련 정보 수정
        const [password] = [req.body.password];
        const updateInfo = {
          password: password
        };
        await Users.update(updateInfo, {
          where: { userId }
        });
        return res.status(200).send({
          message: 'password successfully changed'
        });
      }
    }
  }
};

// ! 비밀번호 -> hashing // user/login, user/signup 참고