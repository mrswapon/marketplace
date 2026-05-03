import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";



const Status = () => {

  const  {data } = useGetDashboardStatusQuery();
  // console.log(data);
 
  const Alldata = [
    { title: "Total Users", value: data?.totalUser || 0 },
    { title: "Total Drivers", value: data?.totalSeller || 0 }, 
    { title: "Total Completed Trips", value: data?.revenue || 0 }, 
    { title: "Total Cancelled Trips", value: data?.totalProduct || 0 }, 
  ];
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-7">
      {Alldata.map((item, idx) => (
        <div
          key={idx}
          className="w-full flex justify-between items-center p-6 rounded-lg border-2 border-[#FF8133] bg-[#FFF2EB]"
        >
          <div className="flex items-center">
            <BsFillClipboard2CheckFill className="text-[#FF8133] size-10 mr-4" />
            <h1 className="text-xl md:text-2xl font-semibold text-[#222222]">
              {item.title}
            </h1>
          </div>
          <h1 className="text-2xl font-semibold text-[#222222] text-center">
            {item.value}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Status;




