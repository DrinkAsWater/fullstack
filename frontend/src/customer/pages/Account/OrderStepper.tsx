import { CheckCircle, FiberManualRecord } from '@mui/icons-material';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';

const steps = [
    { name: "訂單已成立", description: "於 7月11日（四）", value: "PLACED" },
    { name: "商品已包裝", description: "商品已於倉庫包裝完成", value: "CONFIRM" },
    { name: "已出貨", description: "預計於 7月15日送達", value: "SHIPPED" },
    { name: "運送中", description: "預計於 7月16日 至 7月18日送達", value: "ARRIVING" },
    { name: "已送達", description: "商品已於 7月16日 至 7月18日送達", value: "DELIVERED" },
];

const canceledStep = [
    { name: "訂單已成立", description: "於 7月11日（四）", value: "PLACED" },
    { name: "訂單已取消", description: "於 7月11日（四）", value: "CANCELLED" },
];

const currentStep = 1;

const OrderStepper = ({ orderStatus }: any) => {
    const [statusStep, setStatusStep] = useState(steps);

    useEffect(() => {
        if (orderStatus === 'CANCELLED') {
            setStatusStep(canceledStep);
        } else {
            setStatusStep(steps);
        }
    }, [orderStatus]);

    return (
        <Box className=" my-10">
            {statusStep.map((step, index) => (
                <>
                    <div key={index} className={`flex px-4`}>
                        <div className='flex flex-col items-center'>
                            <Box sx={{ zIndex: -1 }}
                                className={`w-8 h-8 rounded-full flex items-center 
                            justify-center z-10 ${index <= currentStep ? "bg-gray-200 text-teal-500" : "bg-gray-300 text-gray-600"
                                    }`}
                            >
                                {step.value === orderStatus ? (
                                    <CheckCircle />
                                ) : (
                                    <FiberManualRecord sx={{ zIndex: -1 }} />
                                )}
                            </Box>
                            {statusStep.length - 1 != index && (
                                <div
                                    className={`border h-20 w-[2px] ${index <
                                        currentStep
                                        ? "bg-primary-color"
                                        : "bg-gray-300 text-gray-600"
                                        }`}
                                ></div>
                            )}
                        </div>

                        <div className="{`ml-2 w-full`}">
                            <div
                                className={`${step.value === orderStatus ?
                                    "bg-primary-color p-2 text-white font-medium rounded-md -translate-y-3" : ""}
                                    ${(orderStatus === "CANCELLED" && step.value === orderStatus) ? "bg-red-500" : ""}
                                    w-full`}
                            >
                                <p className={` `}>
                                    {step.name}
                                </p>
                                <p className={`${step.value === orderStatus ? "text-gray-200" : "text-grey-500"}text-xs`}>
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </Box>
    );
};

export default OrderStepper;
