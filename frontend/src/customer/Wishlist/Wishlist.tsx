import React, { useEffect } from 'react'
import WishlistProductCard from './WishlistProductCard'
import { useAppDispatch, useAppSelector } from 'src/State/Store'
import { getWishlistByUserId } from 'src/State/customer/wishlistSlice'
import { FavoriteBorder } from '@mui/icons-material'
import { Button } from '@mui/material'
import { teal } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'

const Wishlist = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { wishlist } = useAppSelector(store => store)
    useEffect(() => {
        dispatch(getWishlistByUserId())
    }, [])
    const count = wishlist.wishlist?.products.length ?? 0

    return (
        <div className='min-h-[85vh] px-5 py-10 lg:px-20'>
            <div className='flex items-center gap-3 pb-6 border-b'>
                <FavoriteBorder sx={{ color: teal[500], fontSize: '1.75rem' }} />
                <h1 className='text-2xl font-bold text-gray-800'>我的購物清單</h1>
                <span className='text-sm text-gray-400'>共 {count} 個項目</span>
            </div>

            {count === 0 ? (
                <div className='flex flex-col items-center justify-center gap-4 py-28 text-gray-400'>
                    <FavoriteBorder sx={{ fontSize: '4rem' }} />
                    <p className='text-lg'>您的購物清單是空的</p>
                    <Button
                        onClick={() => navigate('/')}
                        variant='outlined'
                        className='!text-primary-color !border-primary-color'>
                        去逛逛
                    </Button>
                </div>
            ) : (
                <div className='pt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                    {wishlist.wishlist?.products.map((item) => <WishlistProductCard key={item.id} item={item} />)}
                </div>
            )}
        </div>
    )
}

export default Wishlist
