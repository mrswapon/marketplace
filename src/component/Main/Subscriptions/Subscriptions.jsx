import { useState } from "react";
import PropTypes from "prop-types";
import { FiEdit2, FiTrash2, FiCheckCircle, FiXCircle } from "react-icons/fi";

const plans = [
  {
    name: "Basic Plan",
    popular: false,
    price: "$0",
    subscribers: "1.2k",
    revenue: "$0",
    features: [
      { label: "Standard Listings", enabled: true },
      { label: "Community Support", enabled: true },
      { label: "Ads Access", enabled: false },
    ],
  },
  {
    name: "Plus Plan",
    popular: true,
    price: "$29.99",
    subscribers: "1.2k",
    revenue: "$0",
    features: [
      { label: "Unlimited Listings", enabled: true },
      { label: "Ads Access (Priority)", enabled: true },
      { label: "Visibility Boost", enabled: true },
    ],
  },
];

const Toggle = ({ checked, onChange }) => (
  <label className="relative inline-block w-11 h-6 cursor-pointer">
    <input
      type="checkbox"
      className="opacity-0 w-0 h-0"
      checked={checked}
      onChange={onChange}
    />
    <span
      className={`absolute inset-0 rounded-full transition-colors duration-200 ${
        checked ? "bg-indigo-600" : "bg-gray-300"
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

const PlanCard = ({ plan }) => {
  const [active, setActive] = useState(true);

  return (
    <div className="bg-white rounded-2xl p-6 w-72 relative shadow-sm">
      {plan.popular && (
        <div className="absolute -top-px right-4 bg-indigo-600 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-b-lg uppercase">
          Popular
        </div>
      )}

      <div className="flex justify-between items-start mb-1">
        <span className="text-[15px] font-semibold text-gray-900">{plan.name}</span>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <FiEdit2 size={15} />
          </button>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <FiTrash2 size={15} />
          </button>
        </div>
      </div>

      <span className="inline-block bg-green-50 text-green-500 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase mb-3">
        Active
      </span>

      <div className="flex items-baseline gap-1.5 mb-3">
        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
        <span className="text-sm text-gray-400">/ monthly</span>
      </div>

      <div className="flex gap-2.5 mb-4">
        <div className="bg-gray-50 rounded-lg px-3.5 py-2.5 flex-1">
          <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-0.5">Subscribers</p>
          <p className="text-[15px] font-bold text-gray-900">{plan.subscribers}</p>
        </div>
        <div className="bg-gray-50 rounded-lg px-3.5 py-2.5 flex-1">
          <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-0.5">Revenue</p>
          <p className="text-[15px] font-bold text-green-500">{plan.revenue}</p>
        </div>
      </div>

      <p className="text-[13px] text-gray-500 leading-relaxed mb-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      <ul className="flex flex-col gap-2 mb-5">
        {plan.features.map((f) => (
          <li
            key={f.label}
            className={`flex items-center gap-2 text-[13px] ${
              f.enabled ? "text-gray-700" : "text-gray-300 line-through"
            }`}
          >
            {f.enabled ? (
              <FiCheckCircle className="text-green-500 flex-shrink-0" size={16} />
            ) : (
              <FiXCircle className="text-gray-300 flex-shrink-0" size={16} />
            )}
            {f.label}
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center border-t border-gray-100 pt-4">
        <span className="text-[13px] text-gray-500">Active</span>
        <Toggle checked={active} onChange={() => setActive(!active)} />
      </div>
    </div>
  );
};

// ✅ PropTypes validation added here
PlanCard.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    popular: PropTypes.bool.isRequired,
    price: PropTypes.string.isRequired,
    subscribers: PropTypes.string.isRequired,
    revenue: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        enabled: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const Subscriptions = () => {
  return (
    <div className="py-5 md:py-7">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 mb-6">
        <div>
            <h2 className="text-[22px] font-bold text-gray-900 mb-1">Subscription Plans</h2>
            <p className="text-[16px] text-gray-400 mb-2">
                Manage tiered pricing structures and marketplace feature access.
            </p>
        </div>
        <button className="bg-[#0F3D2E] text-white px-4 py-2 rounded-md  transition-colors mb-5">Add New Plan</button>   
      </div>
      <div className="flex gap-5 flex-wrap">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;