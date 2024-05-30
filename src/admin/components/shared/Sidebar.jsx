import React, { useContext } from 'react';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcHome } from 'react-icons/fc';
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_LINKS_EMPLOYEE } from '../../lib/constants';
import { AuthContext } from '../../../components/providers/AuthProvider';
import { HiOutlineLogout } from 'react-icons/hi';

const Sidebar = () => {
  const navigate = useNavigate();
  const { handleLogout, user } = useContext(AuthContext);

  return (
    <div className="bg-neutral-900 p-3 flex flex-col">
      <div onClick={() => navigate(`/`)} className="flex items-center gap-2 px-1 py-3 cursor-pointer">
        <FcHome fontSize={24} />
        <span className="text-neutral-200 text-lg">Rapid Home Solution</span>
      </div>
      <div className="py-8 flex flex-col gap-0.5">
        {

          user?.length > 0 &&
          user[0]?.role === "admin" &&
          DASHBOARD_SIDEBAR_LINKS.map((link) => (
            <SidebarLink key={link.key} link={link} />
          ))}

        {

          user?.length > 0 &&
          user[0]?.role === "employee" &&
          DASHBOARD_SIDEBAR_LINKS_EMPLOYEE.map((link) => (
            <SidebarLink key={link.key} link={link} />
          ))}

        <div onClick={handleLogout} className="flex items-center gap-2 font-light px-3 py-2 text-red-500 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer">
          <span className="text-xl"><HiOutlineLogout /></span>
          Logout
        </div>



      </div>
    </div>
  );
};

const SidebarLink = ({ link }) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(
        pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400',
        'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'
      )}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
};

export default Sidebar;
