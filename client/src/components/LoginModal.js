import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
  box-sizing: border-box;
  position: fixed;
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

const Input = styled.input`
  margin: 5px;
  height: 32px;
  width: 280px;
  font-size: 1.4rem;
  border: none;
  border-bottom: 1px solid black;
  :focus {
    outline: none;
    background-color: #eee;
  }
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
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const View = styled.div.attrs((props) => ({
  role: 'dialog'
}))`
  border-radius: 5px;
  background-color: #fff;
  width: 500px;
  height: 300px;
  text-align: right;
  font-size: 1.2rem;
  padding: 100px;

  .alert-box {
    font-size: 1rem;
    height: 25px;
    color: red;
    /* text-align: right; */
  }
  div {
    width: auto;
  }
  .yet:hover {
    color: blue;
    cursor: pointer;
  }
`;

function LoginModal ({ setShowLogin, isLogin, setIsLogin }) {
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: ''
  });
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleCanvasClick = () => {
    setShowLogin(false);
  };
  const handleGotoSignup = () => {
    setShowLogin(false);
    navigate('./signup');
  };
  const handleLogin = () => {
    const { userId, password } = loginInfo;
    if (userId && password) {
      //! 테스트가 끝나면 다음 코드를 삭제해주세요
      if (userId === 'test' && password === 'test') {
        setShowLogin(false);
        setIsLogin(true);
        navigate('/');
      }
      //! --------------------------------------------//
      axios
        .post(
          'http://localhost:4000/user/login',
          {
            userId,
            password
          },
          //! 올바르지 않은 withCredentials 사용
          {
            withCredentials: true
          }
        )
        .then((res) => {
          // 로그인 확인
          axios
            .get('https://localhost:4000/user/info', { withCredentials: true })
            .then((res) => {
              // 유저 정보 저장 핸들러 함수 필요 (state)
              setIsLogin(true);
              setShowLogin(false);
              navigate('/');
            });
        })
        .catch((err) => {
          setErrMsg('아이디 혹은 비밀번호가 잘못되었습니다');
          setTimeout(() => {
            setErrMsg('');
          }, 3000);
        });
    } else {
      // 에러박스에 메시지 출력
      setErrMsg('아이디와 비밀번호를 모두 입력해주세요');
      setTimeout(() => {
        setErrMsg('');
      }, 3000);
    }
  };

  // useEffect(() => {
  //   console.log("로그인 모달 렌더링");
  // }, [isLogin]);
  return (
    <Container>
      <Canvas onClick={handleCanvasClick}>
        <View onClick={(e) => e.stopPropagation()}>
          <br />
          <br />
          <br />
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              아이디
              <Input type='text' onChange={handleInputValue('userId')} />
            </div>
            <br />
            <div>
              비밀번호
              <Input type='password' onChange={handleInputValue('password')} />
            </div>
            <div className='alert-box'>{errMsg}</div>
            <div className='yet' onClick={handleGotoSignup}>
              아직 아이디가 없으신가요?
            </div>
            <Button type='submit' onClick={handleLogin}>
              로그인
            </Button>
          </form>
        </View>
      </Canvas>
    </Container>
  );
}

export default LoginModal;
