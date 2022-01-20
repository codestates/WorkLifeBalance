import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: wheat;
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  background: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background: wheat;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 1rem;
  border: 0.1rem solid blue;
  flex: 1;
  width: 20rem;
`;

const Title = styled.div`
  font-weight: bold;
  text-align: left;
  margin-bottom: 0.5rem;
`;

const InputBox = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
`;

const Desc = styled.div`
  font-size: 0.5rem;
  text-align: left;
  color: ${(props) => (props.valid ? 'green' : 'red')};
`;

const Button = styled.button`
  background: gray;
`;

const Submit = styled.button`
  background: black;
  text-align: center;
  color: white;
  width: 20rem;
`;

function Signup () {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState();
  const [repeat, setRepeat] = useState('');
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [checkId, setCheckId] = useState();
  const [checkMail, setCheckMail] = useState();

  const validId = (item) => {
    const regExp = /^[a-z0-9]{5,15}$/;
    return regExp.test(item);
  };

  const validPw = (item) => {
    // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@S!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    const regExp = /^.{4,20}$/;
    return regExp.test(item);
  };

  const validEmail = (item) => {
    const regExp =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(item);
  };

  const checkServer = async (data, type) => {
    if (validId(data)) {
      const res = await axios.post(`${process.env.url}/check`, { data, type });
      switch (type) {
        case 'userId':
          setCheckId(true);
          break;
        case 'email':
          setCheckMail(true);
          break;
      }
    } else {
    }
  };

  return (
    <Container>
      <Contents>
        <Box>
          <Title>아이디</Title>
          <InputBox>
            <Input
              onChange={(e) => setUserId(e.target.value)}
              value={userId}
            />
            <Button onClick={() => checkServer(userId, 'userId')}>
              중복확인
            </Button>
          </InputBox>
          {validId(userId)
            ? (
              <Desc valid>사용할 수 있는 아이디입니다.</Desc>
              )
            : (
              <Desc valid={false}>
                5~15자 영문 대 소문자, 숫자만 사용 가능합니다.
              </Desc>
              )}
        </Box>
        <Box>
          <Title>비밀번호</Title>
          <InputBox>
            <Input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </InputBox>
          {validPw(password)
            ? (
              <Desc valid>사용할 수 있는 비밀번호입니다.</Desc>
              )
            : (
              <Desc valid={false}>4~20자 여야 합니다.</Desc>
              )}
        </Box>
        <Box>
          <Title>비밀번호 확인</Title>
          <InputBox>
            <Input
              type='password'
              onChange={(e) => setRepeat(e.target.value)}
              value={repeat}
            />
          </InputBox>
          {password
            ? (
                password === repeat
                  ? (
                    <Desc valid>checked!</Desc>
                    )
                  : (
                    <Desc valid={false}>비밀번호가 일치하지 않습니다.</Desc>
                    )
              )
            : (
              <></>
              )}
        </Box>
        <Box>
          <Title>이름</Title>
          <InputBox>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </InputBox>
        </Box>
        <Box>
          <Title>이메일</Title>
          <InputBox>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Button onClick={() => checkServer(email, 'email')}>
              중복확인
            </Button>
          </InputBox>
          {validEmail(email)
            ? (
              <Desc valid>사용할 수 있는 email입니다.</Desc>
              )
            : (
              <Desc valid={false}>올바른 email을 입력하세요.</Desc>
              )}
        </Box>
      </Contents>
      <Submit onClick={() => 'send'}>가입하기</Submit>
    </Container>
  );
}

export default Signup;
