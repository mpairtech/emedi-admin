import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userRegister } from '../../apiCalls/users';



const Register = () => {

    const navigate = useNavigate();

    const handleRegisterSubmit = async (e) => {

        e.preventDefault()

        const { name, email, password, confirmPassword } = e.target;

        const user = {
            name: name.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        }



        const data = await userRegister(user);

        toast.dismiss();
        if (data.success) {
            navigate('/login')
            toast.success(data.message);
        }

        else {
            toast.error(data.message);
        }

    }
    
    return (
        <div className="flex justify-center items-center h-screen bg-green-50 ">

            <form className="w-full max-w-sm bg-white shadow-customShadow rounded-md  px-8 pt-6 pb-8 mb-4" onSubmit={handleRegisterSubmit}>

                <h1 className="font-bold text-2xl mb-2 text-gray-600">Register</h1>
                <hr className="mb-3" />

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 outline-none "
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 outline-none "
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 outline-none "
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm password
                    </label>
                    <input
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 outline-none "
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        required
                    />
                </div>
                <div className="mb-4">
                    <button className="bg-green-900 hover:bg-green-950 text-white font-bold py-2 px-4 rounded w-full" type="submit">
                        Register
                    </button>
                </div>
                <div className="text-center">
                    <small className="text-gray-500">Already have an account?{" "}<Link to='/login' className="text-green-900">Login</Link></small>
                </div>
            </form>
        </div>
    );
};

export default Register;