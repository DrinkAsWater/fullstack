import { Label } from '@mui/icons-material'
import { Button, Step, StepLabel, Stepper } from '@mui/material'
import React, { useState } from 'react'
import BecomeSellerFormStep from './BecomeSellerFormStep1'
import BecomeSellerFormStep1 from './BecomeSellerFormStep1'
import { useFormik } from 'formik'
import BecomeSellerFormStep2 from './BecomeSellerFormStep2'
import BecomeSellerFormStep3 from './BecomeSellerFormStep3'
import BecomeSellerFormStep4 from './BecomeSellerFormStep4'

const steps = [
  "稅務資料與手機號碼",  // Tax Details&Mobile
  "取貨地址",             // Pickup Address
  "銀行資料",             // Bank Details
  "供應商資料"           // Supplier Details
]

const SellerAccountForm = () => {

  const [activeStep, setActiveStep] = useState(0)

  const handleStep = (value: number) => () => {
    (activeStep < steps.length - 1 || (activeStep > 0 && value == -1)) && setActiveStep(activeStep + value)
    activeStep == steps.length - 1 && handleCreateAccount();
    console.log("active stpe", activeStep)
  }
  const handleCreateAccount = () => {
    console.log("建立帳號")
  }
  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      gui: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pincode: "",
        address: "",
        locality: "",
        city: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
      password: ""
    },
    onSubmit: (values) => {
      console.log(values, "formik submitted");
    }
  })
  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (<Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
        ))}
      </Stepper>
      <section className='mt-20 space-y-10'>
        <div >
          {activeStep == 0 ? <BecomeSellerFormStep1 formik={formik} /> :
            activeStep == 1 ? <BecomeSellerFormStep2 formik={formik} /> :
            activeStep==2 ? <BecomeSellerFormStep3 formik={formik}/> :
            <BecomeSellerFormStep4 formik={formik}/>}
        </div>
        <div className="flex items-center justify-between">
          <Button onClick={handleStep(-1)} variant='contained' disabled={activeStep == 0}>
            返回
          </Button>
          <Button onClick={handleStep(1)} variant='contained'
          >
            {activeStep == (steps.length - 1) ? "建立帳戶" : " 下一步"}

          </Button>
        </div>
      </section>

    </div >
  )
}

export default SellerAccountForm