import React, { useEffect, useState } from "react";
import { getAllPrescriptions } from "../../apiCalls/prescription";
import { useNavigate } from "react-router-dom";
import Loading from "../../pages/Loading/Loading";

const AllPrescriptions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getPrescriptions = async () => {
    setIsLoading(true);
    const data = await getAllPrescriptions();
    setUsers(data.users);

    setIsLoading(false);
  };

  useEffect(() => {
    getPrescriptions();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Prescriptions
      </h1>
      <div className="shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 md:px-6 lg:px-8 uppercase font-semibold text-xs md:text-sm lg:text-base">
                Name
              </th>
              <th className="py-3 px-4 md:px-6 lg:px-8 uppercase font-semibold text-xs md:text-sm lg:text-base">
                Phone
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users?.map((user) => (
              <tr
                onClick={() => navigate(`/admin/prescription?id=${user.id}`)}
                key={user.id}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="py-3 px-4 md:px-6 lg:px-8 border-b">
                  {user.name}
                </td>
                <td className="py-3 px-4 md:px-6 lg:px-8 border-b">
                  {user.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPrescriptions;
