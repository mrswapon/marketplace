import { BookOpen, CalendarClock, BadgeCheck } from "lucide-react";

const stats = [
  {
    label: "Total Stories",
    value: "1,284",
    iconColor: "#5b6cf0",
    valueColor: "#5b6cf0",
    icon: BookOpen,
  },
  {
    label: "Pending Approval",
    value: "42",
    iconColor: "#e09b2d",
    valueColor: "#e09b2d",
    icon: CalendarClock,
  },
  {
    label: "Active Stories",
    value: "892",
    iconColor: "#3db87a",
    valueColor: "#3db87a",
    icon: BadgeCheck,
  },
];

const StoriesStatus = () => {
  return (
    <div
    
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-5 md:mt-7"
    >
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="flex items-center gap-4 rounded-xl px-5 py-4 bg-[#FFFFFF] shadow-sm border border-gray-100"

          >
            <div className="flex-shrink-0">
              <Icon size={28} color={s.iconColor} strokeWidth={1.8} />
            </div>
            <div className="flex flex-col gap-0.5">
              <p
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "#888" }}
              >
                {s.label}
              </p>
              <p
                className="text-3xl font-bold leading-tight tracking-tight"
                style={{ color: s.valueColor }}
              >
                {s.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StoriesStatus;