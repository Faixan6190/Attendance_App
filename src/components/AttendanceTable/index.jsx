import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';


export default function AttendanceTable({ attendanceListData }) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell align="right">Course</TableCell>
                        <TableCell align="right">Check In</TableCell>
                        <TableCell align="right">Check Out</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        attendanceListData.map(std => {
                            return (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {std.name}
                                    </TableCell>
                                    <TableCell align="right">{std.course}</TableCell>
                                    <TableCell align="right">{std.checkIn}</TableCell>
                                    <TableCell align="right">{std.checkOut}</TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
