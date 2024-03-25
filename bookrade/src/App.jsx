import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import ProfileBooks from './pages/ProfileBooks';
import { PrivateRoute } from './routes/ProtectedRoutes'; 
import loader from './assets/loader/loader-img.gif';
import VerifyOtp from './components/VerifyOtp';
import Upload from './pages/Upload';
import LikedBooks from './pages/LikedBooks';

export const SearchContext = React.createContext();
export const GenreContext = React.createContext();
export const RequestBookContext = React.createContext();
export const OfferBookContext = React.createContext();


function App() {
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useState('');

  const [searchGenre, setSearchGenre] = useState([]);

  const [requestedBook, setRequestedBook] = useState({});

  const [offeredBook, setOfferedBook] = useState({});


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <GenreContext.Provider value={[searchGenre, setSearchGenre]}>
    <SearchContext.Provider value={[searchParams,setSearchParams]}>
      <OfferBookContext.Provider value={[offeredBook, setOfferedBook]}>
      <RequestBookContext.Provider value={[requestedBook, setRequestedBook]}>
        
    {loading ? (
        <div className='flex h-40 items-center justify-center h-screen'>
          <img className="" src={loader} alt="Loading" />
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<VerifyOtp />} />

            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />

            {/* Pass auth.token to ProtectedRoute */}
            <Route
              path="/explore"
              element={<PrivateRoute Component={Explore} />}
            />
            {/* <Route path="/profile" element={<ProtectedRoute isAuthenticated={true}><Profile /></ProtectedRoute>} /> */}
            <Route path="/profile" element={<Navigate to="/profile/details"/>} />
            <Route path="/profile/details" element={<PrivateRoute Component={Profile} />} />
            <Route path="/profile/books" element={<PrivateRoute Component={ProfileBooks} />} />
            <Route path="/upload" element={<PrivateRoute Component={Upload} />} />
            <Route path="/liked" element={<PrivateRoute Component={LikedBooks} />} />
          </Routes>
        </Router>
      )}
      </RequestBookContext.Provider>
      </OfferBookContext.Provider>
    </SearchContext.Provider>
    </GenreContext.Provider>
    
  );
}

export default App;
