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

// ! userId가 user 테이블에 있는지 검색
// ! 테스트용 더미데이터(ID: aaa, email: abc, name: ccc, password: 123)
// INSERT INTO Users (id, userId, email, name, password, createdAt, updatedAt) VALUES (0, 'aaa', 'abc', 'ccc', '123', '2022-01-20 12:03:00', '2022-01-20 12:03:00');

/*
* API 수정 요청: /user/check
! <Req>
? Body
type -> Required element

! <Res>
? 200: OK
{
    "message": "already exists"
}

? 201: Created
{
  "message": "valid userId / email"
}
*/
