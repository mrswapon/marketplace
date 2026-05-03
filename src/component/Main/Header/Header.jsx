/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiSearch } from "react-icons/fi";
import { RiNotification2Line,} from "react-icons/ri";
import profile from "/logo/profile.jpg";

const Header = ({ toggleSidebar, title = "Dashboard" }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full  px-5 py-3.5 bg-white flex rounded-md shadow-md justify-between items-center sticky top-2 left-0 z-10">
      
      {/* Left: Title + mobile hamburger */}
      <div className="flex items-center gap-3">
        <button className="md:hidden text-3xl" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </div>

      {/* Center: Search bar */}
      <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-72">
        <FiSearch className="text-gray-400 text-lg shrink-0" />
        <input
          type="text"
          placeholder="Search data..."
          className="bg-transparent outline-none text-sm text-gray-500 placeholder-gray-400 w-full"
        />
      </div>

      {/* Right: Notification + User info + Avatar */}
      <div className="flex items-center gap-5">
        {/* Notification bell */}
        <Link to="/notification">
          <div className="relative p-2 rounded-full bg-white">
            <RiNotification2Line  className="size-7 text-gray-800" />
            <span className="absolute top-1 right-1 size-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </div>
        </Link>

        {/* Divider */}
        <div className="hidden md:block h-10 w-px bg-gray-200" />

        {/* Name & Role */}
        <div className="hidden md:flex flex-col leading-tight">
          <span className="text-sm font-semibold text-gray-900">Alex Thompson</span>
          <span className="text-xs text-gray-400 tracking-wide uppercase">Administrator</span>
        </div>

        {/* Avatar */}
        <img
          onClick={() => navigate("/personal-info")}
          src={profile}
          alt="User avatar"
          className="size-11 rounded-full cursor-pointer border border-gray-300 object-cover shrink-0"
        />
      </div>
    </div>
  );
};

export default Header;