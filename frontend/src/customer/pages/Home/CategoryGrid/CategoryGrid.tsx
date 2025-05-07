import React from 'react'

export const CategoryGrid = () => {
  return (
    <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>
      <div className='col-span-3  row-span-12  text-white '>
        <img className="w-full h-full object-cover object-top rounded-md" src="https://images.pexels.com/photos/13966969/pexels-photo-13966969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
      </div>
      <div className='col-span-2 row-span-6  text-white '>
    <img className="w-full h-full object-cover object-top rounded-md" src ="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt=''/>
      </div>
      <div className='col-span-4  row-span-6  text-white '>
        <img className="w-full h-full object-cover object-top rounded-md" src="https://images.pexels.com/photos/12730873/pexels-photo-12730873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
      </div>
      <div className='col-span-3 row-span-12  text-white '>
        <img className="w-full h-full object-cover object-top rounded-md" src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
      </div>

      <div className='col-span-4 row-span-6  text-white '>
        <img  className="w-full h-full object-cover object-top rounded-md"src="https://images.pexels.com/photos/754711/pexels-photo-754711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
      </div>

      <div className='col-span-2 row-span-6  text-white '>
        <img className="w-full h-full object-cover object-top rounded-md" src="https://images.pexels.com/photos/29705594/pexels-photo-29705594/free-photo-of-festive-snowman-decorations-at-christmas-market.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
      </div>
    
    
       </div>
  )
}

export default CategoryGrid;
