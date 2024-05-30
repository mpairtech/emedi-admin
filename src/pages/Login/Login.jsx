import React from 'react';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser, userLogin } from '../../apiCalls/users'
import { AuthContext } from '../../components/providers/AuthProvider';




const Login = () => {
    const { setUser, setLoading } = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { email, password } = e.target;

        const userObj = {
            email: email.value,
            password: password.value
        }


        const data = await userLogin(userObj);

        toast.dismiss();

        if (data.success) {
            localStorage.setItem("token", data.token)

            const getUserData = async () => {

                const data = await getUser();
                setUser(data.userData);
            
                setLoading(false);


            }

            await getUserData();
            toast.success(data.message);

            navigate(location.state ? location.state : "/")


        }

        else {
            toast.error(data.message);
        }



    }

    return (
        <div className="flex justify-center items-center h-screen bg-green-50">
            <form className="w-full max-w-sm bg-white shadow-customShadow rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLoginSubmit}>

                <h1 className="font-bold text-2xl mb-2 text-gray-600">Login</h1>
                <hr className="mb-3" />

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
                    <button className="bg-green-900 hover:bg-green-950 text-white font-bold py-2 px-4 rounded w-full" type="submit">
                        Login
                    </button>
                </div>
                <div className="text-center">
                    <small className="text-gray-500">Don't have an account?{" "}<Link to='/register' className="text-green-900">Register</Link> </small>
                </div>
            </form>
        </div>
    );
};

export default Login;