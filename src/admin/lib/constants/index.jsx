import { HiOutlineViewGrid } from "react-icons/hi";

import { FaBuildingUser } from "react-icons/fa6";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { CiBoxList } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { RiCoupon3Fill } from "react-icons/ri";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <FiShoppingBag />,
  },
  {
    key: "allProducts",
    label: "All Products",
    path: "/admin/all-products",
    icon: <CiBoxList />,
  },
  {
    key: "product",
    label: "Product",
    path: "/admin/product",
    icon: <AiOutlineMedicineBox />,
  },

  {
    key: "category",
    label: "Category",
    path: "/admin/category",
    icon: <BiCategory />,
  },
  {
    key: "company",
    label: "Company",
    path: "/admin/company",
    icon: <FaBuildingUser />,
  },
  {
    key: "generic",
    label: "Generic",
    path: "/admin/generic",
    icon: <MdOutlineDriveFileRenameOutline />,
  },
  {
    key: "coupon",
    label: "Coupon",
    path: "/admin/coupon",
    icon: <RiCoupon3Fill />,
  },

  {
    key: "homeSlider",
    label: "Home Slider",
    path: "/admin/home-slider",
    icon: <RiCoupon3Fill />,
  },

  {
    key: "allPrescriptions",
    label: "All Prescriptions",
    path: "/admin/all-prescriptions",
    icon: <RiCoupon3Fill />,
  },
  {
    key: "users",
    label: "Users",
    path: "/admin/users",
    icon: <RiCoupon3Fill />,
  },
];
