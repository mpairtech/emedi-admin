import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Loading from "../../pages/Loading/Loading";
import { getSingleOrder } from "../../apiCalls/order";

const Order = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  const getOrder = async () => {
    setIsLoading(true);
    try {
      const data = await getSingleOrder(id);
      setOrder(data.order);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getOrder();
  }, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="p-4 bg-white rounded-md" ref={componentRef}>
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        <div className="mb-4">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>User ID:</strong> {order.userId}
          </p>
          <p>
            <strong>Address:</strong> {order.address}
          </p>
          <p>
            <strong>Phone:</strong> {order.phone}
          </p>

          <p>
            <strong>Cupon Name:</strong> {order.cuponName || "N/A"}
          </p>
          <p>
            <strong>Paid Amount:</strong>{" "}
            {order.paidAmount ? `$${order.paidAmount}` : "N/A"}
          </p>
          <p>
            <strong>Due Amount:</strong>{" "}
            {order.dueAmount ? `$${order.dueAmount}` : "N/A"}
          </p>
          <p>
            <strong>Payment ID:</strong> {order.paymentId || "N/A"}
          </p>

          <p>
            <strong>Ordered At:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Ordered Products</h3>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Product Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Category</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Subcategory
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {order.OrderedProduct.map((product) => (
                  <tr key={product.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.productId}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.ParentCatName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.subCatName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.qty}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${product.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <div className="text-right">
              <p className="mb-1">
                <strong>Subtotal:</strong> ${order.subtotal}
              </p>
              <p className="mb-1">
                <strong>Discount:</strong>{" "}
                {order.discount ? `$${order.discount}` : "N/A"}
              </p>
              <p className="mb-1">
                <strong>Total Payable:</strong> ${order.totalPayable}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default Order;
