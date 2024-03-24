import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../firebase'
import { getDatabase, ref, set } from 'firebase/database'

const Dashboard = () => {

    const [todoValue, setTodoValue] = useState("")
    const [valueTodo, setValueTodo] = useState("")
    // const addTodo = async () => {
    //     try {
    //         const docRef = await addDoc(collection(db, "todos"), {
    //             value: todoValue
    //         });
    //         console.log("Document written with ID: ", docRef.id);
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
    // }

    function writeUserData() {
        const db = getDatabase();
        set(ref(db, 'todos'), {
            value: todoValue,
        });
    }
    function writeUserData1() {
        const db = getDatabase();
        set(ref(db, 'testing'), {
            testing: valueTodo,
        });
    }


    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "20px"
            }}>
                <input onChange={(e) => setTodoValue(e.target.value)} type="text" placeholder='Enter Todo' />
                <button onClick={writeUserData}>ADD</button>
                <input onChange={(e) => setValueTodo(e.target.value)} type="text" placeholder='Testing' />
                <button onClick={writeUserData1}>ADD</button>
            </div>
        </>
    )

}

export default Dashboard