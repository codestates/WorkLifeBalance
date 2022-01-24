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

const Error = styled.div`
  text-align: center;
  font-size: 25px;
`;

const Loading = styled.div`
  text-align: center;
`;

function App () {
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWrong, setIsWrong] = useState({ on: false, msg: '' });
  const [userInfo, setUserInfo] = useState({
    userId: 'WorkLifeBalance',
    name: 'WLB',
    email: 'WLB@WLB.com'
  });
  useEffect(() => {
    // setIsLogin(true); //! 로그인 유지: 요청 정상 작동 확인 후 삭제필요
    setIsLoading(true);
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
        console.log('에러끗');
        setIsWrong({ on: true, msg: err.stack });
      });
  }, []);

  return (
    <Router>
      <Header
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
      {isWrong.on
        ? (
          <Error>{isWrong.msg}</Error>
          )
        : isLoading
          ? (
            <Loading>로딩즁</Loading>
            )
          : (
            <div className='base-wrapper'>
              {isLogin ? <Nav /> : null}
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
                  {isLogin
                    ? (
                      <Route path='/dashboard' element={<Dashboard />} />
                      )
                    : (
                      <Route path='/dashboard' element={<Navigate to='/' />} />
                      )}
                  <Route path='/dashboard' element={<Dashboard />} />
                  {isLogin
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
              </div>
            </div>
            )}

      <Footer />
    </Router>
  );
}

export default App;
