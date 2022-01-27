import axios from 'axios';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import color from '../colorSetup';
import ErrModal from '../components/ErrModal';
import url from '../urlSetup';

const Container = styled.div`
  /* background: wheat; */
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const Contents = styled.div`
  /* background: gray; */
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Box = styled.div`
  /* background: wheat; */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 1rem;
  /* border: 0.1rem solid blue; */
  flex: 1;
  width: 50%;
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
  font-size: 1.2rem;
  height: 2rem;
  flex: 1;
  border: none;
  border-bottom: 1px solid black;
  :focus {
    outline: none;
    background: ${color.black08};
  }
`;

const Desc = styled.div`
  font-size: 0.8rem;
  text-align: left;
  color: ${(props) => (props.valid ? 'green' : 'red')};
`;

const ValidCheckButton = styled.button`
  margin-left: 3px;
  background: white;
  color: ${(props) => (props.check ? 'green' : color.black01)};
  border: none;
  box-shadow: 0 0 2px 2px ${color.black02} inset;

  :hover {
    color: ${(props) => (props.check ? color.green02 : color.black04)};
    box-shadow: 0 0 2px 2px ${color.black05} inset;
    cursor: pointer;
  }

  :focus {
    box-shadow: 0 0 2px 2px red inset;
  }
`;

const SubmitButton = styled.button`
  background-color: white;
  text-align: center;
  font-size: 1.2rem;
  height: 2rem;
  width: 22rem;
  margin: 1rem;
  border: none;
  box-shadow: 0 0 2px 2px ${color.black02} inset;
  :hover {
    color: ${color.black04};
    box-shadow: 0 0 2px 2px ${color.black05} inset;
    cursor: pointer;
  }
  :active {
    color: ${color.blue01};
    box-shadow: 0 0 2px 2px ${color.black03} inset;
  }
`;

function Signup () {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [name, setName] = useState('');
  // const [userInfo, setUserInfo] = useState({ userId: '', password: '', repeat: '', name: '', email: '' });
  const [email, setEmail] = useState('');
  const [checkId, setCheckId] = useState(false);
  const [checkEm, setCheckEm] = useState(false);
  const [showId, setShowId] = useState(false);
  const [showEm, setShowEm] = useState(false);
  const userIdRef = useRef(null);
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const repeatRef = useRef(null);
  const checkIdRef = useRef(null);
  const checkEmRef = useRef(null);
  const navigate = useNavigate();

  const validId = (item) => {
    const regExp = /^[a-z0-9]{5,15}$/;
    return regExp.test(item);
  };

  const validPw = (item) => {
    const regExp = /^.{4,20}$/;
    return regExp.test(item);
  };

  const validEmail = (item) => {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regExp.test(item);
  };

  const checkFromServer = async (data, type) => {
    switch (type) {
      case 'userId':
        if (validId(data)) {
          try {
            const res = await axios.post(`${url}/user/check`, {
              type,
              value: data
            });
            if (res.data.message === 'valid userId') {
              setCheckId(true);
            }
            setShowId(true);
          } catch {
            setCheckId(false);
            setShowId(true);
          }
        }
        break;
      case 'email':
        if (validEmail(data)) {
          try {
            const res = await axios.post(`${url}/user/check`, {
              type,
              value: data
            });
            if (res.data.message === 'valid email') {
              setCheckEm(true);
            }
            setShowEm(true);
          } catch {
            setCheckEm(false);
            setShowEm(true);
          }
        }
        break;
    }
  };

  const sendToServer = async () => {
    if (!userId) {
      userIdRef.current.focus();
    } else if (!password) {
      passwordRef.current.focus();
    } else if (!repeat) {
      repeatRef.current.focus();
    } else if (password !== repeat) {
      repeatRef.current.focus();
    } else if (!name) {
      nameRef.current.focus();
    } else if (!email) {
      emailRef.current.focus();
    } else if (!checkId) {
      checkIdRef.current.focus();
    } else if (!checkEm) {
      checkEmRef.current.focus();
    } else {
      try {
        const res = await axios.post(`${url}/user/signup`, {
          userId,
          password,
          name,
          email
        });
        if (res.data) {
          navigate('/');
        }
      } catch {
        console.log('err');
      }
    }
  };

  const idChange = (e) => {
    setUserId(e.target.value);
    setCheckId(false);
  };

  return (
    <Container>
      <Contents>
        {showId
          ? (
              checkId
                ? (
                  <ErrModal
                    message='사용 가능한 아이디입니다.'
                    show={showId}
                    setShow={setShowId}
                  />
                  )
                : (
                  <ErrModal
                    message='이미 사용중인 아이디입니다.'
                    show={showId}
                    setShow={setShowId}
                  />
                  )
            )
          : (
            <></>
            )}
        {showEm
          ? (
              checkEm
                ? (
                  <ErrModal
                    message='사용 가능한 이메일입니다.'
                    show={showEm}
                    setShow={setShowEm}
                  />
                  )
                : (
                  <ErrModal
                    message='이미 사용중인 이메일입니다.'
                    show={showEm}
                    setShow={setShowEm}
                  />
                  )
            )
          : (
            <></>
            )}
        <Box>
          <Title>아이디</Title>
          <InputBox>
            <Input
              onChange={(e) => idChange(e)}
              value={userId}
              ref={userIdRef}
            />
            <ValidCheckButton
              check={checkId}
              onClick={() => checkFromServer(userId, 'userId')}
              ref={checkIdRef}
            >
              중복확인
            </ValidCheckButton>
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
              ref={passwordRef}
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
              ref={repeatRef}
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
              ref={nameRef}
            />
          </InputBox>
        </Box>
        <Box>
          <Title>이메일</Title>
          <InputBox>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              ref={emailRef}
            />
            <ValidCheckButton
              check={checkEm}
              onClick={() => checkFromServer(email, 'email')}
              ref={checkEmRef}
            >
              중복확인
            </ValidCheckButton>
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
      <SubmitButton onClick={sendToServer}>가입하기</SubmitButton>
    </Container>
  );
}
export default Signup;
