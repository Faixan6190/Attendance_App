import React, { useState } from 'react';
import styles from "../Login/style.module.css"
import { Box, Divider, TextField, Typography, Button, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from "react-router-dom"
// import { Bounce, toast } from "react-toastify";
// import { ToastAlert } from "../../utils/toast";


const Signup = () => {
    const navigate = useNavigate()

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
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("user", user)
                Toast.success('user successfully signup', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                // navigate("/")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("errorCode", errorCode)
                // ..
            });

        console.log("email, password", email, password)
    }

    return (
        <Box className={styles.loginWrapper}>
            <Box className={styles.loginForm}>
                <h1>SIGNUP</h1>
                <Divider />
                <Box component={"form"} mt={"80px"} onSubmit={loginHandler}>
                    <TextField label="Email Address" fullWidth variant="outlined" className={styles.inputField} onChange={(e) => setEmail(e.target.value)} />
                    <TextField type={passwordShow ? "text" : "password"} label="Password" fullWidth variant="outlined" onChange={(e) => setPassword(e.target.value)} helperText={<Typography textAlign={"right"} sx={{ cursor: "pointer" }}>Already Account?</Typography>} InputProps={{
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

export default Signup;

