import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddNewCouponForm from 'src/admin/Pages/Coupon/AddNewCouponForm'
import Coupon from 'src/admin/Pages/Coupon/Coupon'
import Deal from 'src/admin/Pages/HomePage/Deal'
import ElectronicTable from 'src/admin/Pages/HomePage/ElectronicTable'
import GridTable from 'src/admin/Pages/HomePage/GridTable'
import ShopByCategoryTable from 'src/admin/Pages/HomePage/ShopByCategoryTable'
import SellersTable from 'src/admin/Pages/Seller/SellersTable'

const AdminRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<SellersTable />} />
                <Route path='/coupon' element={<Coupon />} />
                <Route path='/add-coupon' element={<AddNewCouponForm />} />
                <Route path='/home-grid' element={<GridTable />} />
                <Route path='/electronics-category' element={<ElectronicTable />} />
                <Route path='/shop-by-category' element={<ShopByCategoryTable />} />
                <Route path='/deals' element={<Deal />} />
            </Routes>
        </div>
    )
}

export default AdminRoutes