import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllOrdersByUser } from "../../apiCalls/order";
import Loading from "../../pages/Loading/Loading";
import { getUserById } from "../../apiCalls/userList";
import { getYearMonth } from "../../../utils/getYearMonth";
import { domain } from "../../../secret";
import image from "../../../public/avatar.jpg";

const UserDetail = () => {
  console.log(image);
  //   const user = {
  //     name: "John Doe",
  //     phone: "123-456-7890",
  //     email: "john@example.com",
  //     gender: "Male",
  //     avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  //     orders: [
  //       {
  //         id: "ORD123",
  //         address: "123 Main St, Springfield, USA",
  //         phone: "123-456-7890",
  //         total: "$250.00",
  //         status: "Shipped",
  //       },
  //       {
  //         id: "ORD124",
  //         address: "456 Elm St, Springfield, USA",
  //         phone: "987-654-3210",
  //         total: "$100.00",
  //         status: "Processing",
  //       },
  //       // Add more orders as needed
  //     ],
  //   };

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const data = await getAllOrdersByUser(id);
      setOrders(data.orders);
      //   console.log(data.orders);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    setIsLoading(false);
  };

  const getSingleUser = async () => {
    setIsLoading(true);
    try {
      const data = await getUserById(id);
      setUser(data.user);
      // console.log(data.user);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getSingleUser();
    getOrders();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center">
        <img
          className="w-32 h-32 rounded-full mb-4"
          src={user?.image !== null ? `${domain}/files/${user.image}` : image}
          alt={user.name}
        />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          {user?.name}
        </h1>
        <p className="text-gray-600 mb-2">Phone: {user?.phone}</p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Order History
      </h2>
      <div className="overflow-x-auto">
        <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Payable
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  onClick={() => navigate(`/admin/order?id=${order.id}`)}
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {getYearMonth(order.createdAt) + order.orderId}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {order.address}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {order.phone}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {order.totalPayable}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className={`px-2 py-1 font-semibold leading-tight ${
                        order.orderStatus === "DELIVERED"
                          ? "text-green-800 bg-green-200"
                          : "text-yellow-800 bg-yellow-200"
                      } rounded-full`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
