import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slice/authSlice';

//Only the Admin email will see this route
const AdminOnlyRoute = ({children}) => {
  const userEmail = useSelector(selectEmail);
  //console.log(userEmail);

  if(userEmail === "admin@gmail.com") {
    return children
  }
  return null;
}

export default AdminOnlyRoute;


