import React, { useEffect, useState } from "react";
import Loading from "../../pages/Loading/Loading";
import { getAllCoupons } from "../../apiCalls/coupon";

export const Coupon = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coupons, setCoupons] = useState([]);

  const getCoupons = async () => {
    setIsLoading(true);
    const data = await getAllCoupons();
    setCoupons(data.cupons);
    console.log(data.cupons);
    setIsLoading(false);
  };

  useEffect(() => {
    getCoupons();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex px-1">
      <div className="flex-1 px-1">this is coupon</div>

      {/* Vertical Line Divider */}
      <div className="border-l border-gray-300 mx-4"></div>

      <div className="flex-1 px-1">
        <h2>Coupon List</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Coupon Name</th>
              <th className="px-4 py-2">Percentage</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">New User</th>
              <th className="px-4 py-2">Timer</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{coupon.name}</td>
                <td className="border px-4 py-2">{coupon.percentage}%</td>
                <td className="border px-4 py-2">
                  {coupon.medicineOffer || coupon.nonMedicineOffer
                    ? "Yes"
                    : "No"}
                </td>
                <td className="border px-4 py-2">
                  {coupon.newUser ? "Yes" : "No"}
                </td>
                <td className="border px-4 py-2">
                  {coupon.timerOffer ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
