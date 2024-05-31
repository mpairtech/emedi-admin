import { useEffect } from "react";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { getAllCategories } from "../../apiCalls/category";
import Loading from "../../pages/Loading/Loading";
import { getAllGenerics } from "../../apiCalls/generic";
import { getAllCompanies } from "../../apiCalls/company";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../../apiCalls/product";
import { useNavigate } from "react-router-dom";
import Modal from "react-responsive-modal";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [generics, setGenerics] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editedId, setEditedId] = useState("");
  const [editedValue, setEditedValue] = useState({});
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();



  const getProducts = async () => {
    setIsLoading(true);
    const data = await getAllProducts();
    setProducts(data.products);
    setIsLoading(false);
  };

  const getGenerics = async () => {
    setIsLoading(true);
    const data = await getAllGenerics();
    setGenerics(data.generics);
    setIsLoading(false);
  };

  const getCategories = async () => {
    setIsLoading(true);
    const data = await getAllCategories();

    setCategories(data.categories);
    setIsLoading(false);
  };

  const getCompanies = async () => {
    setIsLoading(true);
    const data = await getAllCompanies();
    setCompanies(data.companies);
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
    getGenerics();
    getCategories();
    getCompanies();
  }, []);

  const [isPrescriptionChecked, setIsPrescriptionChecked] = useState(false);

  const productSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    await addProduct(formData);
    await getProducts();
  };

  const handleDelete = async (id) => {
    const data = await deleteProduct(id);
    await getProducts();
  };




  const handleSearch = async () => {
    const data = await getAllProducts(searchTerm.trim(), -1);
    setProducts(data.products);
};

  if (isLoading) {
    return <Loading />;
  }

  const onOpenModal = async (id) => {
    const data = await getSingleProduct(id);
    setEditedId(id);
    setEditedValue(data.product);
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);

    await updateProduct(formData, editedId);

    await getProducts();

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
          Insert Product
        </strong>
        <div className="bg-gray-100 p-4 rounded-sm flex flex-col items-start">
          <form onSubmit={productSubmit}>
            <div className="lg:flex">
              <select
                name="genericId"
                defaultValue=""
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
                required
              >
                <option value="" disabled>
                  Select Generic Name
                </option>

                {generics.map((generic) => (
                  <option key={generic.id} value={generic.id}>
                    {" "}
                    {generic.name.charAt(0).toUpperCase() +
                      generic.name.slice(1)}
                  </option>
                ))}
              </select>

              <select
                name="categoryId"
                defaultValue=""
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
                required
              >
                <option value="" disabled>
                  Select Category
                </option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {" "}
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </option>
                ))}
              </select>

              <select
                name="compantId"
                defaultValue=""
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
                required
              >
                <option value="" disabled>
                  Select Company
                </option>

                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {" "}
                    {company.name.charAt(0).toUpperCase() +
                      company.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:flex">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
              />

              <input
                type="number"
                name="mrp"
                placeholder="MRP"
                required
                step="0.01"
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
              />
            </div>

            <div className="lg:flex">
              <input
                type="text"
                name="dosageStrength"
                placeholder="Dosage Strength"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
              />

              <input
                type="text"
                name="dosageForm"
                placeholder="Dosage Form"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
              />
            </div>

            <div className="lg:flex">
              <input
                type="number"
                name="b2bSellingPrice"
                placeholder="B2B Selling Price"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
                step="0.01"
              />

              <input
                type="number"
                name="b2bDiscount"
                placeholder="B2B Discount"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
                step="0.01"
              />
            </div>

            <div className="lg:flex">
              <input
                type="number"
                name="b2cSellingPrice"
                placeholder="B2C Selling Price"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
                step="0.01"
              />

              <input
                type="number"
                name="b2cDiscount"
                placeholder="B2C Discount"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
                step="0.01"
              />
            </div>

            <div className="lg:flex">
              <textarea
                type="text"
                name="disclaimer"
                placeholder="Disclaimer"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
              />

              <input
                type="number"
                name="qtyInStock"
                placeholder="Stock"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
              />
            </div>

            <div className="lg:flex items-center">
              <div className="flex flex-col justify-center w-1/2 m-5 mb-2 ">
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

              <div className="m-5 p-2 mb-2 flex items-center gap-2 mt-10">
                <input
                  type="checkbox"
                  name="isPrescriptionMandatory"
                  defaultValue={isPrescriptionChecked}
                  checked={isPrescriptionChecked}
                  onChange={() =>
                    setIsPrescriptionChecked(!isPrescriptionChecked)
                  }
                  className="checkbox border border-black"
                />
                <label>Prescription</label>
              </div>

              <select
                name="type"
                defaultValue=""
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2 mt-10"
                required
              >
                <option value="" disabled>
                  Select Type
                </option>

                <option value="MEDICINE">Medicine</option>

                <option value="NONMEDICINE">Non Medicine</option>
              </select>

              <input
                type="text"
                name="unitType"
                placeholder="Unit Type"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2 mt-10"
              />
            </div>

            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 px-2 rounded m-5"
              type="submit"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <strong className="text-gray-700 font-medium">View Products</strong>
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
              <th>Name</th>

              <th>Type</th>
              <th>Unit Type</th>
              <th>MRP</th>
              <th>B2B Selling Price</th>
              <th>B2B Discount</th>
              <th>B2C Selling Price</th>
              <th>B2C Discount</th>
              <th>Prescription</th>
              <th>Stock</th>
              <th>View</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td
                  onClick={() =>
                    navigate(`/admin/product-details?id=${product.id}`)
                  }
                >
                  <img
                    src={`http://localhost:5000/files/${product.image}`}
                    alt=""
                    className="w-20 h-10 rounded cursor-pointer"
                  />
                </td>
                <td>{product.name}</td>

                <td>{product.type}</td>
                <td>{product.unitType}</td>
                <td>{product.mrp}</td>
                <td>{product.b2bSellingPrice}</td>
                <td>{product.b2bDiscount}</td>
                <td>{product.b2cSellingPrice}</td>
                <td>{product.b2cDiscount}</td>
                <td>{product.isPrescriptionMandatory ? "Yes" : "No"}</td>
                <td>{product.qtyInStock}</td>
                <td>{product.viewCount}</td>
                <td>Category</td>
                <td>{product.createdAt}</td>
                <td>{product.updatedAt}</td>

                <td>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1"
                    onClick={() => onOpenModal(product.id)}
                  >
                    <AiFillEdit />
                  </button>

                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded font-bold"
                    onClick={() => handleDelete(product.id)}
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


              <div className="lg:flex gap-10 mt-2">

                <label htmlFor="name" className="w-full">
                  <span className="block mx-5">Product Name</span>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editedValue.name}
                    placeholder="Product Name"
                    required
                    className="w-1/2 lg:w-full border border-gray-400 mx-5 p-2 mb-2"
                  />
                </label>

                <label htmlFor="mrp" className="w-full">
                  <span className="block mx-5">MRP</span>
                  <input
                    type="number"
                    name="mrp"
                    defaultValue={editedValue.mrp}
                    placeholder="MRP"
                    required
                    step="0.01"
                    className="w-1/2 lg:w-full border border-gray-400 mx-5 p-2 mb-2"
                  />
                </label>

              </div>



              <div className="lg:flex gap-10 mt-2">

                <label htmlFor="b2bSellingPrice" className="w-full">
                  <span className="block mx-5">B2B Selling Price</span>
                  <input
                    type="number"
                    name="b2bSellingPrice"
                    defaultValue={editedValue.b2bSellingPrice}
                    placeholder="B2B Selling Price"
                    required
                    className="w-1/2 lg:w-full border border-gray-400 mx-5 p-2 mb-2"
                    step="0.01"
                  />
                </label>

                <label htmlFor="b2bDiscount" className="w-full">
                  <span className="block mx-5">B2B Discount</span>
                  <input
                    type="number"
                    name="b2bDiscount"
                    defaultValue={editedValue.b2bDiscount}
                    placeholder="B2B Discount"
                    required
                    className="w-1/2 lg:w-full border border-gray-400 mx-5 p-2 mb-2"
                    step="0.01"
                  />
                </label>

              </div>

              <div className="lg:flex gap-10 mt-2">
                <label htmlFor="b2cSellingPrice" className="w-full">
                  <span className="block mx-5">B2C Selling Price</span>
                  <input
                    type="number"
                    name="b2cSellingPrice"
                    defaultValue={editedValue.b2cSellingPrice}
                    placeholder="B2C Selling Price"
                    required
                    className="w-1/2 lg:w-full border border-gray-400 mx-5 p-2 mb-2"
                    step="0.01"
                  />
                </label>

                <label htmlFor="b2bDiscount" className="w-full">
                  <span className="block mx-5">B2C Discount</span>
                  <input
                    type="number"
                    name="b2cDiscount"
                    defaultValue={editedValue.b2cDiscount}
                    placeholder="B2C Discount"
                    required
                    className="w-1/2 lg:w-full border border-gray-400 mx-5 p-2 mb-2"
                    step="0.01"
                  />
                </label>

              </div>

              <div className="lg:flex gap-10 mt-2">

              <label htmlFor="name" className="w-full">
                <span className="block mx-5">Unit Type</span>
                <input
                  type="text"
                  name="unitType"
                  defaultValue={editedValue.unitType}
                  placeholder="Unit Type"
                  required
                  className="w-1/2 lg:w-full border border-gray-400 mx-5 p-2 mb-2"
                />
              </label>


                
              <label htmlFor="qtyInStock" className="w-full">
                <span className="block mx-5">Stock</span>
              <input
                  type="number"
                  name="qtyInStock"
                  defaultValue={editedValue.qtyInStock}
                  placeholder="Stock"
                  required
                  className="w-1/2 lg:w-full border border-gray-400 mx-5 p-2 mb-2"
                />
              </label>
                
              </div>

              <label htmlFor="disclaimer" className="w-full mt-2">
                <span className="block mx-5">Disclaimer</span>
              <textarea
                  type=""
                  name="disclaimer"
                  defaultValue={editedValue.disclaimer}
                  placeholder="Disclaimer"
                  required
                  className="w-1/2 lg:w-full border border-gray-400 mx-5 p-2 mb-2"
                />
              </label>

              <div className="lg:flex items-center">
                <div className="flex flex-col justify-center w-1/2 mx-5 mb-2 ">
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


                

              </div>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 px-2 rounded m-5"
                type="submit"
              >
                Edit Product
              </button>
            </form>
          </div>
        </Modal>
      </div >


    </div >
  );
};

export default Products;
