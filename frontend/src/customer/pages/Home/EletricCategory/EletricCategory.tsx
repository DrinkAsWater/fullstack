import React from 'react'
import { EletricCategoryCard } from './EletricCategoryCard';
import { useAppSelector } from 'src/State/Store';

export const EletricCategory = () => {
  const {customer} = useAppSelector(store=>store)
  return (
    <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
    {customer.homePageData?.electricCategories.slice(0,7).map((item)=><EletricCategoryCard item={item}/>)}
    
  </div>
  )
}
