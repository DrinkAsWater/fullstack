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
import { fetchSellerOrders, updateOrderStatus } from 'src/State/seller/sellerOrderSlice';
import { Button, Menu, MenuItem } from '@mui/material';
import { Label } from '@mui/icons-material';

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

const orderStatusColor = {
    待處理: {color: "#FFA500", "label": "待處理"},
    訂單成立: {color: "#F5BCBA", "label": "訂單成立"},
    已確認: {color: "#F5BCBA", "label": "已確認"},
    已出貨:{color: "#1E90FF", "label": "已出貨"},
    已送達: {color: "#32CD32", "label": "已送達"},
    已取消:{color: "#FF0000", "label": "已取消"} 
}

const orderStatus = [
    {color:'#FFA500',label:'PENDING'},
    {color:'#F5BCBA',label:'PLACED'},
    {color:'#F5BCBA',label:'CONFIRMED'},
    {color:'#1E90FF',label:'SHIPPED'},
    {color:'#32CD32',label:'DELIVERED'},
    {color:'#FF0000',label:'CANCELLED'}, 
]



export default function OrderTable() {
    const dispatch = useAppDispatch();
    const { sellerOrder } = useAppSelector(store => store)
    React.useEffect(() => {
        dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""));
    }, [])
    const [anchorEl, setAnchorEl] = React.useState<null | any>({});
    const open = Boolean(anchorEl);
    const handleClick = (event: any ,orderId:number) => {
      setAnchorEl((prev:any)=>({...prev,[orderId]:event.currentTarget}));
    };
    const handleClose = (orderId:number) =>()=> {
        setAnchorEl((prev:any)=>({...prev,[orderId]:null}));
    };
    const handleUpdateOrderStatus = (orderId:number,orderStatus:any)=>()=>{
        dispatch(updateOrderStatus({ jwt:localStorage.getItem("jwt")|| "",orderId,orderStatus}))
    }
  
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>訂單編號</StyledTableCell>
                        <StyledTableCell>品項</StyledTableCell>
                        <StyledTableCell align="right">收件地址</StyledTableCell>
                        <StyledTableCell align="right">訂單狀態</StyledTableCell>
                        <StyledTableCell align="right">更新</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sellerOrder.orders.map((item) => (
                        <StyledTableRow key={item.id}>
                            <StyledTableCell component="th" scope="row">
                                {item.id}
                            </StyledTableCell>
                            <StyledTableCell >
                                <div className="flex gap-1 flex-wrap">
                                    {
                                        item.orderItems.map((orderItem) => <div className='flex gap-5 '>
                                            <img className='w-20 rounded-md' src={orderItem.product.images[0]} alt='' />
                                            <div className="flex flex-col justify-between py-2">
                                                <h1>標題: {orderItem.product.title}</h1>
                                                <h1>價錢: {orderItem.product.sellingPrice}</h1>
                                                <h1>顏色: {orderItem.product.color}</h1>
                                            </div>
                                        </div>)
                                    }

                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <div className="flex flex-col gap-y-2">
                                    <h1>{item.shippingAddress.name}</h1>
                                    <h1>{item.shippingAddress.address},{item.shippingAddress.city}</h1>
                                    <h1>{item.shippingAddress.pinCode}</h1>
                                    <h1><strong>手機:</strong>{item.shippingAddress.mobile}</h1>

                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <span className='px-5 py-2 border rounded-full border-primary-color text-primary-color'>
                                    {item.orderStatus}</span>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                          <Button size='small' color='primary' onClick={(e)=>handleClick(e,item.id)}>
                            status
                          </Button>
                                <Menu
                                    id={`status-menu ${item.id}`}
                                    anchorEl={anchorEl[item.id]}
                                    open={Boolean(anchorEl[item.id])}
                                    onClose={handleClose(item.id)}
                                    MenuListProps={{
                                        'aria-labelledby': `status-menu ${item.id}`,
                                    }}
                                >
                                  {  orderStatus.map((status)=>
                                  <MenuItem 
                                  key = {status.label} 
                                  onClick={handleUpdateOrderStatus(item.id,status.label)}>
                                {status.label}
                                </MenuItem>) }
                                </Menu>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}