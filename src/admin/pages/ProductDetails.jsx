import React, { useEffect, useState } from "react";
import Loading from "../../pages/Loading/Loading";
import {
  deleteProduct,
  getSingleProduct,
  updateProduct,
} from "../../apiCalls/product";
import { useNavigate, useSearchParams } from "react-router-dom";
import { convertTime } from "../../../utils/covertTime";
import { domain } from "../../../secret";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import Modal from "react-responsive-modal";
import Barcode from "react-barcode";

const ProductInfo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [editedId, setEditedId] = useState("");
  const [editedValue, setEditedValue] = useState({});
  const [open, setOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const navigate = useNavigate();

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const data = await getSingleProduct(id);
      setProduct(data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const onOpenModal = async () => {
    const data = await getSingleProduct(id);
    setEditedId(id);
    setEditedValue(data.product);
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);

  const handleDelete = async () => {
    const data = await deleteProduct(id);
    navigate("/admin/product");
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);

    await updateProduct(formData, editedId);
    await getProduct();

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
    <div className="min-h-screen bg-gray-100 py-2">
      <div className=" mx-auto bg-white shadow-md rounded p-6 my-5">
        <div className="mb-2">
          <button
            onClick={onOpenModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1"
          >
            <AiFillEdit />
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded font-bold"
          >
            <MdDeleteForever />
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="md:w-2/3 md:pr-4">
            <p className="my-1">
              <strong>MRP:</strong> {product.mrp}
            </p>
            <p className="my-1">
              <strong>Category:</strong> {product.category.name}
            </p>
            <p className="my-1">
              <strong>Type:</strong> {product.type}
            </p>
            <p className="my-1">
              <strong>Unit Type:</strong> {product.unitType}
            </p>
            <p className="my-1">
              <strong>B2B Selling Price:</strong> {product.b2bSellingPrice}
            </p>
            <p className="my-1">
              <strong>B2B Discount:</strong> {product.b2bDiscount}
            </p>
            <p className="my-1">
              <strong>B2C Selling Price:</strong> {product.b2cSellingPrice}
            </p>
            <p className="my-1">
              <strong>B2C Discount:</strong> {product.b2cDiscount}
            </p>
            <p className="my-1">
              <strong>Quantity in Stock:</strong> {product.qtyInStock}
            </p>
            <p className="my-1">
              <strong>Prescription Required:</strong>{" "}
              {product.isPrescriptionMandatory ? "Yes" : "No"}
            </p>
            <p className="my-1">
              <strong>View Count:</strong> {product.viewCount}
            </p>
            <p className="my-1">
              <strong>Created At:</strong> {convertTime(product.createdAt)}
            </p>
            <p className="my-1">
              <strong>Updated At:</strong> {convertTime(product.updatedAt)}
            </p>
            <p className="my-5 text-justify">
              <strong>Disclaimer:</strong> {product.disclaimer}
            </p>

            <div>
              <Barcode value={product.pid} width={2} height={50} margin={0} />
            </div>
          </div>
          <div className="md:w-1/3">
            <img
              src={`${domain}/files/${product.image}`}
              alt={product.name}
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default ProductInfo;
