import React from 'react'
import { TextField } from '@mui/material'

const InputField = ({ id, label = "outlined", type = "text", onChange, }) => {
    return (
        <TextField id={id} type={type} sx={{ width: "100%" }} label={label} onChange={onChange} variant="outlined" />
    )
}

export default InputField