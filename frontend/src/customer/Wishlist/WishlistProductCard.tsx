import { Close } from '@mui/icons-material'
import { teal } from '@mui/material/colors'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { addProductToWishlist } from 'src/State/customer/wishlistSlice'
import { useAppDispatch } from 'src/State/Store'
import { Product } from 'src/types/ProductTypes'

const WishlistProductCard = ({ item }: { item: Product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    item.id && dispatch(addProductToWishlist({ productId: item.id }))
  }
  // GET /api/wishlist still returns raw Product entities (nested seller.businessDetails.businessName),
  // unlike GET /products which now returns the flat seller.businessName projection — support both.
  const sellerName = item.seller?.businessName ?? item.seller?.businessDetails?.businessName
  return (
    <div
      onClick={() => navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`)}
      className='group relative bg-white rounded-md border overflow-hidden cursor-pointer transition-shadow hover:shadow-lg'>
      <div className='relative w-full aspect-square overflow-hidden bg-secondary-color'>
        <img
          src={item.images[0]}
          className='w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105'
          alt={item.title}
        />
        <button
          onClick={handleRemove}
          className='absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white'>
          <Close sx={{ color: teal[500], fontSize: '1.4rem' }} />
        </button>
      </div>
      <div className='p-3 space-y-1'>
        {sellerName && (
          <p className='text-xs text-gray-400 truncate'>{sellerName}</p>
        )}
        <p className='text-sm text-gray-700 truncate'>{item.title}</p>
        <div className='price flex items-center gap-2'>
          <span className='font-sans font-semibold text-gray-800'>
            NT${item.sellingPrice}
          </span>
          <span className='thin-line-through text-gray-400 text-sm'>
            NT${item.mrpPrice}
          </span>
          <span className='text-primary-color text-sm font-semibold'>
            {item.discountPercent}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default WishlistProductCard
