import React from 'react';
import PaymentInfo from '../../components/PaymentInfo/PaymentInfo';
import UserAddress from '../../components/UserAddress/UserAddress';

const Payment = () => {
    return (
        <div>
            <div className='grid lg:grid-cols-2 bg-green-50'>
                <UserAddress />
                <PaymentInfo />
            </div>
        </div>
    );
};

export default Payment;