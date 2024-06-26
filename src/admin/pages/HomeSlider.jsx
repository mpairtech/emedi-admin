import React, { useEffect, useState } from "react";
import {
  addCategorySlider,
  addHomeSlider,
  addSecondaryHomeSlider,
  deleteCategorySlider,
  deleteHomeSlider,
  deleteSecondaryHomeSlider,
  getAllCategorySliders,
  getAllHomeSliders,
  getAllSecondaryHomeSliders,
} from "../../apiCalls/slider";
import { domain } from "../../../secret";

const HomeSlider = () => {
  const [activeTab, setActiveTab] = useState("slider");
  const [sliderList, setSliderList] = useState([]);
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const handleHomeSlider = async () => {
      const formData = new FormData(form);

      const data = await addHomeSlider(formData);
      await handleGetHomeSliders();
    };

    const handleSecondaryHomeSlider = async () => {
      const formData = new FormData(form);

      const data = await addSecondaryHomeSlider(formData);
      await handleGetSecondarySliders();
    };

    const handleCategorySlider = async () => {
      const formData = new FormData(form);

      const data = await addCategorySlider(formData);
      await handleGetCategorySliders();
    };

    if (form.image.value && form.description.value) {
      switch (activeTab) {
        case "slider":
          handleHomeSlider();
          break;
        case "secondarySlider":
          handleSecondaryHomeSlider();
          break;
        case "categorySlider":
          handleCategorySlider();
          break;
        default:
          break;
      }

      form.reset();
      setDescription("");
    }
  };

  const handleDeleteHomeSlider = async (sliderId) => {
    const data = await deleteHomeSlider(sliderId);
    await handleGetHomeSliders();
  };

  const handleDeleteSecondarySlider = async (sliderId) => {
    const data = await deleteSecondaryHomeSlider(sliderId);
    await handleGetSecondarySliders();
  };

  const handleDeleteCategeorySlider = async (sliderId) => {
    const data = await deleteCategorySlider(sliderId);
    await handleGetCategorySliders();
  };

  const handleDelete = (id) => {
    switch (activeTab) {
      case "slider":
        handleDeleteHomeSlider(id);
        break;
      case "secondarySlider":
        handleDeleteSecondarySlider(id);
        break;
      case "categorySlider":
        handleDeleteCategeorySlider(id);
        break;
      default:
        break;
    }
  };

  const handleGetHomeSliders = async () => {
    const data = await getAllHomeSliders();
    setSliderList(data.sliders);
  };

  const handleGetSecondarySliders = async () => {
    const data = await getAllSecondaryHomeSliders();
    setSliderList(data.sliders);
  };

  const handleGetCategorySliders = async () => {
    const data = await getAllCategorySliders();
    setSliderList(data.sliders);
  };

  useEffect(() => {
    if (activeTab === "slider") {
      handleGetHomeSliders();
    }

    if (activeTab === "secondarySlider") {
      handleGetSecondarySliders();
    }

    if (activeTab === "categorySlider") {
      handleGetCategorySliders();
    }
  }, [activeTab]);

  const renderSliders = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sliderList.map((slider) => (
          <div key={slider.id} className="border rounded-lg p-4">
            <img
              src={`${domain}/files/${slider.image}`}
              alt={`Slider ${slider.id}`}
              className="w-full h-48 object-cover mb-2"
            />
            <p className="text-center text-lg">{slider.description}</p>
            <button
              onClick={() => handleDelete(slider.id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Marketing Sliders</h1>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("slider")}
          className={`mr-4 px-4 py-2 ${
            activeTab === "slider" ? "bg-indigo-500 text-white" : "bg-gray-200"
          }`}
        >
          Home Slider
        </button>
        <button
          onClick={() => setActiveTab("secondarySlider")}
          className={`mr-4 px-4 py-2 ${
            activeTab === "secondarySlider"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Secondary Slider
        </button>
        <button
          onClick={() => setActiveTab("categorySlider")}
          className={`px-4 py-2 ${
            activeTab === "categorySlider"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Category Slider
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
        >
          Add Slider
        </button>
      </form>

      {renderSliders()}
    </div>
  );
};

export default HomeSlider;
