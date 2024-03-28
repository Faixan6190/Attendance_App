import React from 'react'
import { TextField } from '@mui/material'

const InputField = ({ label = "outlined", type = "text" }) => {
    return (
        <TextField id="outlined-basic" type={type} sx={{ width: "100%" }} label={label} variant="outlined" />
    )
}

export default InputField