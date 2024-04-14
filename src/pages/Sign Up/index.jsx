import React, { useState } from 'react';
import styles from "./style.module.css"
import { Box, Divider, TextField, Typography, Button, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { NavLink, useNavigate } from "react-router-dom"
import { ToastAlert } from '../../utils/toast';
import { Bounce, toast } from "react-toastify";
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';


const Signup = () => {
    const navigate = useNavigate()

    const [passwordShow, setPasswordShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const signupHandler = (event) => {
        event.preventDefault()
        console.log("signupHandler")
        if (!email || !password) {
            console.log("required fielda are missing")
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("user", user.uid)
                const obj = {
                    name: "Super Admin",
                    email,
                    password,
                    type: "admin"
                }
                const createUser = await setDoc(doc(db, "users", user.uid), obj)
                console.log(createUser)
                ToastAlert("successfull signup", "success")
                setTimeout(() => {
                    navigate("/")
                }, 2500);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("errorCode", errorCode)
                ToastAlert(errorCode, "error")
                // ..
            });

        console.log("email, password", email, password)
    }

    return (
        <Box className={styles.loginWrapper}>
            <Box className={styles.loginForm}>
                <h1>SIGNUP</h1>
                <Divider />
                <Box component={"form"} mt={"80px"} onSubmit={signupHandler}>
                    <TextField label="Email Address" fullWidth variant="outlined" className={styles.inputField} onChange={(e) => setEmail(e.target.value)} />
                    <TextField type={passwordShow ? "text" : "password"} label="Password" fullWidth variant="outlined" onChange={(e) => setPassword(e.target.value)} helperText={<span className={styles.cus_Forget}><NavLink className={styles.cusNavLink} to="/">Already Account?</NavLink></span>} InputProps={{
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

