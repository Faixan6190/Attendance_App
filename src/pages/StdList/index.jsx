import React from 'react'
import { AdminLayout, MuiTable } from '../../components'
import { Divider } from '@mui/material'

const StdList = () => {
    return (
        <AdminLayout>
            <h1>Students</h1>
            <Divider />
            <MuiTable />
        </AdminLayout >
    )
}

export default StdList