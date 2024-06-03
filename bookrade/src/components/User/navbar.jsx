import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Badge } from "antd";
import { sendGetRequest } from "../../utils/api";
import {useSelector} from "react-redux"


const Navbar = () => {

  const isLoggedIn = useSelector((state)=>state.auth.isLogin)
  const [tradeRequestsCount, setTradeRequestsCount] = useState(0);

  const getUnseenRequests = useCallback(async () => {
    try {
      const response = await sendGetRequest('count_unseen_requests');
      setTradeRequestsCount(response.count);
    } catch (error) {
      console.error("Error fetching unseen requests:", error);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn){
    getUnseenRequests(); 
    const interval = setInterval(() => {
      getUnseenRequests(); 
    }, 5000);

    return () => {
      clearInterval(interval); 
    };}
  }, [getUnseenRequests]); 

  return (
    <div className="header-2">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/trade-requests">
          Trade Requests <Badge count={tradeRequestsCount} style={{ backgroundColor: '#06a109', marginTop: '-20px' }} />
        </Link>
        <Link to="/recommendations">Recommendations</Link>
      </nav>
    </div>
  );
};

export default Navbar;
