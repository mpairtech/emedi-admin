import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineUser,
  HiOutlineSearchCircle,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";
import { FaQuestionCircle } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineRunningWithErrors } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
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
  // {
  //   key: "services",
  //   label: "Services",
  //   path: "/admin/services",
  //   icon: <HiOutlineCube />,
  // },
  // {
  //   key: "orders",
  //   label: "Orders",
  //   path: "/admin/orders",
  //   icon: <HiOutlineShoppingCart />,
  // },
  // {
  //   key: "users",
  //   label: "Users",
  //   path: "/admin/users",
  //   icon: <HiOutlineUsers />,
  // },
  // // {
  // // 	key: 'employees',
  // // 	label: 'Employees',
  // // 	path: '/admin/employees',
  // // 	icon: <HiOutlineUser />
  // // },
  // {
  //   key: "employee_list",
  //   label: "Employees",
  //   path: "/admin/employee-list",
  //   icon: <HiOutlineUser />,
  // },
  // {
  //   key: "job",
  //   label: "Job Request",
  //   path: "/admin/job",
  //   icon: <HiOutlineSearchCircle />,
  // },
  // {
  //   key: "faq",
  //   label: "FAQ",
  //   path: "/admin/faq",
  //   icon: <FaQuestionCircle />,
  // },
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

  // {
  // 	key: 'comments',
  // 	label: 'Comments',
  // 	path: '/comments',
  // 	icon: <FaCommentDots />
  // }
];

export const DASHBOARD_SIDEBAR_LINKS_EMPLOYEE = [
  {
    key: "profile",
    label: "Profile",
    path: "/employee",
    icon: <CgProfile />,
  },
  {
    key: "ongoing",
    label: "Ongoing",
    path: "/employee/ongoing",
    icon: <MdOutlineRunningWithErrors />,
  },
  {
    key: "history",
    label: "History",
    path: "/employee/history",
    icon: <FaHistory />,
  },
];
