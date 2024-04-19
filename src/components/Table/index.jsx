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


export default function MuiTable() {
    const [stdListData, setstdListData] = React.useState([])
    React.useEffect(() => {
        const fetchData = async () => {
            const docSnap = await getDocs(collection(db, "users"))
            const tempArr = []
            docSnap.forEach((user) => {
                if (user.data().type !== "admin") {
                    tempArr.push({ ...user.data(), id: user.id })
                }
            })
            setstdListData(tempArr)
            console.log(tempArr, "tempArr")
        }
        fetchData()
    }, [])


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell align="right">Course</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        stdListData.map(std => {
                            return (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {std.name}
                                    </TableCell>
                                    <TableCell align="right">{std.course}</TableCell>
                                    <TableCell align="right">{std.email}</TableCell>
                                    <TableCell align="right">{std.isActive ? "Active" : "InActive"}</TableCell>
                                    <TableCell align="right">edit</TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
