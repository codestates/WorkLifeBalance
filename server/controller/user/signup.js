const crypto = require('crypto');
const nodemailer = require('nodemailer');
const repoAddress = 'https://github.com/codestates/WorkLifeBalance';
const { Users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    try {
      const { userId, name, password, email } = req.body;
      if (!(name && userId && password && email)) {
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
<<<<<<< HEAD
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
      to: email,
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
      delete userInfo.dataValues.password;
      const jwt = generateAccessToken(userInfo.dataValues);
      sendAccessToken(res, jwt);
=======
      delete userInfo.dataValues.password;
      const jwt = generateAccessToken(userInfo.dataValues);
      sendAccessToken(res, jwt);

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
      });

      let mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: 'Work Life Balance 가입을 환영합니다!',
        html: 
          `<div style='width: 30%;
            padding: 10px;
            margin: auto;
            background: lightyellow;
            border: 3px solid gray;
            border-radius: 20px;
            text-align: center;'>
            <h1>어서오세요, ${name}님!</h1>
            <p>
              <b>
                <strong style='color: #EE4A5D;'>Work</strong>
                <strong style='color: #A9A0FC;'>Life</strong>
                Balance
              </b> 
                가입을 환영합니다!
            </p>
            <a href=${repoAddress} target='_blank'>
              WLB에 대한 자세한 정보
            </a>
          </div>`
      };

      await transporter.sendMail(mailOptions, function (error, info){
        if(error){
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response)
        }
      })

>>>>>>> 7f4f2fbf8769fc0aba2acd4b0f471837002dfc39
      return res.status(201).send(userInfo.dataValues);
    } catch (err) {
      res.status(500).send({ message: 'server error' });
    }
  }
};
