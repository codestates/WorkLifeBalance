import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DropModal from '../components/DropModal';
import PasswordModal from '../components/PasswordModal';
import { Navigate } from 'react-router-dom';
import url from './../urlSetup';

const Container = styled.div`
  /* background: wheat; */
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  height: 100%;
  min-height: 70vh;
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
  justify-content: right;
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

const Button = styled.button`
  margin: 0.5rem;
`;

const DropButton = styled.button`
  color: red;
`;

const Desc = styled.div`
  font-size: 0.5rem;
  text-align: left;
  color: ${(props) => (props.valid ? 'green' : 'red')};
`;

function Profile ({ userInfo, setUserInfo, setIsLogin }) {
  const [userId, setUserId] = useState(userInfo.userId);
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [checkId, setCheckId] = useState(true);
  const [checkEm, setCheckEm] = useState(true);
  const [show, setShow] = useState({
    id: false,
    em: false
  });
  const [editMode, setEditMode] = useState(false);
  const [editPw, setEditPw] = useState(false);
  const [drop, setDrop] = useState(false);

  const validId = (item) => {
    const regExp = /^[a-zA-Z0-9]{5,15}$/;
    return regExp.test(item);
  };

  const validEmail = (item) => {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regExp.test(item);
  };

  const checkFromServer = async (type, data) => {
    try {
      const res = await axios.post(`${url}/user/check`, {
        type,
        value: data
      });
      if (res.status === 200) {
        setCheckId(true);
      }
    } catch {
      setCheckId(false);
    }
  };

  const idfunc = (type, data) => {
    if (userInfo.userId !== userId) {
      checkFromServer(type, data);
      setShow({ ...show, id: true });
    } else {
      setCheckId(true);
      setShow({ ...show, id: false });
    }
  };

  const emfunc = (type, data) => {
    if (userInfo.email !== email) {
      checkFromServer(type, data);
      setShow({ ...show, em: true });
    } else {
      setCheckEm(true);
      setShow({ ...show, em: false });
    }
  };

  const sendEditInfo = async () => {
    try {
      if (validId(userId) && validEmail(email)) {
        const result = await axios.post(
          `${url}/user/update/info`,
          {
            userId,
            name,
            email
          },
          {
            withCredentials: true
          }
        );
      }
      setUserInfo({
        ...userInfo,
        userId,
        name,
        email
      });
      setEditMode(false);
    } catch {
      setEditMode(false);
    }
  };

  useEffect(async () => {
    try {
      console.log('hello');
      const res = await axios.get(`${url}/user/info`, {
        withCredentials: true
      });
      console.log(res.data.user);
      setUserInfo({ ...res.data.user });
    } catch {
      setIsLogin(false);
      console.log('err');
    }
  }, []);

  return (
    <Container>
      <Contents>
        <Box>
          <Title>
            <div>아이디</div>
          </Title>
          <Info>
            {!editMode
              ? (
                <div>{userInfo.userId}</div>
                )
              : (
                <input
                  onChange={(e) => setUserId(e.target.value)}
                  onBlur={() => idfunc('userId', userId)}
                  value={userId}
                />
                )}
          </Info>
        </Box>
        {!editMode
          ? (
            <></>
            )
          : !show.id
              ? (
                <></>
                )
              : validId(userId) && checkId
                ? (
                  <Desc valid>사용할 수 있는 아이디입니다.</Desc>
                  )
                : !checkId
                    ? (
                      <Desc valid={false}>이미 사용중인 아이디입니다.</Desc>
                      )
                    : (
                      <Desc valid={false}>
                        5~15자 영문 대 소문자, 숫자만 사용 가능합니다.
                      </Desc>
                      )}
        <Box>
          <Title>
            <div>이름</div>
          </Title>
          <Info>
            {!editMode
              ? (
                <div>{userInfo.name}</div>
                )
              : (
                <input onChange={(e) => setName(e.target.value)} value={name} />
                )}
          </Info>
        </Box>
        <Box>
          <Title>
            <div>이메일</div>
          </Title>
          <Info>
            {!editMode
              ? (
                <div>{userInfo.email}</div>
                )
              : (
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => emfunc('email', email)}
                  value={email}
                />
                )}
          </Info>
        </Box>
        {!editMode
          ? (
            <></>
            )
          : !show.em
              ? (
                <></>
                )
              : validEmail(email) && checkEm
                ? (
                  <Desc valid>사용할 수 있는 이메일.</Desc>
                  )
                : !checkEm
                    ? (
                      <Desc valid={false}>사용중인 이메일을 입니다.</Desc>
                      )
                    : (
                      <Desc valid={false}>올바른 이메일을 입력해야 합니다.</Desc>
                      )}
      </Contents>
      <Edit>
        {!editMode
          ? (
            <Button onClick={() => setEditMode(true)}>정보 수정</Button>
            )
          : (
            <Button onClick={sendEditInfo}>정보 수정 완료</Button>
            )}
        <Button onClick={() => setEditPw(true)}>비밀번호 변경</Button>
      </Edit>
      <DropWrapper>
        <DropButton onClick={() => setDrop(true)}>계정 삭제</DropButton>
      </DropWrapper>
      {drop
        ? (
          <DropModal show={drop} setShow={setDrop} setIsLogin={setIsLogin} />
          )
        : (
          <></>
          )}
      {editPw ? <PasswordModal show={editPw} setShow={setEditPw} /> : <></>}
    </Container>
  );
}

export default Profile;
