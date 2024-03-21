import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slice/authSlice';
import { Link } from 'react-router-dom';

//A. This route displays only when admin is Logged in
const AdminOnlyRoute = ({children}) => {
  const userEmail = useSelector(selectEmail);
  //console.log(userEmail);

  if(userEmail === "admin@gmail.com") {
    //display this content for the admin email address only
    return children;
  }
  //else
  return (
      <section style={{height: "80vh"}}>
        <div className='container'>
          <h2>Permission Denied.</h2>
          <p>This page can only be view by an Admin User</p>
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

//B. This component displays only when admin is Logged in
export const AdminOnlyLink = ({children}) => {
  const userEmail = useSelector(selectEmail);
  //console.log(userEmail);

  if(userEmail === "admin@gmail.com") {
    //display Admin Link for the admin email address only
    return children
  }
  return null;
}

export default AdminOnlyRoute;


