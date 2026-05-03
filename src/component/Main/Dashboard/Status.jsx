import PropTypes from "prop-types";
import { BsShop } from "react-icons/bs";
import { FaBolt, FaUsers, FaStore, FaClock } from "react-icons/fa";
import { MdOutlineMonetizationOn } from "react-icons/md";
import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";

const StatCard = ({ icon: Icon, iconBg, iconColor, label, value, change, changeType }) => {
  const isPositive = changeType === "positive";
  const isNegative = changeType === "negative";


  return (
    <div className="flex flex-col justify-between mt-10 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 min-w-0">
      <div className="flex items-center justify-between mb-3">
        {/* Icon */}
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            backgroundColor: iconBg,
            width: 44,
            height: 44,
          }}
        >
          <Icon style={{ color: iconColor, fontSize: 20 }} />
        </div>

        {/* Badge */}
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded"
          style={{
            color: isNegative ? "#ef4444" : "#22c55e",
            backgroundColor: isNegative ? "#fef2f2" : "#f0fdf4",
          }}
        >
          {isPositive ? `+${change}` : isNegative ? `-${change}` : `+${change}`}
        </span>
      </div>

      {/* Label */}
      <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-1">
        {label}
      </p>

      {/* Value */}
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  iconBg: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.string.isRequired,
  changeType: PropTypes.oneOf(["positive", "negative", "neutral"]).isRequired,
};

const Status = () => {
  const { data } = useGetDashboardStatusQuery();

  const stats = [
    {
      icon: BsShop,
      iconBg: "#EEF2FF",
      iconColor: "#6366f1",
      label: "Total Listings",
      value: data?.totalListings?.toLocaleString() || "24,592",
      change: "12.5%",
      changeType: "positive",
    },
    {
      icon: FaBolt,
      iconBg: "#EFF6FF",
      iconColor: "#3b82f6",
      label: "Active Listings",
      value: data?.activeListings?.toLocaleString() || "18,203",
      change: "4.2%",
      changeType: "positive",
    },
    {
      icon: FaUsers,
      iconBg: "#F0FDF4",
      iconColor: "#22c55e",
      label: "Total Users",
      value: data?.totalUser
        ? data.totalUser >= 1000
          ? (data.totalUser / 1000).toFixed(1) + "k"
          : data.totalUser
        : "156.4k",
      change: "8.1%",
      changeType: "positive",
    },
    {
      icon: FaStore,
      iconBg: "#FFF7ED",
      iconColor: "#f97316",
      label: "Prof. Stores",
      value: data?.totalSeller?.toLocaleString() || "1,248",
      change: "2.4%",
      changeType: "negative",
    },
    {
      icon: MdOutlineMonetizationOn,
      iconBg: "#F0FDF4",
      iconColor: "#16a34a",
      label: "Revenue",
      value: data?.revenue
        ? "$" + Number(data.revenue).toLocaleString()
        : "$42,910",
      change: "18.7%",
      changeType: "positive",
    },
    {
      icon: FaClock,
      iconBg: "#FFF1F2",
      iconColor: "#f43f5e",
      label: "Pending Appr.",
      value: data?.pendingApproval?.toLocaleString() || "214",
      change: "14",
      changeType: "neutral",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((item, idx) => (
        <StatCard key={idx} {...item} />
      ))}
    </div>
  );
};

export default Status;