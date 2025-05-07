import { Button, FormControl, InputLabel, MenuItem, Paper, Select, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'


const accountStatu = [
  { status: 'PENDING_VERIFICATION', title: '待驗證', description: "帳戶正在等待驗證中" },
  { status: 'ACTIVE', title: '啟用', description: '帳戶已啟用，狀態良好' },
  { status: 'SUSPENDED', title: '暫停', description: '帳戶暫時被停用' },
  { status: 'DEACTIVATED', title: '停用', description: '帳戶已被停用' },
  { status: 'BANNED', title: '封鎖', description: '帳戶已被永久封鎖，原因可能包括違規' },
  { status: 'CLOSED', title: '關閉', description: '帳戶已永久關閉，無法恢復' }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const SellersTable = () => {
  const [accountStatus, setAccountStatus] = useState("ACTIVE")
  const handleChange = (event: any) => {
    setAccountStatus(event.target.value)
  }
  return (
    <>
      <div className='pb-5 w-60'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">帳戶狀態</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accountStatus}
            label="帳戶狀態"
            onChange={handleChange}
          >
            {accountStatu.map((item) => <MenuItem value={item.status}>{item.title}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>賣家名稱</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">手機號碼</StyledTableCell>
              <StyledTableCell align="right">統一編號 (GUI)</StyledTableCell>
              <StyledTableCell align="right">商店名稱</StyledTableCell>
              <StyledTableCell align="right">帳戶狀態</StyledTableCell>
              <StyledTableCell align="right">更改狀態</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell >{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right"><Button>Change</Button></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>

  )
}

export default SellersTable