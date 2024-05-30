import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './components/providers/AuthProvider';
import Loading from './pages/Loading/Loading';

const PrivateRoute = ({children}) => {

    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

    const navigate = useNavigate();
    // console.log(user?.length)

    if(loading)
    {
        return <Loading />
    }

    if(user?.length > 0)
    {
        return children;
    }
    
    return <Navigate state={location.pathname} to="/login"></Navigate>;

};

export default PrivateRoute;