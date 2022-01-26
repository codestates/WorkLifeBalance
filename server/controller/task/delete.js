const { Tasks } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    try{
    const { id } = req.body;
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      return res.status(404).send({ message: 'bad request' });
    }
    const { userId } = userInfo;
    const user = await Tasks.findOne({
      where: { userId }
    });
    if (!user) {
      return res.status(401).send({ message: 'not authorized' });
    } else {
      // await Tasks.findOne({ where: { id } });
      await Tasks.destroy({ where: { id } });
      return res.status(200).send({ message: 'ok' });
    }
  }catch(err){
    console.log(err)
    return res.status(500).send({ message:"server error" })
  }
  }
};
