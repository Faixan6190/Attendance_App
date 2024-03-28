import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../firebase'
import { AdminLayout, InputField } from '../../components'
import { Button, Divider, Box, Grid, Container } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';


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
                            <InputField label="Full Name" />
                        </Grid>
                        <Grid item sm={6}>
                            <InputField label="Course" />
                        </Grid>
                        <Grid item sm={6}>
                            <InputField label="Email" />
                        </Grid>
                        <Grid item sm={6}>
                            <InputField label="Password" type="password" />
                        </Grid>
                        <Grid item sm={12}>
                            <input type="file" />
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