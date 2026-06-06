import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { sendLoginSignupOTP, signup } from 'src/State/AuthSlice'
import { useAppDispatch, useAppSelector } from 'src/State/Store'

const RegisterForm = () => {
    const dispatch = useAppDispatch()
    const { auth } = useAppSelector(store => store)
    const formik = useFormik({
        initialValues: {
            email: "",
            otp: "",
            fullName: "",
            mobile: ""
        },
        onSubmit: (values) => {
            dispatch(signup({
                email: values.email,
                otp: values.otp,
                fullName: values.fullName,
                mobile: values.mobile
            }))
        }
    })

    const handleSendOtp = () => {
        dispatch(sendLoginSignupOTP({ email: formik.values.email }))
    }
    return (
        <div>
            <h1 className="text-center font-bold text-xl text-primary-color pb-8">
                註冊
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
                    <div className='space-y-3'>
                        <div className="space-y-2">
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
                        </div>
                        <TextField
                            fullWidth
                            name="fullName"
                            label="姓名"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                            helperText={formik.touched.fullName && formik.errors.fullName}
                        />
                        <TextField
                            fullWidth
                            name="mobile"
                            label="手機號碼"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>}

                {!auth.otpSent && <Button onClick={handleSendOtp} fullWidth variant='contained' sx={{ py: "11px" }}>
                    發送otp
                </Button>}
                {auth.otpSent && <Button onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{ py: "11px" }}>
                    註冊
                </Button>}

            </div>
        </div>
    )
}

export default RegisterForm
