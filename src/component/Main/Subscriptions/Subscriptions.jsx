import { useState } from "react";
import PropTypes from "prop-types";
import { FiEdit2, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { useGetSubscriptionsQuery } from "../../../redux/features/subscriptions/subscriptions";
import { Link } from "react-router-dom";

/* ---------------- Toggle Component ---------------- */
const Toggle = ({ checked, onChange }) => (
  <label className="relative inline-block w-11 h-6 cursor-pointer flex-shrink-0 z-10">
    <input
      type="checkbox"
      className="opacity-0 w-0 h-0"
      checked={checked}
      onChange={onChange}
    />
    <span
      className={`absolute inset-0 rounded-full transition-colors duration-200 ${
        checked ? "bg-[#0F3D2E]" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full shadow transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </span>
  </label>
);

Toggle.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

/* ---------------- Plan Card ---------------- */
const PlanCard = ({ plan }) => {
  const [active, setActive] = useState(plan?.isActive);
  console.log(plan)
  return (
    <div className="bg-white rounded-2xl p-5 w-72 relative shadow-sm border border-gray-100 flex flex-col justify-between">
      
      {/* Top Badge + Actions */}
      <div className="flex justify-between items-start mb-4">
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase ${
            active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              active ? "bg-green-500" : "bg-red-400"
            }`}
          />
          {active ? "Active" : "Inactive"}
        </span>

        <div className="flex gap-4">
          <Link
            to={`/subscriptions/${plan?._id}`}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiEdit2 size={15} />
          </Link>

          <button className="text-red-400 hover:text-red-600 transition-colors">
            <FiTrash2 size={15} />
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="flex items-center space-x-2">
          <div>
            {plan?.icon}
        </div>
        <div className="">
          <p className="text-[15px] font-bold text-gray-900 leading-tight">
            {plan?.name}
          </p>
          <p className="text-[12px] text-gray-400 capitalize">
            {plan?.billingType} plan
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
        {plan?.description}
      </p>

      {/* Features */}
      <ul className="flex flex-col gap-2 mb-4">
        {plan?.features?.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-[13px] text-gray-600"
          >
            <FiCheckCircle className="text-gray-400 flex-shrink-0" size={15} />
            {feature}
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="mb-4">
        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-0.5">
          Starting At
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[28px] font-extrabold text-[#0F3D2E] leading-none">
            {plan?.currency} {plan?.price}
          </span>
          <span className="text-sm text-gray-400 capitalize">
            / {plan?.billingType}
          </span>
        </div>
      </div>

      {/* Toggle (FIXED always visible) */}
      <div className="flex justify-between items-center border-t border-gray-100 pt-4 w-full mt-auto">
        <span className="text-[13px] text-gray-500">Active</span>
        <Toggle
          checked={active}
          onChange={() => setActive((prev) => !prev)}
        />
      </div>
    </div>
  );
};

PlanCard.propTypes = {
  plan: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    price: PropTypes.number,
    icon:PropTypes.string,
    currency: PropTypes.string,
    billingType: PropTypes.string,
    isActive: PropTypes.bool,
  }).isRequired,
};

/* ---------------- Main Page ---------------- */
const Subscriptions = () => {
  const {
    data: subscriptions,
    isLoading,
    isError,
  } = useGetSubscriptionsQuery();

  const plans = subscriptions;

  if (isLoading) {
    return <div className="py-10 text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        Failed to load subscriptions
      </div>
    );
  }

  return (
    <div className="py-5 md:py-7">
      
      {/* Header */}
      <div className="flex justify-between items-start gap-4 mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-gray-900 mb-1">
            Subscription Plans
          </h2>
          <p className="hidden lg:block text-[16px] text-gray-400">
            Manage tiered pricing structures and marketplace access.
          </p>
        </div>

        <Link
          to="/AddSubscriptions"
          className="bg-[#0F3D2E] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1a5c44] transition-colors"
        >
          Add New Plan
        </Link>
      </div>

      {/* Cards */}
      <div className="flex gap-5 flex-wrap">
        {plans?.map((plan) => (
          <PlanCard key={plan?._id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;