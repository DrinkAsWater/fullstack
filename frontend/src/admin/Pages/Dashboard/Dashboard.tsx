import React, { useEffect } from 'react'
import AdminDrawList from 'src/admin/componet/AdminDrawList'
import AdminRoutes from 'src/Routes/AdminRoutes'
import { fetchHomeCategories } from 'src/State/admin/adminSlice'
import { useAppDispatch } from 'src/State/Store'

const AdminDashboard = () => {
    const toggleDrawer = () => { }
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchHomeCategories())
    },[])
    return (
        <div>
            <div className="lg:flex lg:h-[90vh]">
                <section className="hidden lg:block h-full">
                    <AdminDrawList toggleDrawer={toggleDrawer} />
                </section>
                <section className='p-10 w-10 lg:w-[80%] overflow-y-auto'>
                    <AdminRoutes />
                </section>

            </div>
        </div>
    )
}

export default AdminDashboard