import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../apiCalls/product";
import { domain } from "../../../secret";
import Loading from "../../pages/Loading/Loading";
import { getAllCategories } from "../../apiCalls/category";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeTerm, setTypeTerm] = useState("");
  const [categoryTerm, setCategoryTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    setIsLoading(true);
    const data = await getAllProducts();
    setProducts(data.products);
    setIsLoading(false);
  };

  const getCategories = async () => {
    const data = await getAllCategories();
    setCategories(data.categories);
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  const handleSearch = async (type1 = typeTerm, category = categoryTerm) => {
    setIsLoading(true);
    setTypeTerm(type1);
    setCategoryTerm(category);
    const data = await getAllProducts(searchTerm.trim(), -1, type1, category);
    setProducts(data.products);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="border-x border-gray-200 rounded-sm mt-3 overflow-x-auto sticky top-0 h-[95vh]">
        <strong className="text-gray-700 font-medium">All Products</strong>
        <div className="flex justify-end items-center mb-3 gap-5">
          <div className="flex items-center">
            <select
              name="type"
              defaultValue={typeTerm || ""}
              className="w-full border border-gray-400 p-2 mb-2"
              onChange={(e) => handleSearch(e.target.value, categoryTerm)}
            >
              <option value="" disabled>
                Filter By Type
              </option>
              <option value={"MEDICINE"}>Medicine</option>
              <option value={"NONMEDICINE"}>Non Medicine</option>
            </select>
          </div>

          <div className="flex items-center">
            <select
              name="categoryId"
              defaultValue={categoryTerm || ""}
              className="border border-gray-400 p-2 mb-2 w-full"
              onChange={(e) => handleSearch(typeTerm, e.target.value)}
            >
              <option value="" disabled>
                Select Sub Category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-1">
            <input
              type="text"
              placeholder="Search Here ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border  px-3 py-1  w-[14rem] h-10 mb-2"
            />
            <button
              onClick={() => handleSearch(typeTerm, categoryTerm)}
              className="bg-blue-500 text-white px-3 py-1 h-10 mb-2"
            >
              Search
            </button>
          </div>
        </div>

        <table className="w-full text-gray-700 text-xs">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Unit Type</th>
              <th>MRP</th>
              <th>Prescription</th>
              <th>Stock</th>
              <th>View</th>
              <th>Category</th>
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
                    src={`${domain}/files/${product.image}`}
                    alt=""
                    className="w-20 h-10 rounded cursor-pointer"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.type}</td>
                <td>{product.unitType}</td>
                <td>{product.mrp}</td>
                <td>{product.isPrescriptionMandatory ? "Yes" : "No"}</td>
                <td>{product.qtyInStock}</td>
                <td>{product.viewCount}</td>
                <td>{product.category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllProducts;
