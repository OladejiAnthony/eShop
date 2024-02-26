import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//Pages
import {Home, Contact, Login, Register, Reset, Admin} from "./pages/index"
//Components
import {Header, Footer} from "./components/index"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute';


const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header  />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset' element={<Reset />} />
          {/*Admin Route */}
          <Route 
            path='/admin/*' 
            element={<AdminOnlyRoute> <Admin /> </AdminOnlyRoute>}  
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App

//Normal Routing techniques:
//import Home from './pages/home/Home'
//import Contact from './pages/contact/Contact'