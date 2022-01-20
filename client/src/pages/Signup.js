import axios from 'axios';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ErrModal from '../components/ErrModal';

const Container = styled.div`
  background: wheat;
  display: flex;
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
  height: 2rem;
  flex: 1;
`

const Desc = styled.div`
  font-size: 0.5rem;
  text-align: left;
  color: ${props => props.valid ? 'green' : 'red'};
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
  const navigate = useNavigate();

  const validId = (item) => {
    const regExp = /^[a-z0-9]{5,15}$/;
    return regExp.test(item);
  }

  const validPw = (item) => {
    // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@S!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    const regExp = /^.{4,20}$/;
    return regExp.test(item);
  }

  const validEmail = (item) => {
    const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(item);
  }
  
  const checkFromServer = async (data, type) => {
    switch (type) {
      case 'userId':
        if (validId(data)) {
          const res = await axios.post(`http://localhost:4000/user/check`, { type, value: data });
          console.log(res.data.message);
          if (res.data.message === 'valid userId') {
            setCheckId(true);
          } else {
            setCheckId(false);
          }
          setShowId(true);
        }
        break;
      case 'email':
        if (validEmail(data)) {
          const res = await axios.post(`http://localhost:4000/user/check`, { type, value: data });
          if (res.data.message === 'valid email') {
            setCheckEm(true);
          } else {
            setCheckEm(false);
          }
          setShowEm(true);
        }
        break; 
    }
  }

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
      userIdRef.current.focus();
    } else if (!checkEm) {
      emailRef.current.focus();
    } else {
      // const res = await axios.post(`http://localhost:4000/user/signup`, { userId, password, name, email });
      
      // navigate('/');
    }
  }

  return (
    <Container>
      <Contents>
        { showId ? checkId ? <ErrModal message={'사용 가능한 아이디입니다.'} show={showId} setShow={setShowId}/> : 
        <ErrModal message={'이미 사용중인 아이디입니다.'} show={showId} setShow={setShowId}/> : <></> }
        { showEm ? checkEm ? <ErrModal message={'사용 가능한 이메일입니다.'} show={showEm} setShow={setShowEm}/> :
        <ErrModal message={'이미 사용중인 이메일입니다.'} show={showEm} setShow={setShowEm}/> : <></>}
        <Box>
          <Title>아이디</Title>
          <InputBox>
            <Input onChange={(e) => setUserId(e.target.value)} value={userId} ref={userIdRef}></Input>
            <Button onClick={() => checkFromServer(userId, 'userId')}>중복확인</Button>
          </InputBox>
          { validId(userId) ? 
            <Desc valid={true}>사용할 수 있는 아이디입니다.</Desc> :
            <Desc valid={false}>5~15자 영문 대 소문자, 숫자만 사용 가능합니다.</Desc>
          }
        </Box>
        <Box>
          <Title>비밀번호</Title>
          <InputBox>
            <Input type='password'onChange={(e) => setPassword(e.target.value)} value={password} ref={passwordRef}></Input>
          </InputBox>
          { validPw(password) ? 
            <Desc valid={true}>사용할 수 있는 비밀번호입니다.</Desc> :
            <Desc valid={false}>4~20자 여야 합니다.</Desc>
          }
        </Box>
        <Box>
          <Title>비밀번호 확인</Title>
          <InputBox>
            <Input type='password'onChange={(e) => setRepeat(e.target.value)} value={repeat} ref={repeatRef}></Input>
          </InputBox>
          { password ? 
            password === repeat ? 
              <Desc valid={true}>checked!</Desc> :
              <Desc valid={false}>비밀번호가 일치하지 않습니다.</Desc>
            : <></>
          }
        </Box>
        <Box>
          <Title>이름</Title>
          <InputBox>
            <Input onChange={(e) => setName(e.target.value)} value={name} ref={nameRef}></Input>
          </InputBox>
          
        </Box>
        <Box>
          <Title>이메일</Title>
          <InputBox>
            <Input onChange={(e) => setEmail(e.target.value)} value={email} ref={emailRef}></Input>
            <Button onClick={() => checkFromServer(email, 'email')}>중복확인</Button>
          </InputBox>
          { validEmail(email) ? 
            <Desc valid={true}>사용할 수 있는 email입니다.</Desc> :
            <Desc valid={false}>올바른 email을 입력하세요.</Desc>
          }
        </Box>
      </Contents>
      <Submit onClick={sendToServer}>
        가입하기
      </Submit>
    </Container>
  )
}

export default Signup;