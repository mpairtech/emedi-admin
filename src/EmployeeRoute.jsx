import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './components/providers/AuthProvider';

import Loading from './pages/Loading/Loading';

const EmployeeRoute = ({children}) => {

    const {user,loading} = useContext(AuthContext);


    if(loading)
    {
        return <Loading />
    }

    if(user?.length > 0)
    {
        if(user[0].role === "employee")
        {
            
            return children;
        }

        else{
            return <Navigate state={location.pathname} to="/"></Navigate>;
        }
    }
    
    return <Navigate state={location.pathname} to="/login"></Navigate>;

};

export default EmployeeRoute;