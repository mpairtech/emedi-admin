const addProduct = async (formData) => {
  const response = await fetch(`http://localhost:5000/panel/products`, {
    method: "POST",
    headers: {
      // 'authorization': `Bearer ${localStorage.getItem("token")}`
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};

const getAllProducts = async (search = "", page = -1) => {
  const response = await fetch(
    `http://localhost:5000/panel/products?search=${search}&page=${page}`,
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
  const response = await fetch(
    `http://localhost:5000/panel/products/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'authorization': `Bearer ${localStorage.getItem("token")}`
      },
    }
  );

  const data = await response.json();
  return data;
};

const getSingleProduct = async (productId) => {
  const response = await fetch(
    `http://localhost:5000/panel/products/${productId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'authorization': `Bearer ${localStorage.getItem("token")}`
      },
    }
  );

  const data = await response.json();
  return data;
};

const updateProduct= async (formData, productId) => {

  const response = await fetch(
    `http://localhost:5000/panel/products/${productId}`,
    {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        // authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    }
  );

  const data = await response.json();
  return data;
};

export { addProduct, getAllProducts, deleteProduct, getSingleProduct, updateProduct };
