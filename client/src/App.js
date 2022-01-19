import './App.css';
import { Header, Footer } from './components'
import { Home, Dashboard, Profile } from './pages'
import { Redirect } from 'react-router-dom'



function App() {
  return (
    <Router>
      <Header />

      <Route exact={true} path="/">
        <Home />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/profile">
        {/* {isLogin ? <Redirect to='' */}
        <Profile />
      </Route>
      
      <Footer />
    </Router>
      
  );
}

export default App;
