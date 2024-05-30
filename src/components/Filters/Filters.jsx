import { data } from 'autoprefixer';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineCloseSquare } from "react-icons/ai";
import { TbFilterSearch } from "react-icons/tb";

import { getAllCategories } from "../../apiCalls/category"

const Filters = ({ displayFilter, setDisplayFilter, filterItem, setFilterItem }) => {

    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        const data = await getAllCategories();
        setCategories(data.categories)
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <div className='my-5 lg:my-3 md:my-10'>
            {
                displayFilter &&
                <div className=' border border-green-600 shadow-lg w-44 md:w-48 lg:w-52 h-full'>

                    <div className='text-4xl flex justify-end'>
                        <button onClick={() => setDisplayFilter(false)}><AiOutlineCloseSquare /></button>
                    </div>
                    <div>
                        <h2 className='text-xl flex font-bold justify-center items-center gap-2 mb-5'><span><TbFilterSearch /></span> Filters</h2>
                    </div>

                    <div>
                        <h4 className='px-2 font-bold text-gray-600'>Categories</h4>
                    </div>

                    {
                        categories.length > 0 &&
                        categories.map((element) => (

                            <div key={element._id} className='px-5 my-7 text-gray-600'>

                                <label htmlFor={element.name} className='flex items-center'>

                                    <input type="checkbox" checked={filterItem === element._id} className='w-5 h-5'
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFilterItem(element._id);
                                            }
                                            else {
                                                setFilterItem("");
                                            }
                                        }}
                                    />

                                    <span className='px-2 capitalize'>{element.name}</span>
                                </label>
                            </div>

                        ))


                    }



                </div>
            }




        </div>
    );
};

export default Filters;