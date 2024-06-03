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
  getLastId,
  getSingleProduct,
  updateProduct,
} from "../../apiCalls/product";
import { useNavigate } from "react-router-dom";
import Modal from "react-responsive-modal";
import { domain } from "../../../secret";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [generics, setGenerics] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState("MEDICINE");
  const [childCategories, setChildCategories] = useState([]);

  const [lastId, setLastId] = useState(null);

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

  const getProductId = async () => {
    setIsLoading(true);
    const data = await getLastId();
    setLastId(data.lastId);
    setIsLoading(false);
  };

  useEffect(() => {
    getProductId();
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
    await getProductId();
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleChildCategory = async (id) => {
    const subCat = categories.filter((category) => category.id === id);
    setChildCategories(subCat[0].children);
  };

  // console.log(childCategories);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="mb-4">
        <strong className="text-gray-700 font-semibold text-xl">
          Add Product
        </strong>
        <div className="bg-gray-100 p-4 rounded-sm flex flex-col items-start mt-2">
          <form onSubmit={productSubmit}>
            <div className="lg:flex gap-4 mb-2">
              <div className="w-1/2">
                <label
                  htmlFor="name"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  Product Type
                </label>
                <select
                  name="type"
                  defaultValue=""
                  className="border border-gray-400 p-2 mb-2 w-full"
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Type
                  </option>

                  <option value="MEDICINE">Medicine</option>

                  <option value="NONMEDICINE">Non Medicine</option>
                </select>
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="pid"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  Product ID
                </label>
                <input
                  type="text"
                  name="pid"
                  placeholder="Product ID"
                  value={lastId ? lastId : "ep-00001"}
                  readOnly
                  required
                  className="border border-gray-400 p-2 mb-2 w-full"
                />
              </div>
            </div>

            <div className="lg:flex gap-4 mb-2">
              <div className="w-1/2">
                <label
                  htmlFor="name"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  required
                  className="border border-gray-400 p-2 mb-2 w-full"
                />
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="mrp"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  MRP Price
                </label>
                <input
                  type="number"
                  name="mrp"
                  placeholder="MRP"
                  required
                  step="0.01"
                  className=" border border-gray-400 p-2 mb-2 w-full"
                />
              </div>
            </div>
            {/* ////////////////////////////////////////////// */}

            <div className="lg:flex gap-4 mb-2">
              <div className="w-1/2">
                <label
                  htmlFor="name"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  Generic Name
                </label>
                <select
                  name="genericId"
                  defaultValue=""
                  className="border border-gray-400 p-2 mb-2 w-full"
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
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="name"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  Company
                </label>
                <select
                  name="compantId"
                  defaultValue=""
                  className="border border-gray-400 p-2 mb-2 w-full"
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
            </div>

            {/* ////////////////////////////////////////////// */}

            <div className="lg:flex gap-4 mb-2">
              <div className="w-1/2">
                <label
                  htmlFor="parentCategory"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  Category
                </label>
                <select
                  name="parentCategory"
                  defaultValue=""
                  className="border border-gray-400 p-2 mb-2 w-full"
                  onChange={(e) => {
                    handleChildCategory(e.target.value);
                  }}
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>

                  {categories.map(
                    (category) =>
                      category.parent === null && (
                        <option key={category.id} value={category.id}>
                          {category.name.charAt(0).toUpperCase() +
                            category.name.slice(1)}
                        </option>
                      )
                  )}
                </select>
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="category"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  Sub Category
                </label>
                <select
                  name="categoryId"
                  defaultValue=""
                  className="border border-gray-400 p-2 mb-2 w-full"
                  required
                >
                  <option value="" disabled>
                    Select Sub Category
                  </option>

                  {childCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name.charAt(0).toUpperCase() +
                        category.name.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div
              className={`gap-4 mb-2 ${
                type === "MEDICINE" ? "lg:flex block" : "hidden"
              }`}
            >
              <div className="w-1/2">
                <label
                  htmlFor="dosageStrength"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  Dosage Strength
                </label>

                <input
                  type="text"
                  name="dosageStrength"
                  placeholder="Dosage Strength"
                  required={type === "MEDICINE" ? true : false}
                  className="border border-gray-400 p-2 mb-2 w-full"
                />
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="dosageForm"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  Dosage Form
                </label>

                <input
                  type="text"
                  name="dosageForm"
                  placeholder="Dosage Form"
                  required={type === "MEDICINE" ? true : false}
                  className="border border-gray-400 p-2 mb-2 w-full"
                />
              </div>
            </div>

            <div className="lg:flex gap-4 mb-2">
              <div className="w-1/2">
                <label
                  htmlFor="b2bSellingPrice"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  B2B Selling Price
                </label>

                <input
                  type="number"
                  name="b2bSellingPrice"
                  placeholder="B2B Selling Price"
                  required
                  className="w-full border border-gray-400 p-2 mb-2"
                  step="0.01"
                />
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="b2bDiscount"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  B2B Discount
                </label>

                <input
                  type="number"
                  name="b2bDiscount"
                  placeholder="B2B Discount"
                  required
                  className="w-full border border-gray-400  p-2 mb-2"
                  step="0.01"
                />
              </div>
            </div>

            <div className="lg:flex gap-4 mb-2">
              <div className="w-1/2">
                <label
                  htmlFor="b2cSellingPrice"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  B2C Selling Price
                </label>

                <input
                  type="number"
                  name="b2cSellingPrice"
                  placeholder="B2C Selling Price"
                  required
                  className="w-full border border-gray-400 p-2 mb-2"
                  step="0.01"
                />
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="b2cDiscount"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  B2C Discount
                </label>

                <input
                  type="number"
                  name="b2cDiscount"
                  placeholder="B2C Discount"
                  required
                  className="w-full border border-gray-400  p-2 mb-2"
                  step="0.01"
                />
              </div>
            </div>

            <div className="lg:flex gap-4 mb-2">
              <div className="w-1/2">
                <label
                  htmlFor="disclaimer"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  Disclaimer
                </label>
                <textarea
                  type="text"
                  name="disclaimer"
                  placeholder="Disclaimer"
                  required
                  className="w-full border border-gray-400 p-2 mb-2 h-10"
                />
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="qtyInStock"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  Stock
                </label>
                <input
                  type="number"
                  name="qtyInStock"
                  placeholder="Stock"
                  required
                  className="w-full border border-gray-400 p-2 mb-2"
                />
              </div>
            </div>
            <div className="lg:flex items-center">
              <div className="flex flex-col justify-center w-1/2  mb-2 ">
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

              <div>
                <label
                  htmlFor="qtyInStock"
                  className="block text-md font-medium text-gray-900 mb-2"
                >
                  Unit Type
                </label>
                <input
                  type="text"
                  name="unitType"
                  placeholder="Unit Type"
                  required
                  className="w-full border border-gray-400 p-2 mb-2"
                />
              </div>
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 px-2 rounded"
              type="submit"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Products;
