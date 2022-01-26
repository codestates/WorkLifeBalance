import './App.css';

import { Header, Nav, Footer, LoginModal } from './components';
import { Home, Signup, Profile, Dashboard, NotFound } from './pages';

import {
  Navigate,
  Routes,
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import url from './urlSetup';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const Loading = styled.div``;

function App () {
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [navOn, setNavOn] = useState(true);

  useEffect(() => {
    // setIsLogin(true); //! 로그인 유지: 요청 정상 작동 확인 후 삭제필요
    if (isLogin) {
      setIsLoading(true);
    }
    // const {userId, name, eamil} = res.data.user
    axios
      .get(`${url}/user/info`, { withCredentials: true })
      .then((res) => {
        // 유저 정보 저장 핸들러 함수 필요 (state)
        setIsLogin(true);
        setIsLoading(false);
        setUserInfo({ ...res.data.user });
      })
      .catch((err) => {
        console.log(err.stack);
      });
  }, [isLogin]);

  return (
    <div className='container'>
      <Router>
        <Header
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
        {isLoading
          ? (
            <LoadingContainer>
              <Loading>
                <img src={`${process.env.PUBLIC_URL}/loading.gif`} />
              </Loading>
            </LoadingContainer>
            )
          : (
            <div className='base-wrapper'>
              {localStorage.getItem('isLogin') ? <Nav navOn={navOn} setNavOn={setNavOn} /> : null}
              <div className='route-wrapper'>
                <Routes>
                  <Route
                    exact
                    path='/'
                    element={
                      <Home
                        showLogin={showLogin}
                        setShowLogin={setShowLogin}
                        isLogin={isLogin}
                      />
                  }
                  />
                  {localStorage.getItem('isLogin')
                    ? (
                      <Route path='/dashboard' element={<Dashboard />} />
                      )
                    : (
                      <Route path='/dashboard' element={<Navigate to='/' />} />
                      )}
                  <Route path='/dashboard' element={<Dashboard />} />
                  {localStorage.getItem('isLogin')
                    ? (
                      <Route
                        path='/profile'
                        element={
                          <Profile
                            userInfo={userInfo}
                            setUserInfo={setUserInfo}
                            isLogin={isLogin}
                            setIsLogin={setIsLogin}
                          />
                    }
                      />
                      )
                    : (
                      <Route path='/profile' element={<Navigate to='/' />} />
                      )}
                  <Route path='/signup' element={<Signup />} />
                  <Route path='*' element={<Navigate to='/' />} />
                </Routes>
                <Footer />
              </div>
            </div>
            )}
      </Router>
    </div>
  );
}

export default App;
