import React, { useEffect } from 'react'
import OrderItem from './OrderItemCard'
import { useAppDispatch, useAppSelector } from 'src/State/Store'
import { fetchUserOrderHistory } from 'src/State/customer/orderSlice';

const Order = () => {
  const dispatch = useAppDispatch();
  const {order} = useAppSelector(store=>store)

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""))
  },[])
  return (
    <div className='text-sm min-h-screen'>
      <div className='pb-5'>
        <h1 className='font-semibold'>全部訂單</h1>
        <p>隨時開始</p>
      </div>
      <div className="space-y-2">
        {order.orders.map((order) => order.orderItems.map((item)=><OrderItem order={order} item={item} />))}
      </div>

    </div>
  )
}

export default Order