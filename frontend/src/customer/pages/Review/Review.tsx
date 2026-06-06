import React, { useEffect } from 'react'
import ReviewCard from './ReviewCard'
import { Divider } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/State/Store'
import { fetchProductById } from 'src/State/customer/ProductSlice'

const Review = () => {
  const { productId } = useParams()
  const dispatch = useAppDispatch()
  const { product } = useAppSelector(store => store)

  useEffect(() => {
    if (productId) dispatch(fetchProductById(Number(productId)))
  }, [productId])

  const p = product.product

  return (
    <div className='p-5 lg:px-20 flex flex-col lg:flex-row gap-20'>
      <section className='w-full md:w-1/2 lg:w-[30%] space-y-2'>
        {p?.images[0] && <img className='rounded-md' src={p.images[0]} alt={p.title} />}
        <div>
          <p className='font-bold text-xl'>{p?.seller?.businessDetails.businessName ?? ""}</p>
          <p className='text-lg text-gray-600'>{p?.title ?? ""}</p>
          {p && (
            <div className='price flex items-center gap-3 mt-2'>
              <span className='font-sans text-gray-800'>NT${p.sellingPrice}</span>
              <span className='thin-line-through text-gray-400'>NT${p.mrpPrice}</span>
              <span className='text-primary-color font-semibold'>{p.discountPercent}%</span>
            </div>
          )}
        </div>
      </section>

      <section className='space-y-5 w-full'>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className='space-y-3'>
            <ReviewCard />
            <Divider />
          </div>
        ))}
      </section>
    </div>
  )
}

export default Review