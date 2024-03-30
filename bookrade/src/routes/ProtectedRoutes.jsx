import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux"
import { getUser } from '../utils/user';


export const UserPrivateRoute = ({ Component }) => {
 
    const isLoggedIn = useSelector((state)=>state.auth.isLogin)

    const isAdmin = getUser();
     
    return isLoggedIn ?  !isAdmin? <Component />: <Navigate to="/admin" /> : <Navigate to="/login" />;
 };

 export const AdminPrivateRoute = ({ Component }) => {
 
    const isLoggedIn = useSelector((state)=>state.auth.isLogin)

    const isAdmin = getUser();
     
    return isLoggedIn ?  isAdmin? <Component />: <Navigate to="/" /> : <Navigate to="/login" />;
 };