import React from 'react';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {

    const { user, handleLogout } = useContext(AuthContext)
    const navigate = useNavigate("/");

    const list = <div className='lg:flex text-lg font-semibold lg:gap-5'>
        <li><NavLink
            to="/"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-white bg-green-700 px-2 py-1 rounded" : ""
            }
        >
            Home
        </NavLink></li>
        <li><NavLink
            to="/quick-service"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-white bg-green-700 px-2 py-1 rounded" : ""
            }
        >
            Quick
        </NavLink>
        </li>
        <li><NavLink
            to="/cart"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-white bg-green-700 px-2 py-1 rounded" : ""
            }
        >
            Cart
        </NavLink></li>
        <li><NavLink
            to="/orders"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-white bg-green-700 px-2 py-1 rounded" : ""
            }
        >
            Orders
        </NavLink></li>
        <li><NavLink
            to="/job"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-white bg-green-700 px-2 py-1 rounded" : ""
            }
        >
            Job
        </NavLink></li>
        {
            user?.length > 0 &&
            user[0]?.role === "admin" &&
            <li><NavLink
            to="/admin"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-white bg-green-700 px-2 py-1 rounded" : ""
            }
        >
            Admin
        </NavLink></li>
           

        }

{
            user?.length > 0 &&
            user[0]?.role === "employee" &&
            <li><NavLink
            to="/employee"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-white bg-green-700 px-2 py-1 rounded" : ""
            }
        >
            Dashboard
        </NavLink></li>
           

        }


        <li className={`lg:hidden ${user?.length > 0 && 'hidden'}`}><NavLink
            to="/login"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-white bg-green-700 px-2 py-1 rounded" : ""
            }
        >
            Login
        </NavLink></li>
        <li className={`lg:hidden ${user?.length > 0 && 'hidden'}`}><NavLink
            to="/register"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-white bg-green-700 px-2 py-1 rounded" : ""
            }
        >
            Register
        </NavLink></li>
    </div>

    return (
        <div className='bg-gradient-to-r from-emerald-200 from-10% via-emerald-300 via-30% to-emerald-200 to-90%'>

            <div className="navbar container mx-auto text-green-700 h-20">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black lg:hidden">
                            {
                                list
                            }
                        </ul>
                    </div>
                    <div><img onClick={()=> navigate('/')} className='h-24 w-44 cursor-pointer' src="/rhs-logo.png" alt="" /></div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu-horizontal px-1">
                        {
                            list
                        }
                    </ul>
                </div>
                <div className="navbar-end">

                    {
                        user?.length > 0 ?



                            <ul className='flex text-lg font-semibold gap-3 lg:gap-5'>
                                <li><NavLink
                                    to="/profile"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-white bg-green-700 px-2 py-1 rounded" : ""
                                    }
                                >
                                    {user[0]?.name}
                                </NavLink></li>

                                <li><NavLink
                                    to="/register"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-white bg-green-700 px-2 py-1 rounded" : ""
                                    }
                                >
                                    <button onClick={handleLogout} className='px-3 py-1 text-white bg-red-700 rounded text-base'>Logout</button>
                                </NavLink></li>
                            </ul>

                            :

                            <ul className='hidden lg:flex text-lg font-semibold lg:gap-5'>
                                <li><NavLink
                                    to="/login"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-white bg-green-700 px-2 py-1 rounded" : ""
                                    }
                                >
                                    Login
                                </NavLink></li>
                                <li><NavLink
                                    to="/register"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-white bg-green-700 px-2 py-1 rounded" : ""
                                    }
                                >
                                    Register
                                </NavLink></li>
                            </ul>





                    }





                </div>
            </div>

        </div>
    );
};

export default Navbar;