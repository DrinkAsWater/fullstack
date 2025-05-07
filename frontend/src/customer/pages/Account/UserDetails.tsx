import { Divider } from '@mui/material'
import React from 'react'
import ProfileFieldCard from 'src/componet/ProfileFieldCard'
import { useAppSelector } from 'src/State/Store'

const UserDetails = () => {
    const {auth}=useAppSelector(stroe=>stroe)
    return (
        <div className='flex justify-center py-10'>
            <div className="w-full lg:w-[70%]">
                <div className="flex items-center pb-3 justify-between">
                    <h1 className='text-2xl font-bold text-gray-600'>個人資料</h1>
                </div>
                <div className="">
                    <ProfileFieldCard keys='姓名' value={auth.user?.fullName || ""} />
                    <Divider />
                    <ProfileFieldCard keys='Email' value={auth.user?.email || ""} />
                    <Divider />
                    <ProfileFieldCard keys='手機' value={auth.user?.mobile || "0909073522"} />
                </div>
            </div>

        </div>
    )
}

export default UserDetails