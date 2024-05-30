import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { getWork, updateWork } from '../../apiCalls/employees';
import { AuthContext } from '../../components/providers/AuthProvider';

const Ongoing = () => {

    const { user } = useContext(AuthContext)
    const [ongoingWork, setOngoingWork] = useState([])



    const getOngoingWork = async () => {
        const data = await getWork(user[0]?._id);
        setOngoingWork(data.currentWork)

    }




    useEffect(() => {

        getOngoingWork();

    }, [user])



    const handleCompleted = async ()=>{

        const obj = {
            employeeBookStatus: "",
            orderId: ongoingWork[0].orderId,
            workStatus: "history",
            orderStatus: "serviced",
            workId: ongoingWork[0]._id,
            employeeId: user[0]._id
        }

        const data = await updateWork(obj);
 
        Swal.fire({
            title: "Work Done!",
            icon: "success"
          });
        getOngoingWork();
        // console.log(data);
    }


    return (
        <div>
            {
                ongoingWork.length > 0 ?
                <div className='flex justify-center my-5 mx-20'>
                    <div className='w-full h-[38rem] border border-gray-500'>

                        <div className='text-xl font-bold text-center mt-5'>Customer's Address</div>

                        <div className='mx-10'>
                            <p className='my-10 font-bold bg-green-200 h-10 flex justify-start items-center px-5 rounded'>Order ID  <span className='ml-3 text-gray-700'>{ongoingWork[0].orderId}</span></p>

                            <p className='my-10 font-bold bg-green-200 h-10 flex justify-start items-center px-5 rounded'>Name  <span className='ml-6 text-gray-700'>{ongoingWork[0].userName}</span></p>

                            <p className='my-10 font-bold bg-green-200 h-10 flex justify-start items-center px-5 rounded'>Phone  <span className='ml-6 text-gray-700'>{ongoingWork[0].userPhone}</span></p>

                            <p className='my-10 font-bold bg-green-200 h-20 flex justify-start items-center px-5 rounded'>Address  <span className='ml-3 text-gray-700'>{ongoingWork[0].userAddress}</span></p>

                            <p className='my-10 font-bold bg-green-200 h-10 flex justify-start items-center px-5 rounded'>Amount  <span className='ml-4 text-gray-700'>৳ {ongoingWork[0].amount}</span></p>

                            {/* <p className='my-5 font-bold bg-green-200 h-10 flex justify-start items-center px-5 rounded'>Status  <span className='ml-6 text-gray-700'>1233audhaus</span></p> */}

                            <div className='text-center'>
                                <button className='px-2 py-1 rounded text-white bg-green-500' onClick={handleCompleted}>Complete</button>
                            </div>
                        </div>
                    </div>
                </div>

                :

                <div className='text-center my-20'>
                    <p>No ongoing work available</p>
                </div>
            }



        </div>
    );
};

export default Ongoing;