import React,{useState} from "react"
import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Pages
import Home from "./components/router/Home";
import About from "./components/router/About";
import Blogs from "./components/router/Blogs";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./components/router/NotFound";
import BlogDetails from "./components/router/BlogDetails";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
            {/*Page Params */}
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/about" element={<About />} />
              {/*Nested Route */}
        <Route path="/about/*" element={<About />} />
              {/*Not Found Links */}
        <Route path="*" element={<NotFound />} /> 

        {/*   Page Redirect - Redirect User to Blogs Page:
            <Route path="/view" element={<Navigate to="/blogs" />} />
        */}

            {/*Authorization - Redirect User Conditionally */}
        <Route 
          path="/view" 
          element={isLoggedIn ?
            <Navigate to="/blogs" /> :  <h4>Please Log In!!!</h4>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
