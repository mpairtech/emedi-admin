import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

import { LiaCcVisa } from "react-icons/lia";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getCartByCartId, removeCart } from "../../apiCalls/cart";
import { AuthContext } from "../providers/AuthProvider";


const PaymentInfo = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const stripe = useStripe();
    const elements = useElements();
    const cartId = useParams();
    // console.log(cartId)

    const [checkOutService, setCheckOutService] = useState([])



    useEffect(() => {
        const getCartInfo = async () => {
            const data = await getCartByCartId(cartId.id);
            setCheckOutService(data.cartData);

            // console.log(data.cartData)
        }

        getCartInfo();
    }, [cartId])


    const handlePayment = async (event) => {

        // console.log(checkOutService[0].quick)
        event.preventDefault();
        if (!user[0].name || !user[0].email || !user[0].phone || !user[0].region || !user[0].city || !user[0].area || !user[0].country || !user[0].address) {
            toast.dismiss();
            return toast.info("Please update your profile !");
        }


        try {
            const price = checkOutService[0].quick ? checkOutService[0].serviceId.price + ((15 / 100) * checkOutService[0].serviceId.price) : checkOutService[0].serviceId.price;

            console.log(price)
            const response = await fetch('https://rapid-home-solution-server.vercel.app/api/orders/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ amount: price * 100, currency: "bdt" }),
            });


            if (response.status === 200) {

                const data = await response.json();
                // console.log(data)

                const confirmPayment = await stripe.confirmCardPayment(data, {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                    },
                });

                if (confirmPayment.paymentIntent.status === "succeeded") {
                    console.log('Payment confirmed');
                    const obj = {
                        userId: user[0]._id,
                        serviceId: checkOutService[0].serviceId._id,
                        paymentIntentId: confirmPayment.paymentIntent.id,

                        amount: checkOutService[0].quick ? checkOutService[0].serviceId.price + ((15 / 100) * checkOutService[0].serviceId.price) : checkOutService[0].serviceId.price,

                        quick: checkOutService[0].quick
                    }
                    await fetch('https://rapid-home-solution-server.vercel.app/api/orders/save-order', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(obj),
                    });

                    await removeCart(cartId.id);

                    Swal.fire({
                        title: "Payment Successful!",
                        text: `Transaction Id: ${confirmPayment.paymentIntent.id}`,
                        icon: "success"
                    });

                    navigate('/orders')

                }


            }
        } catch (error) {
            toast.dismiss();
            toast.error("Payment Failed")
            console.error(error);
        }


    };








    return (
        <div className="mx-10 my-10">
            <div className="w-3/4">
                <div className='mb-3 text-2xl font-bold text-green-900'>
                    Service Information
                </div>

                {
                    checkOutService.length > 0 &&
                    <div className='text-gray-500 bg-green-50'>
                        <div className='border border-green-100 rounded px-5 shadow-2xl py-5'>
                            <h2 className='lg:text-xl font-medium my-2'>Service Id : {checkOutService[0].serviceId._id}</h2>
                            <hr className='w-4/5' />
                            <h2 className='lg:text-xl font-medium my-2'>Service Name : {checkOutService[0].serviceId.title}</h2>
                            <hr className='w-4/5' />
                            <h2 className='lg:text-xl font-medium my-2'>Price : ৳{checkOutService[0].quick ? checkOutService[0].serviceId.price + ((15 / 100) * checkOutService[0].serviceId.price) : checkOutService[0].serviceId.price}</h2>

                        </div>
                    </div>
                }
            </div>

            <div className="border border-gray-100 shadow-2xl px-5 py-5 w-3/4 rounded mt-1">

                <div className="text-4xl flex justify-center">
                    <LiaCcVisa />

                </div>

                <form onSubmit={handlePayment}>

                    <div>
                        <div>
                            <h4 className="text-lg">Card Number</h4>
                            <div className="my-1">
                                <CardNumberElement className="border border-gray-400 shadow-xl py-2 px-2 rounded-md" />
                            </div>
                        </div>


                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <h4 className="text-lg">Expiration</h4>
                                <div className="my-1">
                                    <CardExpiryElement className="border border-gray-400 shadow-xl py-2 px-2 rounded-md" />
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg">CVC</h4>
                                <div className="my-1">
                                    <CardCvcElement className="border border-gray-400 shadow-xl py-2 px-2 rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="bg-green-700 text-white flex justify-center items-center gap-3 py-2 mt-2 cursor-pointer rounded-md px-3 mx-auto">
                        <LiaCcVisa className="text-3xl" />
                        <h4 className="text-lg">Make Payment</h4>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentInfo;
