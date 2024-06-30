import React, { useEffect, useState } from "react";
import Loading from "../../pages/Loading/Loading";
import { getAllOrders, updateOrderStatus } from "../../apiCalls/order";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { getYearMonth } from "../../../utils/getYearMonth";

export const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("PENDING");
  const [pending, setPending] = useState(0);
  const [accepted, setAccepted] = useState(0);
  const [delivered, setDelivered] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 30;

  const navigate = useNavigate();

  const getOrders = async () => {
    setIsLoading(true);
    const data = await getAllOrders(
      selectedTab,
      PER_PAGE,
      currentPage,
      searchTerm
    );
    setOrders(data?.orders || []);
    setPending(data?.pendingCount);
    setAccepted(data?.acceptedCount);
    setDelivered(data?.deliveredCount);
    setTotalOrders(data?.totalOrders);
    setIsLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, [selectedTab, currentPage]);

  const handleTabClick = (tab = "") => {
    setSelectedTab(tab);
  };

  if (isLoading) {
    return <Loading />;
  }

  const totalPages = Math.ceil(totalOrders / PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChangeStatus = async (status, id) => {
    await updateOrderStatus(status, id);
    await getOrders();
  };

  const handleSearch = async () => {
    const data = await getAllOrders(
      selectedTab,
      PER_PAGE,
      currentPage,
      searchTerm
    );
    setOrders(data?.orders || []);
    setPending(data?.pendingCount);
    setAccepted(data?.acceptedCount);
    setDelivered(data?.deliveredCount);
    setTotalOrders(data?.totalOrders);
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => handleTabClick("PENDING")}
          className={`py-2 px-4 rounded relative ${
            selectedTab === "PENDING"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Pending
          {pending > 0 && (
            <div className="h-5 w-5 bg-red-500 text-white rounded-full absolute bottom-6 left-[70px] text-xs flex justify-center items-center">
              {pending < 100 ? pending : "99+"}
            </div>
          )}
        </button>
        <button
          onClick={() => handleTabClick("ACCEPTED")}
          className={`py-2 px-4 rounded relative ${
            selectedTab === "ACCEPTED"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Accepted
          {accepted > 0 && (
            <div className="h-5 w-5 bg-red-500 text-white rounded-full absolute bottom-6 left-[80px] text-xs flex justify-center items-center">
              {accepted < 100 ? accepted : "99+"}
            </div>
          )}
        </button>
        <button
          onClick={() => handleTabClick("DELIVERED")}
          className={`py-2 px-4 rounded relative ${
            selectedTab === "DELIVERED"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Delivered
          {delivered > 0 && (
            <div className="h-5 w-5 bg-red-500 text-white rounded-full absolute bottom-6 left-[75px] text-xs flex justify-center items-center">
              {delivered < 100 ? delivered : "99+"}
            </div>
          )}
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

      <div className="flex justify-end my-5">
        <input
          type="text"
          placeholder="Search By Order Id ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border mr-2 px-3 py-1 rounded w-[14rem]"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Order Id</th>
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
                  onClick={() => navigate(`/admin/order?id=${order.id}`)}
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                >
                  {getYearMonth(order.createdAt) + order.orderId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.userName}
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
