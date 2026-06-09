import { useState } from "react";
import {
  FiInfo,
  FiMinus,
  FiPlus,
  FiChevronDown,
  FiCreditCard,
} from "react-icons/fi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAddSubscriptionMutation } from "../../../redux/features/subscriptions/subscriptions";

const AddSubscriptions = () => {
  const [AddSubscription, { isLoading }] =
    useAddSubscriptionMutation();

  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(true);
  const [billingType, setBillingType] = useState("monthly");
  const [features, setFeatures] = useState([""]);
  const [planName, setPlanName] = useState("");
  const [planIcon, setPlanIcon] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.00");
  const [currency, setCurrency] = useState("USD");

  // Add Feature
  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  // Remove Feature
  const removeFeature = (idx) => {
    const updated = features.filter((_, i) => i !== idx);
    setFeatures(updated);
  };

  // Update Feature
  const updateFeature = (idx, value) => {
    const updated = [...features];
    updated[idx] = value;
    setFeatures(updated);
  };

  // Submit
  const handleSubmit = async () => {
    try {
      const payload = {
        name: planName,
        icon: planIcon,
        features: features.filter(
          (item) => item.trim() !== ""
        ),
        description,
        price: Number(price),
        currency,
        billingType,
        isActive,
      };

      const res = await AddSubscription(payload).unwrap();

      if (res?.success) {
        toast.success(
          res?.message || "Subscription added successfully"
        );

        navigate("/subscriptions");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="px-2 py-5 font-sans">
      <div>
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Add Subscription Plan
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Configure the tiers and features for your marketplace
            sellers.
          </p>
        </div>

        <div className="flex gap-5 items-start">
          {/* LEFT COLUMN */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Basic Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-5">
                <FiInfo className="w-5 h-5 text-indigo-500" />

                <span className="font-semibold text-gray-700 text-sm">
                  Basic Info
                </span>
              </div>

              {/* Plan Name */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Plan Name
                </label>

                <input
                  type="text"
                  value={planName}
                  onChange={(e) =>
                    setPlanName(e.target.value)
                  }
                  placeholder="e.g. Professional Seller"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              {/* Plan Icon */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Plan Icon
                </label>

                <input
                  type="text"
                  value={planIcon}
                  onChange={(e) =>
                    setPlanIcon(e.target.value)
                  }
                  placeholder="e.g. star"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              {/* Features */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Plan Features
                </label>

                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 mb-2"
                  >
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        updateFeature(idx, e.target.value)
                      }
                      placeholder="Enter feature"
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />

                    {idx === features.length - 1 ? (
                      <button
                        type="button"
                        onClick={addFeature}
                        className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-gray-300 text-gray-400 hover:border-indigo-400 hover:text-indigo-400 transition-colors"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          removeFeature(idx)
                        }
                        className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-gray-300 text-gray-400 hover:border-red-400 hover:text-red-400 transition-colors"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Describe the benefits of this plan..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                />
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-5">
                <FiCreditCard className="w-5 h-5 text-indigo-500" />

                <span className="font-semibold text-gray-700 text-sm">
                  Pricing & Billing
                </span>
              </div>

              <div className="flex gap-4 mb-4">
                {/* Price */}
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Price
                  </label>

                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                    <span className="px-3 text-gray-400 text-sm border-r border-gray-200 py-2">
                      $
                    </span>

                    <input
                      type="number"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value)
                      }
                      step="0.01"
                      className="flex-1 bg-transparent px-3 py-2 text-sm text-gray-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Currency */}
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Currency
                  </label>

                  <div className="relative">
                    <select
                      value={currency}
                      onChange={(e) =>
                        setCurrency(e.target.value)
                      }
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-8"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="BDT">BDT</option>
                      <option value="NOK">NOK</option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <FiChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Billing Type
                </label>

                <div className="flex rounded-lg border border-gray-200 overflow-hidden w-fit">
                  <button
                    type="button"
                    onClick={() =>
                      setBillingType("monthly")
                    }
                    className={`px-6 py-2 text-sm font-medium transition-colors ${
                      billingType === "monthly"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    Monthly
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setBillingType("onetime")
                    }
                    className={`px-6 py-2 text-sm font-medium transition-colors ${
                      billingType === "onetime"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    One-time
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-[35%] flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              {/* Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-700 text-sm">
                  Plan Status
                </span>

                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  DRAFT
                </span>
              </div>

              {/* Toggle */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-gray-700 font-medium">
                  Active
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setIsActive(!isActive)
                  }
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                    isActive
                      ? "bg-indigo-500"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                      isActive
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed mb-5">
                Inactive plans will not be visible to customers
                during checkout.
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/subscriptions")
                  }
                  className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 text-sm font-semibold text-white bg-gray-800 hover:bg-gray-900 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading
                    ? "Saving..."
                    : "Save Plan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubscriptions;