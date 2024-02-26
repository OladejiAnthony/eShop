import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slice/authSlice';
import { Link } from 'react-router-dom';

//Only the Admin will see this route
const AdminOnlyRoute = ({children}) => {
  const userEmail = useSelector(selectEmail);
  //console.log(userEmail);

  if(userEmail === "admin@gmail.com") {
    return children;
  }
  
  return (
      <section style={{height: "80vh"}}>
        <div className='container'>
          <h2>Permission Denied.</h2>
          <p>This page can only be viewd by an Admin User</p>
          <br />
          <Link to="/">
            <button className='--btn'>
              &larr; Back To Home
            </button>
          </Link>
        </div>
      </section>
    
  )
};

export const AdminOnlyLink = ({children}) => {
  const userEmail = useSelector(selectEmail);
  //console.log(userEmail);

  if(userEmail === "admin@gmail.com") {
    return children
  }
  return null;
}

export default AdminOnlyRoute;


