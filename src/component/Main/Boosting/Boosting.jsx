import { useGetBoostingQuery } from "../../../redux/features/boosting/boosting";

const Boosting = () => {
 const { data:boostingData } = useGetBoostingQuery();
 console.log("Boosting Data:", boostingData);
 return (
 <div>
 <h2>Welcome to the Boosting page</h2>
 </div>
 );
};

export default Boosting;