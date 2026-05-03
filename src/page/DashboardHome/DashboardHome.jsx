import IncomeGraphChart from "../../component/Main/Dashboard/IncomeGraphChart";
import Piechart from "../../component/Main/Dashboard/Piechart";
import RecentTransactions from "../../component/Main/Dashboard/RecentTransactions";
import Status from "../../component/Main/Dashboard/Status";
const DashboardHome = () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold py-3 px-3">Overview</h1>
      <div className="px-3">
        <Status />
    
        <div className="w-full h-full md:h-[50vh]  flex flex-col gap-4 md:flex-row justify-between items-center my-10">
            {/* Left Column: Chart */}
            <div className="w-full lg:w-[74%]  rounded-lg p-1">
              <IncomeGraphChart />
            </div>
            
            {/* Right Column: Pie Chart */}
            <div className="w-full lg:w-[24%] bg-gray-50">
              <Piechart />
            </div>
          </div>
        <RecentTransactions />
      </div>
    </section>
  );
};

export default DashboardHome;
