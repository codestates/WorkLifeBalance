import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LoginModal } from './';
import { useNavigate } from 'react-router';

// require("dotenv").config();

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: flex-end; */
  /* flex-direction: row; */
  border-bottom: 1px solid #000;
  text-decoration: none;
  margin-top: 5px;
  h1 {
    margin: 0px;
  }
  a {
    color: black;
    text-decoration: none;
  }
  a:visited {
    color: black;
  }
`;
const Title = styled.h1`
  flex: 3 0 0;
  font-size: 3.5em;
  text-align: left;
  padding-left: 50px;
  color: violet;
`;

const ControlBox = styled.div`
  display: flex;
  flex: 1 0 0;
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
    //! test 진행 후 삭제할 것

    setIsLogin(false);
    navigate('/');

    //! --------------------------->
    axios.post('http://localhost:4000/user/logout', {}, {
      withCredentials: true
    }).then((res) => {
      // 유저 정보 핸들링 함수
      setIsLogin(false);
      navigate('/');
    });
  };

  return (
    <Container>
      <Title>
        <Link to='/'>
          <img
            className='logo'
            src={process.env.PUBLIC_URL + '/logo.png'}
            height='72px'
            alt='로고'
          />{' '}
          Work Life Balance
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
  );
}

export default Header;
