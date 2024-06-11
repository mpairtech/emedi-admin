import React, { useEffect, useState } from "react";
import Loading from "../../pages/Loading/Loading";
import { addCoupon, getAllCoupons } from "../../apiCalls/coupon";
import { getAllProducts } from "../../apiCalls/product";
import { getParentCategories } from "../../apiCalls/category";

export const Coupon = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coupons, setCoupons] = useState([]);
  const [couponType, setCouponType] = useState("");
  const [mediOrNonMedi, setMediOrNonMedi] = useState("MEDICINE");
  const [products, setProducts] = useState([]);
  const [searchedItem, setSearchedItem] = useState("");
  const [productId, setProductId] = useState([]);
  const [productName, setProductName] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleGetProducts = async (searchedItem = "", type = "MEDICINE") => {
    setMediOrNonMedi(type);
    setSearchedItem("");
    setProductName([]);
    setProductId([]);

    if (searchedItem) {
      const page = -1;
      const type = mediOrNonMedi;
      const categoryId = "";

      const data = await getAllProducts(searchedItem, page, type, categoryId);
      setProducts(data.products);
    } else {
      setProducts([]);
    }
  };

  const handleClickProduct = async (id, name) => {
    if (!productId.includes(id)) {
      setProductId([...productId, id]);
      setProductName([...productName, name]);
    }
  };

  const getCoupons = async () => {
    setIsLoading(true);
    const data = await getAllCoupons();
    setCoupons(data.cupons);

    setIsLoading(false);
  };

  const getCategories = async () => {
    setIsLoading(true);
    const data = await getParentCategories();

    setParentCategories(data.categories);
    setIsLoading(false);
  };

  const handleCuponSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Get date and time values
    const startDate = form.startDate.value;
    const startTime = form.startTime.value;
    const endDate = form.endDate.value;
    const endTime = form.endTime.value;

    // Combine date and time and convert to timestamp
    const startDateTime = new Date(`${startDate} ${startTime}`).getTime();
    const endDateTime = new Date(`${endDate} ${endTime}`).getTime();

    if (couponType === "timerOffer") {
      const obj = {
        percentage: form.percentage.value,
        name: form.name.value,
        timerOffer: true,
        start: startDateTime,
        end: endDateTime,
      };

      await addCoupon(obj);
    }

    if (couponType === "newAccountOffer") {
      const obj = {
        percentage: form.percentage.value,
        name: form.name.value,
        newAccountOffer: true,
        start: startDateTime,
        end: endDateTime,
      };
      await addCoupon(obj);
    }

    if (couponType === "typeOffer") {
      if (productId.length > 0) {
        if (mediOrNonMedi === "MEDICINE") {
          const obj = {
            percentage: form.percentage.value,
            name: form.name.value,
            medicineOffer: true,
            mediProductId: productId,
            start: startDateTime,
            end: endDateTime,
          };
          await addCoupon(obj);
        }

        if (mediOrNonMedi === "NONMEDICINE") {
          const obj = {
            percentage: form.percentage.value,
            name: form.name.value,
            nonMedicineOffer: true,
            nonMediProductId: productId,
            start: startDateTime,
            end: endDateTime,
          };
          await addCoupon(obj);
        }
      }
    }

    if (couponType === "categoryOffer") {
      const obj = {
        percentage: form.percentage.value,
        name: form.name.value,
        categoryOffer: true,
        start: startDateTime,
        end: endDateTime,
        categoryId: [selectedCategory],
      };
      await addCoupon(obj);
    }

    // const obj = {
    //   percentage: form.percentage.value,
    //   name: form.name.value,
    //   timer: false,
    //   categoryOffer: false,
    //   medicineOffer: false,
    //   nonMedicineOffer: false,
    //   timerOffer: false,
    //   newAccountOffer: false,
    //   start: "",
    //   end: "",
    // };

    // console.log(Date.now().getTime());
    // console.log(startDateTime);

    // const formattedDateTime = {
    //   start: new Date(startDateTime).toLocaleString(),
    //   end: new Date(endDateTime).toLocaleString(),
    // };

    // console.log("Converted to previous format:", formattedDateTime.start);

    // await addProduct(formData);
    // await getProductId();

    await getCoupons();
  };

  useEffect(() => {
    getCategories();
    getCoupons();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex px-1">
      <div className="flex-1 px-1">
        <form onSubmit={handleCuponSubmit}>
          {/* Select Box */}
          <div>
            <select
              defaultValue={couponType}
              onChange={(e) => setCouponType(e.target.value)}
              className="select select-bordered w-full max-w-xs"
              required
            >
              <option value="" disabled>
                Select Coupon Type
              </option>
              <option value="timerOffer">Timer Coupon</option>
              <option value="categoryOffer">Category Coupon</option>
              <option value="newAccountOffer">New User Coupon</option>
              <option value="typeOffer">
                Medicine / Non Medicine Type Coupon
              </option>
            </select>
          </div>

          {/* Select medicine type */}
          <div className={`${couponType !== "typeOffer" && "hidden"}`}>
            <select
              defaultValue={mediOrNonMedi}
              onChange={(e) => handleGetProducts("", e.target.value)}
              required
              className="select select-bordered w-full max-w-xs mt-5"
            >
              <option vlaue="" disabled>
                Select Type
              </option>
              <option value="MEDICINE">Medicine Type</option>
              <option value="NONMEDICINE">Non Medicine Type</option>
            </select>
          </div>

          {/* Select Category type */}
          <div className={`${couponType !== "categoryOffer" && "hidden"}`}>
            <select
              className="select select-bordered w-full max-w-xs mt-5"
              defaultValue={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Category
              </option>

              {parentCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Product and Category */}
          <div className={`${couponType === "typeOffer" ? "block" : "hidden"}`}>
            <div className="mt-5 w-full max-w-xs">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search here..."
                  defaultValue={searchedItem}
                  onChange={(e) =>
                    handleGetProducts(e.target.value, mediOrNonMedi)
                  }
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>

            {/* //// SearchedProduct/category */}

            <div className="max-w-xs bg-white mt-1">
              {products.map((product) => (
                <p
                  key={product.id}
                  className="px-2 py-1 border rounded cursor-pointer"
                  onClick={() => handleClickProduct(product.id, product.name)}
                >
                  {product.name}
                </p>
              ))}
            </div>
          </div>

          {/* //// product list */}
          <div
            className={`${
              couponType === "typeOffer" ? "block" : "hidden"
            } my-5`}
          >
            <h3 className="font-bold mb-2">Product List: </h3>
            {productName.map((name, index) => (
              <p key={index}># {name}</p>
            ))}
          </div>

          <div className="flex gap-10 my-5">
            {/* Start Date and Time */}
            <div>
              <label className="block my-1" htmlFor="startDate">
                Start Date
              </label>
              <input
                name="startDate"
                className="p-2 rounded-lg w-full"
                type="date"
                required
              />
              <label className="block my-1 mt-5" htmlFor="startTime">
                Start Time
              </label>
              <input
                name="startTime"
                className="p-2 rounded-lg w-full"
                type="time"
                required
              />
            </div>

            {/* End Date and Time */}
            <div>
              <label className="block my-1" htmlFor="endDate">
                End Date
              </label>
              <input
                className="p-2 rounded-lg w-full"
                name="endDate"
                type="date"
                required
              />
              <label className="block my-1 mt-5" htmlFor="endTime">
                End Time
              </label>
              <input
                className="p-2 rounded-lg w-full"
                name="endTime"
                type="time"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mt-5 my-1" htmlFor="name">
              Coupon Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full max-w-xs h-10 rounded border px-2"
              placeholder="Coupon name"
              required
            />
          </div>

          <div>
            <label className="block mt-5 my-1" htmlFor="percentage">
              Percentage
            </label>
            <input
              type="number"
              name="percentage"
              className="w-full max-w-xs h-10 rounded border px-2"
              placeholder="Percentage"
              step="0.01"
              required
            />
          </div>

          <div className="w-full max-w-xs mt-5">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 rounded text-white py-2 px-2"
            >
              Create Coupon
            </button>
          </div>
        </form>
      </div>

      {/* Vertical Line Divider */}
      <div className="border-l border-gray-300 mx-4"></div>

      <div className="flex-1 px-1">
        <h2>Coupon List</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Coupon Name</th>
              <th className="px-4 py-2">Percentage</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Medicine</th>
              <th className="px-4 py-2">Non Medicine</th>
              <th className="px-4 py-2">New User</th>
              <th className="px-4 py-2">Timer</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{coupon.name}</td>
                <td className="border px-4 py-2">{coupon.percentage}%</td>
                <td className="border px-4 py-2">
                  {coupon.categoryOffer ? "Yes" : "No"}
                </td>
                <td className="border px-4 py-2">
                  {coupon.medicineOffer ? "Yes" : "No"}
                </td>
                <td className="border px-4 py-2">
                  {coupon.nonMedicineOffer ? "Yes" : "No"}
                </td>
                <td className="border px-4 py-2">
                  {coupon.newAccountOffer ? "Yes" : "No"}
                </td>
                <td className="border px-4 py-2">
                  {coupon.timerOffer ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
