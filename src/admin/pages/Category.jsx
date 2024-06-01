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

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [radioCategory, setRadioCategory] = useState(true);
  const [editedId, setEditedId] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [open, setOpen] = useState(false);

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

    await addCategory({
      name: form.elements.name.value,
      parentId: form.elements.category.value,
    });

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
    setEditedValue(data.category.name);
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;

    await updateCategory({ name: form.name.value, categoryId: editedId });

    await getCategories();

    onCloseModal();
  };

  const modalStyles = {
    modal: {
      maxWidth: "350px",
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
              <select
                name="category"
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

              <div className=" m-5 p-2 flex gap-2">
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
                <th>Categories</th>
                <th>Created At</th>
                <th>Updated At</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{convertTime(category.createdAt)}</td>
                  <td>{convertTime(category.createdAt)}</td>

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
                <input
                  type="text"
                  name="name"
                  placeholder="Category Name"
                  defaultValue={editedValue}
                  required
                  className="w-full border border-gray-400 m-5 p-2 mb-2"
                />

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
