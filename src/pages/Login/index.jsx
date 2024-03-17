import React, { useState } from 'react';
import styles from "../Login/style.module.css"
import { Box, Divider, TextField, Typography, Button, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';


const Login = () => {

    const [passwordShow, setPasswordShow] = useState(false)
    const loginHandler = () => {
        console.log("loginHandler")
    }

    return (
        <Box className={styles.loginWrapper}>
            <Box className={styles.loginForm}>
                <h1>LOGIN</h1>
                <Divider />
                <Box component={"form"} mt={"80px"} onSubmit={loginHandler}>
                    <TextField label="Email Address" fullWidth variant="outlined" className={styles.inputField} />
                    <TextField type={passwordShow ? "text" : "password"} label="Password" fullWidth variant="outlined" helperText={<Typography textAlign={"right"} sx={{ cursor: "pointer" }}>Forget Password</Typography>} InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" onClick={() => setPasswordShow(!passwordShow)} >
                                {!passwordShow ? <VisibilityOff /> : <Visibility />}
                            </InputAdornment>
                        )
                    }} />
                    <Button variant='contained' fullWidth sx={{ mt: "20px" }} type='submit'>LOGIN</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Login

