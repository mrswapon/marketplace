

const Piechart =() =>{
  const metrics = [
    { label: 'Total Users', value: '36k' },
    { label: 'Total Income', value: '100k' },
  ];

  // SVG circle properties - matching the exact visual from the image
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-sm p-8 w-80">
        {/* Metrics Section */}
        <div className="space-y-5 mb-10">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <div>
                <div className="text-sm text-gray-500 mb-1">{metric.label}</div>
                <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* P&L Section */}
        <div className="flex items-center">
          {/* Circular Progress Chart with Two Segments */}
          <div className="relative mr-6">
            <svg width="100" height="100" className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="#f1f5f9"
                strokeWidth="8"
                fill="transparent"
              />
              {/* First progress segment (lighter orange) */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="#fb923c"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${circumference * 0.35} ${circumference}`}
                strokeDashoffset={0}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
              {/* Second progress segment (darker orange) - connected */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="#f97316"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${circumference * 0.30} ${circumference}`}
                strokeDashoffset={-circumference * 0.35}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>
          </div>

          {/* P&L Text */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">U&D</h3>
            <p className="text-xs text-gray-500">Users and Drivers ratio</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Piechart