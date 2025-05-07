import React from 'react'
import ReviewCard from './ReviewCard'
import { Divider } from '@mui/material'

const Review = () => {
  return (
    <div className='p-5 lg:px-20 flex flex-col lg:flex-row gap-20'>
      <section className=' w-full md:w-1/2 lg:w-[30%] space-y-2'>
        <img src="https://img-retro-girl.freetls.fastly.net/retrogirl/image_item/108/108192/10819211_b.jpg?20241030122315" alt="" />
        <div>
          <div>
            <p className='font-bold text-xl'>復古女孩</p>
            <p className='text-lg text-gray-600'>羅紋高領針織衫</p>
          </div>
          <div>
            <div className='price flex items-center gap-3'>
              <span className='font-sans text-gray-800'>
                NT$800
              </span>
              <span className='thin-line-through text-gray-400'>
                NT$1000
              </span>
              <span className='text-primary-color font-semibold'>
                80%
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className='space-y-5 w-full'>
        {[1,1,1,1,1,1,1,1,1].map((item)=><div className='space-y-3'><ReviewCard/>
        <Divider/>
        </div>)}
      </section>

    </div>
  )
}

export default Review