import { Button, Card, Divider } from '@mui/material'
import React from 'react'
import TransactionTable from './Transaction'

const Payment = () => {
  return (
    <div className='space-y-5'>
      <Card className='rounded-md space-y-4 p-5'>
        <h1 className="text-gray-600 font-medium">總收益</h1>
        <h1 className='font-bold'>$2486</h1>
        <Divider />
        <p className='text-gray-600 font-medium pt-1'>最近付款:<strong>$0</strong></p>

      </Card>
      <div className='mt-20 space-y-3'>
        <Button variant='contained' >
          交易紀錄
        </Button>
        <TransactionTable />

      </div>


    </div>
  )
}

export default Payment