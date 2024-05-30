import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { getCart } from '../../apiCalls/cart';
import CartItem from '../CartItem/CartItem';
import { AuthContext } from '../providers/AuthProvider';

const CartItems = () => {

    const {user} = useContext(AuthContext);

    const [cart, setCart] = useState([]);

    const getCartData = async () => {
        const cartData = await getCart(user[0]?._id);
        setCart(cartData.cartData)
        // console.log(cartData.cartData)
    }

    useEffect(() => {
        getCartData();
    }, [user])

    return (
        <div className='min-h-[553px]'>
            {
                cart?.length > 0 ?
                    cart.map((element) => (
                        <CartItem key={element._id} element={element} getCartData={getCartData} />
                    ))
                    :
                    <div className='flex justify-center items-center h-full'>
                        <img className='h-96 w-96 opacity-50' src="/empty-cart.png" alt="" />
                    </div>
            }

        </div>
    );
};

export default CartItems;