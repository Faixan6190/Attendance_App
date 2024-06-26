import React, { useEffect, useState } from 'react'
import OutlinedCard from '../../components/AttendanceCard'
import { doc, getDoc } from 'firebase/firestore'
import { ToastAlert } from "../../utils/toast"
import { db } from "../../firebase";


const StdPortal = () => {
    const [stdData, setStdData] = useState("")
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const UID = localStorage.getItem("uid")
                const user = await getDoc(doc(db, "users", UID))
                setStdData({ id: user.id, ...user.data() })
            } catch (error) {
                ToastAlert(error.code || error.message, "error")
            }
        }
        fetchUser()
    }, [refresh])
    // console.log("stdData", stdData)
    return (
        <>
            <h1>Attendance</h1>
            <OutlinedCard stdData={stdData} setRefresh={setRefresh} refresh={refresh} />
        </>
    )
}

export default StdPortal