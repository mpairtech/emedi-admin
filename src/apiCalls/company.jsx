const addCompany = async (formData) => {

  const response = await fetch(`http://localhost:5000/panel/companies`, {
    method: 'POST',
    headers: {

      // 'authorization': `Bearer ${localStorage.getItem("token")}`
    },
    body: formData

  })

  const data = await response.json();
  return data;

}

const getAllCompanies = async (search = "", page = -1) => {
  const response = await fetch(
    `http://localhost:5000/panel/companies?search=${search}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(obj)
    }
  );

  const data = await response.json();
  return data;
};

const deleteCompany = async (companyId) => {
  const response = await fetch(
    `http://localhost:5000/panel/companies/${companyId}`,
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

const getSingleCompany = async (companyId) => {
  const response = await fetch(
    `http://localhost:5000/panel/companies/${companyId}`,
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

const updateCompany = async (formData, companyId) => {

  const response = await fetch(
    `http://localhost:5000/panel/companies/${companyId}`,
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


export {
  addCompany,
  getAllCompanies,
  deleteCompany,
  getSingleCompany,
  updateCompany
}