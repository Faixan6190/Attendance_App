import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const AdminProtectedRoute = () => {
    return (
        localStorage.getItem("uid") ?
            JSON.parse(localStorage.getItem("user")).type == "admin" ?
                < Outlet /> : <Navigate to={"/portal"} /> : <Navigate to={"/"} />
    )
}

const StdProtectedRoute = () => {
    return (
        localStorage.getItem("uid") ?
            JSON.parse(localStorage.getItem("user")).type == "std" ?
                < Outlet /> : <Navigate to={"/dashboard"} /> : <Navigate to={"/"} />
    )
}

const Header = () => {
    console.log(Header, "Header")
}

export default AdminProtectedRoute
export {
    StdProtectedRoute
}