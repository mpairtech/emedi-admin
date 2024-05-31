import React, { useState } from 'react';
import { createContext } from 'react';



export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);


    const handleLogout = async ()=>{
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');

    }


    const authInfo = {
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