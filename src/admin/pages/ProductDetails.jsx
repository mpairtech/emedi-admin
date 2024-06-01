import React, { useEffect, useState } from "react";
import Loading from "../../pages/Loading/Loading";
import { getSingleProduct } from "../../apiCalls/product";
import { useSearchParams } from "react-router-dom";
import { convertTime } from "../../../utils/covertTime";

const ProductInfo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

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

  return (
    <div className="min-h-screen bg-gray-100 py-2">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 my-5">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <div>
          <div>
            <img
              src={`http://localhost:5000/files/${product.image}`}
              alt={product.name}
              className="w-full h-96 rounded-md"
            />
          </div>

          <div className="my-5">
            <hr className="w-3/4 h-1 shadow-md bg-gray-300 rounded" />
          </div>

          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
