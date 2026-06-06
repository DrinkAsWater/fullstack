import React from 'react'
import DealCard from './DealCard'
import { useAppSelector } from 'src/State/Store';

const Deal = () => {
  const { customer } = useAppSelector(store => store);
  const deals = customer.homePageData?.deals ?? [];

  return (
    <div className='px-5 lg:px-20'>
      <div className='flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide'>
        {deals.slice(0, 6).map((item) => (
          <div key={item.id} className='snap-start shrink-0'>
            <DealCard item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Deal
