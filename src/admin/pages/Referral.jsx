import React, { useState, useEffect } from "react";
import { addRedeemData, getRedeemData } from "../../apiCalls/referral";

const Referral = () => {
  const [redeemCount, setRedeemCount] = useState("");
  const [redeemData, setRedeemData] = useState([]);

  const handleAddRedeem = async () => {
    try {
      const data = await addRedeemData({ redeemCount: parseInt(redeemCount) });

      fetchRedeemData();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRedeemData = async () => {
    try {
      const data = await getRedeemData();
      setRedeemData(data.reDeem);
      const currentCount =
        data.reDeem.length > 0 ? data.reDeem[0].redeemCount : 0;
      setRedeemCount(currentCount);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRedeemData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Referral Limit
        </h1>
        <div className="mb-6">
          <label
            htmlFor="redeemCount"
            className="block text-xl text-gray-700 mb-3"
          >
            Enter Referral Limit:
          </label>
          <input
            type="number"
            id="redeemCount"
            value={redeemCount}
            onChange={(e) => setRedeemCount(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 text-lg"
            placeholder="Enter redeem count"
          />
        </div>
        <button
          onClick={handleAddRedeem}
          className="w-full bg-blue-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Add Referral Limit
        </button>
        {/* <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Referral Data
          </h2>
          <ul className="space-y-4">
            {redeemData.map((item) => (
              <li
                key={item.id}
                className="py-4 px-6 bg-gray-100 rounded-lg shadow-sm flex justify-between text-lg text-gray-700"
              >
                <span>
                  <strong>Count:</strong> {item.redeemCount}
                </span>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Referral;
