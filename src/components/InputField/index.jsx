import React from 'react'
import { TextField } from '@mui/material'

const InputField = ({ id, label = "outlined", type = "text" }) => {
    return (
        <TextField id={id} type={type} sx={{ width: "100%" }} label={label} variant="outlined" />
    )
}

export default InputField