const { Users } = require('../../models');

module.exports = {
  post: async (req, res) => {
    // Users model에 입력한 userId 또는 email 중복 여부 검색
    const [type, value] = [req.body.type, req.body.value];
    const user = await Users.findOne({
      attributes: ['userId', 'email'],
      where: { [type]: value }
    });
    if (!user) {
      return res.status(200).send({ message: `valid ${type}` });
    } else {
      return res.status(409).send({ message: 'already exists' });
    }
  }
};
