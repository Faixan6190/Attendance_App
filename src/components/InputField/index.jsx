import React from 'react'
import { TextField } from '@mui/material'

const InputField = ({ id, label = "outlined", type = "text", onChange, value }) => {
    return (
        <TextField id={id} type={type} sx={{ width: "100%" }} label={label} onChange={onChange} value={value} variant="outlined" />
    )
}

export default InputField