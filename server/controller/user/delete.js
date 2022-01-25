const { Tasks, Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    // Cookie Header 존재 여부, 유효한 JWT 토큰 탐색
    // 토큰의 ID가 가입이 된 ID인지(Users 모델에서 일치하는 ID가 있는지) 검색
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      return res.status(400).send({ message: 'bad request' });
    } else {
      const { userId } = userInfo;
      const user = await Users.findOne({
        where: { userId }
      });

      if (!user) { return res.status(401).send({ message: 'not authorized' }); } else {
        // 인증 후 Users, Tasks 모델에서 해당 userId 관련 데이터 삭제
        await Tasks.destroy({ where: { userId } });
        await Users.destroy({ where: { userId } });
        return res.status(200).send({ message: 'successfully deleted' });
      }
    }
  }
};
