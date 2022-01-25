import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LoginModal } from './';
import { useNavigate } from 'react-router';
import url from '../urlSetup';

// require("dotenv").config();

const Border = styled.hr`
  margin: 0px;
  height: 5px;
  border: 0;
  box-shadow: 0 5px 5px -5px #555 inset;
`;

const Container = styled.div`
  display: flex;
  min-height: 75px;
  height: 8vh;
  width: 100vw;
  text-decoration: none;
  margin-top: 5px;
  overflow: hidden;
  border: 1px solid red;
`;

const Title = styled.h1`
  flex: 4 0 auto;
  margin: 0;
  font-size: 3.5em;
  padding-left: 20px;
  color: violet;
  border: 1px solid blue;
  img {
    margin-right: 20px;
  }
  a {
    display: flex;
    color: black;
    text-decoration: none;
    span {
      padding-top: 5px;
    }
  }
  a:visited {
    color: black;
  }
`;

const ControlBox = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-items: center;

  .sub {
    margin: 1px;
    background-color: #ccc;
    text-align: center;
    vertical-align: middle;
    height: 25px;
    width: 100px;
    cursor: pointer;
  }
`;

function Header ({ showLogin, setShowLogin, isLogin, setIsLogin }) {
  const navigate = useNavigate();
  const handleLoginModal = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    // //! test 진행 후 삭제할 것

    // setIsLogin(false);
    // navigate('/');

    // //! --------------------------->
    axios
      .post(`${url}/user/logout`, {}, { withCredentials: true })
      .then((res) => {
        // 유저 정보 핸들링 함수
        setIsLogin(false);
        navigate('/');
      });
  };

  return (
    <>
      <Container>
        <Title>
          <Link to='/'>
            <img
              className='logo'
              src={process.env.PUBLIC_URL + '/logo.png'}
              height='72px'
              alt='로고'
            />
            <span>Work Life Balance</span>
          </Link>
        </Title>
        {/* 로그인 및 회원가입 탭, 로그인시 로그아웃으로 변경 */}
        {isLogin
          ? (
            <ControlBox>
              <div className='sub logout' onClick={handleLogout}>
                로그아웃
              </div>
            </ControlBox>
            )
          : (
            <ControlBox>
              <div className='sub login' onClick={handleLoginModal}>
                로그인
              </div>
              <div className='sub signup'>
                <Link to='/signup'>회원가입</Link>
              </div>
            </ControlBox>
            )}

        {showLogin
          ? (
            <LoginModal
              setShowLogin={setShowLogin}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
            />
            )
          : null}
      </Container>
      <Border />
    </>
  );
}

export default Header;
