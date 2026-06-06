import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchAllSellers } from 'src/State/seller/sellerSlice'
import { useAppDispatch, useAppSelector } from 'src/State/Store'
import { api } from 'src/config/Api'

const accountStatusOptions = [
  { status: 'PENDING_VERIFICATION', title: '待驗證' },
  { status: 'ACTIVE', title: '啟用' },
  { status: 'SUSPENDED', title: '暫停' },
  { status: 'DEACTIVATED', title: '停用' },
  { status: 'BANNED', title: '封鎖' },
  { status: 'CLOSED', title: '關閉' },
]

const statusColor: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
  ACTIVE: 'success',
  PENDING_VERIFICATION: 'warning',
  SUSPENDED: 'warning',
  DEACTIVATED: 'error',
  BANNED: 'error',
  CLOSED: 'default',
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const SellersTable = () => {
  const [accountStatus, setAccountStatus] = useState('ACTIVE')
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const dispatch = useAppDispatch()
  const { seller } = useAppSelector(store => store)

  useEffect(() => {
    dispatch(fetchAllSellers(accountStatus))
  }, [accountStatus])

  const handleStatusChange = async (sellerId: number, newStatus: string) => {
    setUpdatingId(sellerId)
    try {
      await api.patch(`/api/seller/${sellerId}/status/${newStatus}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
      })
      dispatch(fetchAllSellers(accountStatus))
    } catch (e) {
      console.error('Failed to update seller status', e)
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <>
      <div className='pb-5 w-60'>
        <FormControl fullWidth>
          <InputLabel>帳戶狀態</InputLabel>
          <Select
            value={accountStatus}
            label="帳戶狀態"
            onChange={(e) => setAccountStatus(e.target.value)}
          >
            {accountStatusOptions.map((item) => (
              <MenuItem key={item.status} value={item.status}>{item.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="sellers table">
          <TableHead>
            <TableRow>
              <StyledTableCell>賣家名稱</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">手機號碼</StyledTableCell>
              <StyledTableCell align="right">統一編號 (GSTIN)</StyledTableCell>
              <StyledTableCell align="right">商店名稱</StyledTableCell>
              <StyledTableCell align="right">帳戶狀態</StyledTableCell>
              <StyledTableCell align="right">更改狀態</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seller.sellers.length === 0 && (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                  {seller.loading ? '載入中...' : '無賣家資料'}
                </StyledTableCell>
              </StyledTableRow>
            )}
            {seller.sellers.map((row: any) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">{row.sellerName}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.mobile}</StyledTableCell>
                <StyledTableCell align="right">{row.GSTIN || '-'}</StyledTableCell>
                <StyledTableCell align="right">{row.businessDetails?.businessName || '-'}</StyledTableCell>
                <StyledTableCell align="right">
                  <Chip
                    label={row.accountStatus}
                    color={statusColor[row.accountStatus] || 'default'}
                    size="small"
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Select
                    size="small"
                    value=""
                    displayEmpty
                    disabled={updatingId === row.id}
                    onChange={(e) => handleStatusChange(row.id, e.target.value)}
                    renderValue={() => '變更'}
                  >
                    {accountStatusOptions.map((opt) => (
                      <MenuItem key={opt.status} value={opt.status}>{opt.title}</MenuItem>
                    ))}
                  </Select>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default SellersTable
