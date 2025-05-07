import React from 'react'
import SellerDrawerList from '../../SellerDrawerList/SellerDrawerList'
import SellerRoutes from 'src/Routes/SellerRoutes'

const SellerDashborad = () => {
    const toggleDrawer = () => { }
    return (
        <div>
            <div className="lg:flex lg:h-[90vh]">
                <section className="hidden lg:block h-full">
                    <SellerDrawerList toggleDrawer={toggleDrawer} />
                </section>
                <section className='p-10 w-10 lg:w-[80%] overflow-y-auto'>
                    <SellerRoutes />
                </section>

            </div>
        </div>
    )
}

export default SellerDashborad