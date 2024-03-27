import React from 'react'
import { TextField } from '@mui/material'

const InputField = ({ label }) => {
    return (
        <TextField id="outlined-basic" label={label} variant="outlined" />
    )
}

export default InputField