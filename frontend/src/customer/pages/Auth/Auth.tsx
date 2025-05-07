import React, { useState } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Button } from '@mui/material';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='flex justify-center items-center h-[90vh]'>
      <div className="max-w-md h-[85vh] rounded-md shadow-lg bg-white">
        <img className='w-full rounded-t-md object-cover'
          src='https://cdn.pixabay.com/photo/2023/10/24/14/59/woman-8338390_1280.jpg'
          alt='A woman smiling' />
        <div className='px-10 mt-8'>
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="flex items-center gap-1 justify-center mt-5">
            <p>{isLogin ? "還沒有帳號嗎" : "已經有帳號嗎"}</p>
            <Button size='small' onClick={() => setIsLogin(!isLogin)}>{isLogin ? "創建帳號" : "登入"}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
