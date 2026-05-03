import { Pie, PieChart, Cell } from 'recharts';

const data = [
  { name: 'Cars',        value: 42, fill: '#6366F1' },
  { name: 'Properties',  value: 28, fill: '#34D399' },
  { name: 'Electronics', value: 18, fill: '#FBBF24' },
  { name: 'Jobs',        value: 12, fill: '#C084FC' },
];

const Piechart = () => {
  return (
    <div className=" flex items-center justify-center">
      <div className="bg-[#FFFFFF] rounded-xl shadow-sm p-2 w-full border border-gray-100">

        {/* Title */}
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          Top Categories
        </h2>

        {/* Donut Chart */}
        <div className="flex justify-center mb-2">
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              cx={100}
              cy={100}
              innerRadius={72}
              outerRadius={95}
              cornerRadius={8}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 px-4">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                {item.value}%
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Piechart;