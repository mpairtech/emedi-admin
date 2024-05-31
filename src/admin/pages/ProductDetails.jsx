// // import React from "react";
// // import { useSearchParams } from "react-router-dom";

// // const ProductDetails = () => {
// //   const [searchParams] = useSearchParams();

// //   const id = searchParams.get("id");

// import { useEffect } from "react";
// import { useState } from "react";
// import { AiFillEdit } from "react-icons/ai";
// import { MdDeleteForever } from "react-icons/md";
// import { RxUpdate } from "react-icons/rx";
// import { getAllCategories } from "../../apiCalls/category";
// import {
//   addService,
//   deleteService,
//   getAllServices,
//   updateService,
// } from "../../apiCalls/services";
// import Loading from "../../pages/Loading/Loading";
// import { getAllGenerics } from "../../apiCalls/generic";
// import { getAllCompanies } from "../../apiCalls/company";
// import {
//   addProduct,
//   deleteProduct,
//   getAllProducts,
// } from "../../apiCalls/product";
// import { useNavigate } from "react-router-dom";

// const ProductDetails = () => {
//   const [services, setServices] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [generics, setGenerics] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   const navigate = useNavigate();

//   const getServices = async () => {
//     setIsLoading(true);
//     const data = await getAllServices();
//     setServices(data.services);
//     setIsLoading(false);
//   };

//   const getProducts = async () => {
//     setIsLoading(true);
//     const data = await getAllProducts();
//     setProducts(data.products);
//     setIsLoading(false);
//   };

//   const getGenerics = async () => {
//     setIsLoading(true);
//     const data = await getAllGenerics();
//     setGenerics(data.generics);
//     setIsLoading(false);
//   };

//   const getCategories = async () => {
//     setIsLoading(true);
//     const data = await getAllCategories();

//     setCategories(data.categories);
//     setIsLoading(false);
//   };

//   const getCompanies = async () => {
//     setIsLoading(true);
//     const data = await getAllCompanies();
//     setCompanies(data.companies);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     getProducts();
//     getServices();
//     getGenerics();
//     getCategories();
//     getCompanies();
//   }, []);

//   const [editedService, setEditedService] = useState(null);
//   const [inputState, setInputState] = useState({});
//   const [isPrescriptionChecked, setIsPrescriptionChecked] = useState(false);

//   const productSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;

//     const formData = new FormData(form);
//     await addProduct(formData);
//     await getProducts();
//   };

//   const handleDelete = async (id) => {
//     const data = await deleteProduct(id);
//     await getProducts();
//   };

//   const editbuttonHander = (id) => {
//     setEditedService(id);
//   };

//   const inputHandler = (e) => {
//     const { name, value } = e.target;
//     setInputState({ ...inputState, [name]: value });
//   };

//   const saveService = async (id) => {
//     const editedService = services.filter((service) => service._id === id);

//     const updatedService = {
//       id: editedService[0]._id,
//       title: inputState.title || editedService[0].title,
//       category: inputState.category || editedService[0].category._id,
//       description: inputState.description || editedService[0].description,
//       duration: inputState.duration || editedService[0].duration,
//       price: inputState.price || editedService[0].price,
//     };

//     const data = await updateService(updatedService);
//     getServices();

//     setEditedService(null);
//     setInputState({});
//   };

//   const handleSearch = () => {
//     if (searchTerm) {
//       const filteredServices = services.filter((service) =>
//         service._id.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setServices(filteredServices);
//     } else {
//       getServices();
//     }
//   };

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div>
//       <div className="bg-gray-100 p-4 rounded-sm flex flex-col items-start">
//         <form onSubmit={productSubmit}>
//           <div className="lg:flex">
//             <select
//               name="genericId"
//               defaultValue=""
//               className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
//               required
//             >
//               <option value="" disabled>
//                 Select Generic Name
//               </option>

//               {generics.map((generic) => (
//                 <option key={generic.id} value={generic.id}>
//                   {" "}
//                   {generic.name.charAt(0).toUpperCase() + generic.name.slice(1)}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="categoryId"
//               defaultValue=""
//               className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
//               required
//             >
//               <option value="" disabled>
//                 Select Category
//               </option>

//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {" "}
//                   {category.name.charAt(0).toUpperCase() +
//                     category.name.slice(1)}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="compantId"
//               defaultValue=""
//               className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
//               required
//             >
//               <option value="" disabled>
//                 Select Company
//               </option>

//               {companies.map((company) => (
//                 <option key={company.id} value={company.id}>
//                   {" "}
//                   {company.name.charAt(0).toUpperCase() + company.name.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="lg:flex">
//             <input
//               type="text"
//               name="name"
//               placeholder="Product Name"
//               required
//               className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
//             />

//             <input
//               type="number"
//               name="mrp"
//               placeholder="MRP"
//               required
//               step="0.01"
//               className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
//             />
//           </div>

//           <div className="lg:flex">
//             <input
//               type="text"
//               name="dosageStrength"
//               placeholder="Dosage Strength"
//               required
//               className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
//             />

//             <input
//               type="text"
//               name="dosageForm"
//               placeholder="Dosage Form"
//               required
//               className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
//             />
//           </div>

//           <div className="lg:flex">
//             <input
//               type="number"
//               name="b2bSellingPrice"
//               placeholder="B2B Selling Price"
//               required
//               className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
//               step="0.01"
//             />

//             <input
//               type="number"
//               name="b2bDiscount"
//               placeholder="B2B Discount"
//               required
//               className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
//               step="0.01"
//             />
//           </div>

//           <div className="lg:flex">
//             <input
//               type="number"
//               name="b2cSellingPrice"
//               placeholder="B2C Selling Price"
//               required
//               className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
//               step="0.01"
//             />

//             <input
//               type="number"
//               name="b2cDiscount"
//               placeholder="B2C Discount"
//               required
//               className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
//               step="0.01"
//             />
//           </div>

//           <div className="lg:flex">
//             <input
//               type="text"
//               name="disclaimer"
//               placeholder="Disclaimer"
//               required
//               className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
//             />

//             <input
//               type="number"
//               name="qtyInStock"
//               placeholder="Stock"
//               required
//               className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
//             />
//           </div>

//           <div className="lg:flex items-center">
//             <div className="flex flex-col justify-center w-1/2 m-5 mb-2 ">
//               <label htmlFor="image" className="mb-1 text-gray-700 font-bold">
//                 Add Image
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 name="image"
//                 id="image"
//                 className="border border-gray-400 p-2"
//                 required
//               />
//             </div>

//             <div className="m-5 p-2 mb-2 flex items-center gap-2 mt-10">
//               <input
//                 type="checkbox"
//                 name="isPrescriptionMandatory"
//                 defaultValue={isPrescriptionChecked}
//                 checked={isPrescriptionChecked}
//                 onChange={() =>
//                   setIsPrescriptionChecked(!isPrescriptionChecked)
//                 }
//                 className="checkbox border border-black"
//               />
//               <label>Prescription</label>
//             </div>

//             <select
//               name="type"
//               defaultValue=""
//               className="w-1/2 border border-gray-400 m-5 p-2 mb-2 mt-10"
//               required
//             >
//               <option value="" disabled>
//                 Select Type
//               </option>

//               <option value="MEDICINE">Medicine</option>

//               <option value="NONMEDICINE">Non Medicine</option>
//             </select>

//             <input
//               type="text"
//               name="unitType"
//               placeholder="Unit Type"
//               required
//               className="w-1/2 border border-gray-400 m-5 p-2 mb-2 mt-10"
//             />
//           </div>

//           <button
//             className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 px-2 rounded m-5"
//             type="submit"
//           >
//             Add Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React from 'react';

const ProductDetails = () => {
  return (
    <div>
      hiiiiiiiiiiiiiiiii
    </div>
  );
};

export default ProductDetails;
