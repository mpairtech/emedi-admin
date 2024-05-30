import React from 'react';

const Comment = ({ element }) => {
    return (
        <div className='my-2'>
            <div className='bg-green-50 py-2 px-2 text-green-800 border border-green-200'>
                <p><span className='font-bold pr-2'>{element.userId.name}</span> <span className='text-gray-600'>{element.comment}</span></p>
            </div>
            {
                element.reply !== "" &&
                <div className='bg-gray-50 py-2 px-1 text-gray-500 border border-gray-200'>
                    <p>{element.reply}</p>
                </div>
            }
        </div>
    );
};

export default Comment;