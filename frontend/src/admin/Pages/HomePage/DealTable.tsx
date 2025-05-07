import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from 'src/State/Store';
import { getAllDeals } from 'src/State/admin/DealSlice';

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

export default function DealTable() {
  const dispatch = useAppDispatch();
  const {deal} = useAppSelector(store=>store);
  React.useEffect(()=>{
   dispatch(getAllDeals())
  },[])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>編號</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>商品分類</StyledTableCell>
            <StyledTableCell align="right">折扣</StyledTableCell>
            <StyledTableCell align="right">更新</StyledTableCell>
            <StyledTableCell align="right">刪除</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deal.deals.map((item,index) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell >
                <img className='w-20 rounded-md' src={item.category.image} alt="" />
              </StyledTableCell>
              <StyledTableCell>{item.category.id}</StyledTableCell>
              <StyledTableCell align="right">{item.discount}</StyledTableCell>
              <StyledTableCell align="right">
                <Button>
                  <Edit />
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton>
                  <Delete sx={{ color: "red " }} />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}