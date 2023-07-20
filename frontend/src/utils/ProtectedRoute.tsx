import React from 'react'

import { Navigate } from 'react-router-dom'



const ProtectedRoute : React.FC<any> = ({ children }) => {
    const userLocalStorage: any = localStorage.getItem("userinfo");
    const userinfo: any = JSON.parse(userLocalStorage);
    if(userLocalStorage) {
        if(userinfo.isLogin) {
            return children
        }
    }
    return <Navigate  to="/login" />
}

export default ProtectedRoute