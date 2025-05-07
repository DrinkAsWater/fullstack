import { Divider } from '@mui/material'
import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Order from './Order'
import OrderItemDetails from './OrderDetails'
import UserDetails from './UserDetails'
import Address from './Address'
import OrderDetails from './OrderDetails'
import { useAppDispatch } from 'src/State/Store'
import { logout } from 'src/State/AuthSlice'

const menu = [
  { name: "我的訂單", path: "/account/orders" },
  { name: "個人資料", path: "/account" },
  { name: "已儲存卡片", path: "/account/saved-card" },
  { name: "收件地址", path: "/account/addresses" },
  { name: "登出", path: "/" },


]

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleClick = (item: any) => {
    if (item.path === "/") {
      dispatch(logout(navigate))
    }
    navigate(item.path);
  }

  return (
    <div className='px-5 lg:px-52 min-h-screen mt-10'>
      <div>
        <h1 className='text-xl font-bold pb-5'>哈哭哪瑪塔塔</h1>
      </div>
      <Divider />
      <div className='grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]'>
        <section className='col-span-1 lg:border-r lg:pr-5 py-5 h-full '>
          {
            menu.map((item) => (
              <div onClick={() => handleClick(item)} key={item.name}
                className={`${item.path === location.pathname ? "bg-primary-color text-white" : ""}
                py-3 cursor-pointer hover:text-white hover:bg-primary-color px-5 rounded-md border-b`}>
                <p>{item.name}</p>
              </div>
            ))
          }
        </section>
        <section className='right lg:col-span-2 lg:pl-5 py-5'>
          <Routes>
            <Route path='/' element={<UserDetails />} />
            <Route path='/orders' element={<Order />} />
            <Route path='/order/:orderId/:orderItemId' element={<OrderDetails />} />
            <Route path='/addresses' element={<Address />} />
          </Routes>

        </section>

      </div>

    </div>
  )
}

export default Account