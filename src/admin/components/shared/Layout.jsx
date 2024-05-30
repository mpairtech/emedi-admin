import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';



export default function Layout() {
  return (
    <div className="flex flex-col md:flex-row bg-neutral-100 min-h-screen">

    <Sidebar />
    
      <div className="flex-1 p-4 min-h-0 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
