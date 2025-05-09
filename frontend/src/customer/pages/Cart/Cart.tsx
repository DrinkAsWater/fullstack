import React, { useEffect, useState } from 'react'
import CartItem from './CartItemCard'
import { Close, LocalOffer } from '@mui/icons-material'
import { teal } from '@mui/material/colors'
import { Button, IconButton, TextField } from '@mui/material'
import PricingCard from './PricingCard'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/State/Store'
import { fetchUserCart } from 'src/State/customer/cartSlice'



const Cart = () => {
    const [couponCode, setCouponCode] = useState("")
    const navigate = useNavigate();
    const handleChange = (e: any) => {
        setCouponCode(e.target.value)
    }
    const dispatch = useAppDispatch();
    const {cart}= useAppSelector(store=>store)

    useEffect(()=>{
        dispatch(fetchUserCart(localStorage.getItem("jwt")||""))
    },[])

    return (
        <div className='pt-10 px-5 sm:px-10 md:px-60 min-h-screen '>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                <div className=' cartItemSection lg:col-span-2 sapce-y-3'>
                    {cart.cart?.cartItems.map((item) => <CartItem item={item}/>)}

                </div>
                <div className='col-span-1 text-sm space-y-3 '>
                    <div className='border rounded-md px-5 py-3 space-y-5'>
                        <div className='flex gap-3 text-sm items-center'>
                            <div className='flex gap-3 text-sm items-center'>
                                <LocalOffer sx={{ color: teal[600], fontSize: "17px" }} />
                            </div>
                            <span>輸入優惠代碼</span>
                        </div>
                        {true ? <div className='flex  justify-between items-center'>
                            <TextField onChange={handleChange}
                                id="outlined-basic"
                                placeholder='折扣碼'
                                size='small' variant="outlined" />
                            <Button size='small'>
                                接受
                            </Button>
                        </div>
                            : <div className='flex'>
                                <div className='p-1 pl-5 pr-3 border rounded-md flex gap-2 items-center'>
                                    <span className=''>GG112優惠已被使用</span>
                                    <IconButton size='small'>
                                        <Close className='text-red-600' />
                                    </IconButton>

                                </div>
                            </div>}



                    </div>
                    <div className='border rounded-md'>
                        <PricingCard />
                        <div className='p-5'>
                            <Button
                                onClick={() => navigate("/checkout")}
                                fullWidth
                                variant='contained'
                                sx={{ py: "11px" }}>
                                立即下單
                            </Button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Cart