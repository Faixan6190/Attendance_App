import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { ToastAlert } from "../../utils/toast"

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function OutlinedCard({ stdData, setRefresh, refresh }) {

    const handleCheckIn = async () => {
        try {
            const checkIn = new Date().toDateString() + " " + new Date().toLocaleTimeString()
            const UID = localStorage.getItem("uid")
            await updateDoc(doc(db, "users", UID), {
                checkIn: checkIn
            })
            setRefresh(!refresh)
        } catch (error) {
            ToastAlert(error.code || error.message, "error")
        }
    }

    const handleCheckOut = async () => {
        try {
            const checkOut = new Date().toDateString() + " " + new Date().toLocaleTimeString()
            const UID = localStorage.getItem("uid")
            await updateDoc(doc(db, "users", UID), {
                checkOut: checkOut
            })

            await addDoc(collection(db, "attendance"), {
                userID: stdData.id,
                name: stdData.name,
                checkIn: stdData.checkIn,
                checkOut: checkOut
            })
            setRefresh(!refresh)

        } catch (error) {
            ToastAlert(error.code || error.message, "error")
        }
    }

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Typography variant='h5' sx={{ mb: "20px" }}>
                            ID : {stdData?.id}
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ mb: "20px" }}>
                            Course : {stdData?.course}
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ mb: "20px" }}>
                            CheckIn : {stdData?.checkIn || "00.00.00"}
                        </Typography>
                        <Typography variant="h5" component="div">
                            CheckOut : {stdData?.checkOut || "00.00.00"}
                        </Typography>

                    </CardContent>
                    <CardActions>
                        {
                            stdData.checkIn ?
                                <Button variant='contained' onClick={handleCheckOut}>Check Out</Button> :
                                <Button variant='contained' onClick={handleCheckIn}>Check In</Button>
                        }
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box >
    );
}
