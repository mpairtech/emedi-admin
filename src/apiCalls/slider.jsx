import { domain } from "../../secret";

const addHomeSlider = async (formData) => {
  const response = await fetch(`${domain}/panel/home-slider`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};

const getAllHomeSliders = async () => {
  const response = await fetch(`${domain}/panel/home-slider`, {
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

const addSecondaryHomeSlider = async (formData) => {
  const response = await fetch(`${domain}/panel/secondary-home-slider`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};

const getAllSecondaryHomeSliders = async () => {
  const response = await fetch(`${domain}/panel/secondary-home-slider`, {
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

const addCategorySlider = async (formData) => {
  const response = await fetch(`${domain}/panel/category-slider`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};

const getAllCategorySliders = async () => {
  const response = await fetch(`${domain}/panel/category-slider`, {
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

const deleteHomeSlider = async (sliderId) => {
  const response = await fetch(`${domain}/panel/home-slider/${sliderId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const data = await response.json();
  return data;
};

const deleteSecondaryHomeSlider = async (sliderId) => {
  const response = await fetch(
    `${domain}/panel/secondary-home-slider/${sliderId}`,
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

const deleteCategorySlider = async (sliderId) => {
  const response = await fetch(`${domain}/panel/category-slider/${sliderId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const data = await response.json();
  return data;
};

export {
  addHomeSlider,
  getAllHomeSliders,
  addSecondaryHomeSlider,
  getAllSecondaryHomeSliders,
  addCategorySlider,
  getAllCategorySliders,
  deleteHomeSlider,
  deleteSecondaryHomeSlider,
  deleteCategorySlider,
};
