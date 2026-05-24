import { useParams } from "react-router-dom";
import { useSingleUserQuery } from "../../../redux/features/user/userApi";

const UsersDetailes = () => {
 const {id} = useParams()
 const {data} = useSingleUserQuery(id)
 console.log(data)
 return (
 <div>
 <h2>Welcome to the UsersDetailes page</h2>
 </div>
 );
};

export default UsersDetailes;