import { AccountBalanceWallet, AccountBox, Add, Dashboard, Inventory, Logout, Receipt, ShoppingBag } from '@mui/icons-material'
import React from 'react'
import DrawerList from 'src/componet/DrawerList'



const menu = [
    {
        name: "後台首頁",  // Dashboard
        path: "/seller",
        icon: <Dashboard className='text-primary-color' />,
        activeIcon: <Dashboard className='text-white' />,
    },
    {
        name: "訂單",  // Orders
        path: "/seller/orders",
        icon: <ShoppingBag className='text-primary-color' />,
        activeIcon: <ShoppingBag className='text-white' />,
    },
    {
        name: "商品",  // Products
        path: "/seller/products",
        icon: <Inventory className='text-primary-color' />,
        activeIcon: <Inventory className='text-white' />
    },
    {
        name: "新增商品",  // Add Product
        path: "/seller/add-product",
        icon: <Add className='text-primary-color' />,
        activeIcon: <Add className='text-white' />,
    },
    {
        name: "付款",  // Payment
        path: "/seller/payment",
        icon: <AccountBalanceWallet className='text-primary-color' />,
        activeIcon: <AccountBalanceWallet className='text-white' />,
    },
    {
        name: "交易紀錄",  // Transaction
        path: "/seller/transaction",
        icon: <Receipt className='text-primary-color' />,
        activeIcon: <Receipt className='text-white' />,
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


const SellerDrawerList = ({ toggleDrawer }: { toggleDrawer: any }) => {
    return (

        <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />

    )
}

export default SellerDrawerList