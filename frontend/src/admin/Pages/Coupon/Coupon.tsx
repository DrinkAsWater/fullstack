import { Delete } from '@mui/icons-material';
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


const Coupon = () => {
    const [accountStatus, setAccountStatus] = useState("ACTIVE")
    const handleChange = (event: any) => {
        setAccountStatus(event.target.value)
    }
    return (
        <>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>折扣碼</StyledTableCell>
                            <StyledTableCell>開始日期</StyledTableCell>
                            <StyledTableCell>結束日期</StyledTableCell>
                            <StyledTableCell align="right">最低訂單金額</StyledTableCell>
                            <StyledTableCell align="right">折扣</StyledTableCell>
                            <StyledTableCell align="right">刪除</StyledTableCell>
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
                                <StyledTableCell align="right"><Button><Delete /></Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}

export default Coupon