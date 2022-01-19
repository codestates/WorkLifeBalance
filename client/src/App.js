import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import { Routes, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App () {
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {

  }, []);
  return (
    <Router>

      <Header showLogin={showLogin} setShowLogin={setShowLogin} isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route exact path='/' element={<Home showLogin={showLogin} setShowLogin={setShowLogin} />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<Signup />} />
        {/* {isLogin ? <Redirect to='' */}
      </Routes>
      <Footer />

    </Router>

  );
}

export default App;
