import {
  HiOutlineViewGrid,

} from "react-icons/hi";

import { FaBuildingUser } from "react-icons/fa6";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { AiOutlineMedicineBox } from "react-icons/ai";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin",
    icon: <HiOutlineViewGrid />,
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
    key: "category",
    label: "Category",
    path: "/admin/category",
    icon: <BiCategory />,
  },
  {
    key: "product",
    label: "Product",
    path: "/admin/product",
    icon: <AiOutlineMedicineBox />,
  },

  
];


