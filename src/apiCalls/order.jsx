import { domain } from "../../secret";

const getAllOrders = async (tab, PER_PAGE = 30, page = -1, search) => {
  const response = await fetch(
    `${domain}/panel/orders?tab=${tab}&PER_PAGE=${PER_PAGE}&page=${page}&search=${search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      // body: JSON.stringify(obj)
    }
  );

  const data = await response.json();

  return data;
};

const getSingleOrder = async (orderId) => {
  const response = await fetch(`${domain}/panel/order/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const data = await response.json();
  return data;
};

const updateOrderStatus = async (orderStatus, orderId) => {
  const response = await fetch(`${domain}/panel/order/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({ orderStatus }),
  });

  const data = await response.json();
  return data;
};

const getAllOrdersByUser = async (userId) => {
  const response = await fetch(`${domain}/panel/orders/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    // body: JSON.stringify(obj)
  });

  const data = await response.json();
  return data;
};

export { getAllOrders, getSingleOrder, updateOrderStatus, getAllOrdersByUser };
