
//Hide links based on auth state
import { useSelector } from 'react-redux'
import {selectIsLoggedIn} from "../../redux/slice/authSlice"

//A. This component displays only when user is Logged in
const ShowOnLogin = ({children}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn); //read isLoggedIn property from authSlice

  if(isLoggedIn) {
    return children
  }
  return null; //else return null
}

export default ShowOnLogin;


//B. This component displays only when user is Logged out
export const ShowOnLogout = ({children}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn); //read isLoggedIn property from authSlice

  if(!isLoggedIn) {
    return children
  }
  return null; //else return null
}



//Note- anything you wrap this ShowOnLogin or Show OnLogout components around 
//will only be displayed when user is Logged in/Logged out on our web app. 


