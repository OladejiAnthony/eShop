import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//Pages
import {Home, Contact, Login, Register, Reset} from "./pages/index"
//Components
import {Header, Footer} from "./components/index"

const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <Header  />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset' element={<Reset />} />
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