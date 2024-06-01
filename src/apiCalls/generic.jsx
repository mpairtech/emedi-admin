const addGeneric = async (name) => {
  const response = await fetch(`http://localhost:5000/panel/generics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(name),
  });

  const data = await response.json();
  return data;
};

const getAllGenerics = async (search = "", page = -1) => {
  const response = await fetch(
    `http://localhost:5000/panel/generics?search=${search}&page=${page}`,
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

const getSingleGeneric = async (genericId) => {
  const response = await fetch(
    `http://localhost:5000/panel/generics/${genericId}`,
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

const deleteGeneric = async (genericId) => {
  const response = await fetch(
    `http://localhost:5000/panel/generics/${genericId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  const data = await response.json();
  return data;
};

const updateGeneric = async ({ genericId, name }) => {
  const response = await fetch(
    `http://localhost:5000/panel/generics/${genericId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ name }),
    }
  );

  const data = await response.json();
  return data;
};

export {
  addGeneric,
  getAllGenerics,
  deleteGeneric,
  getSingleGeneric,
  updateGeneric,
};
