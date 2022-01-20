import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginModal from './LoginModal';

const Title = styled.h1`
    font-size: 3.5em;
    text-align: center;
    color: violet;
`;

const ControlBox = styled.div`
`;

function Header ({ showLogin, setShowLogin, isLogin, setIsLogin }) {
  const handleLoginModal = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    setIsLogin(false);
  };

  return (
    <>
      {/* 로고 */}

      {/* 제목 */}
      <Title><Link to='/'><img className='logo' src={process.env.PUBLIC_URL + '/logo.png'} height='72px' alt='로고' /> Work Life Balance</Link></Title>
      {/* 로그인 및 회원가입 탭, 로그인시 로그아웃으로 변경 */}

      {isLogin
        ? <ControlBox>
          <div className='logout' onClick={handleLogout}>로그아웃</div>
        </ControlBox>
        : <ControlBox>
          <div className='login' onClick={handleLoginModal}>로그인</div>
          <div className='signup'>
            <Link to='/signup'>회원가입</Link>
          </div>
        </ControlBox>}

      {showLogin ? <LoginModal setShowLogin={setShowLogin} isLogin={isLogin} setIsLogin={setIsLogin} /> : null}

    </>
  );
}

export default Header;
