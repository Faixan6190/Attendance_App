import React, { useState } from 'react';
import styles from "../Login/style.module.css"
import { Box, Divider, TextField, Typography, Button, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';


const Signup = () => {

    const [passwordShow, setPasswordShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const loginHandler = (event) => {
        event.preventDefault()
        console.log("loginHandler")
        if (!email || !password) {
            console.log("required fielda are missing")
            return
        }
        console.log("email, password", email, password)
    }

    return (
        <Box className={styles.loginWrapper}>
            <Box className={styles.loginForm}>
                <h1>SIGNUP</h1>
                <Divider />
                <Box component={"form"} mt={"80px"} onSubmit={loginHandler}>
                    <TextField label="Email Address" fullWidth variant="outlined" className={styles.inputField} onChange={(e) => setEmail(e.target.value)} />
                    <TextField type={passwordShow ? "text" : "password"} label="Password" fullWidth variant="outlined" onChange={(e) => setPassword(e.target.value)} helperText={<Typography textAlign={"right"} sx={{ cursor: "pointer" }}>Forget Password</Typography>} InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" onClick={() => setPasswordShow(!passwordShow)} >
                                {!passwordShow ? <VisibilityOff /> : <Visibility />}
                            </InputAdornment>
                        )
                    }} />
                    <Button variant='contained' fullWidth sx={{ mt: "20px" }} type='submit'>SIGNUP</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Signup

