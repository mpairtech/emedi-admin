import React from 'react';

const ChooseUs = () => {
    return (
        <div className='px-5 bg-gradient-to-r from-emerald-100 from-10% via-emerald-100 via-30% to-emerald-100 to-90% lg:h-[500px] py-10'>
            <div className="flex flex-col lg:flex-row items-center">

                <div className='lg:w-1/2 text-center px-24'>
                   <h2 className='text-5xl font-bold mb-10 text-green-600'>Why Choose Us</h2>
                   <p className='text-gray-500'>Our innovative online platform is tailored to seamlessly address all your home needs. From meticulous planning to flawless execution, we are dedicated to exceeding your expectations. At Rapid Home Solution, we bring a commitment to excellence, an eye for detail, and a passion for realizing your vision. Let us transform your home service experience into a seamless and memorable journey, where every task is executed with precision. Choose us as your trusted partner in making your home a haven of comfort and joy</p>
                </div>

                <div className='lg:w-1/2'>
                    <img data-aos="zoom-in-up"  className='h-[500px] w-full' src="https://i.ibb.co/jfSC8Xz/chooseUs.png" alt="" />
                </div>


            </div>
        </div>
    );
};

export default ChooseUs;