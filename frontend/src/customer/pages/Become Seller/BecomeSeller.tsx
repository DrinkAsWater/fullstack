import React, { useState } from 'react'
import SellerAccountForm from './SellerAccountForm';
import SellerLoginForm from './SellerLoginForm';
import { Button } from '@mui/material';

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);
  const handleShowPage = () => {
    setIsLogin(!isLogin);
  }
  return (
    <div className='grid md:gap-10 grid-cols-3 min-h-screen'>
      <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-md">

        {!isLogin ? <SellerAccountForm /> : <SellerLoginForm />}
        <div className="mt-10 space-y-2">
          <h1 className='text-center text-sm font-medium'>已經有帳號了嗎？</h1>
          <Button onClick={handleShowPage} fullWidth sx={{ py: "11px" }} variant='outlined'>
            {isLogin ? "註冊" : "登入"}
          </Button>
        </div>
      </section>
      <section className='hidden md:col-span-1 lg:col-span-2 md:flex justify-items-center items-center'>
        <div className="lg:w-[70%] px-5 space-y-10">
          <div className="space-y-2 font-bold text-center">
            <p className="text-2xl">加入市場電商革命！</p>
            <p className='text-lg text-primary-color'>今天就讓你的銷售翻倍成長</p>
          </div>
          <img src="https://zosh-bazzar-zosh.vercel.app/seller.jpg" alt="加入我們，讓銷售更上一層樓" />
        </div>
      </section>
    </div>
  )
}

export default BecomeSeller
