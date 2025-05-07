import { Box, Button, Grid, Grid2, TextField } from '@mui/material'
import { Formik, useFormik } from 'formik'
import React from 'react'
import { createOrder } from 'src/State/customer/orderSlice'
import { useAppDispatch } from 'src/State/Store'
import * as Yup from "yup"

const AddressFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string().required("Mobile number is required").matches(/^[0-9]\d{9}$/, "無效的手機號碼"),
  pinCode: Yup.string().required("Pin code is required").matches(/^[1-9][0-9]{2}$/, "無效的郵遞區號"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  locality: Yup.string().required("Locality is required"),

})
const AddressForm = ({ paymentGateway }: any) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: "",
      pinCode: "",
      address: "",
      city: "",
      locality: "",
    },
    validationSchema: AddressFormSchema,
    onSubmit: (values) => {
      console.log(values)
      dispatch(createOrder({
        address: values,
        jwt: localStorage.getItem("jwt") || "",
        paymentGateway:paymentGateway,
      }))
    },
  });
  return (
    <Box sx={{ max: "auto" }}>
      <p className='text-xl font-bold text-center pb-5'>聯絡資訊</p>
      <form onSubmit={formik.handleSubmit}>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              name='name'
              label="姓名"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='mobile'
              label="手機號碼"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='pinCode'
              label="郵遞區號"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.pinCode && formik.errors.pinCode}
            />
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='city'
              label="城市"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='locality'
              label="地區"
              value={formik.values.locality}
              onChange={formik.handleChange}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.locality && formik.errors.locality}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              fullWidth
              name='address'
              label="地址"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Button fullWidth type='submit' variant='contained' sx={{ py: "14px" }}>
              新增地址
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Box>
  )
}

export default AddressForm
