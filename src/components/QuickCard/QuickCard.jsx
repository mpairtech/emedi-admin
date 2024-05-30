import React from 'react';
import { useNavigate } from 'react-router-dom';




const QuickCard = ({element, serviceType }) => {

    const navigate = useNavigate();

    return (
        <div>
            <div onClick={() => navigate(`/service-details?id=${element._id}&serviceType=${serviceType}`)} className={`card card-compact bg-base-100 shadowCustom shadow-black rounded-md cursor-pointer w-72`}>
                <figure><img className='h-56 w-full' src={element?.image[0]?.secure_url} alt="" /></figure>
                <div className="py-2 px-2 bg-green-50 rounded-md">
                    <div>
                        <h2 className=' bg-green-300 inline px-2 py-1 rounded font-medium text-xs text-green-900 capitalize'>{element.category.name}</h2>
                    </div>
                    <h2 className="py-2 font-medium">{element.title}</h2>
                    <p className="text-gray-500">৳{element.price+((15/100)*element.price)}</p>

                </div>
            </div>
        </div>
    );
};

export default QuickCard;