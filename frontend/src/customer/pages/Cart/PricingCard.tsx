import { Divider } from '@mui/material'
import React from 'react'
import { useAppSelector } from 'src/State/Store'

const PLATFORM_FEE = 0
const SHIPPING_FEE = 69

const PricingCard = () => {
    const { cart } = useAppSelector(store => store)
    const mrp = cart.cart?.totalMrpPrice ?? 0
    const selling = cart.cart?.totalSellingPrice ?? 0
    const discount = mrp - selling
    const total = selling + SHIPPING_FEE

    return (
        <>
            <div className='space-y-3 p-5'>
                <div className='flex justify-between items-center'>
                    <span>小計</span>
                    <span>${mrp}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span>折扣</span>
                    <span className='text-green-600'>-${discount}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span>運費</span>
                    <span>${SHIPPING_FEE}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span>平台費用</span>
                    <span>免費</span>
                </div>
            </div>
            <Divider />
            <div className='flex justify-between items-center p-5 text-primary-color font-semibold'>
                <span>全部</span>
                <span>${total}</span>
            </div>
        </>
    )
}

export default PricingCard
