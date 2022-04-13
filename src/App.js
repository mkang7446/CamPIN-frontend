import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home/Home';
import Campgrounds from './components/Campgrounds/Campgrounds';
import Community from './components/Community/Community';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import CampingDetail from './components/CampingDetail/CampingDetail';
import API_URL from './apiConfig';
import CampgroundCreate from './components/CampgroundCreate/CampgroundCreate';
import Signup from './components/Signup/Signup';
import CampgroundEdit from './components/CampgroundEdit/CampgroundEdit';
import ReviewCreate from './ReviewCreate/ReviewCreate';
import ReviewEdit from './ReviewEdit/ReviewEdit';
import Post from './components/Posts/Post';
import Talktalk from './components/Posts/Talktalk';
import Market from './components/Posts/Market';
import Tips from './components/Posts/Tips';
import Qna from './components/Posts/Qna';

function App() {
  let navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(
    false
    // localStorage.getItem('token') ? true : false
  );

  const [userInfo, setUserInfo] = useState(null);

  const handleSetLoggedIn = (token) => {
    localStorage.setItem('token', token);
    setLoggedIn(true);
    getUserInfo();
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch(API_URL + 'users/me', {
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setUserInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(API_URL + 'token/logout/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 204) {
        setLoggedIn(false);

        setUserInfo(null);

        localStorage.removeItem('token');
        alert('You have been logged out!');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
    return;
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
      getUserInfo();
    }
  }, []);

  return (
    <>
      <Navigation
        loggedIn={loggedIn}
        handleLogout={handleLogout}
        userInfo={userInfo}
      />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/login'
          element={<Login handleSetLoggedIn={handleSetLoggedIn} />}
        />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/campgrounds/new'
          element={<CampgroundCreate loggedIn={loggedIn} />}
        />
        <Route
          path='/campgrounds'
          element={<Campgrounds loggedIn={loggedIn} />}
        />
        <Route
          path='/campgrounds/:id'
          element={<CampingDetail userInfo={userInfo} loggedIn={loggedIn} />}
        />
        <Route path='/campgrounds/:id/edit' element={<CampgroundEdit />} />
        <Route path='/campgrounds/:id/reviews/new' element={<ReviewCreate />} />
        <Route
          path='/campgrounds/:campgroundId/reviews/:reviewId/edit'
          element={<ReviewEdit />}
        />
        <Route path='/community' element={<Community />} />
        <Route path='/talktalk' element={<Talktalk />} />
        <Route path='/market' element={<Market />} />
        <Route path='/tips' element={<Tips />} />
        <Route path='/qna' element={<Qna />} />
      </Routes>
    </>
  );
}

export default App;
