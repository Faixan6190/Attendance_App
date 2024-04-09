import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { auth, db } from '../../firebase'
import { AdminLayout, InputField } from '../../components'
import { Button, Divider, Box, Grid, Container } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import "./dashboard.css"
import { ToastAlert } from "../../utils/toast"
import { createUserWithEmailAndPassword } from 'firebase/auth'


const Dashboard = () => {

    const [todoValue, setTodoValue] = useState("")
    const addTodo = async () => {
        try {
            const docRef = await addDoc(collection(db, "todos"), {
                value: todoValue
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const [fullName, setFullName] = useState("")
    const [course, setCourse] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleAddStd = async () => {
        try {
            // console.log("handleAddStd", fullName, course, email, password)
            if (!fullName || !course || !email || !password) {
                ToastAlert("required field are missing", "error")
                return
            }
            const stdData = await createUserWithEmailAndPassword(auth, email, password)
            console.log(stdData, "stdData")
        } catch (error) {
            ToastAlert(error.code || error.message, "error")
        }
    }

    return (
        <>
            {/* <div style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "20px"
            }}>
                <input onChange={(e) => setTodoValue(e.target.value)} type="text" placeholder='Enter Todo' />
                <button onClick={addTodo}>ADD</button>
            </div> */}
            <AdminLayout>
                <h1>Add Student</h1>
                <Divider />
                <Container>
                    <Grid container mt={2} columnSpacing={5} rowSpacing={3}>
                        <Grid item sm={6}>
                            <InputField id="fullName" label="Full Name" onChange={(e) => setFullName(e.target.value)} />
                        </Grid>
                        <Grid item sm={6}>
                            <InputField id="course" label="Course" onChange={(e) => setCourse(e.target.value)} />
                        </Grid>
                        <Grid item sm={6}>
                            <InputField id="email" label="Email" onChange={(e) => setEmail(e.target.value)} />
                        </Grid>
                        <Grid item sm={6}>
                            <InputField id="Password" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                        </Grid>
                        <Grid item sm={12}>
                            {/* <input type="file" /> */}
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload file
                                <VisuallyHiddenInput type="file" />
                            </Button>
                        </Grid>
                        <Grid item sm={12}>
                            <button onClick={handleAddStd} className="button" style={{ verticalAlign: "middle" }}><span>Add Student</span></button>
                            {/* <Button variant="contained" sx={{ width: "100%" }}>Add Student</Button> */}
                        </Grid>
                    </Grid>
                </Container>
            </AdminLayout >
        </>
    )

}

export default Dashboard