import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from 'src/State/Store';
import { fetchTransactionsBySeller } from 'src/State/seller/transactionSlice';

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

export default function TransactionTable() {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector(store => store);

  React.useEffect(() => {
    dispatch(fetchTransactionsBySeller(localStorage.getItem("jwt") || ""))
  }, [])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>日期</StyledTableCell>
            <StyledTableCell align="right">消費者資訊</StyledTableCell>
            <StyledTableCell align="right">訂單</StyledTableCell>
            <StyledTableCell align="right">金額</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.transactions.map((item) => (
            <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                {item.date}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {item.customer.email}
              </StyledTableCell>
              <StyledTableCell align="right">{item.order.id}</StyledTableCell>
               <StyledTableCell align="right">{item.order.totalSellingPrice}</StyledTableCell>
             {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}