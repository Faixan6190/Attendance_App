import React from 'react'
import { AdminLayout } from '../../components'
import { Divider } from '@mui/material'
import AttendanceTable from '../../components/AttendanceTable'

const Attendance = () => {
    return (
        <AdminLayout>
            <h1>Students</h1>
            <Divider />
            <AttendanceTable />
        </AdminLayout >
    )
}

export default Attendance