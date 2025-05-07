import { Close } from '@mui/icons-material'
import { teal } from '@mui/material/colors'
import React from 'react'
import { addProductToWishlist } from 'src/State/customer/wishlistSlice'
import { useAppDispatch } from 'src/State/Store'
import { Product } from 'src/types/ProductTypes'

const WishlistProductCard = ({ item }: { item: Product }) => {
  const dispatch = useAppDispatch();
  const handleWihlist = () => {
    item.id && dispatch(addProductToWishlist({ productId: item.id }))
  }
  return (
    <div className='w-60 relative'>
      <div className="w-full">
        <img src={item.images[0]} className='object-top w-full' alt='' />
      </div>
      <div className='pt-3 space-y-1'>
        <p>{item.title}</p>
        <div className='price flex items-center gap-3'>

          <span className="font-sans text-gray-800">
            NT${item.sellingPrice}
          </span>
          <span className='thin-line-through text-gray-400'>
            NT$ {item.mrpPrice}
          </span>
          <span className='text-primary-color font-semibold'>
            {item.discountPercent}%
          </span>
        </div>
      </div>
      <div className="absolute top-1 right-1 ">
        <button onClick={handleWihlist}>
          <Close className='cursor-pointer bg-white rounded-full p-1' sx={{color:teal[500],fontSize:"2rem"}} />
        </button>
      </div>

    </div>
  )
}

export default WishlistProductCard