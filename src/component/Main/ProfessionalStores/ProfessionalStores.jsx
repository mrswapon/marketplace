import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FiFilter, FiChevronDown } from "react-icons/fi";
import { MdBlock } from "react-icons/md";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { BsImageAlt } from "react-icons/bs";
import StoresStatusCards from "./StoresStatusCards";
import profile from "/logo/profile.jpg";

const FILTER_TABS = [
  "All Stores",
  "Active Stores",
  "Pending Stores",
  "Blocked Stores",
];

const stores = [
  {
    id: 1,
    name: "Artisan Roast Co.",
    category: "Coffee & Beverages",
    listings: 248,
    image: "https://static.vecteezy.com/system/resources/thumbnails/071/812/017/small/bottle-of-creamy-cosmetic-product-on-stones-framed-by-chamomile-flowers-on-a-green-backdrop-photo.jpeg",
    logo: profile,
    status: "active",
    buttonType: "view",
  },
  {
    id: 2,
    name: "Luxe Watches Ltd.",
    category: "Luxury Accessories",
    listings: 1042,
    image: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
    logo: profile,
    status: "active",
    buttonType: "view",
  },
  {
    id: 3,
    name: "Luxe Watches Ltd.",
    category: "Luxury Accessories",
    listings: 1042,
    image: "https://framerusercontent.com/images/q9uQeJJbDhkoemEf2QMcYKi8Ho.png",
    logo: profile,
    status: "active",
    buttonType: "view",
  },
  {
    id: 4,
    name: "EcoHome Essentials",
    category: "Home & Decor",
    listings: 15,
    image: null,
    logo: profile,
    status: "pending",
    buttonType: "approve",
  },
];


const StoreCard = ({ store }) => {
  return (
    <Link to={`/professional-stores/${store.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      
      {/* Image */}
      <div className="relative h-[250px] w-full bg-gray-100">
        {store.image ? (
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <BsImageAlt size={36} className="text-gray-300" />
          </div>
        )}
      </div>

      {/* Logo */}
      <div className="px-4 -mt-5 relative z-10">
        <div className="w-11 h-11 rounded-xl bg-white shadow-md flex items-center justify-center border">
          {store.logo ? (
            <img src={store.logo} alt={store.name} className="w-full h-full object-cover rounded-2xl" />
          ) : (
            <HiOutlineBuildingStorefront size={20} className="text-gray-300" />
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pt-2 pb-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-[15px] font-bold">{store.name}</h3>
            <p className="text-[12px] text-gray-400">{store.category}</p>
          </div>

          <div className="text-right">
            <span className="text-[15px] font-bold block">
              {store.listings?.toLocaleString() || 0}
            </span>
            <span className="text-[9px] text-gray-400 uppercase">
              Listings
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Link to={`/professional-stores/${store.id}`} className="flex-1 bg-[#0F3D2E] text-white text-[13px] text-center rounded-lg py-2.5 hover:bg-[#0F3D2E]">
            {store.buttonType === "view" ? "View Store" : "Approve Store"}
          </Link>

          <button className="w-9 h-9 rounded-full border border-red-200 flex items-center justify-center text-red-400 hover:bg-red-50">
            <MdBlock size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

/* ✅ PROP TYPES (Correct position) */
StoreCard.propTypes = {
  store: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    listings: PropTypes.number,
    image: PropTypes.string,
    logo: PropTypes.string,
    status: PropTypes.oneOf(["active", "pending", "blocked"]),
    buttonType: PropTypes.oneOf(["view", "approve"]),
  }).isRequired,
};

/* ---------------- MAIN COMPONENT ---------------- */
const ProfessionalStores = () => {
  const [activeFilter, setActiveFilter] = useState("All Stores");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  /* Close dropdown */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Filter Logic */
  const filteredStores = stores.filter((store) => {
    switch (activeFilter) {
      case "Active Stores":
        return store.status === "active";
      case "Pending Stores":
        return store.status === "pending";
      case "Blocked Stores":
        return store.status === "blocked";
      default:
        return true;
    }
  });

  return (
    <div className="">
      <StoresStatusCards />

      {/* Header */}
      <div className="flex justify-between items-center mt-6 mb-5">
        <h2 className="text-lg font-bold">{activeFilter}</h2>

        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-2 border rounded-lg bg-white hover:bg-gray-50"
          >
            <FiFilter size={15} />
            <span className="text-sm">Filter</span>
            <FiChevronDown
              className={`transition ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg z-50">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveFilter(tab);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    activeFilter === tab
                      ? "bg-[#0F3D2E] text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredStores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default ProfessionalStores;