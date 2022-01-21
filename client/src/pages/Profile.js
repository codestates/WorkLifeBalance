import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropModal from '../components/DropModal';

const Container = styled.div`
  background: wheat;
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  height:100%;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const Box = styled.div`
  background: wheat;
  text-align: center;
  display: flex;
  justify-content: left;
  align-items: center;
  border: 0.1rem solid blue;
  margin-top: 1rem;
  flex: 1;
  width: 40rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(166, 167, 243);
  font-weight: bold;
  height: 3rem;
  width: 6rem;
  border: solid 0.1rem black;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  height: 3rem;
  width: 34rem;
  border: solid 0.1rem black;
`;

const Input = styled.input`
  background: wheat;
  margin: 0.5rem;
  height: 2rem;
  border: none;
  :focus {
    background: wheat;
    outline: none;
  }
`;

const GrayDiv = styled.div`
  background: gray;
  width: 10rem;
  height: 1.5rem;
`;

const Edit = styled.div`
  margin-bottom: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const DropWrapper = styled.div`
  display: flex;
  color: red;
  justify-content: right;
  width: 100%;
  height: 2rem;
`;

const DropButton = styled.button`
  color: red;
`;

const Desc = styled.div`
  font-size: 0.5rem;
  text-align: left;
  color: ${(props) => (props.valid ? 'green' : 'red')};
`;

function Profile ({ userInfo, setUserInfo, isLogin, setIsLogin }) {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [email, setEmail] = useState(userInfo.email);
  const [editMode, setEditMode] = useState(false);
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();

  const validPw = (item) => {
    const regExp = /^.{4,20}$/;
    return regExp.test(item);
  };

  const validEmail = (item) => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regExp.test(item);
  };

  const sendEditInfo = async () => {
    try {
      // if (password===repeat && validPw(password) && validEmail(email)) {
      //   const result = await axios.post('http://localhost:4000/user/update', {
      //     password,
      //     email
      //   }, {
      //     withCredentials: true
      //   })
      // }
      setUserInfo({
        ...userInfo,
        email
      });
      setEditMode(false);
    } catch {
      setEditMode(false);
    }
  };

  return (
    <Container>
      <Contents>
        <Box>
          <Title><div>아이디</div></Title>
          <Info><div>{userInfo.userId}</div></Info>
        </Box>
        <Box>
          <Title>비밀번호</Title>
          <Info>
            {!editMode
              ? <GrayDiv />
              : <div>
                <Input onChange={(e) => setPassword(e.target.value)} type='password' value={password} />
                </div>}
          </Info>
        </Box>
        {!editMode
          ? <></>
          : validPw(password)
            ? <Desc valid>사용할 수 있는 비밀번호입니다.</Desc>
            : <Desc valid={false}>4~20자 여야 합니다.</Desc>}
        {!editMode
          ? <></>
          : <>
            <Box>
              <Title>비밀번호 확인</Title>
              <Info>
                <div>
                  <Input onChange={(e) => setRepeat(e.target.value)} type='password' value={repeat} />
                </div>
              </Info>
            </Box>
            {password === repeat
              ? <Desc valid>checked!</Desc>
              : <Desc valid={false}>비밀번호가 일치하지 않습니다.</Desc>}
          </>}
        <Box>
          <Title><div>이름</div></Title>
          <Info><div>{userInfo.name}</div></Info>
        </Box>
        <Box>
          <Title><div>이메일</div></Title>
          <Info>
            {!editMode
              ? <div>{userInfo.email}</div>
              : <input onChange={(e) => setEmail(e.target.value)} value={email} />}
          </Info>
        </Box>
        {!editMode
          ? <></>
          : validEmail(email)
            ? <Desc valid>사용할 수 있는 이메일.</Desc>
            : <Desc valid={false}>올바른 이메일을 입력해야 합니다.</Desc>}
      </Contents>
      <Edit>
        {!editMode
          ? <button onClick={() => setEditMode(true)}>정보 수정</button>
          : <button onClick={sendEditInfo}>정보 수정 완료</button>}
      </Edit>
      <DropWrapper>
        <DropButton onClick={() => setDrop(true)}>
          계정 삭제
        </DropButton>
      </DropWrapper>
      {drop
        ? <DropModal show={drop} setShow={setDrop} setIsLogin={setIsLogin} />
        : <></>}
    </Container>
  );
}

export default Profile;
