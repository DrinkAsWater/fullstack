import React from 'react'
import { Deal } from 'src/types/dealTypes'

const DealCard = ({ item }: { item: Deal }) => {
  return (
    <div className="w-[200px] lg:w-[220px] cursor-pointer flex-shrink-0">
      <div className="p-[2px] bg-gradient-to-r from-red-500 to-pink-500 rounded-xl">
        <img
          className="w-full h-[200px] lg:h-[220px] object-cover rounded-xl"
          src={item.category.image}
          alt={item.category.name}
        />
      </div>
      <div className="mt-2 text-center px-1">
        <p className="text-sm font-semibold text-gray-800 truncate">{item.category.name}</p>
        <p className="text-base font-bold text-red-600">限時 {item.discount}% 優惠</p>
        <p className="text-xs text-blue-500 hover:underline">立即搶購 →</p>
      </div>
    </div>
  )
}

export default DealCard
