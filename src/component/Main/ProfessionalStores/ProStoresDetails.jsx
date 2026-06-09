// import { Package, DollarSign, Users } from "lucide-react";
import { Outlet, NavLink, useParams } from "react-router-dom";
const ProStoresDetails = () => {
  const { id } = useParams();
  console.log("Pro Store ID:", id); 
  return (
     <section>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 w-full mt-5">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2 ">
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl bg-blue-600 flex flex-col items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xs leading-tight">TECH</span>
          <span className="text-white font-bold text-xs leading-tight">HAVEN</span>
        </div>

        {/* Store Info */}
        <div>
          <h2 className="text-gray-900 font-semibold text-lg leading-tight">
            TechHaven Pro
          </h2>
          <p className="text-gray-400 text-sm">Electronics &amp; Gadgets</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {/* Total Listings */}
        <div className=" rounded-xl border border-gray-100 p-2">
          <p className="text-gray-400 text-xs mb-1">Total Listings</p>
          <p className="text-gray-900 font-semibold text-2xl">142</p>
        </div>

        {/* Revenue */}
        <div className=" rounded-xl border border-gray-100  p-2">
          <p className="text-gray-400 text-xs mb-1">Revenue</p>
          <p className="text-gray-900 font-semibold text-2xl">$12.4k</p>
        </div>

        {/* Followers */}
        <div className="rounded-xl p-2 border border-gray-100">
          <p className="text-gray-400 text-xs mb-1">Followers</p>
          <p className="text-gray-900 font-semibold text-2xl">850</p>
        </div>
      </div>

      
        </div> 
        <br />
        {/* 🔹 Tabs Menu */}
      <div className="flex gap-6 border-b mb-4">
        
        <NavLink
          to=""
          end
          className={({ isActive }) =>
            isActive
              ? "text-[#0F3D2E] border-b-2 border-[#0F3D2E] pb-2"
              : "text-gray-500 pb-2"
          }
        >
          Overview
        </NavLink>

        <NavLink
          to="listing"
          className={({ isActive }) =>
            isActive
              ? "text-[#0F3D2E] border-b-2 border-[#0F3D2E] pb-2"
              : "text-gray-500 pb-2"
          }
        >
          Listings
        </NavLink>

        <NavLink
          to="ads"
          className={({ isActive }) =>
            isActive
              ? "text-[#0F3D2E] border-b-2 border-[#0F3D2E] pb-2"
              : "text-gray-500 pb-2"
          }
        >
          Ads
        </NavLink>

        <NavLink
          to="payments"
          className={({ isActive }) =>
            isActive
              ? "text-[#0F3D2E] border-b-2 border-[#0F3D2E] pb-2"
              : "text-gray-500 pb-2"
          }
        >
          Payments
        </NavLink>

      </div>

      {/* 🔹 Child Pages Render */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <Outlet />
      </div>
     </section>
  );
};

export default ProStoresDetails;