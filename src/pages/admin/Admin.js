import React from 'react'
import  styles from "./Admin.module.scss"
import Navbar from '../../components/admin/adminNavbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../../components/admin/home/Home'
import AddProduct from '../../components/admin/addProduct/AddProduct'
import ViewProduct from '../../components/admin/viewProduct/ViewProduct'
import Orders from '../../components/admin/orders/Orders'

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
         {/*Nested Routes */}
          <Routes>
            <Route path="home" element={<Home />}  />
            <Route path="all-products" element={<ViewProduct />}  />

            <Route path="add-product/:id" element={<AddProduct />}  />

            <Route path="orders" element={<Orders />}  />
          </Routes>
      </div>
      
    </div>
  )
}

export default Admin

