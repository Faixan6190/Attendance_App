import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from "../../firebase"
import { Box, Button, Grid } from '@mui/material'
import { InputField } from "../../components"
import { ToastAlert } from "../../utils/toast"
import EditIcon from '@mui/icons-material/Edit';
import placeHolder from "../../assets/images/images.png"

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
                setstdimage(user.data().imageURL)
            } catch (error) {
                ToastAlert(error.code || error.message, "error")
            }
        }
        fetchUser()
    }, [])
    // console.log(userData, "userData")
    const saveHandler = async () => {
        try {
            const UID = localStorage.getItem("uid")
            await updateDoc(doc(db, "users", UID), {
                name: fullName,
                course
            })
            ToastAlert("Edit Successfully", "success")
            setdisabledField(!disabledField)
        } catch (error) {
            ToastAlert(error.code || error.message, "error")
        }
    }

    return (
        <>
            <Box display={"flex"} alignItems={"center"} gap="20px">
                <h1>PROFILE</h1>
                <EditIcon sx={{ cursor: "pointer" }} onClick={() => setdisabledField(!disabledField)} />
            </Box>
            <Grid container mt={2} columnSpacing={5} rowSpacing={5}>
                {/* <Grid item sm={12} textAlign={"center"}>
                    <Box component={"img"} src={stdimage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6yhFEixB_0JeSQ17fn800eFQTr-1h8PLqhk2LnZXaVg&s"} alt="image" width={150} height={150} sx={{ objectFit: "contain" }} />
                </Grid> */}
                <Grid item sm={12} textAlign={"center"}>
                    <Box component={"img"} src={stdimage || placeHolder} alt="image" width={150} height={150} sx={{ objectFit: "contain" }} />
                </Grid>
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
                    <Button onClick={saveHandler} disabled={disabledField} sx={{ width: "100%" }} variant="contained">
                        Save
                    </Button>
                </Grid>
            </Grid >
        </>

    )
}

export default Settings