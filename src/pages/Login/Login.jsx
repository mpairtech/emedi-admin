import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { panelLogin } from '../../apiCalls/panel';
import { AuthContext } from '../../components/providers/AuthProvider';




const Login = () => {
    const { setLoading } = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const userRole = localStorage.getItem('userRole');
        if (accessToken && userRole) {
          navigate('/admin');
        }
      }, []);
    





    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { phone, password } = e.target;

        const userObj = {
            phone: phone.value,
            password: password.value
        }


        const data = await panelLogin(userObj)


        toast.dismiss();

        if (data.success) {
            localStorage.setItem("accessToken", data.accessToken)
            localStorage.setItem("userRole", data.role)

            toast.success(data.message);

            navigate(location.state ? location.state : "/admin")


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
                        Phone
                    </label>
                    <input
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 outline-none "
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Enter your phone"
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
                {/* <div className="text-center">
                    <small className="text-gray-500">Don't have an account?{" "}<Link to='/register' className="text-green-900">Register</Link> </small>
                </div> */}
            </form>
        </div>
    );
};

export default Login;