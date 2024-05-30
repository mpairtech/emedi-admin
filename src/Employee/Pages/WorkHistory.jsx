import React, { useContext, useEffect, useState } from "react";
import { getWorkHistory } from "../../apiCalls/employees";
import { AuthContext } from "../../components/providers/AuthProvider";

const WorkHistory = () => {
  const { user } = useContext(AuthContext);
  const [workHistory, setWorkHistory] = useState([]);

  const getHistoryWork = async () => {
    const data = await getWorkHistory(user[0]?._id);
    setWorkHistory(data.workHistory);
  };

  useEffect(() => {
    getHistoryWork();
  }, [user]);

  return (
    <div>
      <div className="text-2xl font-bold text-center my-5">History</div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Order ID</th>
                <th>CustomerId</th>
                <th>Customer Name</th>
                <th>Category</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {workHistory.length > 0 &&
                workHistory.map((e) => (
                  <tr key={e._id}>
                    <td>{e.orderId}</td>
                    <td>{e.userId}</td>
                    <td>{e.userName}</td>

                    <td className="capitalize">{e.category}</td>
                    <td>{e.userAddress}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkHistory;
