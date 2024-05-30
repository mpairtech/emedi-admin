import React, { useState } from "react";
import { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { addEmployee, deleteEmployee, getAllEmployees, updateEmployee } from "../../apiCalls/employees";
import Loading from "../../pages/Loading/Loading";

const  Employees = () => {

  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');


  const getEmployees = async () => {
    setIsLoading(true);
    const data = await getAllEmployees();
    setEmployees(data.employees);
    setIsLoading(false)
  }


  useEffect(() => {
    getEmployees();

  }, [])

  const employeeSubmit = async (e) => {
    e.preventDefault();

    const data = await addEmployee({
      name: e.target.name.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
    });
    getEmployees();
  };



  const [editedEmployee, setEditedEmployee] = useState(null);
  const [inputState, setInputState] = useState({});

  

  const handleDelete = async (id) => {
   const data = await deleteEmployee(id);
   getEmployees();

  };

  const editButtonHandler = (id) => {
    setEditedEmployee(id);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  const saveEmployee = async (id) => {

    const editedEmployee = employees.find((employee) => employee._id === id);

    const updatedEmployee = {
      id: editedEmployee._id,
      name: inputState.name || editedEmployee.name,
      address: inputState.address || editedEmployee.address,
      phone: inputState.phone || editedEmployee.phone,
    }

    const data = await updateEmployee(updatedEmployee);
    getEmployees();

    setEditedEmployee(null);
  };

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

  



  if (isLoading) {
    return <Loading />
  }


  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="mb-4">
        <strong className="text-gray-700 font-medium mb-2">Insert Employee</strong>
        <div className="bg-gray-100 p-4 rounded-sm flex flex-col items-start">
          <form onSubmit={employeeSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
            />

            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 px-2 rounded m-5 flex"
              type="submit"
            >
              Add Employee
            </button>
          </form>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <strong className="text-gray-700 font-medium">View Employee</strong>
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
      <div className="border-x border-gray-200 rounded-sm mt-3 overflow-auto sticky top-0 h-[95vh]">
        <table className="w-full text-gray-700 text-xs">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee) => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>
                  {editedEmployee === employee._id ? (
                    <input
                      type="text"
                      name="name"
                      defaultValue={employee.name}
                      onChange={inputHandler}
                    />
                  ) : (
                    employee.name
                  )}
                </td> 
                <td>
                  {editedEmployee === employee._id ? (
                    <input
                      type="text"
                      name="address"
                      defaultValue={employee.address}
                      onChange={inputHandler}
                    />
                  ) : (
                    employee.address
                  )}
                </td>
                <td>
                  {editedEmployee === employee._id ? (
                    <input
                      type="text"
                      name="phone"
                      defaultValue={employee.phone}
                      onChange={inputHandler}
                    />
                  ) : (
                    employee.phone
                  )}
                </td>
                <td>
                  {editedEmployee === employee._id ? (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded font-bold mr-1"
                      onClick={() => saveEmployee(employee._id)}
                    >
                      <RxUpdate />
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1"
                      onClick={() => editButtonHandler(employee._id)}
                    >
                      <AiFillEdit />
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded font-bold"
                    onClick={() => handleDelete(employee._id)}
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;