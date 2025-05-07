import React, { useEffect } from 'react'
import WishlistProductCard from './WishlistProductCard'
import { useAppDispatch, useAppSelector } from 'src/State/Store'
import { getWishlistByUserId } from 'src/State/customer/wishlistSlice'

const Wishlist = () => {
    const dispatch = useAppDispatch()
    const {wishlist}=useAppSelector(store=>store)
    useEffect(()=>{
        dispatch(getWishlistByUserId())
    },[])
  return (
    <div className='h-[85vh] p-5 lg:-20'>
        <section>
            <h1><strong>我的購物清單</strong>5個項目</h1>
            <div className="pt-10 flex flex-wrap gap-5">
                {wishlist.wishlist?.products.map((item)=><WishlistProductCard item={item}/>)}
            </div>
        </section>

    </div>
  )
}

export default Wishlist