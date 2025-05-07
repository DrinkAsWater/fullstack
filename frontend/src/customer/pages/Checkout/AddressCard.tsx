import { Radio } from '@mui/material'
import React from 'react'

const AddressCard = () => {
    const  handleChange = (event:any)=>{
        console.log(event.target.checked)
    }
  return (
    <div className='p-5 border rounded-md flex'>
        <div>
            <Radio
            checked={true}
            onChange={handleChange}
            value= ""
            name='radio-button'
            />
        </div>
        <div className='space-y-3 pt-3'>
            <h1>Drink</h1>
            <p className='w-[320px]'>台北市南京三民麥克阿瑟橋-55688</p>
            <p><strong>手機 :</strong>09123456789</p>
        </div>
    </div>
  )
}

export default AddressCard