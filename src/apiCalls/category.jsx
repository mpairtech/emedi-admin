import { domain } from "../../secret";

const addCategory = async (formData) => {
  const response = await fetch(`${domain}/panel/categories`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};

const getAllCategories = async () => {
  const response = await fetch(`${domain}/panel/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //   authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    // body: JSON.stringify(obj)
  });

  const data = await response.json();
  return data;
};

const deleteCategory = async (categoryId) => {
  const response = await fetch(`${domain}/panel/categories/${categoryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const data = await response.json();
  return data;
};

const getSingleCategory = async (categoryId) => {
  const response = await fetch(`${domain}/panel/categories/${categoryId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'authorization': `Bearer ${localStorage.getItem("token")}`
    },
  });

  const data = await response.json();
  return data;
};

// const updateCategory = async ({ name, categoryId }) => {
//   const response = await fetch(`${domain}/panel/categories/${categoryId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//     },
//     body: JSON.stringify({ name }),
//   });

//   const data = await response.json();
//   return data;
// };

const updateCategory = async (formData, categoryId) => {
  const response = await fetch(`${domain}/panel/categories/${categoryId}`, {
    method: "PUT",
    headers: {
      // "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};

export {
  addCategory,
  getAllCategories,
  deleteCategory,
  getSingleCategory,
  updateCategory,
};
