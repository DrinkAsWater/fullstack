import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { paymentSuccess } from 'src/State/customer/orderSlice';
import { useAppDispatch } from 'src/State/Store';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { orderId } = useParams()
    const getQueryParam = (key:string) => {
        const query = new URLSearchParams(location.search)
        return query.get(key)
    }
    useEffect(() => {
        const paymentId = getQueryParam("stripe_payment_id");
        const paymentLinkId = getQueryParam("stripe_payment_link_id");
        dispatch(paymentSuccess({
            jwt: localStorage.getItem("jwt") || "",
            paymentId:paymentId || "",
            paymentLinkId:paymentLinkId  || ""
        }))

    }, [orderId])
    return (
        <div className='min-h-[90vh] flex justify-center items-center'>
            <div className="bg-primary-color text-white p-8 w-[90%] lg:w-[25%] border rounded-md h-[40vh] flex flex-col gap-7 items-center justify-center">
                <h1 className="text-3xl font-semibold">恭喜!!</h1>
                <h1 className="text-2xl font-semibold">感謝選購，我們的商品正準備出發到您身邊！</h1>
                <div>
                    <Button color='secondary' variant='contained' onClick={(() => navigate("/"))}>
                        繼續購物
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default PaymentSuccess