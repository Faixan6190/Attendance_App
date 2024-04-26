import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getDoc, addDoc, collection, setDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { ToastAlert } from "../../utils/toast"
import moment from 'moment';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function OutlinedCard({ stdData, setRefresh, refresh }) {
    const [userData, setUserData] = React.useState(null);
    const [isDisabled, setDisabled] = React.useState(true);
    const UID = localStorage.getItem("uid")

    const handleCheckIn = async () => {
        try {
            const checkIn = new Date().toDateString() + " " + new Date().toLocaleTimeString()
            await updateDoc(doc(db, "users", UID), {
                checkIn: checkIn
            })

            await setDoc(doc(db, "attendance", UID), {
                userID: stdData.id,
                name: stdData.name,
                checkIn,
                course: stdData.course
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

            await updateDoc(doc(db, "attendance", UID), {
                checkOut: checkOut,
            })
            setRefresh(!refresh)

        } catch (error) {
            ToastAlert(error.code || error.message, "error")
        }
    }

    const getData = async () => {
        const userData = await getDoc(doc(db, 'attendance', UID));
        setUserData(userData.data());
    }

    React.useEffect(() => {
        getData();
    }, [refresh])

    React.useEffect(() => {
        const checkAndDisable = () => {
            const isCheckoutDisabled = userData?.checkIn && (moment().diff(moment(userData.checkIn), 'hour') >= 23 || !!userData?.checkOut);
            setDisabled(isCheckoutDisabled);
        };

        // Call checkAndDisable immediately and then every 6 seconds
        const intervalId = setInterval(checkAndDisable, 6000);

        // Cleanup function to clear the interval when component unmounts
        return () => clearInterval(intervalId);
    }, [userData]); // Re-run effect whenever userData changes

    // React.useEffect(() => {

    //     const checkAndDisable = () => {
    //         const isCheckoutDisabled = userData?.checkIn && moment().diff(moment(userData.checkIn).add(23, "hour"), 'hour') >= 0 || !!userData?.checkOut;
    //         setDisabled(isCheckoutDisabled)
    //     };
    //     setInterval(checkAndDisable, 6000);
    //     clearInterval(checkAndDisable)
    // }, [])

    console.log(isDisabled, 'id')
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
                            userData?.checkIn ?
                                <Button variant='contained' disabled={isDisabled} onClick={handleCheckOut}>Check Out</Button> :
                                <Button variant='contained' onClick={handleCheckIn}>Check In</Button>
                        }
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box >
    );
}
