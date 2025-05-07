import React from 'react'
import { Deal } from 'src/types/dealTypes'

const DealCard = ({item}:{item:Deal}) => {
  return (
<div className="w-[16rem] cursor-pointer">
  <div className="p-[2px] bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
    <img
     className="w-full h-auto object-cover border-[1px] border-gray-300 shadow-md rounded-lg"
      src={item.category.image}
      alt=""
    />
  </div>
  <div className="border-4 border-gray-300 bg-white text-center p-4 rounded-lg">
  <p className="text-lg font-semibold text-gray-800">{item.category.name}</p>
  <p className="text-xl font-bold text-red-600">限時{item.discount}% 優惠</p>
  <p className="text-base text-blue-500">立即搶購</p>
</div>
</div>

  
  )
}

export default DealCard