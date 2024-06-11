import { domain } from "../../secret";

const getAllCoupons = async (search = "", page = -1) => {
  const response = await fetch(`${domain}/panel/cupons`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    // body: JSON.stringify(obj)
  });

  const data = await response.json();
  return data;
};

const addCoupon = async (obj) => {
  const response = await fetch(`${domain}/panel/cupons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(obj),
  });

  const data = await response.json();
  return data;
};

export { getAllCoupons, addCoupon };
