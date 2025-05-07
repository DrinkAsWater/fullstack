
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from 'src/seller/componet/pages/Account/Profile'
import Orders from 'src/seller/componet/pages/Orders/Orders'
import Payment from 'src/seller/componet/pages/Payment/Payment'
import Transaction from 'src/seller/componet/pages/Payment/Transaction'
import AddProduct from 'src/seller/componet/pages/Products/AddProduct'
import Products from 'src/seller/componet/pages/Products/Products'
import Dashboard from 'src/seller/componet/pages/SellerDashborad/Dashboard'

const SellerRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/products' element={<Products />} />
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='/account' element={<Profile />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/payment' element={<Payment />} />
                <Route path='/transaction' element={<Transaction />} />
            </Routes>
        </div>
    )
}

export default SellerRoutes