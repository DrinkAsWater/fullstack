import { Divider } from '@mui/material'
import React from 'react'

const PricingCard = () => {
    return (
        <>
            <div className='space-y-3 p-5'>
                <div className='flex justify-between items-center'>
                    <span>小計</span>
                    <span>$899</span>

                </div>
                <div className='flex justify-between items-center'>
                    <span>折扣</span>
                    <span>$699</span>

                </div>

                <div className='flex justify-between items-center'>
                    <span>運費</span>
                    <span>$69</span>

                </div>
                <div className='flex justify-between items-center'>
                    <span>平台費用</span>
                    <span>免費</span>
                </div>


            </div>
            <Divider />
            <div className='flex justify-between items-center p-5 text-primary-color'>
                <span>全部</span>
                <span>$799</span>

            </div>
        </>

    )
}

export default PricingCard