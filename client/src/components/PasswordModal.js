import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

const Container = styled.div`
    position: fixed;
    height: 15rem;
    text-align: center;
    margin: 120px auto;
`;

const Button = styled.button`
    margin: 5px;
`;

const Canvas = styled.div`
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    /* background-color: rgba(0,0,0,0.4); */
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const View = styled.div.attrs(props => ({
  role: 'dialog'
}))`
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 300px;
`;

const Box = styled.div`
  background: white;
  text-align: center;
  display: flex;
  justify-content: left;
  align-items: center;
  border: 0.1rem solid blue;
  margin-top: 1rem;
  flex: 1;
  width: 25rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  font-weight: bold;
  height: 3rem;
  width: 6rem;
  border: solid 0.1rem black;
`;

const Input = styled.input`
  background: wheat;
  margin: 0.5rem;
  height: 3rem;
  width: 20rem;
  border: none;
  :focus {
    outline: none;
  }
`;

const Desc = styled.div`
  background-color: white;
  text-align: right;
  font-size: 0.5rem;
  width: 20rem;
  height: 1rem;
  color: ${(props) => (props.valid ? 'green' : 'red')};
`;

function PasswordModal ({show, setShow }) {
  const [password, setPassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [pwfocus, setPwfocus] = useState(false);
  const [rpfocus, setRpfocus] = useState(false);

  const validPw = (item) => {
    const regExp = /^.{4,20}$/;
    return regExp.test(item);
  };

  const handleClick = () => {
    setShow(!show);
  };

  const update = async () => {
    try {
      // const res = axios.post('http://localhost:4000/user/update/password', { password, newpassword}, 
      // {
      //   withCredentials: true
      // })
      // if (res.status === 200)
        handleClick();
    } catch {
      handleClick();
    }
  }
  return (
    <Container>
      <Canvas onClick={handleClick}>
        <View onClick={e => e.stopPropagation()}>
          <Box>
            <Title><div>현재 비밀번호</div></Title>
            <Input onChange={(e) => setPassword(e.target.value)} value={password}></Input>
          </Box>
          <div>
            <Desc></Desc>
          </div>
          <Box>
            <Title><div>새 배밀번호</div></Title>
            <Input onChange={(e) => setNewpassword(e.target.value)} onBlur={() => setPwfocus(true)} value={newpassword} ></Input>
          </Box>
          <div>
          {!pwfocus
            ? <Desc valid={true}></Desc>
            : validPw(newpassword)
              ? <Desc valid={true}>사용할 수 있는 비밀번호입니다.</Desc>
              : <Desc valid={false}>4~20자 여야 합니다.</Desc>}
          </div>
          <Box>
            <Title><div>비밀번호 확인</div></Title>
            <Input onChange={(e) => setRepeat(e.target.value)} onBlur={() => setRpfocus(true)} value={repeat}></Input>
          </Box>
          <div>
          {!rpfocus
            ? <Desc valid={true}></Desc>
            : newpassword === repeat
              ? <Desc valid={true}>비밀번호가 일치합니다.</Desc>
              : <Desc valid={false}>비밀번호가 일치하지 않습니다.</Desc>}
          <Button onClick={update}> 확인 </Button>
          </div>
        </View>
      </Canvas>
    </Container>
  );
}

export default PasswordModal;
