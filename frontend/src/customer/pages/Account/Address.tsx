import React from 'react'
import UserAddress from './UserAddress'

const Address = () => {
    return (
        <div className='space-y-3'>
            {[1, 1, 1, 1, 1].map((item) => <UserAddress />)}
        </div>
    )
}

export default Address