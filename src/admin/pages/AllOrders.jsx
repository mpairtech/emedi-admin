import React, { useEffect, useState } from "react";
import Loading from "../../pages/Loading/Loading";
import { getAllOrders, updateOrderStatus } from "../../apiCalls/order";
import { useNavigate } from "react-router-dom";

export const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("PENDING");
  const navigate = useNavigate();

  const getOrders = async () => {
    setIsLoading(true);
    const data = await getAllOrders(selectedTab);
    setOrders(data?.orders || []);
    setIsLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, [selectedTab]);

  const handleTabClick = (tab = "") => {
    setSelectedTab(tab);
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleChangeStatus = async (status, id) => {
    await updateOrderStatus(status, id);
    await getOrders();
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => handleTabClick("PENDING")}
          className={`py-2 px-4 rounded ${
            selectedTab === "PENDING"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => handleTabClick("ACCEPTED")}
          className={`py-2 px-4 rounded ${
            selectedTab === "ACCEPTED"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Accepted
        </button>
        <button
          onClick={() => handleTabClick("DELIVERED")}
          className={`py-2 px-4 rounded ${
            selectedTab === "DELIVERED"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Delivered
        </button>

        <button
          onClick={() => handleTabClick()}
          className={`py-2 px-4 rounded ${
            selectedTab === ""
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                  onClick={() => navigate(`/admin/order?id=${order.id}`)}
                >
                  "USER NAME"
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.phone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.totalPayable}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    name="orderStatus"
                    defaultValue={order.orderStatus}
                    className="border border-gray-400 p-2 mb-2"
                    onChange={(e) =>
                      handleChangeStatus(e.target.value, order.id)
                    }
                    required
                  >
                    <option value="" disabled>
                      Select Sub Category
                    </option>

                    <option value="PENDING">Pending</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="ONPROCESSING">On Processing</option>
                    <option value="ONDELIVER">On Deliver</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
