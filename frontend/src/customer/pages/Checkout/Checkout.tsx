import { Box, Button, FormControlLabel, Modal, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import AddressCard from './AddressCard'
import AddressForm from './AddressForm';
import PricingCard from '../Cart/PricingCard';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const paymentGatewaylist = [
    {
        value: "PAYPAL",
        image: "https://newsroom.china.paypal-corp.com/file.php/177465/pp_h_rgb_logo_tn.jpg?thumbnail=modal",
        label: ""
    },
    {
        value: "STRIPE",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/512px-Stripe_Logo%2C_revised_2016.svg.png",
        label: "",
    }
]


const Checkout = () => {


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [paymentGateway, setPaymentGayeway] = useState("STRIPE");

    const handlePaymentChange = (event: any) => {
        setPaymentGayeway(event.target.value);
    }

    return (
        <>
            <div className='pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen'>
                <div className='space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9'>
                    <div className="col-span-2 space-y-5">
                        <div className="flex justify-between items-center">
                            <h1 className="font-semibold">選擇收件地址</h1>
                            <Button onClick={handleOpen}>
                                新增地址
                            </Button>
                        </div>
                        <div className="text-xs font-medium space-y-5">
                            <p>已存地址</p>
                            <div className='space-y-3'>
                                {[1, 1, 1].map((item) => <AddressCard />)}
                            </div>
                        </div>
                        <div className='py-4 px-5 rounded-md border'>
                            <Button onClick={handleOpen} >
                                新增地址
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='space-y-3 border p-5 rounded-md'>
                                <h1 className='text-primary-color font-medium pb-2 text-center'>選擇支付方式</h1>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    className='flex justify-between pr-0'
                                    onChange={handlePaymentChange}
                                    value={paymentGateway}
                                >
                                    {paymentGatewaylist.map((item) =>
                                        <FormControlLabel
                                            className='border w-[45%] pr-2 rounded-md flex justify-center'
                                            value={item.value}
                                            control={<Radio />}
                                            label={
                                                <img className={`${item.value === "stripe" ? "w-14" : ""}object-cover`} src={item.image} alt={item.label} />
                                            }
                                        />)}

                                </RadioGroup>
                            </div>
                        </div>
                        <div className='border rounded-md'>

                            <PricingCard />
                            <div className='p-5'>
                                <Button fullWidth
                                    variant='contained'
                                    sx={{ py: "11px" }}>
                                    結帳
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddressForm  paymentGateway={paymentGateway} />
                </Box>
            </Modal>
        </>

    )
}

export default Checkout