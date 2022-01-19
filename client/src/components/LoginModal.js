import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    height: 15rem;
    text-align: center;
    margin: 120px auto;
`;

const Input = styled.input`
    margin: 5px;
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
    width: 500px;
    height: 300px;

`;

function LoginModal ({ setShowLogin, isLogin, setIsLogin }) {
  const navigate = useNavigate();
  const handleCanvasClick = () => {
    setShowLogin(false);
  };
  const handleGotoSignup = () => {
    setShowLogin(false);
    navigate('./signup');
  };
  const handleLogin = () => {
    // axios 요청
    setShowLogin(false);
    setIsLogin(true);
    navigate('./');
  };
  return (
    <Container>
      <Canvas onClick={handleCanvasClick}>
        <View onClick={e => e.stopPropagation()}>
          <br /><br /><br />
          <div>아이디<Input /></div>
          <br />
          <div>비밀번호<Input /></div>
          <br />
          <div onClick={handleGotoSignup}>아직 아이디가 없으신가요?</div>
          <Button onClick={handleLogin}>로그인</Button>

        </View>
      </Canvas>
    </Container>
  );
}

export default LoginModal;
