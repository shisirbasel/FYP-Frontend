import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Home from './pages/User/Home';
import Register from './pages/Auth/Register';
import Explore from './pages/User/Explore';
import Profile from './pages/User/Profile';
import Admin from './pages/Admin/Admin';
import ProfileBooks from './pages/User/ProfileBooks';
import { UserPrivateRoute, AdminPrivateRoute } from './routes/ProtectedRoutes'; 
import loader from './assets/loader/loader-img.gif';
import Upload from './pages/User/Upload';
import LikedBooks from './pages/User/LikedBooks';
import TradeRequests from './pages/User/TradeRequests';
import AdminBooks from './pages/Admin/AdminBooks';
import AdminUsers from './pages/Admin/AdminUsers';
import ChatPreview from './pages/User/ChatPreview';
import Chat from './pages/User/Chat';
import PageNotFound from './pages/PageNotFound';
import UserProfile from './pages/User/UserProfile';
import AdminReports from './pages/Admin/AdminReports'
import AdminTradeRequests from './pages/Admin/AdminTradeRequests';
import AdminTradeMeet from './pages/Admin/AdminTradeMeet';
import Recommendations from './pages/User/Recommendations';
import ChangePassword from './pages/Auth/ChangePassword';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';


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
        <div className='flex items-center justify-center h-screen'>
          <img className="" src={loader} alt="Loading" />
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} exact/>
            <Route path="/login" element={<Login />} exact/>
            <Route path="/forgot-password" element={<ForgotPassword />} exact />
            <Route path="/forgot-password/reset/:uid/:token" element={<ResetPassword />} exact />
            <Route path="/" element={<Home />} exact />
           

            {/* Pass auth.token to ProtectedRoute */}
            <Route path="/explore" element={<UserPrivateRoute Component={Explore} />} exact />
            <Route path="/profile" element={<Navigate to="/profile/details"/>} />
            <Route path="/profile/details" element={<UserPrivateRoute Component={Profile} />} exact  />
            <Route path="/profile/books" element={<UserPrivateRoute Component={ProfileBooks} />} exact  />
            <Route path="/upload" element={<UserPrivateRoute Component={Upload} />} exact  />
            <Route path="/liked" element={<UserPrivateRoute Component={LikedBooks} />} exact  />
            <Route path="/trade-requests" element={<UserPrivateRoute Component={TradeRequests} />} exact  />
            <Route path="/chat" element={<UserPrivateRoute Component={ChatPreview} />}  exact />
            <Route path="/chat/:id" element={<UserPrivateRoute Component={Chat} />} />
            <Route path="/recommendations" element={<UserPrivateRoute Component={Recommendations} />} />
            <Route path="/change-password" element={<UserPrivateRoute Component={ChangePassword} />} />

            <Route path="/admin" element={<Navigate to="/admin/dashboard"/>} />
            <Route path="/admin/dashboard" element={<AdminPrivateRoute Component={Admin} />}  exact />
            <Route path="/admin/books" element={<AdminPrivateRoute Component={AdminBooks} />}  exact />
            <Route path="/admin/users" element={<AdminPrivateRoute Component={AdminUsers} />} exact  />
            <Route path="/admin/reports" element={<AdminPrivateRoute Component={AdminReports} />} exact  />
            <Route path="/admin/trade-requests" element={<AdminPrivateRoute Component={AdminTradeRequests} />} exact  />
            <Route path="/admin/trade-meets" element={<AdminPrivateRoute Component={AdminTradeMeet} />} exact  />

            <Route path="/user/:username" element={<UserPrivateRoute Component={UserProfile} />} exact  />
            <Route path='*' element={<PageNotFound/>} />

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
