import React from 'react'
import { EletricCategoryCard } from './EletricCategoryCard';
import { useAppSelector } from 'src/State/Store';

export const EletricCategory = () => {
  const { customer } = useAppSelector(store => store)
  const categories = customer.homePageData?.electricCategories ?? []

  return (
    <div className='flex flex-wrap justify-center lg:justify-between gap-6 lg:gap-8 py-5 lg:px-20 border-b'>
      {categories.slice(0, 7).map((item) => (
        <EletricCategoryCard key={item.id ?? item.categoryId} item={item} />
      ))}
    </div>
  )
}
