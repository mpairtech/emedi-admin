import { domain } from "../../secret";

const getAllUsers = async ({ search = "", PER_PAGE = 30, page = -1 }) => {
  const response = await fetch(
    `${domain}/panel/customers?search=${search}&PER_PAGE=${PER_PAGE}&page=${page}`,
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

const getUserById = async (userId) => {
  const response = await fetch(`${domain}/panel/customers/${userId}`, {
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

export { getAllUsers, getUserById };
