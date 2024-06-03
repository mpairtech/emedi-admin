import { HiOutlineViewGrid } from "react-icons/hi";

import { FaBuildingUser } from "react-icons/fa6";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { CiBoxList } from "react-icons/ci";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin",
    icon: <HiOutlineViewGrid />,
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
];
