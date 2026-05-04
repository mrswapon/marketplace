import { FiClock } from "react-icons/fi";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { BsShopWindow } from "react-icons/bs";

const data = {
  pending: 124,
  active: 3892,
  soldToday: 42,
  rejected: 18,
};

const ListingsStats = () => {
  const stats = [
    {
      label: "PENDING",
      value: `${data.pending} Items`,
      icon: <FiClock size={30} className="text-orange-400" />,
      bg: "bg-orange-50",
    },
    {
      label: "ACTIVE",
      value: `${data.active.toLocaleString()} Items`,
      icon: <MdCheckCircle size={30} className="text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      label: "SOLD TODAY",
      value: `${data.soldToday} Items`,
      icon: <BsShopWindow size={30} className="text-green-500" />,
      bg: "bg-green-50",
    },
    {
      label: "REJECTED",
      value: `${data.rejected} Items`,
      icon: <MdCancel size={30} className="text-red-400" />,
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xl:gap-10 w-full py-7">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center justify-center h-[15vh] gap-3  bg-white rounded-xl px-5 py-4 flex-1 shadow-sm border border-gray-100"
        >
          <div className={`${stat.bg} p-2 rounded-lg w-[50px] h-[50px] flex items-center justify-center`}>{stat.icon}</div>
          <div>
            <p className="text-[10px] md:text-lg font-semibold text-gray-400 tracking-widest uppercase mb-0.5">
              {stat.label}
            </p>
            <p className="text-sm md:text-md font-bold text-gray-800">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingsStats;