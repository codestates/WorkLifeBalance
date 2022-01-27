import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DropModal from '../components/DropModal';
import PasswordModal from '../components/PasswordModal';
import { Navigate } from 'react-router-dom';
import url from './../urlSetup';
import color from '../colorSetup';

const Container = styled.div`
  /* background: wheat; */
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  /* height: 130%; */
  min-height: 70vh;
`;

const Contents = styled.div`
  display: flex;
  flex: 2 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  width: 80%;
`;

const Edit = styled.div`
  flex: 2 0 auto;
  margin-bottom: 8rem;
  display: flex;
  justify-content: right;
  align-items: center;
  width: 80%;
  /* height: 100%; */
`;

const DropWrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  color: red;
  justify-content: right;
  width: 100%;
  height: 2rem;
`;

const Box = styled.div`
  /* background: wheat; */
  text-align: center;
  display: flex;
  justify-content: left;
  align-items: center;
  /* border: 0.1rem solid blue; */
  margin: 24px 0 6px 0;

  flex: 1 0 auto;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  height: 3rem;
  width: 6rem;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  background: white;
  height: 3rem;
  width: 34rem;
  border-radius: 8px;
  box-shadow: 0 0 2px 2px ${color.black02} inset;
`;

const Input = styled.input`
  /* border-radius: 1rem; */
  font-size: 1.3rem;
  padding: 0 1rem 0 1rem;
  margin: 0.5rem;
  height: 2rem;
  width: 20rem;
  text-align: center;
  border: none;
  border-bottom: 1px solid ${color.black01};
  :focus {
    background-color: ${color.black08};
    outline: none;
  }
`;

const GrayDiv = styled.div`
  background: gray;
  width: 10rem;
  height: 1.5rem;
`;

const Button = styled.button`
  margin: 0.5rem;
  background-color: white;
  border: none;
  font-size: 1rem;
  width: 120px;
  height: 30px;
  box-shadow: 0 0 2px 2px ${color.black02} inset;
  :hover {
    color: ${color.black04};
    box-shadow: 0 0 2px 2px ${color.black04} inset;
    cursor: pointer;
  }
`;

const DropButton = styled.button`
  color: red;
  margin: 0.5rem;
  background-color: white;
  border: none;
  font-size: 0.9rem;
  width: 100px;
  height: 25px;
  box-shadow: 0 0 2px 2px ${color.black02} inset;
  :hover {
    color: ${color.red01};
    box-shadow: 0 0 2px 2px ${color.black04} inset;
    cursor: pointer;
  }
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
      const res = await axios.get(`${url}/user/info`, {
        withCredentials: true
      });
      setUserInfo({ ...res.data.user });
      setIsLogin(true);
    } catch {
      setIsLogin(false);
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
                <Input
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
                <Input onChange={(e) => setName(e.target.value)} value={name} />
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
                <Input
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
