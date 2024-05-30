import React, { useEffect, useState } from 'react';
import { getAllEmployees, updateBookStatus, updateEmployeeCategory } from '../../apiCalls/users';

import PureModal from 'react-pure-modal';
import { addWork } from '../../apiCalls/employees';
import { getAllCategories } from '../../apiCalls/category';



const EmployeeList = () => {

    const [employees, setEmployees] = useState([]);

    const [modal, setModal] = useState(false);

    const [orderId, setOrderId] = useState("");

    const [orderIdMessage, setOrderIdMessage] = useState("")

    const [currentEmployee, setCurrentEmployee] = useState({})

    const [searchTerm, setSearchTerm] = useState('');

    const [categories, setCategories] = useState([]);



    const getEmployees = async () => {
        const data = await getAllEmployees();
        setEmployees(data.employeesData)
        // console.log(data.usersData)
    }

    const getCategories = async () => {

        const data = await getAllCategories();

        setCategories(data.categories);

    }




    useEffect(() => {
        getCategories();
        getEmployees();
        

    }, [])

    const handleModal = async (e) => {
        setModal("true");
        setCurrentEmployee(e);
        setOrderIdMessage("");
    }

    const handleBook = async () => {


        if (orderId.trim() === "") {
            setOrderIdMessage("*Order ID is required")
            return;
        }

        setOrderIdMessage("");

        const employeeId = currentEmployee._id
        const status = "ongoing"
        const employeeBookStatus = "booked"

        const obj = {
            employeeId,
            status,
            orderId: orderId.trim(),
            employeeBookStatus
        }

        const workData = await addWork(obj);

        if (!workData.success) {
            setOrderIdMessage(workData.message);
            return;
        }

        const bookStatusData = await updateBookStatus(obj);

        getEmployees();



        // console.log(workData);
        // console.log(bookStatusData);

        setOrderId("")
        setCurrentEmployee({})
        setModal(false)
    }


    const handleSearch = () => {
        if (searchTerm) {
            const filteredEmployees = employees.filter((employee) =>
                employee._id.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setEmployees(filteredEmployees);
        } else {
            getEmployees();
        }
    };

    const handleCategoryStatus = async (employeeId, employeeCategory) => {

        await updateEmployeeCategory({employeeId, employeeCategory})
        await getEmployees();
      
    }

    return (
        <div>

            <div className="flex justify-between items-center mb-3">
                <strong className="text-gray-700 font-medium">Employee List</strong>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search Here ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border mr-2 px-3 py-1 rounded w-[14rem]"
                    />
                    <button onClick={handleSearch} className="bg-blue-500 text-white px-3 py-1 rounded">
                        Search
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Category</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.length > 0 &&

                            employees.map((e) => (
                                <tr key={e._id}>

                                    <td>{e._id}</td>
                                    <td>{e.name}</td>

                                    <td>{e.phone}</td>
                                    <td>
                                        { categories.length > 0 &&
                                            <select
                                            name="category"
                                            defaultValue={e.employeeCategory}
                                            // onChange={inputHandler}
                                            className="border border-gray-400 p-2 mb-2"
                                            onChange={(element) => handleCategoryStatus(e._id, element.target.value)}
                                         
                                        >
                                            <option value="" disabled>Select Category</option>

                                            {
                                                categories.map((category) => (
                                                    <option key={category._id} value={category._id} > {category.name.charAt(0).toUpperCase() + category.name.slice(1)}</option>
                                                ))
                                            }
                                        </select>
                                        }
                                    </td>
                                    <th>
                                        {
                                            e.employeeBookStatus === "" &&
                                            <button className="btn btn-ghost btn-xs" onClick={() => handleModal(e)}>Book</button>
                                        }

                                        {
                                            e.employeeBookStatus === "booked" &&
                                            <p className='font-bold text-red-600 text-xs uppercase'>Booked</p>
                                        }

                                    </th>
                                </tr>
                            ))
                        }


                    </tbody>


                </table>
            </div>



            <PureModal
                isOpen={modal}
                width='680px'
                // closeButton="close"
                // closeButtonPosition="bottom"
                onClose={() => {
                    setModal(false);
                    return true;
                }}
            >
                <div>
                    <h1 className='text-lg font-bold text-center'>Order Id</h1>
                    <div className='my-2'>
                        <input type="text" placeholder='Order ID' className='border w-full h-10 px-2 rounded' onChange={(e) => setOrderId(e.target.value)} />
                        <p className='m-1 text-xs text-red-700'>{orderIdMessage}</p>
                    </div>
                    <div className='text-center'>
                        <button className='px-2 py-1 bg-blue-700 text-white rounded' onClick={handleBook}>Book</button>
                    </div>
                </div>

            </PureModal>



        </div>
    );
};

export default EmployeeList;