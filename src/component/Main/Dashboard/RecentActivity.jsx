/* eslint-disable react/no-unescaped-entities */
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineCreditCard } from "react-icons/md";

const RecentActivity = () => {
  // ✅ Pure JSON Data (No JSX)
  const activities = [
    {
      id: 1,
      user: "Sarah Lane",
      action: "created a new professional store",
      target: "Urban Thrift",
      time: "2 minutes ago",
      type: "user",
    },
    {
      id: 2,
      action: "Listing approved",
      target: "#88219 (Tesla Model 3)",
      time: "14 minutes ago",
      type: "success",
    },
    {
      id: 3,
      action: "New flag reported on",
      target: "iPhone 15 Pro Max",
      extra: "for suspicious price",
      time: "45 minutes ago",
      type: "warning",
    },
    {
      id: 4,
      action: "Premium subscription renewed for",
      target: "Green Auto Group",
      price: "$199.00",
      time: "1 hour ago",
      type: "payment",
    },
  ];

  // ✅ Icon + Style Controller
  const getIcon = (type) => {
    switch (type) {
      case "user":
        return {
          icon: <AiOutlineUserAdd size={18} className="text-purple-600" />,
          bg: "bg-purple-100",
        };
      case "success":
        return {
          icon: <BsCheckCircle size={17} className="text-green-600" />,
          bg: "bg-green-100",
        };
      case "warning":
        return {
          icon: (
            <IoInformationCircleOutline
              size={18}
              className="text-orange-500"
            />
          ),
          bg: "bg-orange-100",
        };
      case "payment":
        return {
          icon: <MdOutlineCreditCard size={18} className="text-blue-600" />,
          bg: "bg-blue-100",
        };
      default:
        return { icon: null, bg: "" };
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm w-full max-w-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-base font-bold text-gray-900">
          Recent Activity
        </div>
        <div className="text-sm text-indigo-500 cursor-pointer hover:text-indigo-700">
          View All
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100">
        {activities.map((item) => {
          const { icon, bg } = getIcon(item.type);

          return (
            <div key={item.id} className="flex items-start gap-3 py-3">
              {/* Icon */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center ${bg}`}
              >
                {icon}
              </div>

              {/* Content */}
              <div className="text-sm text-gray-700 leading-relaxed">
                <div>
                  {item.user && (
                    <span className="font-semibold">{item.user} </span>
                  )}
                  <span>{item.action} </span>
                  <span className="font-semibold">{item.target}</span>
                  {item.extra && <span> {item.extra}</span>}
                  {item.price && (
                    <span className="font-semibold"> ({item.price})</span>
                  )}
                </div>

                <div className="text-xs text-gray-400 mt-1">
                  {item.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;