import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const AuthRoute = () => {
    return (
        !localStorage.getItem("uid") ? < Outlet /> : <Navigate to={"/dashboard"} />
    )
}

export default AuthRoute