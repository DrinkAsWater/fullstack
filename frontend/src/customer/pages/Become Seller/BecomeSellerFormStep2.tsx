import { Box, Button, Grid, Grid2, TextField } from '@mui/material'
import { Formik, useFormik } from 'formik'
import React from 'react'



const BecomeSellerFormStep2 = ({ formik }: any) => {


    return (
        <Box>
            <>
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
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                            helperText={formik.touched.pinCode && formik.errors.pinCode}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 6 }}>
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
                            name='city'
                            label="城市"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </Grid2>

                </Grid2>
            </>
        </Box>
    )
}

export default BecomeSellerFormStep2
