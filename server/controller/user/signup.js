const crypto = require('crypto');
const { Users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');
const nodemailer = require('nodemailer')

module.exports = {
  post: async (req, res) => {
    const { userId, name, password, email } = req.body;
    if (!(email && userId && password && email)) {
      return res.status(400).send({ message: 'bad request' });
    }
    const hashPassword = crypto.createHash('sha512').update(password).digest('hex');
    const [userInfo, created] = await Users.findOrCreate({
      where: { email },
      defaults: { email, userId, password: hashPassword, name },
      raw: true
    });
    if (!created) {
      return res.status(409).send({ message: 'email exists' });
    }
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth: {
        user:process.env.NODEMAILER_USER,
        pass:process.env.NODEMAILER_PASSWORD
      }
    })
    let mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: 'tkddls1611@naver.com',
      subject: 'WLB Singup confirm',
      text:'WLB Signup confirm',
      html:`<b>WLB Signup confirm</b>`
    }
    await transporter.sendMail(mailOptions, function (error, info){
      if(error){
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
    console.log('여기냐?12312312123123123123123123')
    // let info = await transporter.sendMail({
    //   from:`"WLB Team" <${process.env.NODEMALIER_USER}>`,
    //   to: 'tkddls1611@naver.com',
    //   subject: 'WLB Signup Message',
    //   text: 'genereatedAuthNumber',
    //   html: `<b>${genereatedAuthNumber}</b>`,
    // });
    const jwt = generateAccessToken(userInfo.dataValues);
    delete userInfo.dataValues.password;
    sendAccessToken(res, jwt);
    return res.status(201).send(userInfo.dataValues);
  }
};
