import { useEffect, useState } from "react";
import {
  FiInfo,
  FiMinus,
  FiPlus,
  FiChevronDown,
  FiCreditCard,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  useGetSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "../../../redux/features/subscriptions/subscriptions";

const EditSubscriptions = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useGetSingleSubscriptionQuery(id);

  const [UpdateSubscription, { isLoading: updateLoading }] =
    useUpdateSubscriptionMutation();

  const [isActive, setIsActive] = useState(true);
  const [billingType, setBillingType] = useState("monthly");
  const [features, setFeatures] = useState([""]);
  const [planName, setPlanName] = useState("");
  const [planIcon, setPlanIcon] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.00");
  const [currency, setCurrency] = useState("USD");

  // DEFAULT VALUES
  useEffect(() => {
    if (data) {
      setPlanName(data?.name || "");
      setPlanIcon(data?.icon || "");
      setDescription(data?.description || "");
      setPrice(data?.price || "0.00");
      setCurrency(data?.currency || "USD");
      setBillingType(data?.billingType || "monthly");
      setIsActive(data?.isActive ?? true);
      setFeatures(data?.features?.length ? data.features : [""]);
    }
  }, [data]);

  // ADD FEATURE
  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  // REMOVE FEATURE
  const removeFeature = (idx) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  // UPDATE FEATURE
  const updateFeature = (idx, val) => {
    const updated = [...features];
    updated[idx] = val;
    setFeatures(updated);
  };

  // UPDATE SUBSCRIPTION
  const handleUpdateSubscription = async () => {
    const subscriptionData = {
      name: planName,
      icon: planIcon,
      features: features.filter((item) => item.trim() !== ""),
      description,
      price: Number(price),
      currency,
      billingType,
      isActive,
    };

    try {
      const res = await UpdateSubscription({
        id,
        data: subscriptionData,
      }).unwrap();
      if (res?.success === true) {
        toast.success(res?.message || "Subscription updated successfully");
        navigate("/subscriptions");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.data?.message || "Failed to update subscription"
      );
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-2 py-5 font-sans">
      <div>
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Edit Subscription Plan
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Configure the tiers and features for your marketplace sellers.
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
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="e.g. Professional Seller"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
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
                  onChange={(e) => setPlanIcon(e.target.value)}
                  placeholder="Choose a plan icon"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>

              {/* Features */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Plan Features
                </label>

                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) =>
                        updateFeature(idx, e.target.value)
                      }
                      placeholder="e.g. Unlimited item posting"
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    />

                    {idx === features.length - 1 ? (
                      <button
                        type="button"
                        onClick={addFeature}
                        className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-gray-300"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeFeature(idx)}
                        className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-gray-300"
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
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the benefits..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
                />
              </div>
            </div>

            {/* Pricing */}
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

                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                {/* Currency */}
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Currency
                  </label>

                  <div className="relative">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
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
                    onClick={() => setBillingType("monthly")}
                    className={`px-6 py-2 text-sm font-medium ${
                      billingType === "monthly"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-white text-gray-500"
                    }`}
                  >
                    Monthly
                  </button>

                  <button
                    type="button"
                    onClick={() => setBillingType("onetime")}
                    className={`px-6 py-2 text-sm font-medium ${
                      billingType === "onetime"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-white text-gray-500"
                    }`}
                  >
                    One-time
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-[35%]">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-700 text-sm">
                  Plan Status
                </span>

                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  {isActive ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>

              {/* TOGGLE */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-gray-700 font-medium">
                  Active
                </span>

                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    isActive ? "bg-indigo-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      isActive ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed mb-5">
                Inactive plans will not be visible to customers.
              </p>

              {/* BUTTONS */}
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleUpdateSubscription}
                  disabled={updateLoading}
                  className="flex-1 px-3 py-2 text-sm font-semibold text-white bg-gray-800 hover:bg-gray-900 rounded-lg"
                >
                  {updateLoading ? "Updating..." : "Update Plan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubscriptions;