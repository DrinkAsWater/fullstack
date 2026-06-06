import React, { useEffect } from 'react'
import { AttachMoney, Cancel, Inventory, ShoppingCart, TrendingUp } from '@mui/icons-material'
import { Card, CardContent, CircularProgress, Divider, Typography } from '@mui/material'
import { fetchSellerProfile, fetchSellerReport } from 'src/State/seller/sellerSlice'
import { useAppDispatch, useAppSelector } from 'src/State/Store'

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) => (
  <Card sx={{ minWidth: 180, flex: 1 }}>
    <CardContent className='flex items-center gap-4'>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
      <div>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
        <Typography variant="h6" fontWeight="bold">{value}</Typography>
      </div>
    </CardContent>
  </Card>
)

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const { seller } = useAppSelector(store => store)
  const jwt = localStorage.getItem('jwt') || ''

  useEffect(() => {
    if (jwt) {
      dispatch(fetchSellerProfile(jwt))
      dispatch(fetchSellerReport(jwt))
    }
  }, [])

  const report = seller.report
  const profile = seller.profile

  if (seller.loading && !profile) {
    return <div className='flex justify-center pt-20'><CircularProgress /></div>
  }

  return (
    <div className='space-y-6'>
      {profile && (
        <div className='bg-white border rounded-xl p-6'>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            歡迎回來，{profile.sellerName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {profile.businessDetails?.businessName} · {profile.email}
          </Typography>
          <div className='mt-2'>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              profile.accountStatus === 'ACTIVE'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {profile.accountStatus}
            </span>
          </div>
        </div>
      )}

      <div className='flex flex-wrap gap-4'>
        <StatCard
          icon={<TrendingUp className='text-white' />}
          label="總收益"
          value={`$${report?.totalEarnings ?? 0}`}
          color="bg-green-500"
        />
        <StatCard
          icon={<ShoppingCart className='text-white' />}
          label="總訂單數"
          value={report?.totalOrders ?? 0}
          color="bg-blue-500"
        />
        <StatCard
          icon={<AttachMoney className='text-white' />}
          label="淨收益"
          value={`$${report?.netEarnings ?? 0}`}
          color="bg-purple-500"
        />
        <StatCard
          icon={<Cancel className='text-white' />}
          label="取消訂單"
          value={report?.canceledOrders ?? 0}
          color="bg-red-400"
        />
        <StatCard
          icon={<Inventory className='text-white' />}
          label="總交易數"
          value={report?.totalTransactions ?? 0}
          color="bg-orange-400"
        />
      </div>

      <Divider />

      <div className='bg-white border rounded-xl p-6'>
        <Typography variant="h6" fontWeight="bold" gutterBottom>收益摘要</Typography>
        <div className='space-y-3'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>總銷售額</span>
            <span className='font-medium'>${report?.totalSales ?? 0}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>退款金額</span>
            <span className='font-medium text-red-500'>-${report?.totalRefunds ?? 0}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>稅費</span>
            <span className='font-medium'>-${report?.totalTax ?? 0}</span>
          </div>
          <Divider />
          <div className='flex justify-between font-bold text-lg'>
            <span>淨收益</span>
            <span className='text-green-600'>${report?.netEarnings ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
