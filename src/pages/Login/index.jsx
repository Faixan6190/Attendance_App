import React from 'react';
import styles from "../Login/style.module.css"
import { Box, Divider, TextField } from "@mui/material";


const Login = () => {
    return (
        <Box className={styles.loginWrapper}>
            <Box className={styles.loginForm}>
                <h1>LOGIN</h1>
                <Divider />
                <Box component={"form"} mt={5}>
                    <TextField label="Email Address" fullWidth variant="outlined" className={styles.inputField} />
                    <TextField label="Password" fullWidth variant="outlined" />
                </Box>
            </Box>
        </Box>
    )
}

export default Login

