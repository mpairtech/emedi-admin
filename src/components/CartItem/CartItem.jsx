import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { removeCart } from '../../apiCalls/cart';

const CartItem = ({element, getCartData}) => {

    const navigate = useNavigate()

    const handlePayment = (id)=>{
        navigate(`/paymentInfo/${id}`);
    }

    const handleRemove = async (cartId)=>{
       
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
          }).then(async (result) => {
            if (result.isConfirmed) {

                await removeCart(cartId);
                getCartData();

              Swal.fire({
                title: "Removed!",
                icon: "success"
              });
            }
          });

    }

    return (
        <div className='px-5 md:px-20 py-5'>
            <div className='flex h-56 w-full bg-gradient-to-r from-emerald-100 from-10% via-emerald-100 via-30% to-emerald-100 to-90% border border-gray-300 rounded-md shadow-xl'>
                <div>
                    <img className='h-full w-44 md:w-96 rounded-l-md' src={element?.serviceId?.image[0].secure_url} alt="" />
                </div>
                <div className='rounded-r-md flex flex-col justify-center px-3 md:px-10 w-full'>
                    {/* <p className='bg-red-300 px-2 inline-block text-red-900 rounded'>AC</p> */}
                    <h2 className='text-lg md:text-xl font-bold my-1'>{element.serviceId.title}</h2>
                    <hr />
                    <h4 className='text-lg text-gray-500 my-1'>Estimate Duration: {element.serviceId.duration} Hours</h4>
                    <h4 className='text-lg text-gray-500 my-1'>Warranty: 7 days</h4>
                    <h4 className='text-lg text-gray-500 my-1'>Price: ৳{element.quick ? element.serviceId.price+((15/100)*element.serviceId.price) : element.serviceId.price }</h4>
                    <hr />

                    <div className='flex gap-5 justify-center my-3 text-sm md:text-base'>
                        <button onClick={()=>handlePayment(element._id)} className='bg-green-700 hover:bg-green-800 text-white px-2 md:px-3 py-1 rounded-md'>Proceed To Payment</button>
                        <button onClick={()=>handleRemove(element._id)} className='bg-red-700 hover:bg-red-800 text-white px-2 py-1 rounded-md'>Remove</button>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default CartItem;