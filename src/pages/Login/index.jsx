import React, { useState } from 'react';
import styles from "./style.module.css"
import { Box, Divider, TextField, Typography, Button, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastAlert } from "../../utils/toast"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { doc, getDoc } from 'firebase/firestore';


const Login = () => {
    const navigate = useNavigate()
    const [passwordShow, setPasswordShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const loginHandler = (event) => {
        event.preventDefault()
        console.log("loginHandler")
        if (!email || !password) {
            console.log("required fields are missing")
            ToastAlert("required fields are missing", "warning")
            return
        }
        // console.log("email, password", email, password)
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const userID = userCredential.user.uid;
                console.log(userID, "userId")
                const userData = await getDoc(doc(db, "users", userID))
                console.log(userData.data(), "userData")
                // localStorage.setItem("uid", userID)
                // navigate("/dashboard")
                // ToastAlert("user login", "success")

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                ToastAlert(errorCode, "error")
                console.log(errorCode.message)
                console.log(errorMessage)

            });
    }

    return (
        <Box className={styles.loginWrapper}>
            <Box className={styles.loginForm}>
                <h1>LOGIN</h1>
                <Divider />
                <Box component={"form"} mt={"80px"} onSubmit={loginHandler}>
                    <TextField label="Email Address" fullWidth variant="outlined" className={styles.inputField} onChange={(e) => setEmail(e.target.value)} />
                    <TextField type={passwordShow ? "text" : "password"} label="Password" fullWidth variant="outlined" onChange={(e) => setPassword(e.target.value)} helperText={<span className={styles.cus_forget}>Forget Password</span>} InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" onClick={() => setPasswordShow(!passwordShow)} >
                                {!passwordShow ? <VisibilityOff /> : <Visibility />}
                            </InputAdornment>
                        )
                    }} />
                    <Button variant='contained' fullWidth sx={{ mt: "20px" }} type='submit'>LOGIN</Button>
                    <p className={styles.cusPara}>Don't have an Account?<NavLink to="/signup" className={styles.cusNavLink}> Register</NavLink></p>
                </Box>
            </Box>
        </Box >
    )
}

export default Login

