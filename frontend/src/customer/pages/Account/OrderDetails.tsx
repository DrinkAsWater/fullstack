import { Box, Button, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import {  Payments } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "src/State/Store";
import { fetchOrderById, fetchOrderItemById } from "src/State/customer/orderSlice";

const OrderDetails = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { orderId, orderItemId } = useParams();
    const { order } = useAppSelector(stroe => stroe);
   

    useEffect(() => {
        dispatch(fetchOrderById({ orderId: Number(orderId), jwt: localStorage.getItem("jwt") || "" }))
        dispatch(fetchOrderItemById({ orderItemId: Number(orderItemId), jwt: localStorage.getItem("jwt") || "" }))
    }, [])

    return (
        <Box className="space-y-5">
            <section className="flex flex-col gap-5 justify-center items-center">
                <img
                    className="w-[100px]"
                    src={order.orderItem?.product.images[0]}
                    alt=""
                />
                <div className="text-sm space-y-1 text-center">
                    <h1 className="font-bold">{order.orderItem?.product.seller?.businessDetails.businessName}</h1>
                    <p>
                        Cellecor RAY 1.43" AMOLED Display | 700 NITS | AOD | BT-Calling | AI Voice Split Screen Smartwatch
                        (Black Strap, Free Size)
                    </p>
                    <p>
                        <strong>Size:</strong> M
                    </p>
                </div>
                <div>
                    <Button onClick={() => navigate(`/reviews/${15}/create`)}>Write Review</Button>
                </div>
            </section>

            <section className="border p-5">
                <OrderStepper orderStatus={"SHIPPED"} />
            </section>

            <div className="border p-5">
                <h1 className="font-bold pb-3">送貨地址</h1>
                <div className="text-sm space-y-2">
                    <div className="flex items-center gap-5">
                        <p>{order.currentOrder?.shippingAddress.name}</p>
                        <Divider flexItem orientation="vertical" />
                        <p>{order.currentOrder?.shippingAddress.mobile}</p>
                    </div>
                    <p>{order.currentOrder?.shippingAddress.address},{""}
                        {order.currentOrder?.shippingAddress.city},{""}
                        {order.currentOrder?.shippingAddress.pinCode},{""}

                    </p>
                </div>

                <div className="border space-y-4">
                    <div className="flex justify-between text-sm pt-5 px-5">
                        <div className="space-y-1">
                            <p className="font-bold">Total Item Price</p>
                            <p>
                                You saved{" "}
                                <span className="text-green-500 font-medium text-xs">${500}</span> on this item
                            </p>
                        </div>
                        <p className="font-medium">${order.orderItem?.sellingPrice}</p>
                    </div>
                    <div className="px-5">
                        <div className="bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3">
                            <Payments/>
                            <p>Pay on Delivery</p>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="px-5 pb-5">
                    <p className="text-xs">
                        <strong>Sold by:</strong> {order.orderItem?.product.seller?.businessDetails.businessName}
                    </p>
                </div>
                <div className="p-10">
                    <Button
                        disabled={false}
                        color="error"
                        sx={{ py: "0.7rem" }}
                        variant="outlined"
                        fullWidth
                    >
                        {true ? " order Cancel " : "Cancel Order"}
                    </Button>
                </div>
            </div>
        </Box>
    );
};

export default OrderDetails;
