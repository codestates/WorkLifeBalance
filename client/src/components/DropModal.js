import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    background-color: rgba(0,0,0,0.4);
    display: grid;
    place-items: center;
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

function DropModal ({ show, setShow, setIsLogin }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const drop = async () => {
    try {
      if (input === 'delete') {
        const res = await axios.post('http://localhost:4000/user/delete', {}, {
          withCredentials: true
        });
        if (res.data) {
          handleClick();
          setIsLogin(false);
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
        <View onClick={e => e.stopPropagation()}>
          <div> 삭제하려면 'delete'를 입력하세요. </div>
          <input onChange={(e) => setInput(e.target.value)} value={input} />
          <Button onClick={drop}> 확인 </Button>
        </View>
      </Canvas>
    </Container>
  );
}

export default DropModal;
