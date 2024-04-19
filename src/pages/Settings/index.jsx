import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from "../../firebase"
import { Box, Button, Grid } from '@mui/material'
import { InputField } from "../../components"
import EditIcon from '@mui/icons-material/Edit';

const Settings = () => {
    const [fullName, setFullName] = useState("")
    const [course, setCourse] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [stdimage, setstdimage] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setuserdata] = useState("")
    const [disabledField, setdisabledField] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const UID = localStorage.getItem("uid")
                const user = await getDoc(doc(db, "users", UID))
                setuserdata(user.data())
                setFullName(user.data().name)
                setEmail(user.data().email)
                setCourse(user.data().course)
            } catch (error) {
                ToastAlert(error.code || error.message, "error")
            }
        }
        fetchUser()
    }, [])
    // console.log(userData, "userData")

    return (
        <>
            <Box display={"flex"} alignItems={"center"} gap="20px">
                <h1>PROFILE</h1>
                <EditIcon sx={{ cursor: "pointer" }} onClick={() => setdisabledField(!disabledField)} />
            </Box>
            <Grid container mt={2} columnSpacing={5} rowSpacing={3}>
                <Grid item sm={6}>
                    <InputField id="fullName" label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={disabledField} />
                </Grid>
                <Grid item sm={6}>
                    <InputField id="course" label="Course" value={course} onChange={(e) => setCourse(e.target.value)} disabled={disabledField} />
                </Grid>
                <Grid item sm={6}>
                    <InputField id="email" disabled label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Grid>
                {/* <Grid item sm={6}>
                <InputField id="Password" value={password} label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            </Grid> */}
                <Grid item sm={12}>
                    {/* <button onClick={handleAddStd} disabled={isLoading} className="button" style={{ verticalAlign: "middle" }}>   {isLoading ? 'Loading...' : ''}<span>Add Student</span></button> */}
                    {/* <Button disabled={disabledField} className="button" style={{ verticalAlign: "middle" }}>
                        {isLoading ? <span><Loader /></span> : <span>EDIT</span>}
                    </Button> */}
                    <Button disabled={disabledField} sx={{ width: "100%" }} variant="contained">
                        Save
                    </Button>
                </Grid>
            </Grid >
        </>

    )
}

export default Settings