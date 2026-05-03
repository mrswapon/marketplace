import { useState } from "react";
import PropTypes from "prop-types";

const monthData = [
  { name: "JAN", revenue: 3800, bgRevenue: 5200 },
  { name: "FEB", revenue: 1200, bgRevenue: 3000 },
  { name: "MAR", revenue: 2800, bgRevenue: 4200 },
  { name: "APR", revenue: 1568, bgRevenue: 3200 },
  { name: "MAY", revenue: 3600, bgRevenue: 5000 },
  { name: "JUN", revenue: 2800, bgRevenue: 3800 },
  { name: "JUL", revenue: 5000, bgRevenue: 6200 },
  { name: "AUG", revenue: 7002,   bgRevenue: 7800 },
  { name: "SEP", revenue: 6090,   bgRevenue: 6900 },
  { name: "OCT", revenue: 5200,    bgRevenue: 5600 },
  { name: "NOV", revenue: 8005,   bgRevenue: 9000 },
  { name: "DEC", revenue: 1820,  bgRevenue: 2200 },
];

const yearData = [
  { name: "2025", revenue: 108, bgRevenue: 160 },
  { name: "2026", revenue: 125, bgRevenue: 180 },
  { name: "2027", revenue: 145, bgRevenue: 200 },
  { name: "2028", revenue: 168, bgRevenue: 230 },
  { name: "2029", revenue: 195, bgRevenue: 260 },
  { name: "2030", revenue: 225, bgRevenue: 300 },
  { name: "2031", revenue: 260, bgRevenue: 340 },
  { name: "2032", revenue: 300, bgRevenue: 390 },
  { name: "2033", revenue: 345, bgRevenue: 440 },
  { name: "2034", revenue: 395, bgRevenue: 500 },
  { name: "2035", revenue: 450, bgRevenue: 570 },
  { name: "2036", revenue: 510, bgRevenue: 640 },
];

const CHART_HEIGHT = 270;

const BarColumn = ({ revenue, bgRevenue, maxVal }) => {
  const bgH = Math.round((bgRevenue / maxVal) * CHART_HEIGHT);
  const fgH = revenue > 0 ? Math.round((revenue / maxVal) * CHART_HEIGHT) : 0;

  return (
    <div className="w-full h-full relative">
      {/* Light green bg bar */}
      <div
        className="absolute bottom-0 left-0 right-0 rounded-md bg-emerald-50 transition-all duration-300"
        style={{ height: bgH }}
      />
      {/* Dark green fg bar */}
      {revenue > 0 && (
        <div
          className="absolute bottom-0 left-0 right-0 rounded-md transition-all duration-300"
          style={{ height: fgH, backgroundColor: "#1a3a2e" }}
        />
      )}
    </div>
  );
};

BarColumn.propTypes = {
  revenue: PropTypes.number.isRequired,
  bgRevenue: PropTypes.number.isRequired,
  maxVal: PropTypes.number.isRequired,
};

const PureComponentChart = () => {
  const [view, setView] = useState("month");
  const data = view === "month" ? monthData : yearData;
  const maxVal = Math.max(...data.map((d) => d.bgRevenue)) * 1.1;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 font-sans">

      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <p className="text-sm font-medium text-gray-900 mb-0.5">
            Growth Analytics
          </p>
          <p className="text-xs text-gray-400">
            Listings and Revenue performance over time
          </p>
        </div>

        {/* Toggle */}
        <div className="flex border border-gray-200 rounded-full overflow-hidden">
          {["month", "year"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1 text-xs font-medium rounded-full border-none cursor-pointer transition-colors duration-200 ${
                view === v
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {v === "month" ? "Month" : "Year"}
            </button>
          ))}
        </div>
      </div>

      {/* Bars */}
      <div
        className="flex items-end gap-1 md:gap-6 lg:gap-4 xl:gap-10 px-1"
        style={{ height: CHART_HEIGHT }}
      >
        {data.map((d) => (
          <div
            key={d.name}
            className="flex-1 flex flex-col items-center gap-2 h-full"
          >
            <div className="flex-1 w-full relative">
              <BarColumn
                revenue={d.revenue}
                bgRevenue={d.bgRevenue}
                maxVal={maxVal}
              />
            </div>
            <span className="text-gray-400" style={{ fontSize: "8.5px" }}>
              {d.name}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PureComponentChart;