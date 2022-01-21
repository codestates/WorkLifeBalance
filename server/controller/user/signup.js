const { Users } = require('../../models')
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions')


module.exports = {
  post: async (req, res) => {
    const { userId, name, password, email } = req.body
    if(!(email && userId && password && email)){
      return res.status(400).send({ message:"bad request" })
    }
    const [userInfo, created] = await Users.findOrCreate({
      where: {email},
      defaults : { email, userId, password, name },
      raw : true
    })
    if(!created){
      return res.status(409).send({message : 'email exists'})
    }
    delete userInfo.dataValues.password
    const jwt = generateAccessToken(userInfo.dataValues)
    sendAccessToken(res, jwt)
    return res.status(201).send(userInfo.dataValues)
    
  }
}