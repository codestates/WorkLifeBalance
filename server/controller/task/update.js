const { Task } = require('../../models');
const { Users } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  post: async (req, res) => {
    // Cookie Header 존재 여부, 유효한 JWT 토큰 탐색
    const cookie = req.headers.cookie;
    if (!cookie || !cookie.includes('jwt')) {
      return res.status(401).send({ message: 'not authorized' });
    } else {
      const token = cookie.split(/[=;]/)[1];
      const tokenData = jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
        if (err) {
          return res.status(400).send({ message: 'bad request' });
        }
        return decoded.userId;
      });

      // 토큰의 ID가 가입이 된 ID인지(Users 모델에서 일치하는 ID가 있는지) 검색
      const user = await Users.findOne({ where: { userId: tokenData } });
      if (!user) { return res.status(401).send({ message: 'not authorized' }); }
      else {
        // 인증 후 Task 모델에 해당 userId로 task 수정
        const [id, tag, task, deadline] = [req.body.id, req.body.tag, req.body.task, req.body.deadline];
        const today = new Date();
        const updateTask = {
          tag: tag,
          task: task,
          deadline: deadline || new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)       
        }
        const updated = await Task.update(updateTask, {
          where: { id: id, userId: tokenData }
        });
        return res.status(200).send({
          data: await Task.findOne({ where: { id: id } }),
          message: 'ok'
        });
      }
    }
  }
};

// ! 테스트용 토큰 제작
//   const token1 = jwt.sign({
//     userId: 'aaa',
//     email: 'abc',
//     name: 'ccc'
//   }, process.env.ACCESS_SECRET);
//   console.log(token1);
//   jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYWEiLCJlbWFpbCI6ImFiYyIsIm5hbWUiOiJjY2MiLCJpYXQiOjE2NDI2NDg0ODJ9.1Oca0Qmox_wiWj0aASHe8PGGejy4JwwmMlJwt8c7SpM
// ? POSTMAN에서 cookie 헤더 생성 후 51번째 줄 토큰 입력(jwt=~~~)

// ! userId가 user 테이블에 있는지 검색
// ! 테스트용 더미데이터(ID: aaa, email: abc, name: ccc, password: 123)
// INSERT INTO Users (id, userId, email, name, password, createdAt, updatedAt) VALUES (0, 'aaa', 'abc', 'ccc', '123', '2022-01-20 12:03:00', '2022-01-20 12:03:00');

/*
* API 수정 요청: /task/update
! <Req>
? Body
추가: id int task id
>> tag, task, deadline이 같을 경우 여러 개가 동시에 수정되어버려서
>> id로 특정 1개만 수정되게끔 하는 장치가 필요할 것 같음.
todo -> task

! <Res>
? 200: OK
{
    "data": {
        "id": ,
        "userId": ,
        "tag": ,
        "task": ,
        "deadline": ,
        "check": ,
        "createdAt": ,
        "updatedAt": 
    },
    "message": "ok"
}

? 400: Bad Request
{
    "message": "bad request"
}

? 401: Not Authorized
{
    "message": "not authorized"
}
*/