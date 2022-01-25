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
        attributes: ['id', 'userId', 'email', 'name', 'createdAt', 'updatedAt'],
        where: { userId }
      });

      if (!user) { return res.status(401).send({ message: 'not authorized' }); } else {
        // 인증 후 Tasks 모델에 해당 userId로 task 수정
        const [id, tag, task, time] = [req.body.id, req.body.tag, req.body.task, req.body.time];
        const today = new Date();
        const year = today.getFullYear();
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const day = ('0' + today.getDate()).slice(-2);
        const hour = ('0' + today.getHours()).slice(-2);
        const minute = ('0' + today.getMinutes()).slice(-2);
        const date = `${year}-${month}-${day} ${hour}:${minute}`;
        const updateTask = {
          tag: tag,
          task: task,
          time: time || date
        };
        await Tasks.update(updateTask, {
          where: { id, userId }
        });
        return res.status(200).send({
          data: await Tasks.findOne({ where: { id: id } }),
          message: 'ok'
        });
      }
    }
  }
};

// where: { time: time < new Date() }
