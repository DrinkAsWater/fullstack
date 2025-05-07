import { Box, TextField } from '@mui/material'
import React from 'react'

const BecomeSellerFormStep1 = ({ formik }: any) => {
    return (
        <Box>
            <p className='text-xl font-bold text-center pb-9'>聯絡資訊</p>

            <div className='space-y-9 '>
                <TextField
                    fullWidth
                    name='mobile'
                    label="手機"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                    helperText={formik.touched.mobile && formik.errors.mobile}
                />
                <TextField
                    fullWidth
                    name='GUI'
                    label="統一編號"
                    value={formik.values.GUI}
                    onChange={formik.handleChange}
                    error={formik.touched.GUI && Boolean(formik.errors.GUI)}
                    helperText={formik.touched.GUI && formik.errors.GUI}
                />
            </div>
        </Box>
    )
}

export default BecomeSellerFormStep1