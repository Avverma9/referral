import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Header from './components/Header/Header';
import Login from './components/Registration/Login';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import Shared from './components/Profile/Shared';
import { useEffect, useState } from 'react';
import Home from './components/Home/Home';

function App() {
  const [loggedin, setLoggedIn] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []); // Add an empty dependency array to run the effect only once on mount

  return (
    <div className="App">
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          <Route path='/:code' element={<Registration />} />
          <Route path='/' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/shared' element={<Shared />} />
          <Route path='/home' element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
