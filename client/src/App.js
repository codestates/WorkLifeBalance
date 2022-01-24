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

function App () {
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: 'WorkLifeBalance',
    name: 'WLB',
    email: 'WLB@WLB.com'
  });
  useEffect(() => {
    setIsLogin(true); //! 로그인 유지: 요청 정상 작동 확인 후 삭제필요
  }, []);
  return (
    <Router>
      <Header
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
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
              ? <Route path='/dashboard' element={<Dashboard />} />
              : <Route path='/dashboard' element={<Navigate to='/' />} />}
            <Route path='/dashboard' element={<Dashboard />} />
            {isLogin
              ? <Route
                  path='/profile' element={
                    <Profile
                      userInfo={userInfo}
                      setUserInfo={setUserInfo}
                      isLogin={isLogin}
                      setIsLogin={setIsLogin}
                    />
                  }
                />
              : <Route path='/profile' element={<Navigate to='/' />} />}
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
