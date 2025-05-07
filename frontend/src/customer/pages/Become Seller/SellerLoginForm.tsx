import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { sendLoginSignupOTP, signin } from 'src/State/AuthSlice'
import { sellerLogin } from 'src/State/seller/SellerAuthSlice'
import { useAppDispatch } from 'src/State/Store'

const SellerLoginForm = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: "",
            otp: "",
        },
        onSubmit: (values) => {
            console.log("form data", values)
            // values.otp=Number(values.otp)
            dispatch(sellerLogin({ email: values.email, otp: values.otp }))
        }
    })
    const handleSendOtp = () => {
        dispatch(sendLoginSignupOTP({ email: formik.values.email }))
    }
    const handleLogin = () => {

    }
    return (
        <div>
            <h1 className="text-center font-bold text-xl text-primary-color pb-5">
                以賣家身份登入
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

                {true &&
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

                <Button onClick={handleSendOtp} fullWidth variant='contained' sx={{ py: "11px" }}>
                    發送otp
                </Button>
                <Button onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{ py: "11px" }}>
                    登入
                </Button>

            </div>
        </div>
    )
}

export default SellerLoginForm