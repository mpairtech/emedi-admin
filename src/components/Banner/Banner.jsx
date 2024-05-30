import React from 'react';

const Banner = () => {
    return (
        <div className="hero min-h-[600px]" style={{ backgroundImage: 'url(https://img.freepik.com/premium-photo/plumber-s-tools-equipment-strategically-positioned-kitchen-floor-with-sink-installation-background_750630-6286.jpg?w=740)' }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md text-white">
                    <h1 className="mb-5 text-5xl font-bold">Your Solution for Swift Comfort</h1>
                    <p className="mb-5">Experience the convenience of Rapid Home Solution – your one-stop destination for reliable and efficient online home services. Transform your living space with our expert solutions, making home maintenance a breeze.</p>
                    <div className='mx-20'>
                    <img className='h-32 w-72' src="/rhs-logo.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;