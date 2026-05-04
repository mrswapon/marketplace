import { TfiWallet } from "react-icons/tfi";
import { LuRocket } from "react-icons/lu";
import { PiBookOpenTextLight } from "react-icons/pi";
import { TrendingUp } from "lucide-react";

const stats = [
  {
    label: "TOTAL EARNINGS",
    value: "$142,850.00",
    sub: "12.5% increase from last month",
    up: true,
    iconColor: "text-gray-500",
    iconBg: "bg-gray-100",
    icon: TfiWallet,
  },
  {
    label: "BOOST REVENUE",
    value: "$48,210.00",
    sub: "34% of total revenue",
    up: null,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-50",
    icon: LuRocket,
  },
  {
    label: "STORY REVENUE",
    value: "$32,640.00",
    sub: "22% of total revenue",
    up: null,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-50",
    icon: PiBookOpenTextLight,
  },
];

const EarningsStatus = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-7">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 flex flex-col gap-3 border border-gray-100 shadow-sm"
          >
            {/* Top Row: Label + Icon */}
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
                {s.label}
              </p>
              <div
                className={`w-8 h-8 rounded-lg ${s.iconBg} flex items-center justify-center`}
              >
                <Icon size={16} className={s.iconColor} />
              </div>
            </div>

            {/* Value */}
            <p className="text-2xl font-semibold text-gray-900 tracking-tight">
              {s.value}
            </p>

            {/* Sub text */}
            <div className="flex items-center gap-1">
              {s.up === true && (
                <TrendingUp size={13} className="text-green-500 flex-shrink-0" />
              )}
              <p
                className={`text-xs font-medium ${
                  s.up === true ? "text-green-500" : "text-gray-400"
                }`}
              >
                {s.sub}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EarningsStatus;