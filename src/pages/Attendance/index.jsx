import React from 'react'
import { AdminLayout } from '../../components'
import { Divider, Stack } from '@mui/material'
import AttendanceTable from '../../components/AttendanceTable'
import DropDown from '../../components/Dropdown/index.'
import { collection, getDocs, query, where } from 'firebase/firestore'
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

    const handleCourseFilter = async (e, value) => {
        console.log("handleCourseFilter", value)
        const q = query(collection(db, "attendance"), where("course", "==", value.label));

        const tempArr = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            tempArr.push({ ...doc.data(), id: doc.id })
        });
        setattendanceListData(tempArr)
    }

    return (
        <AdminLayout>
            <Stack direction={"row"} justifyContent={"space-between"} mb={"20px"}>
                <h1>Students</h1>
                <DropDown handleCourseFilter={handleCourseFilter} />
            </Stack>
            <Divider />
            <AttendanceTable attendanceListData={attendanceListData} />
        </AdminLayout >
    )
}

export default Attendance


