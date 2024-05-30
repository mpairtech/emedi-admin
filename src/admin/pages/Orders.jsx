import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../apiCalls/orders';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getAllOrderData = async () => {
    const data = await getAllOrders();
    setOrders(data.orders);
  };

  useEffect(() => {
    getAllOrderData();
  }, []);

  const currentStatus = [
    "pending",
    "reviewing",
    "confirmed",
    "on the way",
    "serviced",
    "canceled",
    "failed"
  ];

  const handleChangedStatus = async (orderId, status) => {
    const data = await updateOrderStatus({ orderId, status });
    getAllOrderData();
  };

  const handleSearch = () => {
    if (searchTerm) {
      const filteredOrders = orders.filter((order) =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase())
        
      );
      setOrders(filteredOrders);
    } else {
      getAllOrderData();
    }
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 overflow-x-auto">
      <div className="flex justify-between items-center mb-3">
        <strong className="text-gray-700 font-medium">View Orders</strong>
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

      <div className="border-x border-gray-200 rounded-sm mt-3 overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr>
              <th className="py-2">Order ID</th>
              <th className="py-2">Service Name</th>
              <th className="py-2">Order Date</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td className="py-2">{order._id}</td>
                <td className="py-2">{order.serviceId.title}</td>
                <td className="py-2">{moment(order.createdAt).format('DD/MM/YYYY, hh:mm A')}</td>
                <td className="py-2">৳{order.amount}</td>
                <td className="py-2">
                  <span
                    className={`inline-block py-1 px-2 rounded capitalize w-24 text-center ${order.status === 'reviewing' ? 'bg-pink-700 text-white' : order.status === 'confirmed' ? 'bg-blue-700 text-white' : order.status === 'on the way' ? 'bg-yellow-700 text-white' : order.status === 'serviced' ? 'bg-green-700 text-white' : order.status === 'canceled' ? 'text-gray-600 font-bold italic' : order.status === 'failed' ? 'bg-red-600 text-white' : 'bg-gray-700 text-white'}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2">
                  <select
                    name='status'
                    defaultValue={order.status}
                    className="w-full border p-2 rounded capitalize"
                    onChange={(e) => handleChangedStatus(order._id, e.target.value)}
                  >
                    {currentStatus.map((element) => (
                      <option key={element} value={element} className="capitalize">
                        {element}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
