import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllCategories } from '../../apiCalls/category';
import { addJobReq } from '../../apiCalls/jobReq';
import Loading from '../../pages/Loading/Loading';
import { AuthContext } from '../providers/AuthProvider';

const ApplyJob = ({getApplications}) => {

    const { user } = useContext(AuthContext);

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const getCategories = async () => {
        setIsLoading(true);
        const data = await getAllCategories();

        setCategories(data.categories);
        setIsLoading(false)
    }

    useEffect(() => {
        getCategories();

    }, [])

    if (isLoading) {
        return <div className='w-full col-span-3 h-[400px] flex justify-center items-center'><Loading /></div>
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form);
        formData.append('applicant', user[0]?._id)
        setIsLoading(true);
        const data = await addJobReq(formData);
        setIsLoading(false);
   
        toast.dismiss();
        console.log(data)
        if(data.success){
        toast.success(data.message)
        }

        else{
            toast.info(data.message)
        }

        form.reset();
       
        getApplications(user[0]?._id)

    }


    return (
        <div className='lg:col-span-3 border px-5 md:px-12 shadow-lg text-gray-700'>
            <div className='text-lg md:text-xl font-bold text-center underline underline-offset-4 mt-5'>Candidate</div>
            <div className='md:text-lg md:font-bold space-y-5 my-5'>
                <p>Name: {user[0]?.name}</p>
                <p>Email: {user[0]?.email}</p>
                <p>Phone: {user[0]?.phone}</p>
                <p>Region: {user[0]?.region}</p>
                <p>City: {user[0]?.city}</p>
                <p>Address: {user[0]?.address}</p>
                <p>Country: {user[0]?.country}</p>

            </div>
            <hr className='my-3'/>

            <div>
                <form onSubmit={handleSubmit}>
                    <select
                        name="category"
                        defaultValue=""
                        className="w-full md:w-1/2 border border-gray-400 my-3 p-2 mb-2"
                        required
                    >
                        <option value="" disabled>Select Category</option>

                        {
                            categories.map((category) => (
                                <option key={category._id} value={category._id} > {category.name.charAt(0).toUpperCase() + category.name.slice(1)}</option>
                            ))
                        }
                    </select>

                    <div className="flex flex-col w-full md:w-1/2 my-3 mb-2 ">
                        <label htmlFor="image" className="mb-1 text-gray-700 font-bold">
                            CV
                        </label>
                        <input
                            type="file"
                            accept="application/pdf"
                            name="cv"
                            id="cv"
                            className="border border-gray-400 p-2"
                            required
                        />
                    </div>

                    <button
                        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded my-5"
                        type="submit"
                    >
                        Apply
                    </button>
                </form>
            </div>


            <div>

            </div>

        </div>
    );
};

export default ApplyJob;