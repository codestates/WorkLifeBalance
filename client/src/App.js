import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import { Routes, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

function App () {
  return (
    <Router>

      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        {/* {isLogin ? <Redirect to='' */}
      </Routes>
      <Footer />

    </Router>

  );
}

export default App;
