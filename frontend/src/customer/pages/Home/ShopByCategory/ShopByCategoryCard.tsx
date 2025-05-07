import React from 'react'
import "./ShopByCategory.css"
import { HomeCategory } from 'src/types/HomeCategoryTypes'

const ShopByCategoryCard = ({item}:{item:HomeCategory}) => {
  return (
    <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
        <div className='custome-border w-[150px]  h-[150px] lg:w-[249px] lg:h-[249px] rounded-full bg-primary-color'>
            <img className='rounded-full group-hover:scale-95 transition-transform object-cover object-top h-full w-full' src={item.image} alt="" />

        </div>
        <h1>{item.name}</h1>

    </div>
  )
}

export default ShopByCategoryCard