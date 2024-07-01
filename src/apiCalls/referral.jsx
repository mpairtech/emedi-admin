import { domain } from "../../secret";

const getRedeemData = async () => {
  const response = await fetch(`${domain}/panel/redeem`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const data = await response.json();
  return data;
};

const addRedeemData = async (obj) => {
  const response = await fetch(`${domain}/panel/redeem`, {
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

export { getRedeemData, addRedeemData };
