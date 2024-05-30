import React from 'react';

const ContactUs = () => {
    return (
        <div className='container mx-auto mt-20 md:mt-36 pb-10 px-5 lg:px-0'>
            <div className='bg-gradient-to-r from-green-500 to-green-200 py-16 relative lg:px-20'>
                <div className='w-1/2'>
                <h4 className='text-2xl font-bold text-white text-center px-5'>If you are unable to locate the service you're looking for, feel free to reach out to us anytime at 16516, available 24/7.</h4>
                <div className='text-center'>
                    {/* <button className='px-2 py-1 bg-green-800 hover:bg-green-950 rounded-md text-white my-5 text-xl'>Call Now</button> */}
                </div>
                </div>
                <img className='absolute w-72 md:w-96 h-96 right-0 lg:right-20 bottom-0' src="https://i.ibb.co/XxPwyW8/call-support.png" alt="" />
            </div>
        </div>
    );
};

export default ContactUs;