import React, { useEffect, useState } from "react";
import Loading from "../../pages/Loading/Loading";
import { getAllUsers } from "../../apiCalls/userList";
import { domain } from "../../../secret";
import { useNavigate } from "react-router-dom";
import image from "../../../public/avatar.jpg";
import Pagination from "../../components/Pagination/Pagination";

export const UserList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [totalCustomers, setTotalCustomers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 30;

  const navigate = useNavigate();

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const data = await getAllUsers({
        search: searchTerm,
        PER_PAGE,
        page: currentPage,
      });
      setUsers(data.customers);
      setTotalCustomers(data.totalCustomers);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  if (isLoading) {
    return <Loading />;
  }

  const totalPages = Math.ceil(totalCustomers / PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = async () => {
    const data = await getAllUsers({
      search: searchTerm,
      PER_PAGE,
      page: currentPage,
    });
    setUsers(data.customers);
    setTotalCustomers(data.totalCustomers);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        User List
      </h1>

      <div className="flex justify-end my-5">
        <input
          type="text"
          placeholder="Search By Phone ..."
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
        <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Gender
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  onClick={() => navigate(`/admin/user-detail?id=${user.id}`)}
                  key={user.id}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src={
                            user.image ? `${domain}/files/${user.image}` : image
                          }
                          alt={user.name}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {user.phone}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {user.email ? user.email : "N/A"}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {user.gender ? user.gender : "N/A"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
