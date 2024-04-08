import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../firebase'
import { AdminLayout, InputField } from '../../components'
import { Button, Divider, Box, Grid, Container } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';



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
                            <InputField id="fullName" label="Full Name" onChange={(e) => console.log(e.target.value)} />
                        </Grid>
                        <Grid item sm={6}>
                            <InputField id="course" label="Course" />
                        </Grid>
                        <Grid item sm={6}>
                            <InputField id="email" label="Email" />
                        </Grid>
                        <Grid item sm={6}>
                            <InputField id="Password" label="Password" type="password" />
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
                            <Button variant="contained" sx={{ width: "100%" }}>Add Student</Button>
                        </Grid>
                    </Grid>
                </Container>
            </AdminLayout >
        </>
    )

}

export default Dashboard