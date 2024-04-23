import React from 'react'
import { AdminLayout } from '../../components'
import { Divider, Stack } from '@mui/material'
import AttendanceTable from '../../components/AttendanceTable'
import DropDown from '../../components/Dropdown/index.'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

const Attendance = () => {
    const [attendanceListData, setattendanceListData] = React.useState([])
    React.useEffect(() => {
        const fetchData = async () => {
            const docSnap = await getDocs(collection(db, "attendance"))
            const tempArr = []
            docSnap.forEach((user) => {
                tempArr.push({ ...user.data(), id: user.id })
            })
            setattendanceListData(tempArr)
        }
        fetchData()
    }, [])
    console.log(attendanceListData, "attendancelisdata")

    const handleCourseFilter = (e, value) => {
        console.log("handleCourseFilter", value)
    }

    return (
        <AdminLayout>
            <Stack direction={"row"} justifyContent={"space-between"} mb={"20px"}>
                <h1>Students</h1>
                <DropDown handleCourseFilter={handleCourseFilter} />
            </Stack>
            <Divider />
            <AttendanceTable />
        </AdminLayout >
    )
}

export default Attendance