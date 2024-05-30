import React from 'react';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllUsers } from '../../apiCalls/users';
import { getAllOrders } from '../../apiCalls/orders';
import { getAllServices } from '../../apiCalls/services';
import { getAllCategories } from '../../apiCalls/category';




export default function DashboardStatsGrid() {

  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const getUsers = async()=>{
      const data = await getAllUsers();
      setUsers(data.usersData)
    }

    getUsers();

  },[])



  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    const getAllOrderData = async () => {

      const data = await getAllOrders();

      setOrders(data.orders)

    }

    getAllOrderData();

  },[])


  const [services, setServices] = useState([]);

  useEffect(()=>{
    const getServices = async () => {

      const data = await getAllServices();

      setServices(data.services)

    }

    getServices();

  },[])


  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    const getCategories = async () => {

      const data = await getAllCategories();

      setCategories(data.categories)

    }

    getCategories();

  },[])

  
  


 



    
  return (
    <div className="flex flex-wrap gap-4">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Users
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {users.length}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Orders</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {orders.length}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Services</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {services.length}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Categories</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {categories.length}
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center w-full sm:w-1/2 lg:w-1/4">
      {children}
    </div>
  );
}