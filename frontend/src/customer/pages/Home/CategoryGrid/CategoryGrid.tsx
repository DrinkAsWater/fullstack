import React from 'react'

const IMAGES = [
  // left tall: women fashion
  "https://images.pexels.com/photos/13966969/pexels-photo-13966969.jpeg?auto=compress&cs=tinysrgb&w=600",
  // top middle-left: accessories / watch
  "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=600",
  // top middle-right: women dress
  "https://images.pexels.com/photos/12730873/pexels-photo-12730873.jpeg?auto=compress&cs=tinysrgb&w=600",
  // right tall: men casual
  "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
  // bottom middle-left: men formal shirt
  "https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg?auto=compress&cs=tinysrgb&w=600",
  // bottom middle-right: denim jacket
  "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
]

export const CategoryGrid = () => {
  return (
    <div className='grid grid-cols-12 grid-rows-12 gap-2 lg:gap-4 lg:h-[600px] px-5 lg:px-20'>
      {/* Left tall panel — cols 1-3, rows 1-12 */}
      <div className='col-start-1 col-span-3 row-start-1 row-span-12'>
        <img className="w-full h-full object-cover object-top rounded-md" src={IMAGES[0]} alt="女士服飾" />
      </div>

      {/* Top middle-left — cols 4-5, rows 1-6 */}
      <div className='col-start-4 col-span-2 row-start-1 row-span-6'>
        <img className="w-full h-full object-cover object-top rounded-md" src={IMAGES[1]} alt="配件" />
      </div>

      {/* Top middle-right — cols 6-9, rows 1-6 */}
      <div className='col-start-6 col-span-4 row-start-1 row-span-6'>
        <img className="w-full h-full object-cover object-top rounded-md" src={IMAGES[2]} alt="女士禮服" />
      </div>

      {/* Right tall panel — cols 10-12, rows 1-12 */}
      <div className='col-start-10 col-span-3 row-start-1 row-span-12'>
        <img className="w-full h-full object-cover object-top rounded-md" src={IMAGES[3]} alt="男士服飾" />
      </div>

      {/* Bottom middle-left — cols 4-7, rows 7-12 */}
      <div className='col-start-4 col-span-4 row-start-7 row-span-6'>
        <img className="w-full h-full object-cover object-top rounded-md" src={IMAGES[4]} alt="男士商務裝" />
      </div>

      {/* Bottom middle-right — cols 8-9, rows 7-12 */}
      <div className='col-start-8 col-span-2 row-start-7 row-span-6'>
        <img className="w-full h-full object-cover object-top rounded-md" src={IMAGES[5]} alt="丹寧系列" />
      </div>
    </div>
  )
}

export default CategoryGrid;
