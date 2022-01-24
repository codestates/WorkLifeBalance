const { Feedbacks } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: async (req, res) => {
    // const { d } = req.query
    // console.log(d)
    // try {
    //   const userInfo = isAuthorized(req);
    // //   console.log(userInfo)
    //   if (!userInfo) {
    //     return res.status(400).send({ message: 'bad request' });
    //   } else {
    //     const { userId } = userInfo;
    //     const user = await Feedbacks.findOne({
    //       where: { userId }
    //     });
    //     if (!user) {
    //       return res.status(401).send({ message: 'not authorized' });
    //     } else {
    //       const value = await Feedbacks.findOne({
    //         where: {
    //           day: d
    //         }
    //       })
    //       console.log(value)
    //       if(!value){
    //         return res.status(400).send({message: 'bad request1'})
    //       }else{
    //         return res.status(200).send({ data:{value}, meesage:"ok" })
    //       }
    //     }
    //   }
    // } catch (err) {
    //   res.status(500).send({ message: 'server error' });
    // }
  }
};
