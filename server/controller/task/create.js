const { Task } = require('../../models');
const { Users } = require('../../models');
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
        // 인증 후 Task 모델에 해당 userId로 새 task 생성
        const [tag, task, deadline] = [req.body.tag, req.body.task, req.body.deadline];
        const today = new Date();
        const newTask = {
          userId: userId,
          tag: tag,
          task: task,
          deadline: deadline || new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
          check: false
        };
        const created = await Task.create(newTask);
        return res.status(201).send({
          data: created,
          message: 'successfully created'
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
// ? POSTMAN에서 cookie 헤더 생성 후 토큰 입력(jwt=~~~)

// ! userId가 user 테이블에 있는지 검색
// ! 테스트용 더미데이터(ID: aaa, email: abc, name: ccc, password: 123)
// INSERT INTO Users (id, userId, email, name, password, createdAt, updatedAt) VALUES (0, 'aaa', 'abc', 'ccc', '123', '2022-01-20 12:03:00', '2022-01-20 12:03:00');

/*
* API 수정 요청: /task/create
! <Req>
? Body
todo -> task

! <Res>
? 201: Created
{
    "data": {
        "id": ,
        "userId": ,
        "tag": ,
        "task": ,
        "deadline": ,
        "check": ,
        "updatedAt": ,
        "createdAt":
    },
    "message": "successfully created"
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
