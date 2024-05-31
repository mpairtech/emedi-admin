import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-responsive-modal";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import {
  addCompany,
  deleteCompany,
  getAllCompanies,
  getSingleCompany,
  updateCompany,
} from "../../apiCalls/company";

import Loading from "../../pages/Loading/Loading";

const Company = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [editedId, setEditedId] = useState("");
  const [editedValue, setEditedValue] = useState({});
  const [open, setOpen] = useState(false);

  const getCompanies = async () => {
    setIsLoading(true);
    const data = await getAllCompanies();
    setCompanies(data.companies);
    setIsLoading(false);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const companySubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);

    await addCompany(formData);

    await getCompanies();
  };

  const handleDelete = async (id) => {
    const data = await deleteCompany(id);
    getCompanies();
  };

  const handleSearch = async () => {
    const data = await getAllCompanies(searchTerm.trim(), -1);
    setCompanies(data.companies);
};

  if (isLoading) {
    return <Loading />;
  }

  const onOpenModal = async (id) => {
    const data = await getSingleCompany(id);
    setEditedId(id);
    setEditedValue(data.company);
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);

    await updateCompany(formData, editedId);

    await getCompanies();

    onCloseModal();
  };

  const modalStyles = {
    modal: {
      maxWidth: "800px",
      width: "50%",
      padding: "20px",
    },
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="mb-4">
        <strong className="text-gray-700 font-medium mb-2">
          Insert Company
        </strong>
        <div className="bg-gray-100 p-4 rounded-sm items-start">
          <form onSubmit={companySubmit}>
            <input
              type="text"
              name="name"
              placeholder="Company Name"
              required
              className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
            />

            <textarea
              name="description"
              placeholder="Company Description"
              required
              className="w-1/2 border border-gray-400 m-5 p-2 mb-2 h-32 resize-y"
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

            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 px-2 rounded m-5"
              type="submit"
            >
              Add Company
            </button>
          </form>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <strong className="text-gray-700 font-medium">View Companies</strong>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Here ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border mr-2 px-3 py-1 rounded w-[14rem]"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Search
          </button>
        </div>
      </div>
      <div className="border-x border-gray-200 rounded-sm mt-3 overflow-x-auto sticky top-0 h-[95vh]">
        <table className="w-full text-gray-700 text-xs">
          <thead>
            <tr>
              <th>Image</th>
              <th>Company Name</th>

              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>
                  <img
                    className="h-10 w-20 rounded"
                    src={`http://localhost:5000/files/${company.image}`}
                    alt=""
                  />
                </td>
                <td>{company.name}</td>

                <td>{company.description}</td>

                <td>{company.createdAt}</td>

                <td>{company.updatedAt}</td>

                <td>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1"
                    onClick={() => onOpenModal(company.id)}
                  >
                    <AiFillEdit />
                  </button>

                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded font-bold"
                    onClick={() => handleDelete(company.id)}
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
          <div className="bg-gray-100 p-4 rounded-sm items-start">
            <form onSubmit={handleEdit}>
              <input
                type="text"
                name="name"
                placeholder="Company Name"
                defaultValue={editedValue.name}
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
              />

              <textarea
                name="description"
                placeholder="Company Description"
                defaultValue={editedValue.description}
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2 h-32 resize-y"
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
                />
              </div>

              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 px-2 rounded m-5"
                type="submit"
              >
                Edit Company
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Company;
