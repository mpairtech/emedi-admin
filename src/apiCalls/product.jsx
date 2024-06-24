import { domain } from "../../secret";

const addProduct = async (formData) => {
  const response = await fetch(`${domain}/panel/products`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};

const getAllProducts = async ({
  search = "",
  page = -1,
  type = "",
  categoryId = "",
  PER_PAGE = 30,
}) => {
  const response = await fetch(
    `${domain}/panel/products?search=${search}&page=${page}&type=${type}&categoryId=${categoryId}&PER_PAGE=${PER_PAGE}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      // body: JSON.stringify(obj)
    }
  );

  const data = await response.json();
  return data;
};

const deleteProduct = async (productId) => {
  const response = await fetch(`${domain}/panel/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const data = await response.json();
  return data;
};

const getSingleProduct = async (productId) => {
  const response = await fetch(`${domain}/panel/products/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'authorization': `Bearer ${localStorage.getItem("token")}`
    },
  });

  const data = await response.json();
  return data;
};

const updateProduct = async (formData, productId) => {
  const response = await fetch(`${domain}/panel/products/${productId}`, {
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

const getLastId = async () => {
  const response = await fetch(`${domain}/panel/product/pid`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();
  return data;
};

export {
  addProduct,
  getAllProducts,
  deleteProduct,
  getSingleProduct,
  updateProduct,
  getLastId,
};
