import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { FaBox, FaCartPlus, FaClipboardList } from "react-icons/fa";

const Dashboard = () => {
  return (
      <div className=" flex">
        {/* left side */}
        <div className="bg-blue-100 w-80 text-lg h-screen py-8 px-6 shadow-md">  
          <div className="space-y-3">

            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-200 hover:text-blue-600 cursor-pointer transition">
              <MdDashboard size={22} />
              <span className="font-medium">Dashboard</span>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-200 hover:text-blue-600 cursor-pointer transition">
              <FaCartPlus size={20} />
              <Link to="admin/add" className="font-medium">
                Add Product
              </Link>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-200 hover:text-blue-600 cursor-pointer transition">
              <FaBox size={20} />
              <Link to="products" className="font-medium">
                Products
              </Link>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-200 hover:text-blue-600 cursor-pointer transition">
              <TbUsers size={22} />
              <span className="font-medium">Users</span>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-200 hover:text-blue-600 cursor-pointer transition">
              <FaClipboardList size={20} />
              <span className="font-medium">Orders</span>
            </div>
          </div>
        </div>


        {/* right side */}
         <div className="flex-1">
          <div className="flex  mt-10 justify-evenly flex-wrap gap-4 p-8">
            <div className="bg-blue-400 text-xl p-4 w-64 h-40 rounded-md space-y-4">
              <p className="font-bold">Total User</p>
               <h1 className="font-bold">20</h1>
            </div>

             <div className="bg-blue-400 text-xl p-4 w-64 h-40 rounded-md space-y-4">
              <p className="font-bold">Total Products</p>
               <h1 className="font-bold">20</h1>
            </div>

             <div className="bg-blue-400 text-xl p-4 w-64 h-40 rounded-md space-y-4">
              <p className="font-bold ">Total Orders</p>
               <h1 className="font-bold">20</h1>
            </div>

             <div className="bg-blue-400 text-xl p-4 w-64 h-40 rounded-md space-y-4">
              <p className="font-bold">Total Revenue</p>
               <h1 className="font-bold">$2000</h1>
            </div>
          </div>
         </div>
      </div>
  );
};

export default Dashboard;
