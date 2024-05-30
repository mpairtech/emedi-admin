import React, { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../apiCalls/users';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    

    

    useEffect(() => {

        const getUserData = async () => {

            const data = await getUser();
            setUser(data.userData);
            setLoading(false);

        }

        getUserData();
    }, [loading])


    const handleLogout = async ()=>{
        localStorage.removeItem('token');

        setUser([]);
    }

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        handleLogout
    }

    

    return (

        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>


    );
};

export default AuthProvider;