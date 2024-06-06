import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-responsive-modal";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../../apiCalls/category";

import Loading from "../../pages/Loading/Loading";
import { convertTime } from "../../../utils/covertTime";
import { domain } from "../../../secret";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [radioCategory, setRadioCategory] = useState(true);
  const [editedId, setEditedId] = useState("");
  const [editedValue, setEditedValue] = useState({});
  const [open, setOpen] = useState(false);
  const [homeView, setHomeView] = useState(false);

  const getCategories = async () => {
    setIsLoading(true);
    const data = await getAllCategories();
    setCategories(data.categories);
    setIsLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const categorySubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);

    await addCategory(formData);

    await getCategories();
  };

  const handleDelete = async (id) => {
    const data = await deleteCategory(id);
    getCategories();
  };

  if (isLoading) {
    return <Loading />;
  }

  const onOpenModal = async (id) => {
    const data = await getSingleCategory(id);
    setEditedId(id);
    setEditedValue(data.category);
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);

    await updateCategory(formData, editedId);

    await getCategories();

    onCloseModal();
  };

  const modalStyles = {
    modal: {
      maxWidth: "390px",
      width: "50%",
      padding: "20px",
    },
  };

  return (
    <>
      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <div className="mb-4">
          <strong className="text-gray-700 font-medium mb-2">
            Insert Category
          </strong>
          <div className="bg-gray-100 p-4 rounded-sm flex flex-col items-start">
            <form onSubmit={categorySubmit}>
              <div className=" mx-5 p-2 flex gap-4">
                <label htmlFor="category" className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="categoryRadio"
                    className="radio-xs"
                    checked={radioCategory}
                    onChange={() => setRadioCategory(true)}
                  />
                  Category
                </label>

                <label
                  htmlFor="subCategory"
                  className="flex items-center gap-1"
                >
                  <input
                    type="radio"
                    name="subCategoryRadio"
                    className="radio-xs"
                    checked={!radioCategory}
                    onChange={() => setRadioCategory(false)}
                  />
                  Sub Category
                </label>
                <label htmlFor="homeView" className="flex items-center gap-1">
                  <input
                    name="homeView"
                    type="checkbox"
                    checked={homeView}
                    onChange={() => setHomeView(!homeView)}
                    className="checkbox-xs"
                  />
                  Home View
                </label>
              </div>
              <select
                name="parentId"
                defaultValue=""
                className="w-full border border-gray-400 m-5 p-2 mb-2"
                required={!radioCategory && true}
              >
                <option value="" disabled>
                  Select Parent Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={!radioCategory ? category.id : ""}
                    disabled={radioCategory}
                  >
                    {" "}
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="name"
                placeholder="Category Name"
                required
                className="w-full border border-gray-400 m-5 p-2 mb-2"
              />

              <div className="flex flex-col w-1/2 m-5 mb-2 ">
                <label htmlFor="image" className="mb-1 text-gray-700 font-bold">
                  Add Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  id="image"
                  className="border border-gray-400 p-2"
                  required
                />
              </div>
              <div>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 px-2 rounded m-5"
                  type="submit"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <strong className="text-gray-700 font-medium">View Categories</strong>
        </div>
        <div className="border-x border-gray-200 rounded-sm mt-3 overflow-x-auto sticky top-0 h-[95vh]">
          <table className="w-full text-gray-700 text-xs">
            <thead>
              <tr>
                <th>Image</th>
                <th>Categories</th>
                <th>Home View</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <img
                      className="h-10 w-20 rounded"
                      src={`${domain}/files/${category.image}`}
                      alt=""
                    />
                  </td>
                  <td>{category.name}</td>
                  <td>{category.homeView ? "Yes" : "No"}</td>
                  <td>{convertTime(category.createdAt)}</td>
                  <td>{convertTime(category.updatedAt)}</td>

                  <td>
                    <button
                      onClick={() => onOpenModal(category.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1"
                    >
                      <AiFillEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded font-bold"
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* modal */}

        <div>
          <Modal open={open} onClose={onCloseModal} center styles={modalStyles}>
            <div className="bg-gray-100 p-4 rounded-sm flex flex-col items-start">
              <form onSubmit={handleEdit}>
                <label
                  htmlFor="homeView"
                  className="flex items-center gap-1 mx-3 p-2 mb-2"
                >
                  <input
                    name="homeView"
                    type="checkbox"
                    defaultChecked={editedValue.homeView}
                    className="checkbox-xs"
                  />
                  Home View
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Category Name"
                  defaultValue={editedValue.name}
                  required
                  className=" border border-gray-400 m-5 p-2 mb-2"
                />
                <div className="flex flex-col w-1/2 m-5 mb-2 ">
                  <label
                    htmlFor="image"
                    className="mb-1 text-gray-700 font-bold"
                  >
                    Add Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    id="image"
                    className="border border-gray-400 p-2"
                  />
                </div>
                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 px-2 rounded m-5"
                    type="submit"
                  >
                    Edit Category
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Categories;
