import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Explore from './pages/Explore';
import './App.css'

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/explore" exact element={<Explore />} />
      </Routes>
    </Router>    
  );
}

export default App;
