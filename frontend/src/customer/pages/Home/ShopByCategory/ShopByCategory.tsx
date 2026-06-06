import React from 'react'
import ShopByCategoryCard from './ShopByCategoryCard'
import { useAppSelector } from 'src/State/Store'

const ShopByCategory = () => {
  const { customer } = useAppSelector(store => store)
  const categories = customer.homePageData?.shopByCategories ?? []

  return (
    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-5 lg:px-20'>
      {categories.map((item) => (
        <ShopByCategoryCard key={item.id ?? item.categoryId} item={item} />
      ))}
    </div>
  )
}

export default ShopByCategory
