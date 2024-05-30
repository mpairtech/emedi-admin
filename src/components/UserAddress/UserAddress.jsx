import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getUser } from '../../apiCalls/users';
import { AuthContext } from '../providers/AuthProvider';

const UserAddress = () => {

    const {user} = useContext(AuthContext);

    // const [userInfo, setUserInfo] = useState([]);

    // useEffect(()=>{
        
    //     const getUserInfo = async()=>{
    //         const data = await getUser("652cc4f5f3c3167a19f8ec15");
    //         setUserInfo(data.userData);
    //     }

    //     getUserInfo();

    // },[])
    


    return (
        <div className='my-10 mx-10'>
            <div className='mb-3 text-2xl font-bold text-green-900'>
                Shipping Address
            </div>
           {
              user.length > 0 &&

              <div className='text-gray-500 border'>
                <div className='border border-green-100 rounded px-5 shadow-2xl py-5'>
              <h2 className='text-xl font-medium my-2'>Name : {user[0].name}</h2>
              <hr className='w-4/5' />
              <h2 className='text-xl font-medium my-2'>Email : {user[0].email}</h2>
              <hr className='w-4/5' />
              <h2 className='text-xl font-medium my-2'>Phone : {user[0].phone}</h2>
              <hr className='w-4/5' />
              <h2 className='text-xl font-medium my-2'>Region : {user[0].region}</h2>
              <hr className='w-4/5' />
              <h2 className='text-xl font-medium my-2'>City : {user[0].city}</h2>
              <hr className='w-4/5' />
              <h2 className='text-xl font-medium my-2'>Area : {user[0].area}</h2>
              <hr className='w-4/5' />
              <h2 className='text-xl font-medium my-2'>Country : {user[0].country}</h2>
              <hr className='w-4/5' />
              <h2 className='text-xl font-medium my-2'>Address: {user[0].address}</h2>
            </div>
              </div>
           }
        </div>
    );
};

export default UserAddress;