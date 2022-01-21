const { Users } = require('../../models')
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions')


module.exports = {
  post: (req, res) => {
    const { userId, password } = req.body
    
    Users.findOne({
      where:{
        userId,
        password
      }
    })
    .then((data) => {
      if(!data){
        return res.status(401).send({ message: "Invalid user or password" })
      }
      delete data.dataValues.password
      const jwt = generateAccessToken(data.dataValues)
      sendAccessToken(res,jwt)
      return res.status(200).send(data.dataValues)
    })
  }
}