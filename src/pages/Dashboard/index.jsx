import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../firebase'
import { AdminLayout } from '../../components'

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
            <AdminLayout />
        </>
    )

}

export default Dashboard