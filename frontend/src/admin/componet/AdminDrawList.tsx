import { AccountBox, Add, Category, Dashboard, ElectricBolt, Home, IntegrationInstructions, LocalOffer, Logout } from '@mui/icons-material'
import React from 'react'
import DrawerList from 'src/componet/DrawerList'

const menu = [
    {
        name: "儀表板",
        path: "/admin",
        icon: <Dashboard className='text-primary-color' />,
        activeIcon: <Dashboard className='text-white' />,
    },
    {
        name: "優惠券",
        path: "/admin/coupon",
        icon: <IntegrationInstructions className="text-primary-color" />,
        activeIcon: <IntegrationInstructions className="text-white" />,
    },
    {
        name: "新增優惠券",
        path: "/admin/add-coupon",
        icon: <Add className="text-primary-color" />,
        activeIcon: <Add className="text-white" />,
    },
    {
        name: "首頁佈局",
        path: "/admin/home-grid",
        icon: <ElectricBolt className="text-primary-color" />,
        activeIcon: <ElectricBolt className="text-white" />,
    },
    {
        name: "電子產品分類",
        path: "/admin/electronics-category",
        icon: <Home className='text-primary-color' />,
        activeIcon: <Home className='text-white' />,
    },
    {
        name: "依分類選購",
        path: "/admin/shop-by-category",
        icon: <Category className='text-primary-color' />,
        activeIcon: <Category className='text-white' />,
    },
    {
        name: "優惠活動",
        path: "/admin/deals",
        icon: <LocalOffer className='text-primary-color' />,
        activeIcon: <LocalOffer className='text-white' />,
    }
]

const menu2 = [
    {
        name: "帳戶",  // Account
        path: "/seller/account",
        icon: <AccountBox className='text-primary-color' />,
        activeIcon: <AccountBox className='text-white' />,
    },
    {
        name: "登出",  // LogOut
        path: "/",
        icon: <Logout className='text-primary-color' />,
        activeIcon: <Logout className='text-white' />,
    },
]

const AdminDrawList = ({ toggleDrawer }: any) => {
    return (
        <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />

    )
}

export default AdminDrawList