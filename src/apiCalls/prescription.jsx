import { domain } from "../../secret";

const getAllPrescriptions = async () => {
  const response = await fetch(`${domain}/panel/prescription`, {
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

const getAllPrescriptionsByUser = async (userId) => {
  const response = await fetch(`${domain}/panel/prescription/${userId}`, {
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

export { getAllPrescriptions, getAllPrescriptionsByUser };
