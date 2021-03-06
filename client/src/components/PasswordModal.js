import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import url from '../urlSetup';
import color from '../colorSetup';

const Container = styled.div`
  position: fixed;
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

const Button = styled.button`
  margin: 0.5rem;
  background-color: white;
  border: none;
  font-size: 1rem;
  width: 100px;
  height: 30px;
  box-shadow: 0 0 2px 2px ${color.black02} inset;
  :hover {
    color: ${color.black04};
    box-shadow: 0 0 2px 2px ${color.black04} inset;
    cursor: pointer;
  }
`;

const Canvas = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  /* background-color: white; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const View = styled.div.attrs((props) => ({
  role: 'dialog'
}))`
  position: fixed;
  top: 25%;
  padding: 50px 60px 50px 60px;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 460px;
  height: 300px;
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
  margin-right: 10px;
  white-space: nowrap;
  /* background: rgb(166, 167, 243); */
  font-weight: bold;
  height: 3rem;
  width: 7rem;
  /* border: solid 0.1rem black; */
`;

const Wrap = styled.div`
  padding: 0 0 0.5rem 0;
`;

const Input = styled.input`
  /* border-radius: 1rem; */
  flex: 2 0 auto;
  font-size: 1.3rem;
  padding: 0 1rem 0 0;
  margin: 0.5rem;
  margin-bottom: 0;
  height: 2rem;
  width: 20rem;
  border: none;
  border-bottom: 1px solid black;
  :focus {
    outline: none;
    background-color: ${color.black08};
  }
`;

const Desc = styled.div`
  background-color: white;
  text-align: right;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  width: 20rem;
  height: 1rem;
  color: ${(props) => (props.valid ? 'green' : 'red')};
`;

const Div = styled.div`
  display: flex;
  align-items: right;
  justify-content: right;
  width: 28rem;
`;

function PasswordModal ({ show, setShow }) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewpassword] = useState('');
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
      const res = await axios.post(
        `${url}/user/update/password`,
        { password, newPassword },
        {
          withCredentials: true
        }
      );
      if (res.status === 200) handleClick();
    } catch {
      handleClick();
    }
  };
  return (
    <Container>
      <Canvas>
        <View onClick={(e) => e.stopPropagation()}>
          <Box>
            <Title>
              <div>?????? ????????????</div>
            </Title>
            <Wrap>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                value={password}
              />
            </Wrap>
          </Box>
          <div>
            <Desc />
          </div>
          <Box>
            <Title>
              <div>??? ????????????</div>
            </Title>
            <Wrap>
              <Input
                onChange={(e) => setNewpassword(e.target.value)}
                onBlur={() => setPwfocus(true)}
                type='password'
                value={newPassword}
              />
            </Wrap>
          </Box>
          <div>
            {!pwfocus
              ? (
                <Desc valid />
                )
              : validPw(newPassword)
                ? (
                  <Desc valid>????????? ??? ?????? ?????????????????????.</Desc>
                  )
                : (
                  <Desc valid={false}>4~20??? ?????? ?????????.</Desc>
                  )}
          </div>
          <Box>
            <Title>
              <div>???????????? ??????</div>
            </Title>
            <Wrap>
              <Input
                onChange={(e) => setRepeat(e.target.value)}
                onBlur={() => setRpfocus(true)}
                type='password'
                value={repeat}
              />
            </Wrap>
          </Box>
          <div>
            {!rpfocus
              ? (
                <Desc valid />
                )
              : newPassword === repeat
                ? (
                  <Desc valid>??????????????? ???????????????.</Desc>
                  )
                : (
                  <Desc valid={false}>??????????????? ???????????? ????????????.</Desc>
                  )}
          </div>
          <Div>
            <Button onClick={update}> ?????? </Button>
            <Button onClick={handleClick}> ?????? </Button>
          </Div>
        </View>
      </Canvas>
    </Container>
  );
}

export default PasswordModal;
