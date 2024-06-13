import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Loading from "../../pages/Loading/Loading";
import { getSingleOrder } from "../../apiCalls/order";
import logo from "../../../public/rhs-logo.png";

const Order = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState({});
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

  const calculateTotal = () => {
    return (
      order.OrderedProduct?.reduce(
        (total, item) => total + item.qty * item.price,
        0
      ) || 0
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div
        className="p-8 bg-white rounded-md w-full mx-auto"
        ref={componentRef}
      >
        <div className="flex justify-between items-center border-b pb-6 mb-6">
          <div>
            <img src={logo} alt="Company Logo" className="h-16" />
            <h2 className="text-3xl font-bold">Your Company Name</h2>
            <p className="text-sm">1234 Market St, San Francisco, CA 94103</p>
            <p className="text-sm">(123) 456-7890</p>
          </div>
          <div className="text-right">
            <p className="text-sm">
              Date: {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="text-sm">Invoice #: {order.id}</p>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Bill To:</h3>
          <table className="table-auto w-full border-collapse border border-gray-200 mb-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">User ID</th>
                <th className="border border-gray-300 px-4 py-2">User Name</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  {order.userId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.userName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.phone}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Order Details:</h3>
          <table className="table-auto w-full border-collapse border border-gray-200 mb-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Order ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  Coupon Name
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Paid Amount
                </th>
                <th className="border border-gray-300 px-4 py-2">Due Amount</th>
                <th className="border border-gray-300 px-4 py-2">Payment ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.cuponName || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.paidAmount ? `$${order.paidAmount}` : "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.dueAmount ? `$${order.dueAmount}` : "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.paymentId || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
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
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {order.OrderedProduct?.map((product) => (
                  <tr key={product.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.productId}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.subCatName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.qty}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${product.price.toFixed(2)}
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
                <strong>Subtotal:</strong> ${calculateTotal().toFixed(2)}
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
        <div className="text-center text-sm mt-6">
          <p>Thank you for your business!</p>
          <p>If you have any questions about this invoice, please contact</p>
          <p>(123) 456-7890 or email@example.com</p>
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
