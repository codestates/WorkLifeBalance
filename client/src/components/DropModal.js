import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import color from '../colorSetup';
import url from '../urlSetup';

const Container = styled.div`
  position: fixed;
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

const Input = styled.input`
  width: 100px;
  height: 30px;
  text-align: center;
  font-size: 1.2rem;
  border: none;
  border-bottom: 1px solid ${color.black01};
  :focus {
    outline: none;
    background-color: ${color.black08};
  }
`;

const Button = styled.button`
  margin: 5px;
  width: 80px;
  height: 30px;
  font-size: 1rem;
  border: none;
  background-color: white;
  box-shadow: 0 0 2px 2px ${color.black01} inset;
  :hover {
    color: ${color.black05};
    box-shadow: 0 0 2px 2px ${color.black05} inset;
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
  display: grid;
  place-items: center;
`;

const View = styled.div.attrs((props) => ({
  role: 'dialog'
}))`
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 200px;
`;

function DropModal ({ show, setShow, setIsLogin }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const drop = async () => {
    try {
      if (input === 'delete') {
        const res = await axios.post(
          `${url}/user/delete`,
          {},
          {
            withCredentials: true
          }
        );
        if (res.data) {
          handleClick();
          setIsLogin(false);
          localStorage.removeItem('isLogin');
          navigate('/');
        }
      }
    } catch {
      handleClick();
    }
  };

  return (
    <Container>
      <Canvas onClick={handleClick}>
        <View onClick={(e) => e.stopPropagation()}>
          <div className='notice'>
            ??????????????? <i>delete</i>??? ???????????????.
          </div>
          <Input
            maxLength='6'
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button onClick={drop}>??????</Button>
        </View>
      </Canvas>
    </Container>
  );
}

export default DropModal;
