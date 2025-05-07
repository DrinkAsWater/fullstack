import { Button, CircularProgress, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { sendLoginSignupOTP, signin } from 'src/State/AuthSlice'
import { useAppDispatch, useAppSelector } from 'src/State/Store'

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const { auth } = useAppSelector(store => store)
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      console.log("form data", values)
      // values.otp=Number(values.otp)
      dispatch(signin(values))

    }
  })

  const handleSendOtp = () => {
    dispatch(sendLoginSignupOTP({ email: formik.values.email }))
  }
  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        登入
      </h1>
      <div className='space-y-5'>
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {auth.otpSent &&
          <div className='space-y-2'>
            <p className="font-medium text-sm opacity-60">輸入發送至郵箱的驗證碼</p>
            <TextField
              fullWidth
              name="otp"
              label="Otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />
          </div>}

        {auth.otpSent ? <Button onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{ py: "11px" }}>
          登入
        </Button> : <Button onClick={handleSendOtp} fullWidth variant='contained' sx={{ py: "11px" }}>
          {auth.loading ? <CircularProgress /> : " 發送otp"}
        </Button>}


      </div>
    </div>
  )
}

export default LoginForm