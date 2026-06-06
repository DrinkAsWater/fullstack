import React, { useState } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Button } from '@mui/material';
import { useAppDispatch } from 'src/State/Store';
import { resetOtp } from 'src/State/AuthSlice';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(resetOtp())
    setIsLogin(!isLogin)
  }

  return (
    <div className='flex justify-center items-center h-[90vh]'>
      <div className="max-w-md h-[85vh] rounded-md shadow-lg bg-white">
        <img className='w-full rounded-t-md object-cover'
          src='https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg?auto=compress&cs=tinysrgb&w=600'
          alt='fashion' />
        <div className='px-10 mt-8'>
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="flex items-center gap-1 justify-center mt-5">
            <p>{isLogin ? "還沒有帳號嗎" : "已經有帳號嗎"}</p>
            <Button size='small' onClick={handleToggle}>{isLogin ? "創建帳號" : "登入"}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
