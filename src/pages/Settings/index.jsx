import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { db } from "../../firebase"

const Settings = () => {

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const UID = localStorage.getItem("uid")
                const user = await getDoc(doc(db, "users", UID))
                console.log(user, "user")

            } catch (error) {
                ToastAlert(error.code || error.message, "error")
            }
        }
        fetchUser()
    }, [])

    return (
        <div> Settings</div >
    )
}

export default Settings