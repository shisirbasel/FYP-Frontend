import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux"



export const PrivateRoute = ({ Component }) => {
 
    const isLoggedIn = useSelector((state)=>state.auth.isLogin)
     
    return isLoggedIn ? <Component /> : <Navigate to="/login" />;

    };